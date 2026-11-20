import { BlastPressable } from "../../src/components/motion/BlastPressable";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import {
  Award,
  BookMarked,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Gamepad2,
  Info,
  MoveHorizontal,
  Play,
  Plus,
  RotateCcw,
  RotateCw,
  Search,
  Star,
  Trash2,
  X
} from "lucide-react-native";
import { GlobalHeader } from "../../src/components/common/GlobalHeader";
import { GenderNounBadge } from "../../src/components/common/GenderNounBadge";
import { AnimatedStarButton } from "../../src/components/common/AnimatedStarButton";
import { MaterialGlassCard } from "../../src/components/common/MaterialGlassCard";
import { WordWatermark } from "../../src/components/vocabulary/WordWatermark";
import { TappableGermanText } from "../../src/components/common/TappableGermanText";
import {
  ScrollToTopButton,
  useScrollToTop
} from "../../src/components/common/ScrollToTopButton";
import { SectionProgressBar } from "../../src/components/common/SectionProgressBar";
import {
  AnimatedProgressBar,
  MotionCollapse,
  MotionEntrance
} from "../../src/components/motion/MotionViews";
import { useWordInspector } from "../../src/context/WordInspectorContext";
import { SpeakButton, VoicePracticeButton } from "../../src/components/audio";
import {
  A1_CSV_WORDS,
  A2_CSV_WORDS,
  B1_CSV_WORDS,
  B2_CSV_WORDS,
  DAILY_CSV_WORDS,
  getSectionWordsByLevel,
  VOCABULARY_ITEMS
} from "../../src/data/vocabulary";
import {
  CEFR_LEVELS,
  CEFR_META,
  GENDER_COLORS
} from "../../src/constants/theme";
import { useApp, VocabSectionTab } from "../../src/context/AppContext";
import {
  CEFRLevel,
  GermanArticle,
  SRSRating,
  VocabularyItem
} from "../../src/types";
import {
  playFeedbackSound,
  playStarSound,
  playSwipeSound
} from "../../src/utils/soundEffects";
import { useAppLanguage } from "../../src/utils/i18n";

const WORD_BY_ID_MAP: Map<string, VocabularyItem> = new Map(
  VOCABULARY_ITEMS.map((w) => [w.id, w])
);

export default function VocabularyScreen() {
  const params = useLocalSearchParams<{
    deck?: string;
    level?: string;
    chapter?: string;
  }>();
  const {
    isHydrated,
    activeLevel,
    setActiveLevel,
    languageMode,
    themeMode,
    savedWords,
    toggleSavedWord,
    addSavedWord,
    deleteSavedWord,
    isWordSaved,
    srsProgress,
    rateFlashcard,
    addXP,
    vocabActiveSection,
    setVocabActiveSection,
    vocabSelectedChapterByLevel,
    setVocabSelectedChapter,
    vocabSelectedDay,
    setVocabSelectedDay,
    vocabSelectedTopic,
    setVocabSelectedTopic,
    vocabDeckPositions,
    setVocabDeckPosition,
    vocabSwipeSession,
    setVocabSwipeSession
  } = useApp();

  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";
  const { showEn, showNative, nativeMeta, tx, txEn } = useAppLanguage();
  const nativeFlag = nativeMeta.flag === "🌐" ? "🇧🇩" : nativeMeta.flag;
  const { inspectWord } = useWordInspector();
  const { scrollRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop();

  const activeSection: VocabSectionTab = vocabActiveSection || activeLevel;
  const isLevelSection =
    activeSection === "A1" ||
    activeSection === "A2" ||
    activeSection === "B1" ||
    activeSection === "B2";

  const currentLevelForSection: CEFRLevel = isLevelSection
    ? (activeSection as CEFRLevel)
    : activeLevel;

  const selectedChapter =
    vocabSelectedChapterByLevel?.[currentLevelForSection] || "ALL";
  const selectedDay = vocabSelectedDay || "Day 1";
  const selectedTopic = vocabSelectedTopic || "Greetings";

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFlipped, setIsFlipped] = useState(false);

  // Add Custom Starred Word Modal State
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newGerman, setNewGerman] = useState("");
  const [newArticle, setNewArticle] = useState<GermanArticle | undefined>(
    undefined
  );
  const [newBangla, setNewBangla] = useState("");
  const [newPhonetic, setNewPhonetic] = useState("");
  const [newEnglish, setNewEnglish] = useState("");
  const [newLevel, setNewLevel] = useState<CEFRLevel>("A1");
  const [newExampleDe, setNewExampleDe] = useState("");

  // Section Swiping Play Game Modal State (Persisted in AppContext!)
  const [swipePlayVisible, setSwipePlayVisible] = useState(false);
  const [playTitle, setPlayTitle] = useState<string>("");
  const [playSourcePool, setPlaySourcePool] = useState<VocabularyItem[]>([]);
  const [playRoundLimit, setPlayRoundLimit] = useState<number>(20);
  const [playQueue, setPlayQueue] = useState<VocabularyItem[]>([]);
  const [playIdx, setPlayIdx] = useState(0);
  const [playFlipped, setPlayFlipped] = useState(false);
  const [playMasteredCount, setPlayMasteredCount] = useState(0);
  const [playFinished, setPlayFinished] = useState(false);
  const restoredSwipeRef = useRef(false);

  const flipProgress = useSharedValue(0);
  const translateX = useSharedValue(0);
  const swipeSoundPlayedRef = useRef(false);

  // Swiping Play Game Shared Values
  const playTranslateX = useSharedValue(0);
  const playSoundRef = useRef(false);

  // Compute unique deckKey for the currently active section & sub-filter
  const activeDeckKey = useMemo(() => {
    if (activeSection === "ALL") return "ALL::ALL";
    if (activeSection === "saved") return "saved::ALL";
    if (activeSection === "day") return `day::${selectedDay}`;
    if (activeSection === "topic") return `topic::${selectedTopic}`;
    return `${currentLevelForSection}::${selectedChapter}`;
  }, [
    activeSection,
    selectedDay,
    selectedTopic,
    currentLevelForSection,
    selectedChapter
  ]);

  const persistedCardIndex = vocabDeckPositions[activeDeckKey] ?? 0;

  // Sync navigation params if explicitly navigated from another tab
  useEffect(() => {
    if (params.deck === "saved") {
      setVocabActiveSection("saved");
      setIsFlipped(false);
      flipProgress.value = 0;
      translateX.value = 0;
    } else if (params.level) {
      const validLevels: CEFRLevel[] = ["A1", "A2", "B1", "B2"];
      if (validLevels.includes(params.level as CEFRLevel)) {
        const lvl = params.level as CEFRLevel;
        setActiveLevel(lvl);
        setVocabActiveSection(lvl);
        if (params.chapter) {
          setVocabSelectedChapter(lvl, params.chapter);
        }
      }
      setIsFlipped(false);
      flipProgress.value = 0;
      translateX.value = 0;
    }
  }, [
    params.deck,
    params.level,
    params.chapter,
    setActiveLevel,
    setVocabActiveSection,
    setVocabSelectedChapter,
    flipProgress,
    translateX
  ]);

  // Auto-restore in-progress Swipe Play session after hydration if it was open
  useEffect(() => {
    if (!isHydrated || restoredSwipeRef.current) return;
    restoredSwipeRef.current = true;
    if (vocabSwipeSession && vocabSwipeSession.queueIds.length > 0) {
      const savedPool = new Map(savedWords.map((w) => [w.id, w]));
      const resolvedQueue = vocabSwipeSession.queueIds
        .map((id) => WORD_BY_ID_MAP.get(id) || savedPool.get(id))
        .filter((w): w is VocabularyItem => !!w);

      if (resolvedQueue.length > 0) {
        setPlayTitle(vocabSwipeSession.playTitle);
        setPlayRoundLimit(vocabSwipeSession.playRoundLimit);
        setPlayQueue(resolvedQueue);
        setPlaySourcePool(resolvedQueue);
        setPlayIdx(
          Math.min(vocabSwipeSession.playIdx, resolvedQueue.length - 1)
        );
        setPlayMasteredCount(vocabSwipeSession.playMasteredCount);
        setPlayFinished(false);
        if (vocabSwipeSession.isOpen) {
          setSwipePlayVisible(true);
        }
      }
    }
  }, [isHydrated, vocabSwipeSession, savedWords]);

  // Persist Swipe Play session whenever it changes
  useEffect(() => {
    if (!isHydrated || !restoredSwipeRef.current) return;
    if (playQueue.length > 0 && !playFinished) {
      setVocabSwipeSession({
        isOpen: swipePlayVisible,
        playTitle,
        playRoundLimit,
        playIdx,
        playMasteredCount,
        queueIds: playQueue.map((w) => w.id),
        sourceKey: activeDeckKey
      });
    } else if (playFinished) {
      setVocabSwipeSession(null);
    }
  }, [
    isHydrated,
    swipePlayVisible,
    playTitle,
    playRoundLimit,
    playIdx,
    playMasteredCount,
    playQueue,
    playFinished,
    activeDeckKey,
    setVocabSwipeSession
  ]);

  const levelSectionWords = useMemo(
    () => getSectionWordsByLevel(currentLevelForSection),
    [currentLevelForSection]
  );

  const chaptersForActiveLevel = useMemo(() => {
    const map = new Map<string, number>();
    levelSectionWords.forEach((w) => {
      const ch = w.chapter || w.topic;
      map.set(ch, (map.get(ch) || 0) + 1);
    });
    return Array.from(map.entries()).map(([chapterName, count]) => ({
      chapterName,
      count
    }));
  }, [levelSectionWords]);

  const allDaysWithCounts = useMemo(() => {
    const map = new Map<string, number>();
    DAILY_CSV_WORDS.forEach((v) => {
      if (v.day) {
        map.set(v.day, (map.get(v.day) || 0) + 1);
      }
    });
    return Array.from(map.entries()).map(([dayName, count]) => ({
      dayName,
      count
    }));
  }, []);

  const allTopicsWithCounts = useMemo(() => {
    const map = new Map<string, number>();
    DAILY_CSV_WORDS.forEach((v) => {
      map.set(v.topic, (map.get(v.topic) || 0) + 1);
    });
    return Array.from(map.entries()).map(([topicName, count]) => ({
      topicName,
      count
    }));
  }, []);

  const activeDeckWords: VocabularyItem[] = useMemo(() => {
    let base: VocabularyItem[] = [];
    if (activeSection === "ALL") {
      base = VOCABULARY_ITEMS;
    } else if (activeSection === "saved") {
      base = savedWords;
    } else if (isLevelSection) {
      base =
        selectedChapter === "ALL"
          ? levelSectionWords
          : levelSectionWords.filter(
              (w) => (w.chapter || w.topic) === selectedChapter
            );
    } else if (activeSection === "day") {
      base = DAILY_CSV_WORDS.filter((w) => w.day === selectedDay);
    } else {
      base = DAILY_CSV_WORDS.filter((w) => w.topic === selectedTopic);
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return base;

    return base.filter(
      (w) =>
        w.german.toLowerCase().includes(q) ||
        (w.fullGerman && w.fullGerman.toLowerCase().includes(q)) ||
        w.bangla.toLowerCase().includes(q) ||
        w.english.toLowerCase().includes(q) ||
        (w.phoneticHint && w.phoneticHint.toLowerCase().includes(q)) ||
        w.topic.toLowerCase().includes(q) ||
        (w.chapter && w.chapter.toLowerCase().includes(q)) ||
        (w.day && w.day.toLowerCase().includes(q))
    );
  }, [
    activeSection,
    isLevelSection,
    savedWords,
    levelSectionWords,
    selectedChapter,
    selectedDay,
    selectedTopic,
    searchQuery
  ]);

  const activeSectionLabel = useMemo(() => {
    if (activeSection === "ALL") return "All Vocabulary";
    if (activeSection === "saved") return "★ Starred Words";
    if (activeSection === "day") return `Daily Deck • ${selectedDay}`;
    if (activeSection === "topic") return `Topic • ${selectedTopic}`;
    if (selectedChapter === "ALL") return `${activeSection} Vocabulary`;
    return `${activeSection} • ${selectedChapter}`;
  }, [activeSection, selectedChapter, selectedDay, selectedTopic]);

  const safeIndex =
    activeDeckWords.length > 0
      ? persistedCardIndex % activeDeckWords.length
      : 0;
  const currentCard: VocabularyItem | undefined = activeDeckWords[safeIndex];

  // Memoize SRS completion count instead of filtering 6,471 words on every render
  const srsCompletedCount = useMemo(() => {
    const pool = isLevelSection
      ? getSectionWordsByLevel(activeSection as CEFRLevel)
      : VOCABULARY_ITEMS;
    let count = 0;
    for (let i = 0; i < pool.length; i++) {
      if (srsProgress[pool[i].id]) count++;
    }
    return count;
  }, [isLevelSection, activeSection, srsProgress]);

  const srsTotalCount = isLevelSection
    ? getSectionWordsByLevel(activeSection as CEFRLevel).length
    : VOCABULARY_ITEMS.length;

  // O(1) index map for activeDeckWords (used in Swipe Play)
  const activeDeckIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    for (let i = 0; i < activeDeckWords.length; i++) {
      map.set(activeDeckWords[i].id, i);
    }
    return map;
  }, [activeDeckWords]);

  const setCurrentDeckCardIndex = useCallback(
    (nextIndex: number) => {
      setVocabDeckPosition(activeDeckKey, nextIndex);
    },
    [activeDeckKey, setVocabDeckPosition]
  );

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    flipProgress.value = withTiming(next ? 1 : 0, { duration: 320 });
  };

  const resetFlip = useCallback(() => {
    setIsFlipped(false);
    flipProgress.value = withTiming(0, { duration: 150 });
  }, [flipProgress]);

  const advanceNextCard = useCallback(() => {
    if (activeDeckWords.length === 0) return;
    resetFlip();
    const nextIdx = (safeIndex + 1) % activeDeckWords.length;
    setCurrentDeckCardIndex(nextIdx);
  }, [activeDeckWords.length, resetFlip, safeIndex, setCurrentDeckCardIndex]);

  const advancePrevCard = useCallback(() => {
    if (activeDeckWords.length === 0) return;
    resetFlip();
    const prevIdx =
      (safeIndex - 1 + activeDeckWords.length) % activeDeckWords.length;
    setCurrentDeckCardIndex(prevIdx);
  }, [activeDeckWords.length, resetFlip, safeIndex, setCurrentDeckCardIndex]);

  const triggerAnimatedSwipe = useCallback(
    (direction: "left" | "right") => {
      if (activeDeckWords.length === 0) return;
      playSwipeSound(direction);
      const exitX = direction === "right" ? 360 : -360;
      const enterX = direction === "right" ? -260 : 260;

      translateX.value = withTiming(exitX, { duration: 180 }, (finished) => {
        if (finished) {
          if (direction === "left") {
            runOnJS(advanceNextCard)();
          } else {
            runOnJS(advancePrevCard)();
          }
          translateX.value = enterX;
          translateX.value = withSpring(0, {
            damping: 16,
            stiffness: 180
          });
        }
      });
    },
    [activeDeckWords.length, advanceNextCard, advancePrevCard, translateX]
  );

  // PanResponder for Main Deck Card Sliding (Left-to-Right & Right-to-Left)
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return (
            Math.abs(gestureState.dx) > 12 &&
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.3
          );
        },
        onPanResponderGrant: () => {
          swipeSoundPlayedRef.current = false;
        },
        onPanResponderMove: (_, gestureState) => {
          translateX.value = gestureState.dx;
          if (
            !swipeSoundPlayedRef.current &&
            Math.abs(gestureState.dx) > 38
          ) {
            swipeSoundPlayedRef.current = true;
            playSwipeSound(gestureState.dx > 0 ? "right" : "left");
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          const SWIPE_THRESHOLD = 75;
          if (gestureState.dx < -SWIPE_THRESHOLD) {
            if (!swipeSoundPlayedRef.current) {
              playSwipeSound("left");
            }
            translateX.value = withTiming(-360, { duration: 160 }, () => {
              runOnJS(advanceNextCard)();
              translateX.value = 260;
              translateX.value = withSpring(0, {
                damping: 16,
                stiffness: 180
              });
            });
          } else if (gestureState.dx > SWIPE_THRESHOLD) {
            if (!swipeSoundPlayedRef.current) {
              playSwipeSound("right");
            }
            translateX.value = withTiming(360, { duration: 160 }, () => {
              runOnJS(advancePrevCard)();
              translateX.value = -260;
              translateX.value = withSpring(0, {
                damping: 16,
                stiffness: 180
              });
            });
          } else {
            translateX.value = withSpring(0, {
              damping: 15,
              stiffness: 200
            });
          }
        },
        onPanResponderTerminate: () => {
          translateX.value = withSpring(0);
        }
      }),
    [advanceNextCard, advancePrevCard, translateX]
  );

  // ================= SWIPING PLAY GAME LOGIC FOR EVERY SECTION =================
  const launchSectionSwipePlay = useCallback(
    (
      wordsToPlay: VocabularyItem[],
      title: string,
      limit = 20,
      startFromCurrentCard = true
    ) => {
      if (wordsToPlay.length === 0) return;
      // Start from the user's current card position so it continues where they left off!
      const rotated = startFromCurrentCard
        ? [
            ...wordsToPlay.slice(safeIndex),
            ...wordsToPlay.slice(0, safeIndex)
          ]
        : [...wordsToPlay];

      setPlaySourcePool(rotated);
      setPlayTitle(title);
      setPlayRoundLimit(limit);
      const sliced = limit > 0 ? rotated.slice(0, limit) : [...rotated];
      setPlayQueue(sliced);
      setPlayIdx(0);
      setPlayFlipped(false);
      setPlayMasteredCount(0);
      setPlayFinished(false);
      playTranslateX.value = 0;
      setSwipePlayVisible(true);
      playStarSound(true);
    },
    [playTranslateX, safeIndex]
  );

  const changePlayRoundSize = (limit: number) => {
    setPlayRoundLimit(limit);
    const sliced =
      limit > 0 ? playSourcePool.slice(0, limit) : [...playSourcePool];
    setPlayQueue(sliced);
    setPlayIdx(0);
    setPlayFlipped(false);
    setPlayMasteredCount(0);
    setPlayFinished(false);
    playTranslateX.value = 0;
  };

  const currentPlayCard = playQueue[playIdx];

  const handlePlayDecision = useCallback(
    (known: boolean) => {
      if (!currentPlayCard) return;
      playFeedbackSound(known);

      if (known) {
        setPlayMasteredCount((prev) => prev + 1);
        // Also advance the main deck position when a card is mastered in Swipe Play!
        const idxInDeck = activeDeckIndexMap.get(currentPlayCard.id);
        if (idxInDeck !== undefined && activeDeckWords.length > 0) {
          setCurrentDeckCardIndex((idxInDeck + 1) % activeDeckWords.length);
        }
      } else {
        // Repeat wrong card again and again until user gets it right!
        setPlayQueue((prev) => [...prev, currentPlayCard]);
      }

      setPlayFlipped(false);
      setPlayIdx((prev) => {
        const nextIdx = prev + 1;
        const nextTotal = known ? playQueue.length : playQueue.length + 1;
        if (nextIdx >= nextTotal) {
          addXP(15);
          setPlayFinished(true);
          return prev;
        }
        return nextIdx;
      });
    },
    [
      currentPlayCard,
      playQueue.length,
      addXP,
      activeDeckIndexMap,
      activeDeckWords.length,
      setCurrentDeckCardIndex
    ]
  );

  const triggerPlaySwipe = useCallback(
    (known: boolean) => {
      const dir = known ? "right" : "left";
      playSwipeSound(dir);
      const exitX = known ? 380 : -380;
      playTranslateX.value = withTiming(exitX, { duration: 170 }, () => {
        runOnJS(handlePlayDecision)(known);
        playTranslateX.value = 0;
      });
    },
    [handlePlayDecision, playTranslateX]
  );

  const playPanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dx) > 12 && Math.abs(g.dx) > Math.abs(g.dy) * 1.2,
        onPanResponderGrant: () => {
          playSoundRef.current = false;
        },
        onPanResponderMove: (_, g) => {
          playTranslateX.value = g.dx;
          if (!playSoundRef.current && Math.abs(g.dx) > 36) {
            playSoundRef.current = true;
            playSwipeSound(g.dx > 0 ? "right" : "left");
          }
        },
        onPanResponderRelease: (_, g) => {
          if (g.dx > 80) {
            playTranslateX.value = withTiming(380, { duration: 150 }, () => {
              runOnJS(handlePlayDecision)(true);
              playTranslateX.value = 0;
            });
          } else if (g.dx < -80) {
            playTranslateX.value = withTiming(-380, { duration: 150 }, () => {
              runOnJS(handlePlayDecision)(false);
              playTranslateX.value = 0;
            });
          } else {
            playTranslateX.value = withSpring(0, {
              damping: 15,
              stiffness: 200
            });
          }
        },
        onPanResponderTerminate: () => {
          playTranslateX.value = withSpring(0);
        }
      }),
    [handlePlayDecision, playTranslateX]
  );

  const playCardAnimatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      playTranslateX.value,
      [-260, 0, 260],
      [-10, 0, 10]
    );
    return {
      transform: [
        { translateX: playTranslateX.value },
        { rotateZ: `${rotateZ}deg` }
      ]
    };
  });

  const playKnowBadgeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      playTranslateX.value,
      [0, 40, 120],
      [0, 0.4, 1],
      "clamp"
    )
  }));

  const playRetryBadgeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      playTranslateX.value,
      [-120, -40, 0],
      [1, 0.4, 0],
      "clamp"
    )
  }));

  // ================= ADD CUSTOM STARRED WORD HANDLER =================
  const handleCreateCustomStarredWord = () => {
    const cleanDe = newGerman.trim();
    const cleanBn = newBangla.trim();
    if (!cleanDe || !cleanBn) return;

    const fullDe = newArticle ? `${newArticle} ${cleanDe}` : cleanDe;
    const customWord: VocabularyItem = {
      id: `custom-star-${Date.now()}`,
      day: "Custom ★",
      level: newLevel,
      topic: "Custom Starred Word",
      article: newArticle,
      german: cleanDe,
      fullGerman: fullDe,
      english: newEnglish.trim() || cleanBn,
      bangla: cleanBn,
      phoneticHint: newPhonetic.trim() || undefined,
      exampleDe:
        newExampleDe.trim() ||
        `${fullDe} ist ein wichtiges Wort in meinem Wortschatz.`,
      exampleEn: `Custom starred word: ${fullDe} (${
        newEnglish.trim() || cleanBn
      }).`,
      exampleBn: `তারকাচিহ্নিত শব্দ: ${fullDe} (${cleanBn})।`
    };

    playStarSound(true);
    addSavedWord(customWord);
    setNewGerman("");
    setNewArticle(undefined);
    setNewBangla("");
    setNewPhonetic("");
    setNewEnglish("");
    setNewExampleDe("");
    setAddModalVisible(false);
    setVocabActiveSection("saved");
    setVocabDeckPosition("saved::ALL", 0);
  };

  const handleDeleteStarredWord = (word: VocabularyItem) => {
    playStarSound(false);
    deleteSavedWord(word.id);
    deleteSavedWord(word.german);
  };

  const handleRateSRS = (rating: SRSRating) => {
    if (!currentCard) return;
    if (rating === "Good" || rating === "Easy") {
      playFeedbackSound(true);
    } else if (rating === "Again") {
      playFeedbackSound(false);
    }
    rateFlashcard(currentCard.id, rating);
    triggerAnimatedSwipe("left");
  };

  const swipeContainerStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      translateX.value,
      [-260, 0, 260],
      [-8, 0, 8]
    );
    const cardOpacity = interpolate(
      Math.abs(translateX.value),
      [0, 260, 360],
      [1, 0.75, 0]
    );
    return {
      transform: [
        { translateX: translateX.value },
        { rotateZ: `${rotateZ}deg` }
      ],
      opacity: cardOpacity
    };
  });

  const leftSwipeBadgeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-120, -35, 0],
      [1, 0.3, 0],
      "clamp"
    );
    return { opacity };
  });

  const rightSwipeBadgeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, 35, 120],
      [0, 0.3, 1],
      "clamp"
    );
    return { opacity };
  });

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [0, 180]);
    const scale = interpolate(flipProgress.value, [0, 0.5, 1], [1, 0.95, 1]);
    const opacity = interpolate(
      flipProgress.value,
      [0, 0.5, 0.51, 1],
      [1, 1, 0, 0]
    );
    return {
      transform: [
        { perspective: 1200 },
        { rotateY: `${rotateY}deg` },
        { scale }
      ],
      opacity
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [180, 360]);
    const scale = interpolate(flipProgress.value, [0, 0.5, 1], [1, 0.95, 1]);
    const opacity = interpolate(
      flipProgress.value,
      [0, 0.49, 0.5, 1],
      [0, 0, 1, 1]
    );
    return {
      transform: [
        { perspective: 1200 },
        { rotateY: `${rotateY}deg` },
        { scale }
      ],
      opacity
    };
  });

  const srsButtons: Array<{
    rating: SRSRating;
    intervalHint: string;
    color: string;
    bgLight: string;
  }> = [
    {
      rating: "Again",
      intervalHint: "<10m",
      color: "#DC2626",
      bgLight: "#FEF2F2"
    },
    {
      rating: "Hard",
      intervalHint: "1d",
      color: "#D97706",
      bgLight: "#FFFBEB"
    },
    {
      rating: "Good",
      intervalHint: "3d",
      color: "#2563EB",
      bgLight: "#EFF6FF"
    },
    {
      rating: "Easy",
      intervalHint: "7d",
      color: "#16A34A",
      bgLight: "#F0FDF4"
    }
  ];

  const cardGenderColor = currentCard?.article
    ? GENDER_COLORS[currentCard.article].hex
    : (isPink ? "#DB2777" : "#0B6B4F");

  const getGlassCardStyle = (accentHex: string, minHeight: number) =>
    ({
      backgroundColor: isBlack
        ? "rgba(18, 18, 22, 0.82)"
        : isPink && !isDark
        ? "rgba(255, 240, 247, 0.78)"
        : isDark
        ? "rgba(10, 50, 38, 0.76)"
        : "rgba(255, 255, 255, 0.78)",
      borderRadius: 26,
      padding: 22,
      minHeight,
      overflow: "hidden",
      borderWidth: 1.5,
      borderColor: accentHex,
      justifyContent: "space-between",
      shadowColor: isDark ? "#000000" : "#041E16",
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: isDark ? 0.58 : 0.24,
      shadowRadius: 30,
      elevation: 20,
      boxShadow: isDark
        ? "0px 22px 44px -8px rgba(0, 0, 0, 0.72), 0px 8px 18px -4px rgba(0, 0, 0, 0.45)"
        : "0px 22px 44px -10px rgba(4, 30, 22, 0.28), 0px 8px 18px -4px rgba(4, 30, 22, 0.14)",
      backdropFilter: "blur(28px) saturate(190%)",
      WebkitBackdropFilter: "blur(28px) saturate(190%)"
    } as any);

  const renderGlassCardLayers = (accentHex: string) => (
    <>
      {/* 3D Inner Bevel Rim (bright top-left light catch, subtle bottom shadow edge) */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 1,
          left: 1,
          right: 1,
          bottom: 1,
          borderRadius: 24.5,
          borderTopWidth: 1.5,
          borderLeftWidth: 1.2,
          borderRightWidth: 0.8,
          borderBottomWidth: 1.5,
          borderTopColor: isDark
            ? "rgba(255, 255, 255, 0.34)"
            : "rgba(255, 255, 255, 0.92)",
          borderLeftColor: isDark
            ? "rgba(255, 255, 255, 0.22)"
            : "rgba(255, 255, 255, 0.78)",
          borderRightColor: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(255, 255, 255, 0.45)",
          borderBottomColor: isDark
            ? "rgba(0, 0, 0, 0.45)"
            : "rgba(6, 46, 34, 0.12)"
        }}
      />
      {/* Top Specular Liquid Glass Reflection Rim */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 28,
          right: 28,
          height: 2,
          borderRadius: 999,
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.44)"
            : "rgba(255, 255, 255, 0.96)"
        }}
      />
      {/* Upper Glass Refraction Sheen */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "44%",
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(255, 255, 255, 0.34)"
        }}
      />
      {/* Subtle Ambient Gender/Theme Accent Glow */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -36,
          right: -36,
          width: 130,
          height: 130,
          borderRadius: 65,
          backgroundColor: accentHex,
          opacity: isDark ? 0.14 : 0.1
        }}
      />
    </>
  );

  const spokenCardText = currentCard
    ? currentCard.fullGerman ||
      (currentCard.article
        ? `${currentCard.article} ${currentCard.german}`
        : currentCard.german)
    : "";

  const levelSections: Array<{ level: CEFRLevel; count: number }> = [
    { level: "A1", count: A1_CSV_WORDS.length },
    { level: "A2", count: A2_CSV_WORDS.length },
    { level: "B1", count: B1_CSV_WORDS.length },
    { level: "B2", count: B2_CSV_WORDS.length }
  ];

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: isDark ? (isBlack ? "#000000" : "#041E16") : (isPink ? "#FFF0F5" : "#EDF7F3")
      }}
    >
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 105 }}
      >
        <SectionProgressBar
          label={
            isLevelSection
              ? `${activeSection} Vocabulary Progress`
              : "Overall Vocabulary Progress"
          }
          completed={srsCompletedCount}
          total={srsTotalCount}
        />

        {/* Search Input Bar */}
        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
              borderRadius: 14,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderWidth: 1.5,
              borderColor:
                activeSection === "saved"
                  ? "#D97706"
                  : isDark
                  ? (isBlack ? "#262626" : "#134E3A")
                  : (isPink ? "#FBCFE8" : "#C6E4D9"),
              gap: 8
            }}
          >
            <Search
              size={17}
              color={
                activeSection === "saved"
                  ? "#D97706"
                  : isDark
                  ? "#94A3B8"
                  : "#64748B"
              }
            />
            <TextInput
              value={searchQuery}
              onChangeText={(txt) => {
                setSearchQuery(txt);
                resetFlip();
              }}
              placeholder={
                activeSection === "saved"
                  ? `Search starred words (${savedWords.length} words)...`
                  : `Search in ${activeSectionLabel} (${activeDeckWords.length} words)...`
              }
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              style={{
                flex: 1,
                fontSize: 13,
                fontFamily: "NotoSansBengali_500Medium",
                color: isDark ? "#F0FDF9" : "#062E22",
                paddingVertical: 2
              }}
            />
            {searchQuery.length > 0 && (
              <BlastPressable
                onPress={() => {
                  setSearchQuery("");
                }}
              >
                <X size={16} color={isDark ? "#94A3B8" : "#64748B"} />
              </BlastPressable>
            )}
          </View>
        </View>

        {/* Dedicated A1, A2, B1, B2 Vocabulary Section Tabs + ★ Starred + Daily + Topics */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 10,
            paddingBottom: 6,
            gap: 8
          }}
        >
          {/* All Vocabulary Tab */}
          <BlastPressable
            onPress={() => {
              setVocabActiveSection("ALL");
              resetFlip();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: 14,
              paddingVertical: 9,
              borderRadius: 999,
              backgroundColor:
                activeSection === "ALL"
                  ? isPink
                    ? "#DB2777"
                    : "#0B6B4F"
                  : isDark
                  ? isBlack
                    ? "#0F0F0F"
                    : "#082E22"
                  : "#FFFFFF",
              borderWidth: 1.5,
              borderColor:
                activeSection === "ALL"
                  ? isPink
                    ? "#DB2777"
                    : "#0B6B4F"
                  : isDark
                  ? isBlack
                    ? "#262626"
                    : "#134E3A"
                  : isPink
                  ? "#FBCFE8"
                  : "#C6E4D9"
            }}
          >
            <BookMarked
              size={14}
              color={
                activeSection === "ALL"
                  ? "#FFFFFF"
                  : isPink
                  ? "#DB2777"
                  : "#0B6B4F"
              }
            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_700Bold",
                color:
                  activeSection === "ALL"
                    ? "#FFFFFF"
                    : isDark
                    ? isPink
                      ? "#FFF0F5"
                      : "#EDF7F3"
                    : isBlack
                    ? "#171717"
                    : "#052219"
              }}
            >
              All Vocabulary ({VOCABULARY_ITEMS.length} words)
            </Text>
          </BlastPressable>

          {/* Dedicated A1, A2, B1, B2 Vocabulary Section Buttons */}
          {levelSections.map(({ level, count }) => {
            const active = activeSection === level;
            const badgeCol = CEFR_META[level].badgeColor;
            return (
              <BlastPressable
                key={level}
                onPress={() => {
                  setActiveLevel(level);
                  setVocabActiveSection(level);
                  resetFlip();
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 14,
                  paddingVertical: 9,
                  borderRadius: 999,
                  backgroundColor: active
                    ? badgeCol
                    : isDark
                    ? (isBlack ? "#0F0F0F" : "#082E22")
                    : "#FFFFFF",
                  borderWidth: 1.5,
                  borderColor: active
                    ? badgeCol
                    : isDark
                    ? (isBlack ? "#262626" : "#134E3A")
                    : (isPink ? "#FBCFE8" : "#C6E4D9")
                }}
              >
                <BookMarked size={14} color={active ? "#FFFFFF" : badgeCol} />
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_700Bold",
                    color: active
                      ? "#FFFFFF"
                      : isDark
                      ? (isPink ? "#FFF0F5" : "#EDF7F3")
                      : (isBlack ? "#171717" : "#052219")
                  }}
                >
                  {level} Vocabulary ({count} words)
                </Text>
              </BlastPressable>
            );
          })}

          {/* ★ Starred Words Section */}
          <BlastPressable
            onPress={() => {
              playStarSound(true);
              setVocabActiveSection("saved");
              resetFlip();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: 14,
              paddingVertical: 9,
              borderRadius: 999,
              backgroundColor:
                activeSection === "saved"
                  ? "#D97706"
                  : isDark
                  ? "rgba(217, 119, 6, 0.16)"
                  : "#FEF3C7",
              borderWidth: 1.5,
              borderColor: "#D97706"
            }}
          >
            <Star
              size={14}
              color={activeSection === "saved" ? "#FFFFFF" : "#D97706"}
              fill={activeSection === "saved" ? "#FFFFFF" : "#D97706"}
            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_700Bold",
                color: activeSection === "saved" ? "#FFFFFF" : "#B45309"
              }}
            >
              ★ Starred Words ({savedWords.length} words)
            </Text>
          </BlastPressable>

          {/* Daily Deck Section */}
          <BlastPressable
            onPress={() => {
              setVocabActiveSection("day");
              resetFlip();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: 14,
              paddingVertical: 9,
              borderRadius: 999,
              backgroundColor:
                activeSection === "day"
                  ? (isPink ? "#DB2777" : "#0B6B4F")
                  : isDark
                  ? (isBlack ? "#0F0F0F" : "#082E22")
                  : "#FFFFFF",
              borderWidth: 1,
              borderColor:
                activeSection === "day"
                  ? (isPink ? "#DB2777" : "#0B6B4F")
                  : isDark
                  ? (isBlack ? "#262626" : "#134E3A")
                  : (isPink ? "#FBCFE8" : "#C6E4D9")
            }}
          >
            <Calendar
              size={14}
              color={
                activeSection === "day"
                  ? "#FFFFFF"
                  : isDark
                  ? "#94A3B8"
                  : "#475569"
              }
            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_700Bold",
                color:
                  activeSection === "day"
                    ? "#FFFFFF"
                    : isDark
                    ? (isPink ? "#FFF0F5" : "#EDF7F3")
                    : (isBlack ? "#171717" : "#052219")
              }}
            >
              Daily Deck ({DAILY_CSV_WORDS.length} words)
            </Text>
          </BlastPressable>

          {/* Topics Section */}
          <BlastPressable
            onPress={() => {
              setVocabActiveSection("topic");
              resetFlip();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: 14,
              paddingVertical: 9,
              borderRadius: 999,
              backgroundColor:
                activeSection === "topic"
                  ? (isPink ? "#DB2777" : "#0B6B4F")
                  : isDark
                  ? (isBlack ? "#0F0F0F" : "#082E22")
                  : "#FFFFFF",
              borderWidth: 1,
              borderColor:
                activeSection === "topic"
                  ? (isPink ? "#DB2777" : "#0B6B4F")
                  : isDark
                  ? (isBlack ? "#262626" : "#134E3A")
                  : (isPink ? "#FBCFE8" : "#C6E4D9")
            }}
          >
            <FolderOpen
              size={14}
              color={
                activeSection === "topic"
                  ? "#FFFFFF"
                  : isDark
                  ? "#94A3B8"
                  : "#475569"
              }
            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_700Bold",
                color:
                  activeSection === "topic"
                    ? "#FFFFFF"
                    : isDark
                    ? (isPink ? "#FFF0F5" : "#EDF7F3")
                    : (isBlack ? "#171717" : "#052219")
              }}
            >
              Topics ({DAILY_CSV_WORDS.length} words)
            </Text>
          </BlastPressable>
        </ScrollView>

        {/* Sub-Filter Bar: Kapitel Pills for A1, A2, B1, B2 */}
        {isLevelSection && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              gap: 7
            }}
          >
            <BlastPressable
              onPress={() => {
                setVocabSelectedChapter(currentLevelForSection, "ALL");
                resetFlip();
              }}
              style={{
                paddingHorizontal: 13,
                paddingVertical: 7,
                borderRadius: 999,
                backgroundColor:
                  selectedChapter === "ALL"
                    ? "#0D9488"
                    : isDark
                    ? (isBlack ? "#0F0F0F" : "#082E22")
                    : "#FFFFFF",
                borderWidth: 1,
                borderColor:
                  selectedChapter === "ALL"
                    ? "#0D9488"
                    : isDark
                    ? (isBlack ? "#262626" : "#134E3A")
                    : (isPink ? "#FBCFE8" : "#C6E4D9")
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_700Bold",
                  color:
                    selectedChapter === "ALL"
                      ? "#FFFFFF"
                      : isDark
                      ? "#A7D7C5"
                      : "#475569"
                }}
              >
                All {currentLevelForSection} ({levelSectionWords.length} words)
              </Text>
            </BlastPressable>

            {chaptersForActiveLevel.map((ch) => {
              const active = selectedChapter === ch.chapterName;
              const savedPos =
                vocabDeckPositions[
                  `${currentLevelForSection}::${ch.chapterName}`
                ];
              return (
                <BlastPressable
                  key={ch.chapterName}
                  onPress={() => {
                    setVocabSelectedChapter(
                      currentLevelForSection,
                      ch.chapterName
                    );
                    resetFlip();
                  }}
                  style={{
                    paddingHorizontal: 13,
                    paddingVertical: 7,
                    borderRadius: 999,
                    backgroundColor: active
                      ? "#0D9488"
                      : isDark
                      ? (isBlack ? "#0F0F0F" : "#082E22")
                      : "#FFFFFF",
                    borderWidth: 1,
                    borderColor: active
                      ? "#0D9488"
                      : isDark
                      ? (isBlack ? "#262626" : "#134E3A")
                      : (isPink ? "#FBCFE8" : "#C6E4D9")
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "NotoSansBengali_600SemiBold",
                      color: active
                        ? "#FFFFFF"
                        : isDark
                        ? "#A7D7C5"
                        : "#475569"
                    }}
                  >
                    {ch.chapterName} ({ch.count} words
                    {savedPos && savedPos > 0 ? ` • #${savedPos + 1}` : ""})
                  </Text>
                </BlastPressable>
              );
            })}
          </ScrollView>
        )}

        {activeSection === "day" && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              gap: 7
            }}
          >
            {allDaysWithCounts.map((d) => {
              const active = selectedDay === d.dayName;
              return (
                <BlastPressable
                  key={d.dayName}
                  onPress={() => {
                    setVocabSelectedDay(d.dayName);
                    resetFlip();
                  }}
                  style={{
                    paddingHorizontal: 13,
                    paddingVertical: 7,
                    borderRadius: 999,
                    backgroundColor: active
                      ? "#0D9488"
                      : isDark
                      ? (isBlack ? "#0F0F0F" : "#082E22")
                      : "#FFFFFF",
                    borderWidth: 1,
                    borderColor: active
                      ? "#0D9488"
                      : isDark
                      ? (isBlack ? "#262626" : "#134E3A")
                      : (isPink ? "#FBCFE8" : "#C6E4D9")
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_700Bold",
                      color: active
                        ? "#FFFFFF"
                        : isDark
                        ? "#A7D7C5"
                        : "#475569"
                    }}
                  >
                    {d.dayName} ({d.count} words)
                  </Text>
                </BlastPressable>
              );
            })}
          </ScrollView>
        )}

        {activeSection === "topic" && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              gap: 7
            }}
          >
            {allTopicsWithCounts.map((t) => {
              const active = selectedTopic === t.topicName;
              return (
                <BlastPressable
                  key={t.topicName}
                  onPress={() => {
                    setVocabSelectedTopic(t.topicName);
                    resetFlip();
                  }}
                  style={{
                    paddingHorizontal: 13,
                    paddingVertical: 7,
                    borderRadius: 999,
                    backgroundColor: active
                      ? "#0D9488"
                      : isDark
                      ? (isBlack ? "#0F0F0F" : "#082E22")
                      : "#FFFFFF",
                    borderWidth: 1,
                    borderColor: active
                      ? "#0D9488"
                      : isDark
                      ? (isBlack ? "#262626" : "#134E3A")
                      : (isPink ? "#FBCFE8" : "#C6E4D9")
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "NotoSansBengali_600SemiBold",
                      color: active
                        ? "#FFFFFF"
                        : isDark
                        ? "#A7D7C5"
                        : "#475569"
                    }}
                  >
                    {t.topicName} ({t.count} words)
                  </Text>
                </BlastPressable>
              );
            })}
          </ScrollView>
        )}

        {/* Resume In-Progress Swipe Play Session Banner (if user closed modal mid-round) */}
        {vocabSwipeSession &&
          !swipePlayVisible &&
          vocabSwipeSession.queueIds.length > 0 && (
            <View style={{ paddingHorizontal: 16, paddingTop: 6 }}>
              <BlastPressable
                onPress={() => setSwipePlayVisible(true)}
                style={{
                  backgroundColor: isDark
                    ? "rgba(13, 148, 136, 0.2)"
                    : "#F0FDFA",
                  borderWidth: 1.5,
                  borderColor: "#0D9488",
                  borderRadius: 14,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    flex: 1
                  }}
                >
                  <Play size={15} color="#0D9488" fill="#0D9488" />
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#5EEAD4" : "#0F766E",
                      flex: 1
                    }}
                  >
                    Resume Swipe Play: {vocabSwipeSession.playTitle} (Card{" "}
                    {vocabSwipeSession.playIdx + 1}/
                    {vocabSwipeSession.queueIds.length})
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_700Bold",
                      color: "#0D9488"
                    }}
                  >
                    Resume →
                  </Text>
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      setVocabSwipeSession(null);
                    }}
                    hitSlop={8}
                    accessibilityLabel="Exit saved swipe play"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isDark
                        ? "rgba(239, 68, 68, 0.2)"
                        : "#FEE2E2"
                    }}
                  >
                    <X size={13} color="#EF4444" />
                  </Pressable>
                </View>
              </BlastPressable>
            </View>
          )}

        {/* Action Bar: Play Active Section + Add Starred Word */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingTop: 6,
            gap: 8
          }}
        >
          <BlastPressable
            onPress={() =>
              launchSectionSwipePlay(
                activeDeckWords,
                activeSectionLabel,
                20,
                true
              )
            }
            style={{
              flex: 1.45,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
              paddingVertical: 11,
              paddingHorizontal: 12,
              borderRadius: 14
            }}
          >
            <Gamepad2 size={16} color="#FFFFFF" />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                fontFamily: "Inter_700Bold",
                color: "#FFFFFF"
              }}
            >
              Swipe Play: {activeSectionLabel} ({activeDeckWords.length} words)
            </Text>
          </BlastPressable>

          <BlastPressable
            onPress={() => setAddModalVisible(true)}
            style={{
              flex: 0.85,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
              borderWidth: 1.5,
              borderColor: "#D97706",
              paddingVertical: 11,
              paddingHorizontal: 10,
              borderRadius: 14
            }}
          >
            <Plus size={15} color="#D97706" />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#FDE68A" : "#B45309"
              }}
            >
              + Add Starred
            </Text>
          </BlastPressable>
        </View>

        {/* Empty State */}
        {activeDeckWords.length === 0 || !currentCard ? (
          <View
            style={{
              margin: 16,
              padding: 28,
              borderRadius: 22,
              backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
              alignItems: "center",
              borderWidth: 1,
              borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
            }}
          >
            <Star size={36} color="#D97706" />
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#F0FDF9" : "#062E22",
                marginTop: 12,
                marginBottom: 4
              }}
            >
              {activeSection === "saved"
                ? "No Starred Words Found"
                : "No Words Found"}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "NotoSansBengali_500Medium",
                color: isDark ? "#94A3B8" : "#64748B",
                textAlign: "center",
                marginBottom: 14
              }}
            >
              {activeSection === "saved"
                ? 'Tap "+ Add Starred" above, or star any word from the A1, A2, B1, or B2 vocabulary sections!'
                : "Try clearing your search query or selecting another Kapitel / Day."}
            </Text>

            {activeSection === "saved" && (
              <BlastPressable
                onPress={() => setAddModalVisible(true)}
                style={{
                  backgroundColor: "#D97706",
                  paddingHorizontal: 18,
                  paddingVertical: 10,
                  borderRadius: 999,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <Plus size={16} color="#FFFFFF" />
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_700Bold",
                    color: "#FFFFFF"
                  }}
                >
                  + Add Your First Starred Word
                </Text>
              </BlastPressable>
            )}
          </View>
        ) : (
          <MotionEntrance
            delay={40}
            direction="scale"
            triggerKey={activeDeckKey}
          >
          <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
            {/* Card Counter (Persisted Position!) & Reset + Star + Delete */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
                gap: 8
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "NotoSansBengali_600SemiBold",
                    color: isDark ? "#94A3B8" : "#64748B",
                    flexShrink: 1
                  }}
                  numberOfLines={1}
                >
                  Card {safeIndex + 1} of {activeDeckWords.length} •{" "}
                  {currentCard.level}
                </Text>

                {safeIndex > 0 && (
                  <BlastPressable
                    onPress={() => {
                      playSwipeSound("right");
                      setCurrentDeckCardIndex(0);
                      resetFlip();
                    }}
                    style={{
                      backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 999
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#D6EFE6" : "#475569"
                      }}
                    >
                      ↺ Card 1
                    </Text>
                  </BlastPressable>
                )}
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <AnimatedStarButton
                  isStarred={isWordSaved(currentCard.german)}
                  onToggle={() => toggleSavedWord(currentCard)}
                  label={
                    isWordSaved(currentCard.german) ? "★ Starred" : "Star Word"
                  }
                  size="sm"
                />

                {activeSection === "saved" && (
                  <BlastPressable
                    onPress={() => handleDeleteStarredWord(currentCard)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 999,
                      backgroundColor: isDark
                        ? "rgba(220, 38, 38, 0.2)"
                        : "#FEF2F2",
                      borderWidth: 1,
                      borderColor: "#DC2626",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4
                    }}
                  >
                    <Trash2 size={13} color="#DC2626" />
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter_700Bold",
                        color: "#DC2626"
                      }}
                    >
                      Delete
                    </Text>
                  </BlastPressable>
                )}
              </View>
            </View>

            {/* Swipe Hint Banner */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginBottom: 8
              }}
            >
              <MoveHorizontal
                size={14}
                color={isDark ? "#34D399" : (isPink ? "#DB2777" : "#0B6B4F")}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "NotoSansBengali_600SemiBold",
                  color: isDark ? "#94A3B8" : "#64748B"
                }}
              >
                Slide card Left ↔ Right (Position #{safeIndex + 1} auto-saved)
              </Text>
            </View>

            {/* Swipeable + 3D Flip Flashcard Container */}
            <View style={{ position: "relative", marginBottom: 26 }}>
              {/* Grounded 3D Drop Shade Beneath Card Stack */}
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  bottom: -16,
                  left: 26,
                  right: 26,
                  height: 20,
                  borderRadius: 999,
                  backgroundColor: isDark
                    ? "rgba(0, 0, 0, 0.55)"
                    : "rgba(4, 30, 22, 0.16)",
                  shadowColor: "#000000",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: isDark ? 0.65 : 0.25,
                  shadowRadius: 16,
                  elevation: 10
                }}
              />
              {/* 3D Material Glass Stacked Deck Depth Layers */}
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: 14,
                  bottom: -10,
                  left: 18,
                  right: 18,
                  borderRadius: 24,
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(255, 255, 255, 0.42)",
                  borderWidth: 1,
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.72)"
                }}
              />
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: 7,
                  bottom: -5,
                  left: 9,
                  right: 9,
                  borderRadius: 25,
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.07)"
                    : "rgba(255, 255, 255, 0.58)",
                  borderWidth: 1,
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.16)"
                    : "rgba(255, 255, 255, 0.85)"
                }}
              />

            <Animated.View
              {...panResponder.panHandlers}
              style={[
                swipeContainerStyle,
                { minHeight: 335, position: "relative" }
              ]}
            >
              <Animated.View
                pointerEvents="none"
                style={[
                  leftSwipeBadgeStyle,
                  {
                    position: "absolute",
                    top: 16,
                    right: 18,
                    zIndex: 20,
                    backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderRadius: 999
                  }
                ]}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_700Bold",
                    color: "#FFFFFF"
                  }}
                >
                  NEXT CARD →
                </Text>
              </Animated.View>

              <Animated.View
                pointerEvents="none"
                style={[
                  rightSwipeBadgeStyle,
                  {
                    position: "absolute",
                    top: 16,
                    left: 18,
                    zIndex: 20,
                    backgroundColor: "#0D9488",
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderRadius: 999
                  }
                ]}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_700Bold",
                    color: "#FFFFFF"
                  }}
                >
                  ← PREVIOUS CARD
                </Text>
              </Animated.View>

              {!isFlipped ? (
                <Animated.View
                  style={[
                    frontAnimatedStyle,
                    getGlassCardStyle(cardGenderColor, 325)
                  ]}
                >
                  {renderGlassCardLayers(cardGenderColor)}
                  <WordWatermark
                    word={currentCard}
                    accentColor={cardGenderColor}
                    isDark={isDark}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC"),
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 999
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_700Bold",
                          color: cardGenderColor
                        }}
                      >
                        {currentCard.level} •{" "}
                        {currentCard.article
                          ? GENDER_COLORS[
                              currentCard.article
                            ].labelEn.toUpperCase()
                          : (
                              currentCard.chapter ||
                              currentCard.day ||
                              currentCard.topic
                            ).toUpperCase()}
                      </Text>
                    </View>

                    {srsProgress[currentCard.id]?.lastRating && (
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#94A3B8" : "#64748B"
                        }}
                      >
                        Last: {srsProgress[currentCard.id].lastRating} (
                        {srsProgress[currentCard.id].interval}d)
                      </Text>
                    )}
                  </View>

                  <BlastPressable
                    onPress={handleFlip}
                    style={{
                      alignItems: "center",
                      paddingVertical: 18
                    }}
                  >
                    <GenderNounBadge
                      article={currentCard.article}
                      noun={currentCard.german}
                      plural={currentCard.plural}
                      size="lg"
                    />

                    {currentCard.phoneticHint && (
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : "#F0FDFA",
                          paddingHorizontal: 12,
                          paddingVertical: 5,
                          borderRadius: 999,
                          borderWidth: 1,
                          borderColor: isDark ? "#134E4A" : "#99F6E4"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "NotoSansBengali_600SemiBold",
                            color: isDark ? "#5EEAD4" : "#0F766E"
                          }}
                        >
                          উচ্চারণ: {currentCard.phoneticHint}
                        </Text>
                      </View>
                    )}

                    <View style={{ marginTop: 14, alignItems: "center" }}>
                      {showEn && (
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "Inter_700Bold",
                            color: isDark ? "#D6EFE6" : "#1F5E48",
                            textAlign: "center",
                            marginBottom: showNative ? 4 : 0
                          }}
                        >
                          🇬🇧{" "}
                          {txEn(
                            currentCard.english,
                            currentCard.bangla,
                            currentCard.german
                          )}
                        </Text>
                      )}
                      {showNative && (
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: "NotoSansBengali_700Bold",
                            color: isDark ? "#93C5FD" : "#1D4ED8",
                            textAlign: "center"
                          }}
                        >
                          {nativeFlag}{" "}
                          {tx(
                            currentCard.english,
                            currentCard.bangla,
                            currentCard.german
                          )}
                        </Text>
                      )}
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "NotoSansBengali_500Medium",
                          color: isDark ? "#94A3B8" : "#64748B",
                          marginTop: 4,
                          textAlign: "center"
                        }}
                      >
                        {currentCard.chapter || currentCard.topic}
                      </Text>
                    </View>
                  </BlastPressable>

                  <View
                    style={{
                      borderTopWidth: 1,
                      borderTopColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                      paddingTop: 14,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 8
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6
                      }}
                    >
                      <SpeakButton
                        text={spokenCardText}
                        size="sm"
                        showSlowOption={true}
                      />
                      <VoicePracticeButton
                        targetText={spokenCardText}
                        translationEn={currentCard.english}
                        translationBn={currentCard.bangla}
                        size="sm"
                      />
                    </View>

                    <BlastPressable
                      onPress={() => inspectWord(currentCard)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC"),
                        paddingHorizontal: 10,
                        paddingVertical: 7,
                        borderRadius: 999
                      }}
                    >
                      <Info
                        size={14}
                        color={isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")
                        }}
                      >
                        Details
                      </Text>
                    </BlastPressable>

                    <BlastPressable
                      onPress={handleFlip}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FDF2F8" : "#EAF7F2"),
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        borderRadius: 999
                      }}
                    >
                      <RotateCw
                        size={14}
                        color={isDark ? (isPink ? "#FFF0F5" : "#EDF7F3") : (isPink ? "#DB2777" : "#0B6B4F")}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#F0FDF9" : (isPink ? "#DB2777" : "#0B6B4F")
                        }}
                      >
                        Flip Card
                      </Text>
                    </BlastPressable>
                  </View>
                </Animated.View>
              ) : (
                <Animated.View
                  style={[
                    backAnimatedStyle,
                    getGlassCardStyle(cardGenderColor, 325)
                  ]}
                >
                  {renderGlassCardLayers(cardGenderColor)}
                  <WordWatermark
                    word={currentCard}
                    accentColor={cardGenderColor}
                    isDark={isDark}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FDF2F8" : "#EAF7F2"),
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 999
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")
                        }}
                      >
                        BACK • EXAMPLE SENTENCE
                      </Text>
                    </View>

                    <GenderNounBadge
                      article={currentCard.article}
                      noun={currentCard.german}
                      size="sm"
                    />
                  </View>

                  <View style={{ paddingVertical: 14 }}>
                    <TappableGermanText
                      text={currentCard.exampleDe}
                      level={currentCard.level}
                      sentenceEn={currentCard.exampleEn}
                      sentenceBn={currentCard.exampleBn}
                      containerStyle={{ marginBottom: 10 }}
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    />

                    {showEn && (
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "NotoSansBengali_500Medium",
                          color: isDark ? "#D6EFE6" : "#475569",
                          marginBottom: 6
                        }}
                      >
                        🇬🇧{" "}
                        {txEn(
                          currentCard.exampleEn,
                          currentCard.exampleBn,
                          currentCard.exampleDe
                        )}
                      </Text>
                    )}

                    {showNative && (
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: "NotoSansBengali_500Medium",
                          color: isDark ? "#93C5FD" : "#1D4ED8"
                        }}
                      >
                        {nativeFlag}{" "}
                        {tx(
                          currentCard.exampleEn,
                          currentCard.exampleBn,
                          currentCard.exampleDe
                        )}
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      borderTopWidth: 1,
                      borderTopColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                      paddingTop: 14,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 8
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6
                      }}
                    >
                      <SpeakButton
                        text={currentCard.exampleDe}
                        size="sm"
                        showSlowOption={true}
                      />
                      <VoicePracticeButton
                        targetText={currentCard.exampleDe}
                        translationEn={currentCard.exampleEn}
                        translationBn={currentCard.exampleBn}
                        size="sm"
                        label="Speak Sentence"
                      />
                    </View>

                    <BlastPressable
                      onPress={() => inspectWord(currentCard)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC"),
                        paddingHorizontal: 10,
                        paddingVertical: 7,
                        borderRadius: 999
                      }}
                    >
                      <Info
                        size={14}
                        color={isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")
                        }}
                      >
                        Details
                      </Text>
                    </BlastPressable>

                    <BlastPressable
                      onPress={handleFlip}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FDF2F8" : "#EAF7F2"),
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        borderRadius: 999
                      }}
                    >
                      <RotateCw
                        size={14}
                        color={isDark ? (isPink ? "#FFF0F5" : "#EDF7F3") : (isPink ? "#DB2777" : "#0B6B4F")}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#F0FDF9" : (isPink ? "#DB2777" : "#0B6B4F")
                        }}
                      >
                        Flip to Word
                      </Text>
                    </BlastPressable>
                  </View>
                </Animated.View>
              )}
            </Animated.View>
            </View>

            {/* Spaced Repetition (SRS) Rating Buttons [Again, Hard, Good, Easy] */}
            <MaterialGlassCard
              borderRadius={20}
              padding={14}
              style={{
                marginBottom: 14
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#94A3B8" : "#64748B",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginBottom: 10
                }}
              >
                Spaced Repetition Rating (+2 XP per Review)
              </Text>

              <View style={{ flexDirection: "row", gap: 8 }}>
                {srsButtons.map((btn) => (
                  <BlastPressable
                    key={btn.rating}
                    onPress={() => handleRateSRS(btn.rating)}
                    style={{
                      flex: 1,
                      paddingVertical: 11,
                      borderRadius: 14,
                      alignItems: "center",
                      backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : btn.bgLight,
                      borderWidth: 1.5,
                      borderColor: btn.color
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "Inter_700Bold",
                        color: btn.color
                      }}
                    >
                      {btn.rating}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginTop: 2
                      }}
                    >
                      {btn.intervalHint}
                    </Text>
                  </BlastPressable>
                ))}
              </View>
            </MaterialGlassCard>

            {/* Prev / Next Navigation Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 22
              }}
            >
              <BlastPressable
                onPress={() => triggerAnimatedSwipe("right")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
                  borderWidth: 1,
                  borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
                }}
              >
                <ChevronLeft
                  size={18}
                  color={isDark ? (isPink ? "#FFF0F5" : "#EDF7F3") : (isBlack ? "#171717" : "#052219")}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#F0FDF9" : "#062E22"
                  }}
                >
                  Swipe Right (Prev)
                </Text>
              </BlastPressable>

              <BlastPressable
                onPress={() => triggerAnimatedSwipe("left")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
                  borderWidth: 1,
                  borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#F0FDF9" : "#062E22"
                  }}
                >
                  Swipe Left (Next)
                </Text>
                <ChevronRight
                  size={18}
                  color={isDark ? (isPink ? "#FFF0F5" : "#EDF7F3") : (isBlack ? "#171717" : "#052219")}
                />
              </BlastPressable>
            </View>

            {/* Interactive Section Word List (Windowed around your current saved cardIndex!) */}
            <View
              style={{
                backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
                borderRadius: 20,
                padding: 16,
                borderWidth: 1,
                borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  gap: 8
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "NotoSansBengali_700Bold",
                    color: isDark ? "#F0FDF9" : "#062E22",
                    flex: 1
                  }}
                >
                  {activeSectionLabel} ({activeDeckWords.length} words)
                </Text>

                <BlastPressable
                  onPress={() =>
                    launchSectionSwipePlay(
                      activeDeckWords,
                      activeSectionLabel,
                      20,
                      true
                    )
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 999
                  }}
                >
                  <Play size={12} color="#FFFFFF" fill="#FFFFFF" />
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "Inter_700Bold",
                      color: "#FFFFFF"
                    }}
                  >
                    Play Section
                  </Text>
                </BlastPressable>
              </View>

              <View style={{ gap: 8 }}>
                {activeDeckWords
                  .slice(Math.max(0, safeIndex - 3), safeIndex + 17)
                  .map((item, offset) => {
                    const actualIdx = Math.max(0, safeIndex - 3) + offset;
                    const isCurrent = actualIdx === safeIndex;
                    const speakStr =
                      item.fullGerman ||
                      (item.article
                        ? `${item.article} ${item.german}`
                        : item.german);

                    return (
                      <BlastPressable
                        key={item.id}
                        onPress={() => {
                          playSwipeSound("right");
                          setCurrentDeckCardIndex(actualIdx);
                          resetFlip();
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: 11,
                          borderRadius: 14,
                          backgroundColor: isCurrent
                            ? isDark
                              ? "#064E3B"
                              : (isPink ? "#FDF2F8" : "#EAF7F2")
                            : isDark
                            ? (isBlack ? "#171717" : "#052219")
                            : (isPink ? "#FFF0F5" : "#EDF7F3"),
                          borderWidth: 1,
                          borderColor: isCurrent
                            ? (isPink ? "#DB2777" : "#0B6B4F")
                            : isDark
                            ? (isBlack ? "#0F0F0F" : "#082E22")
                            : (isPink ? "#FBCFE8" : "#C6E4D9")
                        }}
                      >
                        <View style={{ flex: 1, paddingRight: 8 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 8,
                              flexWrap: "wrap"
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 11,
                                fontFamily: "Inter_700Bold",
                                color: isCurrent
                                  ? (isPink ? "#DB2777" : "#0B6B4F")
                                  : isDark
                                  ? "#64748B"
                                  : "#94A3B8"
                              }}
                            >
                              #{actualIdx + 1}
                            </Text>
                            <GenderNounBadge
                              article={item.article}
                              noun={item.german}
                              plural={item.plural}
                              size="sm"
                            />
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: "NotoSansBengali_600SemiBold",
                                color: isDark ? "#94A3B8" : "#64748B"
                              }}
                            >
                              {item.chapter || item.day || item.level}
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "NotoSansBengali_600SemiBold",
                              color: isDark ? "#93C5FD" : "#1D4ED8",
                              marginTop: 3
                            }}
                          >
                            {languageMode === "en"
                              ? txEn(item.english, item.bangla, item.german)
                              : `${txEn(
                                  item.english,
                                  item.bangla,
                                  item.german
                                )} • ${tx(
                                  item.english,
                                  item.bangla,
                                  item.german
                                )}`}
                            {item.phoneticHint
                              ? ` • [${item.phoneticHint}]`
                              : ""}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6
                          }}
                        >
                          <AnimatedStarButton
                            isStarred={isWordSaved(item.german)}
                            onToggle={() => toggleSavedWord(item)}
                            size="sm"
                          />
                          {activeSection === "saved" && (
                            <BlastPressable
                              onPress={() => handleDeleteStarredWord(item)}
                              style={{
                                padding: 6,
                                borderRadius: 999,
                                backgroundColor: isDark
                                  ? "rgba(220, 38, 38, 0.2)"
                                  : "#FEF2F2"
                              }}
                            >
                              <Trash2 size={14} color="#DC2626" />
                            </BlastPressable>
                          )}
                          <SpeakButton
                            text={speakStr}
                            size="sm"
                            showSlowOption={false}
                          />
                        </View>
                      </BlastPressable>
                    );
                  })}
              </View>
            </View>
          </View>
          </MotionEntrance>
        )}
      </ScrollView>

      <ScrollToTopButton visible={showScrollTop} onPress={scrollToTop} />

      {/* ================= MODAL 1: ADD CUSTOM STARRED WORD ================= */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : "#FFFFFF",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              padding: 20,
              maxHeight: "90%",
              borderTopWidth: 1,
              borderColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9")
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Star size={18} color="#D97706" fill="#D97706" />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#F0FDF9" : "#062E22"
                  }}
                >
                  Add New Starred Word
                </Text>
              </View>

              <BlastPressable
                onPress={() => setAddModalVisible(false)}
                style={{
                  padding: 6,
                  borderRadius: 999,
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FCE7F3" : "#E2F2EC")
                }}
              >
                <X size={18} color={isDark ? "#94A3B8" : "#475569"} />
              </BlastPressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_600SemiBold",
                  color: isDark ? "#94A3B8" : "#475569",
                  marginBottom: 6
                }}
              >
                Gender Article (Optional)
              </Text>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
                {(["der", "die", "das"] as GermanArticle[]).map((art) => {
                  const active = newArticle === art;
                  const col = GENDER_COLORS[art].hex;
                  return (
                    <BlastPressable
                      key={art}
                      onPress={() =>
                        setNewArticle((prev) => (prev === art ? undefined : art))
                      }
                      style={{
                        flex: 1,
                        paddingVertical: 9,
                        borderRadius: 12,
                        alignItems: "center",
                        backgroundColor: active
                          ? col
                          : isDark
                          ? (isBlack ? "#0F0F0F" : "#082E22")
                          : (isPink ? "#FFF0F5" : "#EDF7F3"),
                        borderWidth: 1.5,
                        borderColor: col
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Inter_700Bold",
                          color: active ? "#FFFFFF" : col
                        }}
                      >
                        {art}
                      </Text>
                    </BlastPressable>
                  );
                })}
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_600SemiBold",
                  color: isDark ? "#94A3B8" : "#475569",
                  marginBottom: 4
                }}
              >
                German Word *
              </Text>
              <TextInput
                value={newGerman}
                onChangeText={setNewGerman}
                placeholder="e.g. Bahnhof / sprechen"
                placeholderTextColor={isDark ? "#475569" : "#94A3B8"}
                style={{
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                  color: isDark ? "#F0FDF9" : "#062E22",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
                  fontFamily: "Inter_500Medium",
                  marginBottom: 12
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_600SemiBold",
                  color: isDark ? "#94A3B8" : "#475569",
                  marginBottom: 4
                }}
              >
                Bangla Meaning (বাংলা অর্থ) *
              </Text>
              <TextInput
                value={newBangla}
                onChangeText={setNewBangla}
                placeholder="যেমন: রেলস্টেশন / কথা বলা"
                placeholderTextColor={isDark ? "#475569" : "#94A3B8"}
                style={{
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                  color: isDark ? "#F0FDF9" : "#062E22",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
                  fontFamily: "NotoSansBengali_500Medium",
                  marginBottom: 12
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_600SemiBold",
                  color: isDark ? "#94A3B8" : "#475569",
                  marginBottom: 4
                }}
              >
                Bangla Pronunciation (উচ্চারণ — Optional)
              </Text>
              <TextInput
                value={newPhonetic}
                onChangeText={setNewPhonetic}
                placeholder="যেমন: ডেয়া বান-হোফ"
                placeholderTextColor={isDark ? "#475569" : "#94A3B8"}
                style={{
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                  color: isDark ? "#F0FDF9" : "#062E22",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
                  fontFamily: "NotoSansBengali_500Medium",
                  marginBottom: 12
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_600SemiBold",
                  color: isDark ? "#94A3B8" : "#475569",
                  marginBottom: 4
                }}
              >
                English Meaning (Optional)
              </Text>
              <TextInput
                value={newEnglish}
                onChangeText={setNewEnglish}
                placeholder="e.g. train station"
                placeholderTextColor={isDark ? "#475569" : "#94A3B8"}
                style={{
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                  color: isDark ? "#F0FDF9" : "#062E22",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
                  fontFamily: "Inter_500Medium",
                  marginBottom: 12
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_600SemiBold",
                  color: isDark ? "#94A3B8" : "#475569",
                  marginBottom: 6
                }}
              >
                CEFR Level
              </Text>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
                {CEFR_LEVELS.map((lvl) => (
                  <BlastPressable
                    key={lvl}
                    onPress={() => setNewLevel(lvl)}
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      borderRadius: 10,
                      alignItems: "center",
                      backgroundColor:
                        newLevel === lvl
                          ? (isPink ? "#DB2777" : "#0B6B4F")
                          : isDark
                          ? (isBlack ? "#0F0F0F" : "#082E22")
                          : (isPink ? "#FCE7F3" : "#E2F2EC")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "Inter_700Bold",
                        color:
                          newLevel === lvl
                            ? "#FFFFFF"
                            : isDark
                            ? "#A7D7C5"
                            : "#475569"
                      }}
                    >
                      {lvl}
                    </Text>
                  </BlastPressable>
                ))}
              </View>

              <BlastPressable
                onPress={handleCreateCustomStarredWord}
                style={{
                  backgroundColor: "#D97706",
                  paddingVertical: 14,
                  borderRadius: 14,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 12
                }}
              >
                <Star size={17} color="#FFFFFF" fill="#FFFFFF" />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Inter_700Bold",
                    color: "#FFFFFF"
                  }}
                >
                  Save to ★ Starred Words
                </Text>
              </BlastPressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL 2: SECTION SWIPING PLAY CHALLENGE ================= */}
      <Modal
        visible={swipePlayVisible}
        animationType="slide"
        onRequestClose={() => setSwipePlayVisible(false)}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: isDark ? (isBlack ? "#000000" : "#041E16") : (isPink ? "#FFF0F5" : "#EDF7F3")
          }}
        >
          <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 12 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10
              }}
            >
              <BlastPressable
                onPress={() => setSwipePlayVisible(false)}
                style={{
                  padding: 8,
                  borderRadius: 999,
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9")
                }}
              >
                <X size={20} color={isDark ? (isPink ? "#FFF0F5" : "#EDF7F3") : (isBlack ? "#171717" : "#052219")} />
              </BlastPressable>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  flex: 1,
                  justifyContent: "center",
                  paddingHorizontal: 8
                }}
              >
                <Gamepad2 size={17} color={isPink ? "#DB2777" : "#0B6B4F"} />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontFamily: "NotoSansBengali_700Bold",
                    color: isDark ? "#F0FDF9" : "#062E22"
                  }}
                >
                  {playTitle}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Inter_700Bold",
                  color: (isPink ? "#DB2777" : "#0B6B4F")
                }}
              >
                {playFinished ? "Done!" : `${playIdx + 1}/${playQueue.length}`}
              </Text>
            </View>

            {!playFinished && playQueue.length > 0 && (
              <AnimatedProgressBar
                percent={Math.round(((playIdx + 1) / playQueue.length) * 100)}
                height={7}
                trackColor={
                  isDark
                    ? isBlack
                      ? "#262626"
                      : "#082E22"
                    : isPink
                    ? "#FCE7F3"
                    : "#C6E4D9"
                }
                fillColor={isPink ? "#DB2777" : "#0B6B4F"}
                style={{ marginBottom: 12 }}
              />
            )}

            {/* Round Size Selector Pills */}
            {!playFinished && playSourcePool.length > 10 && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 10
                }}
              >
                {[10, 20, 50, 0].map((lim) => {
                  if (lim > 0 && lim >= playSourcePool.length) return null;
                  const active = playRoundLimit === lim;
                  return (
                    <BlastPressable
                      key={lim}
                      onPress={() => changePlayRoundSize(lim)}
                      style={{
                        paddingHorizontal: 11,
                        paddingVertical: 5,
                        borderRadius: 999,
                        backgroundColor: active
                          ? (isPink ? "#DB2777" : "#0B6B4F")
                          : isDark
                          ? (isBlack ? "#0F0F0F" : "#082E22")
                          : (isPink ? "#FBCFE8" : "#C6E4D9")
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_700Bold",
                          color: active
                            ? "#FFFFFF"
                            : isDark
                            ? "#A7D7C5"
                            : "#475569"
                        }}
                      >
                        {lim === 0
                          ? `All (${playSourcePool.length})`
                          : `${lim} Cards`}
                      </Text>
                    </BlastPressable>
                  );
                })}
              </View>
            )}

            {!playFinished && currentPlayCard && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  paddingBottom: 24
                }}
              >
                <View
                  style={{
                    backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FDF2F8" : "#EAF7F2"),
                    paddingHorizontal: 14,
                    paddingVertical: 9,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: (isPink ? "#DB2777" : "#0B6B4F")
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "NotoSansBengali_600SemiBold",
                      color: isDark ? "#D6EFE6" : "#064E3B",
                      textAlign: "center"
                    }}
                  >
                    Swipe RIGHT (→) if you know it! Swipe LEFT (←) if wrong —
                    wrong cards repeat again and again until you make them
                    correct!
                  </Text>
                </View>

                <Animated.View
                  {...playPanResponder.panHandlers}
                  style={[
                    playCardAnimatedStyle,
                    getGlassCardStyle(
                      currentPlayCard.article
                        ? GENDER_COLORS[currentPlayCard.article].hex
                        : isPink
                        ? "#DB2777"
                        : "#0B6B4F",
                      340
                    ),
                    {
                      padding: 24,
                      position: "relative"
                    }
                  ]}
                >
                  {renderGlassCardLayers(
                    currentPlayCard.article
                      ? GENDER_COLORS[currentPlayCard.article].hex
                      : isPink
                      ? "#DB2777"
                      : "#0B6B4F"
                  )}
                  <WordWatermark
                    word={currentPlayCard}
                    accentColor={
                      currentPlayCard.article
                        ? GENDER_COLORS[currentPlayCard.article].hex
                        : isPink
                        ? "#DB2777"
                        : "#0B6B4F"
                    }
                    isDark={isDark}
                  />
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      playKnowBadgeStyle,
                      {
                        position: "absolute",
                        top: 18,
                        left: 18,
                        zIndex: 20,
                        backgroundColor: "#16A34A",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 999
                      }
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      ✓ CORRECT / KNOW IT!
                    </Text>
                  </Animated.View>

                  <Animated.View
                    pointerEvents="none"
                    style={[
                      playRetryBadgeStyle,
                      {
                        position: "absolute",
                        top: 18,
                        right: 18,
                        zIndex: 20,
                        backgroundColor: "#DC2626",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 999
                      }
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      🔄 WRONG • WILL REPEAT
                    </Text>
                  </Animated.View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "NotoSansBengali_700Bold",
                        color: (isPink ? "#DB2777" : "#0B6B4F"),
                        flex: 1,
                        paddingRight: 8
                      }}
                      numberOfLines={1}
                    >
                      {currentPlayCard.level} •{" "}
                      {currentPlayCard.chapter ||
                        currentPlayCard.day ||
                        currentPlayCard.topic}
                    </Text>

                    <AnimatedStarButton
                      isStarred={isWordSaved(currentPlayCard.german)}
                      onToggle={() => toggleSavedWord(currentPlayCard)}
                      size="sm"
                    />
                  </View>

                  <BlastPressable
                    onPress={() => setPlayFlipped((p) => !p)}
                    style={{ alignItems: "center", paddingVertical: 20 }}
                  >
                    <GenderNounBadge
                      article={currentPlayCard.article}
                      noun={currentPlayCard.german}
                      plural={currentPlayCard.plural}
                      size="lg"
                    />

                    {currentPlayCard.phoneticHint && (
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: "NotoSansBengali_600SemiBold",
                          color: isDark ? "#5EEAD4" : "#0F766E",
                          marginTop: 10
                        }}
                      >
                        উচ্চারণ: {currentPlayCard.phoneticHint}
                      </Text>
                    )}

                    {playFlipped ? (
                      <View style={{ marginTop: 16, alignItems: "center" }}>
                        {showEn && (
                          <Text
                            style={{
                              fontSize: 17,
                              fontFamily: "Inter_700Bold",
                              color: isDark ? "#D6EFE6" : "#1F5E48",
                              textAlign: "center",
                              marginBottom: showNative ? 4 : 0
                            }}
                          >
                            🇬🇧{" "}
                            {txEn(
                              currentPlayCard.english,
                              currentPlayCard.bangla,
                              currentPlayCard.german
                            )}
                          </Text>
                        )}
                        {showNative && (
                          <Text
                            style={{
                              fontSize: 22,
                              fontFamily: "NotoSansBengali_700Bold",
                              color: isDark ? "#93C5FD" : "#1D4ED8",
                              textAlign: "center"
                            }}
                          >
                            {nativeFlag}{" "}
                            {tx(
                              currentPlayCard.english,
                              currentPlayCard.bangla,
                              currentPlayCard.german
                            )}
                          </Text>
                        )}
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "Inter_500Medium",
                            color: isDark ? "#D6EFE6" : "#475569",
                            marginTop: 6,
                            textAlign: "center"
                          }}
                        >
                          „{currentPlayCard.exampleDe}“
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          marginTop: 18,
                          paddingHorizontal: 14,
                          paddingVertical: 7,
                          borderRadius: 999,
                          backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC")
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "NotoSansBengali_600SemiBold",
                            color: isDark ? "#94A3B8" : "#64748B"
                          }}
                        >
                          Tap card to reveal বাংলা meaning & example
                        </Text>
                      </View>
                    )}
                  </BlastPressable>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10
                    }}
                  >
                    <SpeakButton
                      text={
                        currentPlayCard.fullGerman ||
                        (currentPlayCard.article
                          ? `${currentPlayCard.article} ${currentPlayCard.german}`
                          : currentPlayCard.german)
                      }
                      size="md"
                      showSlowOption={true}
                    />
                    <VoicePracticeButton
                      targetText={
                        currentPlayCard.fullGerman ||
                        (currentPlayCard.article
                          ? `${currentPlayCard.article} ${currentPlayCard.german}`
                          : currentPlayCard.german)
                      }
                      translationEn={currentPlayCard.english}
                      translationBn={currentPlayCard.bangla}
                      size="md"
                    />
                  </View>
                </Animated.View>

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <BlastPressable
                    onPress={() => triggerPlaySwipe(false)}
                    style={{
                      flex: 1,
                      backgroundColor: isDark
                        ? "rgba(220, 38, 38, 0.2)"
                        : "#FEF2F2",
                      borderWidth: 1.5,
                      borderColor: "#DC2626",
                      paddingVertical: 15,
                      borderRadius: 16,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 6
                    }}
                  >
                    <RotateCcw size={17} color="#DC2626" />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_700Bold",
                        color: "#DC2626"
                      }}
                    >
                      ← Wrong (Repeat)
                    </Text>
                  </BlastPressable>

                  <BlastPressable
                    onPress={() => triggerPlaySwipe(true)}
                    style={{
                      flex: 1,
                      backgroundColor: "#16A34A",
                      paddingVertical: 15,
                      borderRadius: 16,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 6
                    }}
                  >
                    <CheckCircle2 size={17} color="#FFFFFF" />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      Correct (Know It) →
                    </Text>
                  </BlastPressable>
                </View>
              </View>
            )}

            {playFinished && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 24
                }}
              >
                <Award size={60} color="#16A34A" />
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#F0FDF9" : "#062E22",
                    marginTop: 14,
                    marginBottom: 6,
                    textAlign: "center"
                  }}
                >
                  {playTitle} — {playMasteredCount} Cards Mastered! 🎉
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "NotoSansBengali_500Medium",
                    color: isDark ? "#94A3B8" : "#475569",
                    textAlign: "center",
                    marginBottom: 24
                  }}
                >
                  You mastered every card in this round and earned +15 XP!
                </Text>

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <BlastPressable
                    onPress={() =>
                      launchSectionSwipePlay(
                        activeDeckWords,
                        activeSectionLabel,
                        playRoundLimit,
                        true
                      )
                    }
                    style={{
                      backgroundColor: "#0D9488",
                      paddingHorizontal: 22,
                      paddingVertical: 14,
                      borderRadius: 999
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      Continue Next Round
                    </Text>
                  </BlastPressable>

                  <BlastPressable
                    onPress={() => setSwipePlayVisible(false)}
                    style={{
                      backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                      paddingHorizontal: 22,
                      paddingVertical: 14,
                      borderRadius: 999
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      Done
                    </Text>
                  </BlastPressable>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
