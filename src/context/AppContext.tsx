import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CEFRLevel,
  DailyGoalXP,
  GrammarQuizQuestion,
  LanguageMode,
  LessonExercise,
  SRSCardProgress,
  SRSRating,
  ThemeMode,
  TTSAccentStyle,
  TTSSpeed,
  TTSVoiceGender,
  VocabularyItem
} from "../types";
import {
  setSoundEnabledState,
  setVibrationEnabledState
} from "../utils/soundEffects";

const STORAGE_KEY = "@deutschbridge_app_state_v2";
/** Delay before persisting state, so rapid taps produce a single write. */
const PERSIST_DEBOUNCE_MS = 600;

export type VocabSectionTab =
  | "ALL"
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "saved"
  | "day"
  | "topic";

export interface SavedLearnSession {
  unitId: string;
  exerciseQueue: LessonExercise[];
  exerciseIdx: number;
}

export interface SavedGrammarQuizSession {
  topicId: string;
  questionQueue: GrammarQuizQuestion[];
  qIndex: number;
  correctCount: number;
}

export interface SavedVocabSwipeSession {
  isOpen: boolean;
  playTitle: string;
  playRoundLimit: number;
  playIdx: number;
  playMasteredCount: number;
  queueIds: string[];
  sourceKey: string;
}

interface PersistedState {
  hasCompletedOnboarding: boolean;
  userName: string;
  userAge: string;
  userGender: string;
  userEmail: string;
  userAvatarUri: string | null;
  activeLevel: CEFRLevel;
  languageMode: LanguageMode;
  themeMode: ThemeMode;
  ttsVoiceGender: TTSVoiceGender;
  ttsAccentStyle: TTSAccentStyle;
  ttsSpeed: TTSSpeed;
  vibrationEnabled: boolean;
  soundEnabled: boolean;
  dailyGoal: DailyGoalXP;
  dailyXP: number;
  totalXP: number;
  streak: number;
  lastActiveDate: string;
  streakHistory: string[];
  completedUnitIds: string[];
  completedGrammarQuizIds: string[];
  completedReadPassageIds: string[];
  awardedXPGrammarIds?: string[];
  awardedXPReadIds?: string[];
  speakingScores: number[];
  savedWords: VocabularyItem[];
  srsProgress: Record<string, SRSCardProgress>;

  // Persistent UI & Progress State across all tabs
  vocabActiveSection: VocabSectionTab;
  vocabSelectedChapterByLevel: Record<CEFRLevel, string>;
  vocabSelectedDay: string;
  vocabSelectedTopic: string;
  /** Maps deckKey (e.g. "A1::ALL", "A1::Kapitel 1: Guten Tag!", "day::Day 1") -> last cardIndex */
  vocabDeckPositions: Record<string, number>;
  vocabSwipeSession: SavedVocabSwipeSession | null;
  learnSession: SavedLearnSession | null;
  grammarShowAllLevels: boolean;
  grammarQuizSession: SavedGrammarQuizSession | null;
  readSelectedPassageId: string;
  readShowAllLevels: boolean;
  readShowFullTranslation: boolean;
}

const getTodayISO = (): string => {
  return new Date().toISOString().split("T")[0];
};

const getInitialStreakDates = (): string[] => {
  const dates: string[] = [];
  const now = new Date();
  for (let i = 4; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
};

const DEFAULT_SAVED_WORDS: VocabularyItem[] = [
  {
    id: "saved-bahnhof",
    level: "A1",
    topic: "Saved from Reader",
    article: "der",
    german: "Bahnhof",
    plural: "die Bahnhöfe",
    english: "train station",
    bangla: "রেলস্টেশন",
    phoneticHint: "বান-হোফ",
    exampleDe: "Danach gehe ich zum Bahnhof.",
    exampleEn: "Afterwards I walk to the train station.",
    exampleBn: "তারপর আমি রেলস্টেশনে যাই।"
  },
  {
    id: "saved-schnittstelle",
    level: "B2",
    topic: "Saved from Reader",
    article: "die",
    german: "Schnittstelle",
    plural: "die Schnittstellen",
    english: "interface / API",
    bangla: "ইন্টারফেস / সংযোগস্থল (API)",
    phoneticHint: "শ্নিট-শ্টেলে",
    exampleDe: "Wir dokumentieren jede Schnittstelle sorgfältig.",
    exampleEn: "We document every interface carefully.",
    exampleBn: "আমরা প্রতিটি ইন্টারফেস যত্নসহকারে ডকুমেন্ট করি।"
  }
];

const INITIAL_STATE: PersistedState = {
  hasCompletedOnboarding: false,
  userName: "M. M. Rayhan Parvez",
  userAge: "26",
  userGender: "Male",
  userEmail: "mmrp.cse@gmail.com",
  userAvatarUri: null,
  activeLevel: "A1",
  languageMode: "both",
  themeMode: "light",
  ttsVoiceGender: "female",
  ttsAccentStyle: "de-natural",
  ttsSpeed: 1.0,
  vibrationEnabled: true,
  soundEnabled: true,
  dailyGoal: 30,
  dailyXP: 15,
  totalXP: 340,
  streak: 5,
  lastActiveDate: getTodayISO(),
  streakHistory: getInitialStreakDates(),
  completedUnitIds: ["a1-unit-1"],
  completedGrammarQuizIds: [],
  completedReadPassageIds: [],
  speakingScores: [88, 92, 85, 94],
  savedWords: DEFAULT_SAVED_WORDS,
  srsProgress: {},

  vocabActiveSection: "A1",
  vocabSelectedChapterByLevel: {
    A1: "ALL",
    A2: "ALL",
    B1: "ALL",
    B2: "ALL"
  },
  vocabSelectedDay: "Day 1",
  vocabSelectedTopic: "Greetings",
  vocabDeckPositions: {},
  vocabSwipeSession: null,
  learnSession: null,
  grammarShowAllLevels: false,
  grammarQuizSession: null,
  readSelectedPassageId: "passage-a1-1",
  readShowAllLevels: false,
  readShowFullTranslation: true
};

interface AppContextValue extends PersistedState {
  isHydrated: boolean;
  speakingAccuracyAvg: number;
  completeOnboarding: () => void;
  setUserName: (name: string) => void;
  updateUserProfile: (profile: {
    userName: string;
    userAge: string;
    userGender?: string;
    userEmail: string;
    userAvatarUri: string | null;
  }) => void;
  setActiveLevel: (level: CEFRLevel) => void;
  setLanguageMode: (mode: LanguageMode) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setTtsVoiceGender: (gender: TTSVoiceGender) => void;
  setTtsAccentStyle: (accent: TTSAccentStyle) => void;
  setTtsSpeed: (speed: TTSSpeed) => void;
  setVibrationEnabled: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  toggleTheme: () => void;
  setDailyGoal: (goal: DailyGoalXP) => void;
  addXP: (amount: number) => void;
  recordSpeakingScore: (score: number) => boolean;
  markUnitCompleted: (unitId: string, xpReward: number) => void;
  markGrammarQuizCompleted: (topicId: string, xpReward: number) => void;
  toggleGrammarTopicCompleted: (topicId: string) => void;
  toggleReadPassageCompleted: (passageId: string) => void;
  toggleSavedWord: (word: VocabularyItem) => void;
  addSavedWord: (word: VocabularyItem) => void;
  deleteSavedWord: (wordIdOrGerman: string) => void;
  isWordSaved: (lemmaOrGerman: string) => boolean;
  rateFlashcard: (wordId: string, rating: SRSRating) => void;

  // Persistent Navigation & Deck Position Setters
  setVocabActiveSection: (section: VocabSectionTab) => void;
  setVocabSelectedChapter: (level: CEFRLevel, chapter: string) => void;
  setVocabSelectedDay: (day: string) => void;
  setVocabSelectedTopic: (topic: string) => void;
  setVocabDeckPosition: (deckKey: string, index: number) => void;
  setVocabSwipeSession: (session: SavedVocabSwipeSession | null) => void;
  setLearnSession: (session: SavedLearnSession | null) => void;
  setGrammarShowAllLevels: (showAll: boolean) => void;
  setGrammarQuizSession: (session: SavedGrammarQuizSession | null) => void;
  setReadSelectedPassageId: (passageId: string) => void;
  setReadShowAllLevels: (showAll: boolean) => void;
  setReadShowFullTranslation: (show: boolean) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, setState] = useState<PersistedState>(INITIAL_STATE);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Hydrate from AsyncStorage (checks both v2 and legacy v1 keys)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        let raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) {
          raw = await AsyncStorage.getItem("@deutschbridge_app_state_v1");
        }
        if (raw && mounted) {
          const parsed = JSON.parse(raw) as Partial<PersistedState>;
          const today = getTodayISO();
          const isNewDay =
            parsed.lastActiveDate && parsed.lastActiveDate !== today;
          const validLevels: CEFRLevel[] = ["A1", "A2", "B1", "B2"];
          const safeLevel: CEFRLevel =
            parsed.activeLevel && validLevels.includes(parsed.activeLevel)
              ? parsed.activeLevel
              : "A1";
          setState((prev) => ({
            ...prev,
            ...parsed,
            activeLevel: safeLevel,
            vocabSelectedChapterByLevel: {
              ...prev.vocabSelectedChapterByLevel,
              ...(parsed.vocabSelectedChapterByLevel || {})
            },
            vocabDeckPositions: parsed.vocabDeckPositions || {},
            dailyXP: isNewDay ? 0 : (parsed.dailyXP ?? prev.dailyXP),
            lastActiveDate: today
          }));
        }
      } catch {
        // Keep initial state if storage fails
      } finally {
        if (mounted) {
          setIsHydrated(true);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Persist to AsyncStorage (debounced). Serializing the whole state
  // (saved words, SRS progress...) on every tap blocked the JS thread on
  // low-end devices. Pending writes are flushed when the app is backgrounded.
  const latestStateRef = useRef(state);
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPendingWriteRef = useRef(false);

  const flushPersist = useCallback(() => {
    if (persistTimerRef.current) {
      clearTimeout(persistTimerRef.current);
      persistTimerRef.current = null;
    }
    if (!hasPendingWriteRef.current) return;
    hasPendingWriteRef.current = false;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(latestStateRef.current)
    ).catch(() => {});
  }, []);

  useEffect(() => {
    latestStateRef.current = state;
    if (!isHydrated) return;
    hasPendingWriteRef.current = true;
    if (persistTimerRef.current) {
      clearTimeout(persistTimerRef.current);
    }
    persistTimerRef.current = setTimeout(flushPersist, PERSIST_DEBOUNCE_MS);
  }, [state, isHydrated, flushPersist]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (next) => {
      if (next !== "active") {
        flushPersist();
      }
    });
    return () => {
      sub.remove();
      flushPersist();
    };
  }, [flushPersist]);

  const completeOnboarding = useCallback(() => {
    setState((prev) => ({ ...prev, hasCompletedOnboarding: true }));
  }, []);

  const setUserName = useCallback((userName: string) => {
    setState((prev) => ({ ...prev, userName }));
  }, []);

  const updateUserProfile = useCallback(
    (profile: {
      userName: string;
      userAge: string;
      userGender?: string;
      userEmail: string;
      userAvatarUri: string | null;
    }) => {
      setState((prev) => ({
        ...prev,
        userName: profile.userName,
        userAge: profile.userAge,
        userGender: profile.userGender ?? prev.userGender ?? "Male",
        userEmail: profile.userEmail,
        userAvatarUri: profile.userAvatarUri
      }));
    },
    []
  );

  const setActiveLevel = useCallback((activeLevel: CEFRLevel) => {
    setState((prev) => ({ ...prev, activeLevel }));
  }, []);

  const setLanguageMode = useCallback((languageMode: LanguageMode) => {
    setState((prev) => ({ ...prev, languageMode }));
  }, []);

  const setThemeMode = useCallback((themeMode: ThemeMode) => {
    setState((prev) => ({ ...prev, themeMode }));
  }, []);

  const setTtsVoiceGender = useCallback((ttsVoiceGender: TTSVoiceGender) => {
    setState((prev) => ({ ...prev, ttsVoiceGender }));
  }, []);

  const setTtsAccentStyle = useCallback((ttsAccentStyle: TTSAccentStyle) => {
    setState((prev) => ({ ...prev, ttsAccentStyle }));
  }, []);

  const setTtsSpeed = useCallback((ttsSpeed: TTSSpeed) => {
    setState((prev) => ({ ...prev, ttsSpeed }));
  }, []);

  const setVibrationEnabled = useCallback((vibrationEnabled: boolean) => {
    setVibrationEnabledState(vibrationEnabled);
    setState((prev) => ({ ...prev, vibrationEnabled }));
  }, []);

  const setSoundEnabled = useCallback((soundEnabled: boolean) => {
    setSoundEnabledState(soundEnabled);
    setState((prev) => ({ ...prev, soundEnabled }));
  }, []);

  useEffect(() => {
    setVibrationEnabledState(state.vibrationEnabled ?? true);
    setSoundEnabledState(state.soundEnabled ?? true);
  }, [state.vibrationEnabled, state.soundEnabled]);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      ...prev,
      themeMode:
        prev.themeMode === "light"
          ? "dark"
          : prev.themeMode === "dark"
          ? "black"
          : prev.themeMode === "black"
          ? "pink"
          : "light"
    }));
  }, []);

  const setDailyGoal = useCallback((dailyGoal: DailyGoalXP) => {
    setState((prev) => ({ ...prev, dailyGoal }));
  }, []);

  const addXP = useCallback((amount: number) => {
    const today = getTodayISO();
    setState((prev) => {
      const hasTodayInHistory = prev.streakHistory.includes(today);
      const updatedHistory = hasTodayInHistory
        ? prev.streakHistory
        : [...prev.streakHistory, today];
      return {
        ...prev,
        dailyXP: prev.dailyXP + amount,
        totalXP: prev.totalXP + amount,
        lastActiveDate: today,
        streakHistory: updatedHistory,
        streak: hasTodayInHistory ? prev.streak : prev.streak + 1
      };
    });
  }, []);

  const recordSpeakingScore = useCallback((score: number): boolean => {
    const awarded = score >= 80;
    const today = getTodayISO();
    setState((prev) => {
      const hasTodayInHistory = prev.streakHistory.includes(today);
      const updatedHistory = hasTodayInHistory
        ? prev.streakHistory
        : [...prev.streakHistory, today];
      return {
        ...prev,
        speakingScores: [...prev.speakingScores.slice(-49), score],
        dailyXP: awarded ? prev.dailyXP + 5 : prev.dailyXP,
        totalXP: awarded ? prev.totalXP + 5 : prev.totalXP,
        lastActiveDate: today,
        streakHistory: updatedHistory
      };
    });
    return awarded;
  }, []);

  const markUnitCompleted = useCallback((unitId: string, xpReward: number) => {
    const today = getTodayISO();
    setState((prev) => {
      const alreadyDone = prev.completedUnitIds.includes(unitId);
      const bonus = alreadyDone ? Math.round(xpReward / 2) : xpReward;
      const hasTodayInHistory = prev.streakHistory.includes(today);
      return {
        ...prev,
        completedUnitIds: alreadyDone
          ? prev.completedUnitIds
          : [...prev.completedUnitIds, unitId],
        dailyXP: prev.dailyXP + bonus,
        totalXP: prev.totalXP + bonus,
        lastActiveDate: today,
        streakHistory: hasTodayInHistory
          ? prev.streakHistory
          : [...prev.streakHistory, today],
        learnSession: null
      };
    });
  }, []);

  const markGrammarQuizCompleted = useCallback(
    (topicId: string, xpReward: number) => {
      const today = getTodayISO();
      setState((prev) => {
        const alreadyDone = prev.completedGrammarQuizIds.includes(topicId);
        const bonus = alreadyDone ? 5 : xpReward;
        return {
          ...prev,
          completedGrammarQuizIds: alreadyDone
            ? prev.completedGrammarQuizIds
            : [...prev.completedGrammarQuizIds, topicId],
          dailyXP: prev.dailyXP + bonus,
          totalXP: prev.totalXP + bonus,
          lastActiveDate: today,
          grammarQuizSession: null
        };
      });
    },
    []
  );

  const toggleGrammarTopicCompleted = useCallback((topicId: string) => {
    const today = getTodayISO();
    setState((prev) => {
      const alreadyDone = prev.completedGrammarQuizIds.includes(topicId);
      const awardedIds = prev.awardedXPGrammarIds ?? [];
      const shouldAward = !alreadyDone && !awardedIds.includes(topicId);
      const xpGain = shouldAward ? 10 : 0;
      const hasTodayInHistory = prev.streakHistory.includes(today);
      return {
        ...prev,
        completedGrammarQuizIds: alreadyDone
          ? prev.completedGrammarQuizIds.filter((id) => id !== topicId)
          : [...prev.completedGrammarQuizIds, topicId],
        awardedXPGrammarIds: shouldAward ? [...awardedIds, topicId] : awardedIds,
        dailyXP: prev.dailyXP + xpGain,
        totalXP: prev.totalXP + xpGain,
        lastActiveDate: today,
        streakHistory:
          xpGain > 0 && !hasTodayInHistory
            ? [...prev.streakHistory, today]
            : prev.streakHistory,
        streak:
          xpGain > 0 && !hasTodayInHistory ? prev.streak + 1 : prev.streak
      };
    });
  }, []);

  const toggleReadPassageCompleted = useCallback((passageId: string) => {
    const today = getTodayISO();
    setState((prev) => {
      const current = prev.completedReadPassageIds ?? [];
      const alreadyDone = current.includes(passageId);
      const awardedIds = prev.awardedXPReadIds ?? [];
      const shouldAward = !alreadyDone && !awardedIds.includes(passageId);
      const xpGain = shouldAward ? 20 : 0;
      const hasTodayInHistory = prev.streakHistory.includes(today);
      return {
        ...prev,
        completedReadPassageIds: alreadyDone
          ? current.filter((id) => id !== passageId)
          : [...current, passageId],
        awardedXPReadIds: shouldAward ? [...awardedIds, passageId] : awardedIds,
        dailyXP: prev.dailyXP + xpGain,
        totalXP: prev.totalXP + xpGain,
        lastActiveDate: today,
        streakHistory:
          xpGain > 0 && !hasTodayInHistory
            ? [...prev.streakHistory, today]
            : prev.streakHistory,
        streak:
          xpGain > 0 && !hasTodayInHistory ? prev.streak + 1 : prev.streak
      };
    });
  }, []);

  const isWordSaved = useCallback(
    (lemmaOrGerman: string): boolean => {
      const clean = lemmaOrGerman
        .replace(/[.,!?;:"„“”()[\]—-]/g, "")
        .trim()
        .toLowerCase();
      return state.savedWords.some(
        (w) => w.german.toLowerCase() === clean || w.id.toLowerCase() === clean
      );
    },
    [state.savedWords]
  );

  const toggleSavedWord = useCallback((word: VocabularyItem) => {
    const clean = word.german.trim().toLowerCase();
    setState((prev) => {
      const exists = prev.savedWords.some(
        (w) => w.german.trim().toLowerCase() === clean
      );
      if (exists) {
        return {
          ...prev,
          savedWords: prev.savedWords.filter(
            (w) => w.german.trim().toLowerCase() !== clean
          )
        };
      }
      return {
        ...prev,
        savedWords: [word, ...prev.savedWords]
      };
    });
  }, []);

  const addSavedWord = useCallback((word: VocabularyItem) => {
    const clean = word.german.trim().toLowerCase();
    setState((prev) => {
      const filtered = prev.savedWords.filter(
        (w) => w.german.trim().toLowerCase() !== clean && w.id !== word.id
      );
      return {
        ...prev,
        savedWords: [word, ...filtered]
      };
    });
  }, []);

  const deleteSavedWord = useCallback((wordIdOrGerman: string) => {
    const clean = wordIdOrGerman.trim().toLowerCase();
    setState((prev) => ({
      ...prev,
      savedWords: prev.savedWords.filter(
        (w) =>
          w.id.toLowerCase() !== clean &&
          w.german.trim().toLowerCase() !== clean
      )
    }));
  }, []);

  const rateFlashcard = useCallback((wordId: string, rating: SRSRating) => {
    setState((prev) => {
      const existing = prev.srsProgress[wordId] || {
        wordId,
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0,
        dueDate: getTodayISO()
      };

      let nextInterval = 1;
      let nextEase = existing.easeFactor;
      let nextReps = existing.repetitions;

      if (rating === "Again") {
        nextInterval = 1;
        nextReps = 0;
        nextEase = Math.max(1.3, existing.easeFactor - 0.2);
      } else if (rating === "Hard") {
        nextInterval = Math.max(1, Math.round(existing.interval * 1.2));
        nextReps += 1;
        nextEase = Math.max(1.3, existing.easeFactor - 0.15);
      } else if (rating === "Good") {
        nextInterval =
          existing.repetitions === 0
            ? 1
            : existing.repetitions === 1
            ? 3
            : Math.round(existing.interval * existing.easeFactor);
        nextReps += 1;
      } else if (rating === "Easy") {
        nextInterval =
          existing.repetitions === 0
            ? 4
            : Math.round(existing.interval * existing.easeFactor * 1.3);
        nextReps += 1;
        nextEase = existing.easeFactor + 0.15;
      }

      const due = new Date();
      due.setDate(due.getDate() + nextInterval);

      return {
        ...prev,
        dailyXP: prev.dailyXP + 2,
        totalXP: prev.totalXP + 2,
        srsProgress: {
          ...prev.srsProgress,
          [wordId]: {
            wordId,
            interval: nextInterval,
            easeFactor: nextEase,
            repetitions: nextReps,
            dueDate: due.toISOString().split("T")[0],
            lastRating: rating
          }
        }
      };
    });
  }, []);

  // Persistent Navigation & Deck Position Setters
  const setVocabActiveSection = useCallback(
    (vocabActiveSection: VocabSectionTab) => {
      setState((prev) => ({ ...prev, vocabActiveSection }));
    },
    []
  );

  const setVocabSelectedChapter = useCallback(
    (level: CEFRLevel, chapter: string) => {
      setState((prev) => ({
        ...prev,
        vocabSelectedChapterByLevel: {
          ...prev.vocabSelectedChapterByLevel,
          [level]: chapter
        }
      }));
    },
    []
  );

  const setVocabSelectedDay = useCallback((vocabSelectedDay: string) => {
    setState((prev) => ({ ...prev, vocabSelectedDay }));
  }, []);

  const setVocabSelectedTopic = useCallback((vocabSelectedTopic: string) => {
    setState((prev) => ({ ...prev, vocabSelectedTopic }));
  }, []);

  const setVocabDeckPosition = useCallback((deckKey: string, index: number) => {
    setState((prev) => {
      if (prev.vocabDeckPositions[deckKey] === index) return prev;
      return {
        ...prev,
        vocabDeckPositions: {
          ...prev.vocabDeckPositions,
          [deckKey]: index
        }
      };
    });
  }, []);

  const setVocabSwipeSession = useCallback(
    (vocabSwipeSession: SavedVocabSwipeSession | null) => {
      setState((prev) => ({ ...prev, vocabSwipeSession }));
    },
    []
  );

  const setLearnSession = useCallback(
    (learnSession: SavedLearnSession | null) => {
      setState((prev) => ({ ...prev, learnSession }));
    },
    []
  );

  const setGrammarShowAllLevels = useCallback(
    (grammarShowAllLevels: boolean) => {
      setState((prev) => ({ ...prev, grammarShowAllLevels }));
    },
    []
  );

  const setGrammarQuizSession = useCallback(
    (grammarQuizSession: SavedGrammarQuizSession | null) => {
      setState((prev) => ({ ...prev, grammarQuizSession }));
    },
    []
  );

  const setReadSelectedPassageId = useCallback(
    (readSelectedPassageId: string) => {
      setState((prev) => ({ ...prev, readSelectedPassageId }));
    },
    []
  );

  const setReadShowAllLevels = useCallback((readShowAllLevels: boolean) => {
    setState((prev) => ({ ...prev, readShowAllLevels }));
  }, []);

  const setReadShowFullTranslation = useCallback(
    (readShowFullTranslation: boolean) => {
      setState((prev) => ({ ...prev, readShowFullTranslation }));
    },
    []
  );

  const speakingAccuracyAvg = useMemo(() => {
    if (state.speakingScores.length === 0) return 0;
    const sum = state.speakingScores.reduce((acc, s) => acc + s, 0);
    return Math.round(sum / state.speakingScores.length);
  }, [state.speakingScores]);

  // O(1) lookup set for saved words (avoids linear scans inside list/story renders)
  const savedWordsLookupSet = useMemo(() => {
    const set = new Set<string>();
    for (const w of state.savedWords) {
      set.add(w.german.trim().toLowerCase());
      set.add(w.id.toLowerCase());
    }
    return set;
  }, [state.savedWords]);

  const isWordSavedFast = useCallback(
    (lemmaOrGerman: string): boolean => {
      const clean = lemmaOrGerman
        .replace(/[.,!?;:"„“”()[\]—-]/g, "")
        .trim()
        .toLowerCase();
      return savedWordsLookupSet.has(clean);
    },
    [savedWordsLookupSet]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      isHydrated,
      speakingAccuracyAvg,
      completeOnboarding,
      setUserName,
      updateUserProfile,
      setActiveLevel,
      setLanguageMode,
      setThemeMode,
      setTtsVoiceGender,
      setTtsAccentStyle,
      setTtsSpeed,
      setVibrationEnabled,
      setSoundEnabled,
      toggleTheme,
      setDailyGoal,
      addXP,
      recordSpeakingScore,
      markUnitCompleted,
      markGrammarQuizCompleted,
      toggleGrammarTopicCompleted,
      toggleReadPassageCompleted,
      toggleSavedWord,
      addSavedWord,
      deleteSavedWord,
      isWordSaved: isWordSavedFast,
      rateFlashcard,
      setVocabActiveSection,
      setVocabSelectedChapter,
      setVocabSelectedDay,
      setVocabSelectedTopic,
      setVocabDeckPosition,
      setVocabSwipeSession,
      setLearnSession,
      setGrammarShowAllLevels,
      setGrammarQuizSession,
      setReadSelectedPassageId,
      setReadShowAllLevels,
      setReadShowFullTranslation
    }),
    [
      state,
      isHydrated,
      speakingAccuracyAvg,
      completeOnboarding,
      setUserName,
      updateUserProfile,
      setActiveLevel,
      setLanguageMode,
      setThemeMode,
      setTtsVoiceGender,
      setTtsAccentStyle,
      setTtsSpeed,
      setVibrationEnabled,
      setSoundEnabled,
      toggleTheme,
      setDailyGoal,
      addXP,
      recordSpeakingScore,
      markUnitCompleted,
      markGrammarQuizCompleted,
      toggleGrammarTopicCompleted,
      toggleReadPassageCompleted,
      toggleSavedWord,
      addSavedWord,
      deleteSavedWord,
      isWordSavedFast,
      rateFlashcard,
      setVocabActiveSection,
      setVocabSelectedChapter,
      setVocabSelectedDay,
      setVocabSelectedTopic,
      setVocabDeckPosition,
      setVocabSwipeSession,
      setLearnSession,
      setGrammarShowAllLevels,
      setGrammarQuizSession,
      setReadSelectedPassageId,
      setReadShowAllLevels,
      setReadShowFullTranslation
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
};
