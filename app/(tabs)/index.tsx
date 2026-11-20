import { BlastPressable } from "../../src/components/motion/BlastPressable";
import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Award,
  Bell,
  BookMarked,
  CheckCircle2,
  ChevronRight,
  Flame,
  Mic,
  Play,
  RefreshCw,
  Sparkles,
  Volume2,
  X
} from "lucide-react-native";
import { GlobalHeader } from "../../src/components/common/GlobalHeader";
import { AnimatedStarButton } from "../../src/components/common/AnimatedStarButton";
import { CEFRLevelPills } from "../../src/components/common/CEFRLevelPills";
import { CircularProgressRing } from "../../src/components/common/CircularProgressRing";
import { GenderNounBadge } from "../../src/components/common/GenderNounBadge";
import { MaterialGlassCard } from "../../src/components/common/MaterialGlassCard";
import { TappableGermanText } from "../../src/components/common/TappableGermanText";
import {
  ScrollToTopButton,
  useScrollToTop
} from "../../src/components/common/ScrollToTopButton";
import {
  AnimatedProgressBar,
  MotionEntrance,
  MotionFeedbackBanner,
  MotionFloat
} from "../../src/components/motion/MotionViews";
import {
  SpeakButton,
  VoicePracticeButton,
  VoicePracticeModal
} from "../../src/components/audio";
import { LESSON_UNITS } from "../../src/data/lessons";
import { GRAMMAR_TOPICS } from "../../src/data/grammar";
import { READING_PASSAGES } from "../../src/data/passages";
import { getSectionWordsByLevel } from "../../src/data/vocabulary";
import { CEFR_META, GENDER_COLORS } from "../../src/constants/theme";
import { useApp } from "../../src/context/AppContext";
import { GermanArticle, LessonExercise, LessonUnit } from "../../src/types";
import { useAppLanguage } from "../../src/utils/i18n";
import { playFeedbackSound, playStarSound } from "../../src/utils/soundEffects";
import {
  checkAndTriggerDailyWordNotification,
  getRandomVocabWord,
  getWordOfTheDay,
  requestDailyNotificationPermission
} from "../../src/utils/wordOfTheDay";

export default function LearnScreen() {
  const router = useRouter();
  const {
    isHydrated,
    activeLevel,
    setActiveLevel,
    languageMode,
    themeMode,
    dailyXP,
    dailyGoal,
    setDailyGoal,
    streak,
    completedUnitIds,
    completedGrammarQuizIds,
    completedReadPassageIds,
    srsProgress,
    savedWords,
    toggleSavedWord,
    isWordSaved,
    markUnitCompleted,
    learnSession,
    setLearnSession
  } = useApp();
  const { scrollRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop();
  const { showEn, showNative, nativeMeta, tx } = useAppLanguage();
  const nativeFlag = nativeMeta.flag === "🌐" ? "🇧🇩" : nativeMeta.flag;

  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const [activeLesson, setActiveLesson] = useState<LessonUnit | null>(null);
  const [exerciseQueue, setExerciseQueue] = useState<LessonExercise[]>([]);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [speakingScore, setSpeakingScore] = useState<number | null>(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [lessonFinished, setLessonFinished] = useState(false);

  const [wordOfTheDay, setWordOfTheDay] = useState(() => getWordOfTheDay());
  const [dailyNotifVisible, setDailyNotifVisible] = useState(false);
  const [notifHint, setNotifHint] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    checkAndTriggerDailyWordNotification(wordOfTheDay).then((shouldShow) => {
      if (active && shouldShow) {
        setDailyNotifVisible(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const unitsForLevel = useMemo(
    () => LESSON_UNITS.filter((u) => u.level === activeLevel),
    [activeLevel]
  );

  const levelCsvWords = useMemo(
    () => getSectionWordsByLevel(activeLevel),
    [activeLevel]
  );

  const levelChapters = useMemo(() => {
    const map = new Map<string, number>();
    levelCsvWords.forEach((w) => {
      const ch = w.chapter || w.topic;
      map.set(ch, (map.get(ch) || 0) + 1);
    });
    return Array.from(map.entries()).map(([chapterName, count]) => ({
      chapterName,
      count
    }));
  }, [levelCsvWords]);

  const startLesson = (unit: LessonUnit) => {
    setActiveLesson(unit);
    setExerciseQueue([...unit.exercises]);
    setExerciseIdx(0);
    setSelectedOption(null);
    setBuiltWords([]);
    setIsChecked(false);
    setIsCorrect(false);
    setSpeakingScore(null);
    setLessonFinished(false);
    setLearnSession({
      unitId: unit.id,
      exerciseQueue: [...unit.exercises],
      exerciseIdx: 0
    });
  };

  const resumeSavedLesson = () => {
    if (!learnSession) return;
    const foundUnit = LESSON_UNITS.find((u) => u.id === learnSession.unitId);
    if (!foundUnit) return;
    setActiveLesson(foundUnit);
    setExerciseQueue(learnSession.exerciseQueue);
    setExerciseIdx(
      Math.min(learnSession.exerciseIdx, learnSession.exerciseQueue.length - 1)
    );
    setSelectedOption(null);
    setBuiltWords([]);
    setIsChecked(false);
    setIsCorrect(false);
    setSpeakingScore(null);
    setLessonFinished(false);
  };

  const currentExercise = exerciseQueue[exerciseIdx];
  const isRetryAttempt =
    !!activeLesson && exerciseIdx >= activeLesson.exercises.length;

  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    if (
      currentExercise.type === "listening" ||
      currentExercise.type === "article_match"
    ) {
      if (!selectedOption) return;
      const ok = selectedOption === currentExercise.correctAnswer;
      setIsCorrect(ok);
      setIsChecked(true);
      playFeedbackSound(ok);
      if (!ok) {
        setExerciseQueue((prev) => [...prev, currentExercise]);
      }
    } else if (currentExercise.type === "sentence_builder") {
      if (builtWords.length === 0) return;
      const joined = builtWords.join(" ").trim();
      const ok = joined === currentExercise.correctAnswer.trim();
      setIsCorrect(ok);
      setIsChecked(true);
      playFeedbackSound(ok);
      if (!ok) {
        setExerciseQueue((prev) => [...prev, currentExercise]);
      }
    } else if (currentExercise.type === "speaking") {
      // Speaking challenge passes when user completes voice practice (>= 80% accuracy)
      if (speakingScore !== null) {
        const ok = speakingScore >= 80;
        setIsCorrect(ok);
        setIsChecked(true);
        playFeedbackSound(ok);
        if (!ok) {
          setExerciseQueue((prev) => [...prev, currentExercise]);
        }
      } else {
        setVoiceModalOpen(true);
      }
    }
  };

  const handleNextExercise = () => {
    if (!activeLesson) return;
    if (exerciseIdx + 1 < exerciseQueue.length) {
      const nextIdx = exerciseIdx + 1;
      setExerciseIdx(nextIdx);
      setSelectedOption(null);
      setBuiltWords([]);
      setIsChecked(false);
      setIsCorrect(false);
      setSpeakingScore(null);
      setLearnSession({
        unitId: activeLesson.id,
        exerciseQueue,
        exerciseIdx: nextIdx
      });
    } else {
      playFeedbackSound(true);
      markUnitCompleted(activeLesson.id, activeLesson.xpReward);
      setLessonFinished(true);
    }
  };

  const cycleDailyGoal = () => {
    if (dailyGoal === 10) setDailyGoal(30);
    else if (dailyGoal === 30) setDailyGoal(50);
    else setDailyGoal(10);
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: isDark ? (isBlack ? "#000000" : "#041E16") : (isPink ? "#FFF0F5" : "#EDF7F3")
      }}
    >
      <GlobalHeader subtitle="Interactive Path • A1 to B2" />

      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 105 }}
      >
        {/* CEFR Level Selector (A1-B2) */}
        <CEFRLevelPills
          selectedLevel={activeLevel}
          onSelectLevel={setActiveLevel}
        />

        {/* Resume Saved Lesson Session Banner */}
        {isHydrated && learnSession && !activeLesson && (
          <View style={{ paddingHorizontal: 16, marginTop: 4 }}>
            <BlastPressable
              onPress={resumeSavedLesson}
              style={{
                backgroundColor: isDark ? "rgba(13, 148, 136, 0.2)" : "#F0FDFA",
                borderWidth: 1.5,
                borderColor: "#0D9488",
                borderRadius: 16,
                paddingHorizontal: 14,
                paddingVertical: 11,
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
                    fontSize: 13,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#5EEAD4" : "#0F766E",
                    flex: 1
                  }}
                >
                  Resume Unfinished Lesson (Challenge{" "}
                  {learnSession.exerciseIdx + 1}/
                  {learnSession.exerciseQueue.length})
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
                    setLearnSession(null);
                  }}
                  hitSlop={8}
                  accessibilityLabel="Exit saved lesson"
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

        {/* Daily Aim Circular Progress Ring & Streak Counter Card */}
        <MotionEntrance delay={40} direction="up">
        <MaterialGlassCard
          borderRadius={22}
          padding={16}
          style={{
            marginHorizontal: 16,
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              flex: 1
            }}
          >
            <BlastPressable onPress={cycleDailyGoal}>
              <CircularProgressRing current={dailyXP} goal={dailyGoal} />
            </BlastPressable>

            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 3
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#F0FDF9" : "#062E22"
                  }}
                >
                  Daily Aim ({dailyGoal} XP)
                </Text>
              </View>

              {showEn && (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_500Medium",
                    color: isDark ? "#94A3B8" : "#64748B"
                  }}
                >
                  Tap ring to switch 10 / 30 / 50 XP goal
                </Text>
              )}
              {showNative && (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "NotoSansBengali_500Medium",
                    color: isDark ? "#93C5FD" : "#2563EB",
                    marginTop: 2
                  }}
                >
                  {tx(
                    `Daily goal: ${dailyXP}/${dailyGoal} XP earned`,
                    `দৈনিক লক্ষ্য: ${dailyXP}/${dailyGoal} XP অর্জিত`
                  )}
                </Text>
              )}
            </View>
          </View>

          {/* Streak Counter Pill */}
          <MotionFloat amplitude={3} duration={1500}>
          <View
            style={{
              backgroundColor: isDark ? "rgba(249, 115, 22, 0.16)" : "#FFF7ED",
              borderWidth: 1,
              borderColor: isDark ? "#C2410C" : "#FED7AA",
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderRadius: 16,
              alignItems: "center"
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Flame size={18} color="#F97316" />
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Inter_700Bold",
                  color: "#EA580C"
                }}
              >
                {streak}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Inter_600SemiBold",
                color: isDark ? "#FDBA74" : "#9A3412",
                marginTop: 2
              }}
            >
              DAY STREAK
            </Text>
          </View>
          </MotionFloat>
        </MaterialGlassCard>
        </MotionEntrance>

        {/* 3-Section Progress Overview (Grammar, Vocabulary, Read & Play) */}
        {(() => {
          const grammarForLvl = GRAMMAR_TOPICS.filter(
            (t) => t.level === activeLevel
          );
          const grammarDone = grammarForLvl.filter((t) =>
            completedGrammarQuizIds.includes(t.id)
          ).length;

          const vocabForLvl = getSectionWordsByLevel(activeLevel);
          const vocabDone = vocabForLvl.filter(
            (w) => !!srsProgress[w.id]
          ).length;

          const readForLvl = READING_PASSAGES.filter(
            (p) => p.level === activeLevel
          );
          const readDone = readForLvl.filter((p) =>
            (completedReadPassageIds ?? []).includes(p.id)
          ).length;

          const items = [
            {
              key: "grammar",
              label: `${activeLevel} Grammar`,
              done: grammarDone,
              total: grammarForLvl.length,
              color: "#2563EB",
              route: "/(tabs)/grammar" as const
            },
            {
              key: "vocabulary",
              label: `${activeLevel} Vocabulary`,
              done: vocabDone,
              total: vocabForLvl.length,
              color: isPink ? "#DB2777" : "#059669",
              route: "/(tabs)/vocabulary" as const
            },
            {
              key: "read",
              label: `${activeLevel} Read & Play`,
              done: readDone,
              total: readForLvl.length,
              color: "#D97706",
              route: "/(tabs)/read" as const
            }
          ];

          return (
            <MaterialGlassCard
              borderRadius={18}
              padding={14}
              style={{
                marginHorizontal: 16,
                marginTop: 12,
                gap: 10
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#A7F3D0" : isPink ? "#9D174D" : "#0B6B4F",
                  textTransform: "uppercase"
                }}
              >
                {activeLevel} Progress Overview
              </Text>

              {items.map((item) => {
                const pct =
                  item.total > 0
                    ? Math.round((item.done / item.total) * 100)
                    : 0;
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => router.push(item.route)}
                    style={{ gap: 5 }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#E2E8F0" : "#1E293B"
                        }}
                      >
                        {item.label}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_700Bold",
                          color: item.color
                        }}
                      >
                        {item.done}/{item.total} ({pct}%)
                      </Text>
                    </View>
                    <AnimatedProgressBar
                      percent={pct}
                      height={9}
                      trackColor={
                        isDark
                          ? isBlack
                            ? "#262626"
                            : "#052219"
                          : isPink
                          ? "#FCE7F3"
                          : "#E2F2EC"
                      }
                      fillColor={item.color}
                      gradientColors={
                        item.key === "grammar"
                          ? ["#2563EB", "#38BDF8", "#FFCE00"]
                          : item.key === "read"
                          ? ["#D97706", "#F59E0B", "#FFCE00"]
                          : isPink
                          ? ["#DB2777", "#F472B6", "#FFCE00"]
                          : ["#0B6B4F", "#34D399", "#FFCE00"]
                      }
                    />
                  </Pressable>
                );
              })}
            </MaterialGlassCard>
          );
        })()}

        {/* Gender Color Coding Legend Banner */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 12,
            backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC"),
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9")
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Inter_600SemiBold",
              color: isDark ? "#94A3B8" : "#475569"
            }}
          >
            Gender Code:
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <View
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 4.5,
                  backgroundColor: "#2563EB"
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_700Bold",
                  color: "#2563EB"
                }}
              >
                der (M)
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <View
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 4.5,
                  backgroundColor: "#DC2626"
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_700Bold",
                  color: "#DC2626"
                }}
              >
                die (F)
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <View
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 4.5,
                  backgroundColor: "#16A34A"
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_700Bold",
                  color: "#16A34A"
                }}
              >
                das (N)
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Come-Back Notification Banner */}
        {dailyNotifVisible && (
          <MotionEntrance delay={20} direction="down">
            <MaterialGlassCard
              borderRadius={16}
              padding={12}
              accentColor="#FFCE00"
              borderColor="#FFCE00"
              style={{
                marginHorizontal: 16,
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 10
              }}
            >
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  backgroundColor: isPink ? "#DB2777" : "#0B6B4F",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Bell size={17} color="#FFCE00" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#FFCE00" : isPink ? "#BE185D" : "#0B6B4F"
                  }}
                >
                  Daily Learning Reminder!
                </Text>
                <Text
                  style={{
                    fontSize: 11.5,
                    fontFamily: "Inter_500Medium",
                    color: isDark ? "#E2E8F0" : "#334155",
                    marginTop: 1
                  }}
                >
                  Come back and learn today — your Word of the Day is{" "}
                  <Text style={{ fontFamily: "Inter_700Bold" }}>
                    {wordOfTheDay.article
                      ? `${wordOfTheDay.article} ${wordOfTheDay.german}`
                      : wordOfTheDay.german}
                  </Text>
                  !
                </Text>
              </View>
              <Pressable
                onPress={() => setDailyNotifVisible(false)}
                hitSlop={8}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.06)"
                }}
              >
                <X size={14} color={isDark ? "#CBD5E1" : "#475569"} />
              </Pressable>
            </MaterialGlassCard>
          </MotionEntrance>
        )}

        {/* Word of the Day (Animated 3D Material Glass Card from Full Vocabulary) */}
        <MotionEntrance
          delay={60}
          direction="scale"
          triggerKey={wordOfTheDay.id}
        >
          {(() => {
            const wotdAccent = wordOfTheDay.article
              ? GENDER_COLORS[wordOfTheDay.article].hex
              : isPink
              ? "#DB2777"
              : "#0B6B4F";
            const wotdSpoken =
              wordOfTheDay.fullGerman ||
              (wordOfTheDay.article
                ? `${wordOfTheDay.article} ${wordOfTheDay.german}`
                : wordOfTheDay.german);
            const wotdSaved = isWordSaved(wordOfTheDay.german);

            return (
              <MaterialGlassCard
                borderRadius={22}
                padding={18}
                accentColor={wotdAccent}
                borderColor={wotdAccent}
                watermarkText={`${wordOfTheDay.german} ${wordOfTheDay.english} ${wordOfTheDay.topic}`}
                style={{
                  marginHorizontal: 16,
                  marginTop: 14
                }}
              >
                {/* Top Header Row */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                    gap: 8
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 7
                    }}
                  >
                    <MotionFloat amplitude={2.5} duration={1400}>
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 10,
                          backgroundColor: isPink ? "#DB2777" : "#0B6B4F",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Sparkles size={15} color="#FFCE00" />
                      </View>
                    </MotionFloat>
                    <View>
                      <Text
                        style={{
                          fontSize: 11.5,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#FFCE00" : isPink ? "#BE185D" : "#0B6B4F",
                          letterSpacing: 0.6
                        }}
                      >
                        WORD OF THE DAY
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#94A3B8" : "#64748B"
                        }}
                      >
                        {wordOfTheDay.level} • {wordOfTheDay.chapter || wordOfTheDay.topic}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    <BlastPressable
                      onPress={async () => {
                        const res = await requestDailyNotificationPermission();
                        setDailyNotifVisible(true);
                        setNotifHint(
                          res === "granted"
                            ? "Daily browser reminder enabled!"
                            : "Daily in-app reminder active!"
                        );
                        setTimeout(() => setNotifHint(null), 2600);
                      }}
                      accessibilityLabel="Enable daily Word of the Day reminder"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(11,107,79,0.1)"
                      }}
                    >
                      <Bell size={15} color={isDark ? "#FFCE00" : "#0B6B4F"} />
                    </BlastPressable>

                    <BlastPressable
                      onPress={() => {
                        playStarSound(true);
                        setWordOfTheDay(getRandomVocabWord(wordOfTheDay.id));
                      }}
                      accessibilityLabel="Show another random word"
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 999,
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.1)"
                          : isPink
                          ? "#FCE7F3"
                          : "#E2F2EC"
                      }}
                    >
                      <RefreshCw
                        size={13}
                        color={isDark ? "#6EE7B7" : isPink ? "#DB2777" : "#0B6B4F"}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#6EE7B7" : isPink ? "#DB2777" : "#0B6B4F"
                        }}
                      >
                        New Word
                      </Text>
                    </BlastPressable>
                  </View>
                </View>

                {notifHint && (
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "Inter_600SemiBold",
                      color: "#16A34A",
                      marginBottom: 8
                    }}
                  >
                    ✓ {notifHint}
                  </Text>
                )}

                {/* Main German Word & Gender Badge */}
                <View style={{ marginBottom: 10 }}>
                  <GenderNounBadge
                    article={wordOfTheDay.article}
                    noun={wordOfTheDay.german}
                    plural={wordOfTheDay.plural}
                    size="lg"
                  />
                  {wordOfTheDay.phoneticHint && (
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontFamily: "NotoSansBengali_500Medium",
                        color: isDark ? "#5EEAD4" : "#0F766E",
                        marginTop: 5
                      }}
                    >
                      Pronunciation: {wordOfTheDay.phoneticHint}
                    </Text>
                  )}
                </View>

                {/* Meanings */}
                <View style={{ marginBottom: 12, gap: 2 }}>
                  {showEn && (
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      🇬🇧 {wordOfTheDay.english}
                    </Text>
                  )}
                  {showNative && (
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "NotoSansBengali_600SemiBold",
                        color: isDark ? "#93C5FD" : "#1D4ED8"
                      }}
                    >
                      {nativeFlag}{" "}
                      {tx(
                        wordOfTheDay.english,
                        wordOfTheDay.bangla,
                        wordOfTheDay.german
                      )}
                    </Text>
                  )}
                </View>

                {/* Example Sentence */}
                <View
                  style={{
                    backgroundColor: isDark
                      ? "rgba(0,0,0,0.24)"
                      : "rgba(11,107,79,0.06)",
                    borderRadius: 14,
                    padding: 11,
                    marginBottom: 12
                  }}
                >
                  <TappableGermanText
                    text={wordOfTheDay.exampleDe}
                    level={wordOfTheDay.level}
                    sentenceEn={wordOfTheDay.exampleEn}
                    sentenceBn={wordOfTheDay.exampleBn}
                    textStyle={{
                      fontSize: 13.5,
                      fontFamily: "Inter_600SemiBold",
                      color: isDark ? "#E2E8F0" : "#0F172A"
                    }}
                  />
                  {showEn && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#94A3B8" : "#475569",
                        marginTop: 3
                      }}
                    >
                      {wordOfTheDay.exampleEn}
                    </Text>
                  )}
                </View>

                {/* Audio, Voice Practice & Star Actions */}
                <View
                  style={{
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
                      text={wotdSpoken}
                      size="sm"
                      showSlowOption={true}
                    />
                    <VoicePracticeButton
                      targetText={wotdSpoken}
                      translationEn={wordOfTheDay.english}
                      translationBn={wordOfTheDay.bangla}
                      size="sm"
                    />
                  </View>

                  <AnimatedStarButton
                    isStarred={wotdSaved}
                    onToggle={() => toggleSavedWord(wordOfTheDay)}
                    label={wotdSaved ? "★ Saved" : "Save Word"}
                    size="sm"
                  />
                </View>
              </MaterialGlassCard>
            );
          })()}
        </MotionEntrance>

        {/* Active Level Section Header */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 18,
            marginBottom: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#F0FDF9" : "#062E22"
              }}
            >
              {activeLevel} • {CEFR_META[activeLevel].nameDe}
            </Text>
            {showEn && (
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_500Medium",
                  color: isDark ? "#94A3B8" : "#64748B"
                }}
              >
                {CEFR_META[activeLevel].nameEn}
              </Text>
            )}
            {showNative && (
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "NotoSansBengali_600SemiBold",
                  color: isDark ? "#93C5FD" : "#2563EB"
                }}
              >
                {tx(
                  CEFR_META[activeLevel].nameEn,
                  CEFR_META[activeLevel].nameBn,
                  CEFR_META[activeLevel].nameDe
                )}
              </Text>
            )}
          </View>
        </View>

        {/* Interactive Vertical Unit Path */}
        <MotionEntrance delay={110} direction="up" triggerKey={activeLevel}>
        <View style={{ paddingHorizontal: 16 }}>
          {unitsForLevel.map((unit, index) => {
            const isCompleted = completedUnitIds.includes(unit.id);
            const hasMore = index < unitsForLevel.length - 1;

            return (
              <View key={unit.id}>
                <MaterialGlassCard
                  borderRadius={22}
                  padding={18}
                  accentColor={isCompleted ? "#16A34A" : undefined}
                  borderColor={isCompleted ? "#16A34A" : undefined}
                  watermarkText={`${unit.titleDe} ${unit.titleEn}`}
                >
                  {/* Top Row: Unit Badge + Audio + XP */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 10
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isCompleted ? "#16A34A" : (isPink ? "#DB2777" : "#0B6B4F"),
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 999,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4
                        }}
                      >
                        {isCompleted && (
                          <CheckCircle2 size={13} color="#FFFFFF" />
                        )}
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "Inter_700Bold",
                            color: "#FFFFFF"
                          }}
                        >
                          {unit.level} • UNIT {unit.unitNumber}
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : "#FEF3C7",
                          paddingHorizontal: 9,
                          paddingVertical: 4,
                          borderRadius: 999
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "Inter_700Bold",
                            color: "#D97706"
                          }}
                        >
                          +{unit.xpReward} XP
                        </Text>
                      </View>
                    </View>

                    <SpeakButton
                      text={unit.titleDe}
                      size="sm"
                      showSlowOption={true}
                    />
                  </View>

                  {/* Unit Titles (DE / EN / BN) - Tap any word for details */}
                  <TappableGermanText
                    text={unit.titleDe}
                    level={unit.level}
                    sentenceEn={unit.titleEn}
                    sentenceBn={unit.titleBn}
                    containerStyle={{ marginBottom: 4 }}
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
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#D6EFE6" : "#1F5E48",
                        marginBottom: 2
                      }}
                    >
                      🇬🇧 {unit.titleEn}
                    </Text>
                  )}

                  {showNative && (
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "NotoSansBengali_600SemiBold",
                        color: isDark ? "#93C5FD" : "#1D4ED8",
                        marginBottom: 6
                      }}
                    >
                      {nativeFlag} {tx(unit.titleEn, unit.titleBn, unit.titleDe)}
                    </Text>
                  )}

                  {showEn && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_400Regular",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginBottom: 4
                      }}
                    >
                      {unit.descriptionEn}
                    </Text>
                  )}

                  {showNative && (
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "NotoSansBengali_400Regular",
                        color: isDark ? "#94A3B8" : "#475569",
                        marginBottom: 12
                      }}
                    >
                      {tx(unit.descriptionEn, unit.descriptionBn)}
                    </Text>
                  )}

                  {/* Color-Coded Key Nouns with Audio & Voice Practice */}
                  <View
                    style={{
                      backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                      borderRadius: 14,
                      padding: 12,
                      marginBottom: 14,
                      borderWidth: 1,
                      borderColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginBottom: 8,
                        textTransform: "uppercase"
                      }}
                    >
                      Key Nouns (Gender Color-Coded)
                    </Text>

                    <View style={{ gap: 10 }}>
                      {unit.keyNouns.map((n) => (
                        <View
                          key={n.noun}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 8
                          }}
                        >
                          <View style={{ flex: 1, minWidth: 150 }}>
                            <GenderNounBadge
                              article={n.article}
                              noun={n.noun}
                              plural={n.plural}
                              size="sm"
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: "NotoSansBengali_500Medium",
                                color: isDark ? "#D6EFE6" : "#475569",
                                marginTop: 3
                              }}
                            >
                              {languageMode === "en"
                                ? n.en
                                : `${n.en} • ${tx(n.en, n.bn, n.noun)}`}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 6
                            }}
                          >
                            <SpeakButton
                              text={`${n.article} ${n.noun}`}
                              size="sm"
                              showSlowOption={true}
                            />
                            <VoicePracticeButton
                              targetText={`${n.article} ${n.noun}`}
                              translationEn={n.en}
                              translationBn={n.bn}
                              size="sm"
                            />
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Start Interactive Lesson Button */}
                  <BlastPressable
                    onPress={() => startLesson(unit)}
                    style={{
                      backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                      borderRadius: 14,
                      paddingVertical: 13,
                      paddingHorizontal: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8
                    }}
                  >
                    <Play size={17} color="#FFFFFF" fill="#FFFFFF" />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      {isCompleted
                        ? "Practice Unit Again (Listening, Builder, Speaking)"
                        : "Start Interactive Lesson (4 Challenges)"}
                    </Text>
                    <ChevronRight size={17} color="#FFFFFF" />
                  </BlastPressable>
                </MaterialGlassCard>

                {/* Vertical Connector Line */}
                {hasMore && (
                  <View
                    style={{
                      width: 3,
                      height: 22,
                      backgroundColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
                      alignSelf: "center"
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>
        </MotionEntrance>

        {/* Level-Specific Kapitel Vocabulary Sections (from a1.csv, a2.csv, b1.csv) */}
        <MotionEntrance delay={180} direction="up" triggerKey={activeLevel}>
        <View style={{ paddingHorizontal: 16, marginTop: 22 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <BookMarked size={18} color={isPink ? "#DB2777" : "#0B6B4F"} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#F0FDF9" : "#062E22"
                }}
              >
                {activeLevel} Kapitel Vocabulary ({levelCsvWords.length} Words)
              </Text>
            </View>

            <BlastPressable
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/vocabulary",
                  params: { level: activeLevel, chapter: "ALL" }
                })
              }
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_700Bold",
                  color: (isPink ? "#DB2777" : "#0B6B4F")
                }}
              >
                Open All {activeLevel} →
              </Text>
            </BlastPressable>
          </View>

          <View style={{ gap: 8 }}>
            {levelChapters.map((ch, idx) => (
              <BlastPressable
                key={ch.chapterName}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/vocabulary",
                    params: { level: activeLevel, chapter: ch.chapterName }
                  })
                }
                style={{
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 13,
                  borderWidth: 1,
                  borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    paddingRight: 8
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: isDark ? "#064E3B" : (isPink ? "#FDF2F8" : "#EAF7F2"),
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")
                      }}
                    >
                      {idx + 1}
                    </Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "NotoSansBengali_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      {ch.chapterName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginTop: 2
                      }}
                    >
                      {activeLevel} Section • {ch.count} flashcards & audio words
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC"),
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 999
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#34D399" : (isPink ? "#DB2777" : "#0B6B4F")
                    }}
                  >
                    {ch.count} words
                  </Text>
                  <ChevronRight
                    size={14}
                    color={isDark ? "#34D399" : (isPink ? "#DB2777" : "#0B6B4F")}
                  />
                </View>
              </BlastPressable>
            ))}
          </View>
        </View>
        </MotionEntrance>
      </ScrollView>

      <ScrollToTopButton visible={showScrollTop} onPress={scrollToTop} />

      {/* Interactive Lesson Modal */}
      <Modal
        visible={!!activeLesson}
        animationType="slide"
        onRequestClose={() => setActiveLesson(null)}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: isDark ? (isBlack ? "#000000" : "#041E16") : (isPink ? "#FFF0F5" : "#EDF7F3")
          }}
        >
          {activeLesson && !lessonFinished && currentExercise && (
            <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 12 }}>
              {/* Top Progress Bar */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 18
                }}
              >
                <BlastPressable
                  onPress={() => setActiveLesson(null)}
                  style={{
                    padding: 8,
                    borderRadius: 999,
                    backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9")
                  }}
                >
                  <X size={20} color={isDark ? (isPink ? "#FFF0F5" : "#EDF7F3") : (isBlack ? "#171717" : "#052219")} />
                </BlastPressable>

                <AnimatedProgressBar
                  percent={
                    ((exerciseIdx + 1) / Math.max(1, exerciseQueue.length)) *
                    100
                  }
                  height={10}
                  trackColor={
                    isDark
                      ? isBlack
                        ? "#0F0F0F"
                        : "#082E22"
                      : isPink
                      ? "#FBCFE8"
                      : "#C6E4D9"
                  }
                  fillColor={
                    isRetryAttempt
                      ? "#D97706"
                      : isPink
                      ? "#DB2777"
                      : "#0B6B4F"
                  }
                  style={{ flex: 1 }}
                />

                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#D6EFE6" : "#475569"
                  }}
                >
                  {exerciseIdx + 1}/{exerciseQueue.length}
                </Text>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 32 }}
              >
                {/* Exercise Type Pill */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 12
                  }}
                >
                  <View
                    style={{
                      backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FDF2F8" : "#EAF7F2"),
                      paddingHorizontal: 12,
                      paddingVertical: 5,
                      borderRadius: 999
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F"),
                        textTransform: "uppercase"
                      }}
                    >
                      {currentExercise.type === "listening"
                        ? "🎧 Listening Comprehension"
                        : currentExercise.type === "article_match"
                        ? "🎨 Gender Article Matching (der/die/das)"
                        : currentExercise.type === "sentence_builder"
                        ? "🧩 Word-Bank Sentence Builder"
                        : "🎙️ Mandatory Speaking Challenge"}
                    </Text>
                  </View>

                  {isRetryAttempt && (
                    <View
                      style={{
                        backgroundColor: "#FEF3C7",
                        borderColor: "#D97706",
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 999
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_700Bold",
                          color: "#B45309"
                        }}
                      >
                        🔄 RETRY QUESTION (MUST MASTER)
                      </Text>
                    </View>
                  )}
                </View>

                {/* Prompt Card */}
                <MotionEntrance
                  delay={0}
                  direction="right"
                  triggerKey={exerciseIdx}
                >
                <MaterialGlassCard
                  borderRadius={20}
                  padding={18}
                  watermarkText={`${currentExercise.promptDe} ${currentExercise.promptEn}`}
                  style={{
                    marginBottom: 18
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#94A3B8" : "#64748B"
                      }}
                    >
                      German Audio (1.0x & 0.7x)
                    </Text>
                    <SpeakButton
                      text={currentExercise.promptDe}
                      size="md"
                      showSlowOption={true}
                    />
                  </View>

                  <TappableGermanText
                    text={
                      currentExercise.type === "article_match"
                        ? `___ ${currentExercise.noun}`
                        : currentExercise.promptDe
                    }
                    level={activeLesson.level}
                    sentenceEn={currentExercise.promptEn}
                    sentenceBn={currentExercise.promptBn}
                    containerStyle={{ marginBottom: 8 }}
                    textStyle={{
                      fontSize: 20,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22"
                    }}
                  />

                  {showEn && (
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#D6EFE6" : "#475569",
                        marginBottom: 4
                      }}
                    >
                      🇬🇧 {currentExercise.promptEn}
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
                        currentExercise.promptEn,
                        currentExercise.promptBn,
                        currentExercise.promptDe
                      )}
                    </Text>
                  )}
                </MaterialGlassCard>
                </MotionEntrance>

                {/* 1. LISTENING COMPREHENSION OPTIONS */}
                {currentExercise.type === "listening" &&
                  currentExercise.options && (
                    <View style={{ gap: 10 }}>
                      {currentExercise.options.map((option) => {
                        const active = selectedOption === option;
                        return (
                          <BlastPressable
                            key={option}
                            onPress={() => !isChecked && setSelectedOption(option)}
                            style={{
                              padding: 16,
                              borderRadius: 16,
                              backgroundColor: active
                                ? isDark
                                  ? "#064E3B"
                                  : (isPink ? "#FDF2F8" : "#EAF7F2")
                                : isDark
                                ? (isBlack ? "#0F0F0F" : "#082E22")
                                : "#FFFFFF",
                              borderWidth: 2,
                              borderColor: active
                                ? (isPink ? "#DB2777" : "#0B6B4F")
                                : isDark
                                ? (isBlack ? "#262626" : "#134E3A")
                                : (isPink ? "#FBCFE8" : "#C6E4D9")
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "Inter_600SemiBold",
                                color: isDark ? "#F0FDF9" : "#062E22"
                              }}
                            >
                              {option}
                            </Text>
                          </BlastPressable>
                        );
                      })}
                    </View>
                  )}

                {/* 2. ARTICLE MATCHING (Strict Gender Color Coding) */}
                {currentExercise.type === "article_match" && (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      justifyContent: "space-between"
                    }}
                  >
                    {(["der", "die", "das"] as GermanArticle[]).map((art) => {
                      const active = selectedOption === art;
                      const palette = GENDER_COLORS[art];
                      return (
                        <BlastPressable
                          key={art}
                          onPress={() => !isChecked && setSelectedOption(art)}
                          style={{
                            flex: 1,
                            paddingVertical: 20,
                            borderRadius: 18,
                            alignItems: "center",
                            backgroundColor: active
                              ? palette.hex
                              : isDark
                              ? palette.bgDark
                              : palette.bgLight,
                            borderWidth: 2,
                            borderColor: palette.hex
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 22,
                              fontFamily: "Inter_700Bold",
                              color: active ? "#FFFFFF" : palette.hex
                            }}
                          >
                            {art}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontFamily: "NotoSansBengali_600SemiBold",
                              color: active
                                ? "rgba(255,255,255,0.9)"
                                : palette.hex,
                              marginTop: 4
                            }}
                          >
                            {art === "der"
                              ? "পুংলিঙ্গ"
                              : art === "die"
                              ? "স্ত্রীলিঙ্গ"
                              : "ক্লীবলিঙ্গ"}
                          </Text>
                        </BlastPressable>
                      );
                    })}
                  </View>
                )}

                {/* 3. WORD-BANK SENTENCE BUILDING */}
                {currentExercise.type === "sentence_builder" &&
                  currentExercise.wordBank && (
                    <View>
                      {/* Constructed Sentence Slot */}
                      <View
                        style={{
                          minHeight: 72,
                          backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC"),
                          borderRadius: 16,
                          padding: 12,
                          borderWidth: 1.5,
                          borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 8,
                          marginBottom: 16
                        }}
                      >
                        {builtWords.length === 0 ? (
                          <Text
                            style={{
                              color: isDark ? "#64748B" : "#94A3B8",
                              fontFamily: "Inter_500Medium",
                              fontSize: 13
                            }}
                          >
                            Tap words below in the correct German order...
                          </Text>
                        ) : (
                          builtWords.map((w, i) => (
                            <BlastPressable
                              key={`${w}-${i}`}
                              onPress={() => {
                                if (isChecked) return;
                                setBuiltWords((prev) =>
                                  prev.filter((_, idx) => idx !== i)
                                );
                              }}
                              style={{
                                backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 10
                              }}
                            >
                              <Text
                                style={{
                                  color: "#FFFFFF",
                                  fontFamily: "Inter_600SemiBold",
                                  fontSize: 14
                                }}
                              >
                                {w}
                              </Text>
                            </BlastPressable>
                          ))
                        )}
                      </View>

                      {/* Word Bank */}
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 8
                        }}
                      >
                        {currentExercise.wordBank.map((word, idx) => {
                          const usedCount = builtWords.filter(
                            (bw) => bw === word
                          ).length;
                          const totalCount =
                            currentExercise.wordBank?.filter((w) => w === word)
                              .length ?? 1;
                          const isDisabled = usedCount >= totalCount;

                          return (
                            <BlastPressable
                              key={`${word}-${idx}`}
                              disabled={isDisabled || isChecked}
                              onPress={() =>
                                setBuiltWords((prev) => [...prev, word])
                              }
                              style={{
                                paddingHorizontal: 14,
                                paddingVertical: 10,
                                borderRadius: 12,
                                backgroundColor: isDisabled
                                  ? isDark
                                    ? (isBlack ? "#171717" : "#052219")
                                    : (isPink ? "#FBCFE8" : "#C6E4D9")
                                  : isDark
                                  ? (isBlack ? "#0F0F0F" : "#082E22")
                                  : "#FFFFFF",
                                borderWidth: 1,
                                borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
                                opacity: isDisabled ? 0.35 : 1
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontFamily: "Inter_600SemiBold",
                                  color: isDark ? "#F0FDF9" : "#062E22"
                                }}
                              >
                                {word}
                              </Text>
                            </BlastPressable>
                          );
                        })}
                      </View>
                    </View>
                  )}

                {/* 4. MANDATORY SPEAKING CHALLENGE */}
                {currentExercise.type === "speaking" && (
                  <View
                    style={{
                      backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
                      borderRadius: 20,
                      padding: 20,
                      alignItems: "center",
                      borderWidth: 1.5,
                      borderColor:
                        speakingScore !== null && speakingScore >= 80
                          ? "#16A34A"
                          : "#DB2777"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#F0FDF9" : "#062E22",
                        textAlign: "center",
                        marginBottom: 14
                      }}
                    >
                      Speak this sentence aloud in the Voice Practice Studio to
                      complete the challenge (+5 Bonus XP at ≥80%):
                    </Text>

                    <BlastPressable
                      onPress={() => setVoiceModalOpen(true)}
                      style={{
                        backgroundColor: "#DB2777",
                        paddingHorizontal: 22,
                        paddingVertical: 14,
                        borderRadius: 999,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8
                      }}
                    >
                      <Mic size={20} color="#FFFFFF" />
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: "Inter_700Bold",
                          color: "#FFFFFF"
                        }}
                      >
                        {speakingScore !== null
                          ? `Practiced (${speakingScore}%) • Practice Again`
                          : "Open Voice Practice Studio"}
                      </Text>
                    </BlastPressable>

                    <VoicePracticeModal
                      visible={voiceModalOpen}
                      onClose={() => setVoiceModalOpen(false)}
                      targetText={currentExercise.promptDe}
                      translationEn={currentExercise.promptEn}
                      translationBn={currentExercise.promptBn}
                      onSuccess={(score) => {
                        setSpeakingScore(score);
                        setIsCorrect(true);
                        setIsChecked(true);
                      }}
                    />
                  </View>
                )}

                {/* Feedback Box after Check */}
                {isChecked && (
                  <MotionFeedbackBanner
                    isCorrect={isCorrect}
                    triggerKey={`${exerciseIdx}-${isChecked}`}
                    style={{
                      marginTop: 18,
                      padding: 16,
                      borderRadius: 16,
                      backgroundColor: isCorrect
                        ? isDark
                          ? "rgba(22, 163, 74, 0.2)"
                          : "#F0FDF4"
                        : isDark
                        ? "rgba(220, 38, 38, 0.2)"
                        : "#FEF2F2",
                      borderWidth: 1,
                      borderColor: isCorrect ? "#16A34A" : "#DC2626"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_700Bold",
                        color: isCorrect ? "#16A34A" : "#DC2626",
                        marginBottom: 4
                      }}
                    >
                      {isCorrect
                        ? "Richtig! খুব ভালো! (Correct)"
                        : `Correct Answer: ${currentExercise.correctAnswer}`}
                    </Text>
                    {showEn && (
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "Inter_500Medium",
                          color: isDark ? "#D6EFE6" : "#1F5E48"
                        }}
                      >
                        💡 {currentExercise.tipEn}
                      </Text>
                    )}
                    {showNative && (
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "NotoSansBengali_500Medium",
                          color: isDark ? "#93C5FD" : "#1D4ED8",
                          marginTop: 2
                        }}
                      >
                        💡 {tx(currentExercise.tipEn, currentExercise.tipBn)}
                      </Text>
                    )}
                    {!isCorrect && (
                      <View
                        style={{
                          marginTop: 10,
                          paddingTop: 8,
                          borderTopWidth: 1,
                          borderTopColor: "rgba(220, 38, 38, 0.3)"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "NotoSansBengali_700Bold",
                            color: "#DC2626"
                          }}
                        >
                          🔄 Added to Retry Queue: This question will repeat
                          until you answer it correctly! (সঠিক উত্তর না দেওয়া
                          পর্যন্ত প্রশ্নটি পুনরায় আসবে)
                        </Text>
                      </View>
                    )}
                  </MotionFeedbackBanner>
                )}
              </ScrollView>

              {/* Bottom Action Button */}
              <View style={{ paddingVertical: 14 }}>
                {!isChecked ? (
                  <BlastPressable
                    onPress={handleCheckAnswer}
                    style={{
                      backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                      paddingVertical: 15,
                      borderRadius: 16,
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      {currentExercise.type === "speaking" &&
                      speakingScore === null
                        ? "Launch Voice Speaking Challenge"
                        : "Check Answer"}
                    </Text>
                  </BlastPressable>
                ) : (
                  <BlastPressable
                    onPress={handleNextExercise}
                    style={{
                      backgroundColor: isCorrect ? "#16A34A" : "#D97706",
                      paddingVertical: 15,
                      borderRadius: 16,
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      {exerciseIdx + 1 < exerciseQueue.length
                        ? isCorrect
                          ? "Next Challenge →"
                          : "Continue (Will Repeat Later) →"
                        : "Complete Unit & Claim XP 🎉"}
                    </Text>
                  </BlastPressable>
                )}
              </View>
            </View>
          )}

          {/* Unit Completion Celebration View */}
          {activeLesson && lessonFinished && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 24
              }}
            >
              <View
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 42,
                  backgroundColor: "#DCFCE7",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18
                }}
              >
                <Award size={44} color="#16A34A" />
              </View>

              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#F0FDF9" : "#062E22",
                  textAlign: "center",
                  marginBottom: 6
                }}
              >
                Unit Completed! অভিনন্দন!
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
                You mastered "{activeLesson.titleDe}" and earned +
                {activeLesson.xpReward} XP towards your Daily Aim!
              </Text>

              <BlastPressable
                onPress={() => setActiveLesson(null)}
                style={{
                  backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                  paddingHorizontal: 32,
                  paddingVertical: 15,
                  borderRadius: 999
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_700Bold",
                    color: "#FFFFFF"
                  }}
                >
                  Back to Learning Path
                </Text>
              </BlastPressable>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
