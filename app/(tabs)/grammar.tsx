import { BlastPressable } from "../../src/components/motion/BlastPressable";
import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,
  Sparkles,
  X
} from "lucide-react-native";
import { GlobalHeader } from "../../src/components/common/GlobalHeader";
import { CEFRLevelPills } from "../../src/components/common/CEFRLevelPills";
import { GenderNounBadge } from "../../src/components/common/GenderNounBadge";
import { MaterialGlassCard } from "../../src/components/common/MaterialGlassCard";
import { TappableGermanText } from "../../src/components/common/TappableGermanText";
import {
  ScrollToTopButton,
  useScrollToTop
} from "../../src/components/common/ScrollToTopButton";
import { SectionProgressBar } from "../../src/components/common/SectionProgressBar";
import {
  AnimatedChevron,
  AnimatedProgressBar,
  MotionCollapse,
  MotionEntrance,
  MotionFeedbackBanner,
  MotionLayoutCard
} from "../../src/components/motion/MotionViews";
import { SpeakButton, VoicePracticeButton } from "../../src/components/audio";
import { GRAMMAR_TOPICS } from "../../src/data/grammar";
import { CEFR_META } from "../../src/constants/theme";
import { useApp } from "../../src/context/AppContext";
import { CEFRLevel, GrammarQuizQuestion, GrammarTopic } from "../../src/types";
import { useAppLanguage } from "../../src/utils/i18n";
import { playFeedbackSound } from "../../src/utils/soundEffects";

export default function GrammarScreen() {
  const {
    isHydrated,
    activeLevel,
    setActiveLevel,
    languageMode,
    themeMode,
    completedGrammarQuizIds,
    markGrammarQuizCompleted,
    toggleGrammarTopicCompleted,
    grammarShowAllLevels,
    setGrammarShowAllLevels,
    grammarQuizSession,
    setGrammarQuizSession
  } = useApp();

  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";
  const showAllLevels = grammarShowAllLevels;
  const setShowAllLevels = setGrammarShowAllLevels;

  // Collapsible section state (each grammar section can be minimized/opened)
  const [expandedTopicIds, setExpandedTopicIds] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop();
  const { showEn, showNative, nativeMeta, tx } = useAppLanguage();
  const nativeFlag = nativeMeta.flag === "🌐" ? "🇧🇩" : nativeMeta.flag;

  // Interactive 5-Question Mini-Quiz Modal State (with Retry Queue until 100% correct)
  const [quizTopic, setQuizTopic] = useState<GrammarTopic | null>(null);
  const [questionQueue, setQuestionQueue] = useState<GrammarQuizQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredTopics = useMemo(() => {
    const byLevel = showAllLevels
      ? GRAMMAR_TOPICS
      : GRAMMAR_TOPICS.filter((t) => t.level === activeLevel);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byLevel;

    return byLevel.filter((t) => {
      if (
        t.titleDe.toLowerCase().includes(q) ||
        t.titleEn.toLowerCase().includes(q) ||
        t.titleBn.toLowerCase().includes(q) ||
        t.formula.toLowerCase().includes(q) ||
        t.explanationEn.toLowerCase().includes(q) ||
        t.explanationBn.toLowerCase().includes(q)
      ) {
        return true;
      }
      if (
        t.examples.some(
          (ex) =>
            ex.german.toLowerCase().includes(q) ||
            ex.english.toLowerCase().includes(q) ||
            ex.bangla.toLowerCase().includes(q)
        )
      ) {
        return true;
      }
      if (
        t.tables?.some(
          (tbl) =>
            tbl.titleEn.toLowerCase().includes(q) ||
            (tbl.titleBn?.toLowerCase().includes(q) ?? false) ||
            tbl.headers.some((h) => h.toLowerCase().includes(q)) ||
            tbl.rows.some((r) => r.some((cell) => cell.toLowerCase().includes(q)))
        )
      ) {
        return true;
      }
      return false;
    });
  }, [showAllLevels, activeLevel, searchQuery]);

  const grammarLevelLabels = useMemo(() => {
    const labels: Partial<Record<CEFRLevel, string>> = {};
    for (const lvl of ["A1", "A2", "B1", "B2"] as CEFRLevel[]) {
      const topicsForLvl = GRAMMAR_TOPICS.filter((t) => t.level === lvl);
      const doneCount = topicsForLvl.filter((t) =>
        completedGrammarQuizIds.includes(t.id)
      ).length;
      labels[lvl] = `${doneCount}/${topicsForLvl.length} sections`;
    }
    return labels;
  }, [completedGrammarQuizIds]);

  const totalCompletedGrammarCount = useMemo(
    () =>
      GRAMMAR_TOPICS.filter((t) =>
        completedGrammarQuizIds.includes(t.id)
      ).length,
    [completedGrammarQuizIds]
  );

  const completedInFilteredCount = useMemo(
    () =>
      filteredTopics.filter((t) => completedGrammarQuizIds.includes(t.id))
        .length,
    [filteredTopics, completedGrammarQuizIds]
  );

  const toggleTopic = (topicId: string) => {
    setExpandedTopicIds((prev) => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const allExpanded =
    filteredTopics.length > 0 &&
    filteredTopics.every((t) => !!expandedTopicIds[t.id]);

  const toggleAllTopics = () => {
    if (allExpanded) {
      setExpandedTopicIds({});
    } else {
      const next: Record<string, boolean> = {};
      for (const t of filteredTopics) {
        next[t.id] = true;
      }
      setExpandedTopicIds(next);
    }
  };

  const startQuiz = (topic: GrammarTopic) => {
    setQuizTopic(topic);
    setQuestionQueue([...topic.quiz]);
    setQIndex(0);
    setSelectedAns(null);
    setAnswered(false);
    setCorrectCount(0);
    setQuizFinished(false);
    setGrammarQuizSession({
      topicId: topic.id,
      questionQueue: [...topic.quiz],
      qIndex: 0,
      correctCount: 0
    });
  };

  const resumableTopic = useMemo(() => {
    if (!grammarQuizSession) return null;
    return (
      GRAMMAR_TOPICS.find((t) => t.id === grammarQuizSession.topicId) ?? null
    );
  }, [grammarQuizSession]);

  // Clear stale saved quiz sessions whose topic IDs no longer exist
  useEffect(() => {
    if (isHydrated && grammarQuizSession && !resumableTopic) {
      setGrammarQuizSession(null);
    }
  }, [isHydrated, grammarQuizSession, resumableTopic, setGrammarQuizSession]);

  const resumeSavedQuiz = () => {
    if (!grammarQuizSession) return;
    const found = GRAMMAR_TOPICS.find(
      (t) => t.id === grammarQuizSession.topicId
    );
    if (!found || !grammarQuizSession.questionQueue?.length) {
      setGrammarQuizSession(null);
      return;
    }
    setQuizTopic(found);
    setQuestionQueue(grammarQuizSession.questionQueue);
    setQIndex(
      Math.min(
        grammarQuizSession.qIndex,
        grammarQuizSession.questionQueue.length - 1
      )
    );
    setSelectedAns(null);
    setAnswered(false);
    setCorrectCount(grammarQuizSession.correctCount);
    setQuizFinished(false);
  };

  const currentQuestion = questionQueue[qIndex];
  const isRetryQuizQuestion =
    !!quizTopic && qIndex >= quizTopic.quiz.length;

  const handleSelectQuizOption = (option: string) => {
    if (answered || !currentQuestion) return;
    setSelectedAns(option);
    setAnswered(true);
    const isRight = option === currentQuestion.correctAnswer;
    playFeedbackSound(isRight);
    if (isRight) {
      setCorrectCount((prev) => prev + 1);
    } else {
      // Repeat wrong question until user answers it correctly!
      setQuestionQueue((prev) => [...prev, currentQuestion]);
    }
  };

  const handleNextQuestion = () => {
    if (!quizTopic) return;
    if (qIndex + 1 < questionQueue.length) {
      const nextIdx = qIndex + 1;
      setQIndex(nextIdx);
      setSelectedAns(null);
      setAnswered(false);
      setGrammarQuizSession({
        topicId: quizTopic.id,
        questionQueue,
        qIndex: nextIdx,
        correctCount
      });
    } else {
      playFeedbackSound(true);
      markGrammarQuizCompleted(quizTopic.id, 15);
      setQuizFinished(true);
    }
  };

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
        <CEFRLevelPills
          selectedLevel={activeLevel}
          onSelectLevel={(lvl: CEFRLevel) => {
            setShowAllLevels(false);
            setActiveLevel(lvl);
          }}
          showAllOption={true}
          isAllSelected={showAllLevels}
          onSelectAll={() => setShowAllLevels(true)}
          customLevelLabels={grammarLevelLabels}
          allLabel={`${totalCompletedGrammarCount}/${GRAMMAR_TOPICS.length}`}
        />

        <SectionProgressBar
          label={
            showAllLevels
              ? "Overall Grammar Progress"
              : `${activeLevel} Grammar Progress`
          }
          completed={
            showAllLevels
              ? totalCompletedGrammarCount
              : GRAMMAR_TOPICS.filter(
                  (t) =>
                    t.level === activeLevel &&
                    completedGrammarQuizIds.includes(t.id)
                ).length
          }
          total={
            showAllLevels
              ? GRAMMAR_TOPICS.length
              : GRAMMAR_TOPICS.filter((t) => t.level === activeLevel).length
          }
        />

        {/* Grammar Search Bar */}
        <View style={{ paddingHorizontal: 16, marginTop: 6, marginBottom: 4 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: isDark
                ? isBlack
                  ? "#0F0F0F"
                  : "#082E22"
                : "#FFFFFF",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: isDark
                ? isBlack
                  ? "#262626"
                  : "#134E3A"
                : isPink
                ? "#FBCFE8"
                : "#C6E4D9",
              paddingHorizontal: 12,
              paddingVertical: 8,
              gap: 8
            }}
          >
            <Search
              size={18}
              color={isDark ? "#6EE7B7" : isPink ? "#DB2777" : "#0B6B4F"}
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search grammar (e.g. Modal, Akkusativ, Perfekt, ADUSO)..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              style={{
                flex: 1,
                fontSize: 14,
                fontFamily: "Inter_500Medium",
                color: isDark ? "#F0FDF9" : "#062E22",
                paddingVertical: 2
              }}
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <Pressable
                onPress={() => setSearchQuery("")}
                hitSlop={8}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDark ? "#1E293B" : "#E2E8F0"
                }}
              >
                <X size={14} color={isDark ? "#CBD5E1" : "#475569"} />
              </Pressable>
            )}
          </View>
        </View>

        {isHydrated && grammarQuizSession && resumableTopic && !quizTopic && (
          <View style={{ paddingHorizontal: 16, marginTop: 4 }}>
            <BlastPressable
              onPress={resumeSavedQuiz}
              style={{
                backgroundColor: isDark ? "rgba(13, 148, 136, 0.2)" : "#F0FDFA",
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
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  paddingRight: 8,
                  fontSize: 12,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#5EEAD4" : "#0F766E"
                }}
              >
                ▶ Resume {resumableTopic.level} Quiz (Q{grammarQuizSession.qIndex + 1}/
                {grammarQuizSession.questionQueue.length})
              </Text>
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
                    setGrammarQuizSession(null);
                  }}
                  hitSlop={8}
                  accessibilityLabel="Exit saved grammar quiz"
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

        <MotionEntrance
          delay={50}
          direction="up"
          triggerKey={`${activeLevel}-${showAllLevels}`}
        >
        <View style={{ paddingHorizontal: 16, gap: 14, marginTop: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 2
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_600SemiBold",
                color: isDark ? "#A7F3D0" : (isPink ? "#9D174D" : "#1F5E48")
              }}
            >
              {completedInFilteredCount}/{filteredTopics.length} Completed • {filteredTopics.length} Sections
            </Text>
            <Pressable
              onPress={toggleAllTopics}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999,
                backgroundColor: isDark ? (isBlack ? "#171717" : "#0B3B2C") : (isPink ? "#FCE7F3" : "#DCFCE7")
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#6EE7B7" : (isPink ? "#BE185D" : "#0B6B4F")
                }}
              >
                {allExpanded ? "Minimize All" : "Open All"}
              </Text>
            </Pressable>
          </View>

          {filteredTopics.length === 0 && (
            <View
              style={{
                backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
                borderRadius: 20,
                padding: 24,
                alignItems: "center",
                borderWidth: 1,
                borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#F0FDF9" : "#062E22",
                  marginBottom: 6
                }}
              >
                No grammar sections found
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Inter_500Medium",
                  color: isDark ? "#94A3B8" : "#64748B",
                  textAlign: "center",
                  marginBottom: 14
                }}
              >
                Try another keyword or switch to All levels.
              </Text>
              {searchQuery.length > 0 && (
                <Pressable
                  onPress={() => setSearchQuery("")}
                  style={{
                    backgroundColor: isPink ? "#DB2777" : "#0B6B4F",
                    paddingHorizontal: 16,
                    paddingVertical: 9,
                    borderRadius: 999
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_700Bold",
                      color: "#FFFFFF"
                    }}
                  >
                    Clear Search
                  </Text>
                </Pressable>
              )}
            </View>
          )}

          {filteredTopics.map((topic, index) => {
            const quizDone = completedGrammarQuizIds.includes(topic.id);
            const meta = CEFR_META[topic.level];
            const isExpanded = !!expandedTopicIds[topic.id];
            const sectionNumber = index + 1;
            const sectionTopicName = topic.titleEn.replace(/^\d+\.\s*/, "");

            return (
              <MaterialGlassCard
                key={topic.id}
                animatedLayout={true}
                borderRadius={22}
                padding={18}
                accentColor={meta.badgeColor}
                watermarkText={isExpanded ? `${topic.titleDe} ${topic.titleEn}` : undefined}
              >
                {/* Collapsible Section Header */}
                <Pressable onPress={() => toggleTopic(topic.id)}>
                  {/* Header Badge Row */}
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
                        flexWrap: "wrap",
                        gap: 6,
                        flex: 1,
                        paddingRight: 8
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FCE7F3" : "#E2F2EC"),
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 999
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "Inter_700Bold",
                            color: isDark ? "#6EE7B7" : (isPink ? "#BE185D" : "#0B6B4F")
                          }}
                        >
                          Section {sectionNumber}: {sectionTopicName}
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: meta.badgeColor,
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 999
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "Inter_700Bold",
                            color: "#FFFFFF"
                          }}
                        >
                          {topic.level} GRAMMAR
                        </Text>
                      </View>

                      <Pressable
                        onPress={(e) => {
                          e.stopPropagation();
                          playFeedbackSound(!quizDone);
                          toggleGrammarTopicCompleted(topic.id);
                        }}
                        hitSlop={6}
                        style={{
                          backgroundColor: quizDone
                            ? isDark
                              ? "rgba(22, 163, 74, 0.24)"
                              : "#DCFCE7"
                            : isDark
                            ? isBlack
                              ? "#171717"
                              : "#052219"
                            : isPink
                            ? "#FDF2F8"
                            : "#F1F5F9",
                          borderWidth: 1,
                          borderColor: quizDone
                            ? "#16A34A"
                            : isDark
                            ? isBlack
                              ? "#334155"
                              : "#134E3A"
                            : isPink
                            ? "#FBCFE8"
                            : "#CBD5E1",
                          paddingHorizontal: 9,
                          paddingVertical: 4,
                          borderRadius: 999,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4
                        }}
                      >
                        <CheckCircle2
                          size={12}
                          color={
                            quizDone
                              ? "#16A34A"
                              : isDark
                              ? "#94A3B8"
                              : "#64748B"
                          }
                        />
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "Inter_700Bold",
                            color: quizDone
                              ? "#16A34A"
                              : isDark
                              ? "#CBD5E1"
                              : "#475569"
                          }}
                        >
                          {quizDone ? "Completed • +10 XP" : "Mark Complete (+10 XP)"}
                        </Text>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8
                      }}
                    >
                      {isExpanded && (
                        <SpeakButton
                          text={topic.titleDe}
                          size="sm"
                          showSlowOption={true}
                        />
                      )}
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FDF2F8" : "#F0FDF9")
                        }}
                      >
                        <AnimatedChevron
                          expanded={isExpanded}
                          size={18}
                          color={isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")}
                        />
                      </View>
                    </View>
                  </View>

                  {/* Topic Titles */}
                  {isExpanded ? (
                    <TappableGermanText
                      text={topic.titleDe}
                      level={topic.level}
                      sentenceEn={topic.titleEn}
                      sentenceBn={topic.titleBn}
                      containerStyle={{ marginBottom: 4 }}
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22",
                        marginBottom: 4
                      }}
                    >
                      {topic.titleDe}
                    </Text>
                  )}

                  {showEn && (
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#D6EFE6" : "#1F5E48",
                        marginBottom: 2
                      }}
                    >
                      🇬🇧 {topic.titleEn}
                    </Text>
                  )}

                  {showNative && (
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "NotoSansBengali_600SemiBold",
                        color: isDark ? "#93C5FD" : "#1D4ED8",
                        marginBottom: isExpanded ? 12 : 0
                      }}
                    >
                      {nativeFlag} {tx(topic.titleEn, topic.titleBn, topic.titleDe)}
                    </Text>
                  )}
                </Pressable>

                <MotionCollapse expanded={isExpanded}>
                {/* German Structural Formula Box */}
                <View
                  style={{
                    backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FDF2F8" : "#EAF7F2"),
                    borderRadius: 14,
                    padding: 12,
                    borderLeftWidth: 4,
                    borderLeftColor: (isPink ? "#DB2777" : "#0B6B4F"),
                    marginBottom: 14
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#34D399" : (isPink ? "#DB2777" : "#0B6B4F"),
                      textTransform: "uppercase",
                      marginBottom: 4
                    }}
                  >
                    German Formula / Satzbauplan
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#D6EFE6" : "#1E1B4B"
                    }}
                  >
                    {topic.formula}
                  </Text>
                </View>

                {/* Dual Explanation */}
                {showEn && (
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Inter_400Regular",
                      color: isDark ? "#D6EFE6" : "#1F5E48",
                      lineHeight: 20,
                      marginBottom: 8
                    }}
                  >
                    {topic.explanationEn}
                  </Text>
                )}

                {showNative && (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "NotoSansBengali_400Regular",
                      color: isDark ? "#D6EFE6" : "#062E22",
                      lineHeight: 22,
                      marginBottom: 12
                    }}
                  >
                    {tx(topic.explanationEn, topic.explanationBn)}
                  </Text>
                )}

                {/* Structural Parallel Note Box */}
                <View
                  style={{
                    backgroundColor: isDark
                      ? "rgba(13, 148, 136, 0.15)"
                      : "#F0FDFA",
                    borderRadius: 14,
                    padding: 13,
                    borderWidth: 1,
                    borderColor: isDark ? "#0F766E" : "#99F6E4",
                    marginBottom: 16
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 4
                    }}
                  >
                    <Sparkles size={15} color="#0D9488" />
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#5EEAD4" : "#0F766E",
                        textTransform: "uppercase"
                      }}
                    >
                      Structural Parallel ({nativeFlag})
                    </Text>
                  </View>

                  {showEn && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#CCFBF1" : "#134E4A",
                        marginBottom: 4
                      }}
                    >
                      {topic.banglaParallelNoteEn}
                    </Text>
                  )}

                  {showNative && (
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "NotoSansBengali_500Medium",
                        color: isDark ? "#99F6E4" : "#115E59"
                      }}
                    >
                      {tx(topic.banglaParallelNoteEn, topic.banglaParallelNoteBn)}
                    </Text>
                  )}
                </View>

                {/* Structured Grammar Tables (with proper headers) */}
                {topic.tables && topic.tables.length > 0 && (
                  <View style={{ gap: 14, marginBottom: 16 }}>
                    {topic.tables.map((table, tIdx) => (
                      <View
                        key={`${topic.id}-table-${tIdx}`}
                        style={{
                          borderRadius: 14,
                          borderWidth: 1,
                          borderColor: isDark
                            ? isBlack
                              ? "#262626"
                              : "#134E3A"
                            : isPink
                            ? "#FBCFE8"
                            : "#C6E4D9",
                          overflow: "hidden",
                          backgroundColor: isDark
                            ? isBlack
                              ? "#121212"
                              : "#06241B"
                            : "#FFFFFF"
                        }}
                      >
                        <View
                          style={{
                            paddingHorizontal: 12,
                            paddingVertical: 9,
                            backgroundColor: isDark
                              ? isBlack
                                ? "#1A1A1A"
                                : "#0B3B2C"
                              : isPink
                              ? "#FCE7F3"
                              : "#E2F2EC",
                            borderBottomWidth: 1,
                            borderBottomColor: isDark
                              ? isBlack
                                ? "#262626"
                                : "#134E3A"
                              : isPink
                              ? "#FBCFE8"
                              : "#C6E4D9"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Inter_700Bold",
                              color: isDark
                                ? "#6EE7B7"
                                : isPink
                                ? "#BE185D"
                                : "#0B6B4F"
                            }}
                          >
                            {table.titleEn}
                          </Text>
                          {table.titleBn && showNative && (
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: "NotoSansBengali_600SemiBold",
                                color: isDark ? "#93C5FD" : "#1D4ED8",
                                marginTop: 1
                              }}
                            >
                              {tx(table.titleEn, table.titleBn)}
                            </Text>
                          )}
                        </View>

                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{ minWidth: "100%" }}
                        >
                          <View style={{ minWidth: "100%" }}>
                            {/* Table Column Header Row */}
                            <View
                              style={{
                                flexDirection: "row",
                                backgroundColor: isDark
                                  ? isBlack
                                    ? "#1F2937"
                                    : "#0F4C3A"
                                  : isPink
                                  ? "#DB2777"
                                  : "#0B6B4F"
                              }}
                            >
                              {table.headers.map((header, hIdx) => (
                                <View
                                  key={`h-${hIdx}`}
                                  style={{
                                    flex: 1,
                                    minWidth: 92,
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    borderRightWidth:
                                      hIdx < table.headers.length - 1 ? 1 : 0,
                                    borderRightColor: "rgba(255,255,255,0.2)"
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 11,
                                      fontFamily: "Inter_700Bold",
                                      color: "#FFFFFF"
                                    }}
                                  >
                                    {header}
                                  </Text>
                                </View>
                              ))}
                            </View>

                            {/* Table Data Rows */}
                            {table.rows.map((row, rIdx) => (
                              <View
                                key={`r-${rIdx}`}
                                style={{
                                  flexDirection: "row",
                                  backgroundColor:
                                    rIdx % 2 === 0
                                      ? isDark
                                        ? isBlack
                                          ? "#121212"
                                          : "#06241B"
                                        : "#FFFFFF"
                                      : isDark
                                      ? isBlack
                                        ? "#181818"
                                        : "#092E23"
                                      : isPink
                                      ? "#FFF5F9"
                                      : "#F4FBF8",
                                  borderTopWidth: 1,
                                  borderTopColor: isDark
                                    ? isBlack
                                      ? "#262626"
                                      : "#134E3A"
                                    : isPink
                                    ? "#FBCFE8"
                                    : "#DCF2EA"
                                }}
                              >
                                {row.map((cell, cIdx) => (
                                  <View
                                    key={`c-${rIdx}-${cIdx}`}
                                    style={{
                                      flex: 1,
                                      minWidth: 92,
                                      paddingHorizontal: 10,
                                      paddingVertical: 8,
                                      borderRightWidth:
                                        cIdx < row.length - 1 ? 1 : 0,
                                      borderRightColor: isDark
                                        ? isBlack
                                          ? "#262626"
                                          : "#134E3A"
                                        : isPink
                                        ? "#FBCFE8"
                                        : "#DCF2EA"
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        fontFamily:
                                          cIdx === 0
                                            ? "Inter_700Bold"
                                            : "Inter_500Medium",
                                        color: isDark
                                          ? cIdx === 0
                                            ? "#6EE7B7"
                                            : "#E2E8F0"
                                          : cIdx === 0
                                          ? isPink
                                            ? "#BE185D"
                                            : "#065F46"
                                          : "#1E293B"
                                      }}
                                    >
                                      {cell}
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            ))}
                          </View>
                        </ScrollView>
                      </View>
                    ))}
                  </View>
                )}

                {/* German Example Sentences with <SpeakButton /> & <VoicePracticeButton /> */}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#94A3B8" : "#64748B",
                    textTransform: "uppercase",
                    marginBottom: 10
                  }}
                >
                  Example Sentences (Listen & Speak Aloud)
                </Text>

                <View style={{ gap: 10, marginBottom: 16 }}>
                  {topic.examples.map((ex, i) => (
                    <View
                      key={`${topic.id}-ex-${i}`}
                      style={{
                        backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                        borderRadius: 16,
                        padding: 13,
                        borderWidth: 1,
                        borderColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9")
                      }}
                    >
                      {ex.nounHighlight && ex.article && (
                        <View style={{ marginBottom: 6 }}>
                          <GenderNounBadge
                            article={ex.article}
                            noun={ex.nounHighlight}
                            size="sm"
                          />
                        </View>
                      )}

                      <TappableGermanText
                        text={ex.german}
                        level={topic.level}
                        sentenceEn={ex.english}
                        sentenceBn={ex.bangla}
                        containerStyle={{ marginBottom: 4 }}
                        textStyle={{
                          fontSize: 15,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#F0FDF9" : "#062E22"
                        }}
                      />

                      {showEn && (
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "Inter_500Medium",
                            color: isDark ? "#94A3B8" : "#475569"
                          }}
                        >
                          🇬🇧 {ex.english}
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
                          {nativeFlag} {tx(ex.english, ex.bangla, ex.german)}
                        </Text>
                      )}

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 8,
                          marginTop: 10
                        }}
                      >
                        <SpeakButton
                          text={ex.german}
                          size="sm"
                          showSlowOption={true}
                        />
                        <VoicePracticeButton
                          targetText={ex.german}
                          translationEn={ex.english}
                          translationBn={ex.bangla}
                          size="sm"
                        />
                      </View>
                    </View>
                  ))}
                </View>

                {/* 5-Question Interactive Mini-Quiz Button */}
                <BlastPressable
                  onPress={() => startQuiz(topic)}
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
                  <HelpCircle size={18} color="#FFFFFF" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_700Bold",
                      color: "#FFFFFF"
                    }}
                  >
                    Start 5-Question Interactive Mini-Quiz
                  </Text>
                </BlastPressable>
                </MotionCollapse>
              </MaterialGlassCard>
            );
          })}
        </View>
        </MotionEntrance>
      </ScrollView>

      <ScrollToTopButton visible={showScrollTop} onPress={scrollToTop} />

      {/* 5-Question Mini-Quiz Modal */}
      <Modal
        visible={!!quizTopic}
        animationType="slide"
        onRequestClose={() => setQuizTopic(null)}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: isDark ? (isBlack ? "#000000" : "#041E16") : (isPink ? "#FFF0F5" : "#EDF7F3")
          }}
        >
          {quizTopic && !quizFinished && currentQuestion && (
            <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12
                }}
              >
                <BlastPressable
                  onPress={() => setQuizTopic(null)}
                  style={{
                    padding: 8,
                    borderRadius: 999,
                    backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9")
                  }}
                >
                  <X size={20} color={isDark ? (isPink ? "#FFF0F5" : "#EDF7F3") : (isBlack ? "#171717" : "#052219")} />
                </BlastPressable>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_700Bold",
                    color: isRetryQuizQuestion
                      ? "#D97706"
                      : isDark
                      ? (isPink ? "#FFF0F5" : "#EDF7F3")
                      : (isBlack ? "#171717" : "#052219")
                  }}
                >
                  {quizTopic.level} Mini-Quiz •{" "}
                  {isRetryQuizQuestion
                    ? `🔄 Retry (${qIndex + 1}/${questionQueue.length})`
                    : `Question ${qIndex + 1}/${questionQueue.length}`}
                </Text>

                <View style={{ width: 36 }} />
              </View>

              <AnimatedProgressBar
                percent={
                  questionQueue.length > 0
                    ? Math.round(((qIndex + (answered ? 1 : 0)) / questionQueue.length) * 100)
                    : 0
                }
                height={8}
                trackColor={
                  isDark
                    ? isBlack
                      ? "#262626"
                      : "#082E22"
                    : isPink
                    ? "#FCE7F3"
                    : "#C6E4D9"
                }
                fillColor={isRetryQuizQuestion ? "#D97706" : isPink ? "#DB2777" : "#0B6B4F"}
                style={{ marginBottom: 16 }}
              />

              <ScrollView showsVerticalScrollIndicator={false}>
                <MotionEntrance
                  direction="right"
                  distance={22}
                  triggerKey={`${quizTopic.id}-${qIndex}`}
                >
                <MaterialGlassCard
                  borderRadius={20}
                  padding={18}
                  watermarkText={currentQuestion.question}
                  style={{
                    marginBottom: 18
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22",
                      marginBottom: 12
                    }}
                  >
                    {currentQuestion.question}
                  </Text>
                  <SpeakButton
                    text={currentQuestion.correctAnswer}
                    size="sm"
                    showSlowOption={true}
                    label="Listen Hint"
                  />
                </MaterialGlassCard>

                <View style={{ gap: 10 }}>
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedAns === option;
                    const isRight = option === currentQuestion.correctAnswer;

                    let borderCol = isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9");
                    let bgCol = isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF";

                    if (answered) {
                      if (isRight) {
                        borderCol = "#16A34A";
                        bgCol = isDark
                          ? "rgba(22, 163, 74, 0.2)"
                          : "#F0FDF4";
                      } else if (isSelected) {
                        borderCol = "#DC2626";
                        bgCol = isDark
                          ? "rgba(220, 38, 38, 0.2)"
                          : "#FEF2F2";
                      }
                    }

                    return (
                      <BlastPressable
                        key={option}
                        onPress={() => handleSelectQuizOption(option)}
                        style={{
                          padding: 16,
                          borderRadius: 16,
                          backgroundColor: bgCol,
                          borderWidth: 2,
                          borderColor: borderCol
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
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
                </MotionEntrance>

                {answered && (
                  <MotionFeedbackBanner
                    isCorrect={selectedAns === currentQuestion.correctAnswer}
                    triggerKey={`${qIndex}-${selectedAns}`}
                    style={{
                      marginTop: 18,
                      padding: 16,
                      borderRadius: 16,
                      backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FDF2F8" : "#EAF7F2"),
                      borderWidth: 1,
                      borderColor: (isPink ? "#DB2777" : "#0B6B4F")
                    }}
                  >
                    {showEn && (
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "Inter_500Medium",
                          color: isDark ? "#D6EFE6" : "#062E22",
                          marginBottom: 4
                        }}
                      >
                        🇬🇧 {currentQuestion.explanationEn}
                      </Text>
                    )}
                    {showNative && (
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "NotoSansBengali_500Medium",
                          color: isDark ? "#93C5FD" : "#1D4ED8"
                        }}
                      >
                        {nativeFlag}{" "}
                        {tx(
                          currentQuestion.explanationEn,
                          currentQuestion.explanationBn
                        )}
                      </Text>
                    )}
                    {selectedAns !== currentQuestion.correctAnswer && (
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "NotoSansBengali_700Bold",
                          color: "#DC2626",
                          marginTop: 8
                        }}
                      >
                        🔄 Added to Retry Queue: This question will repeat until
                        you answer it correctly! (সঠিক উত্তর না দেওয়া পর্যন্ত
                        প্রশ্নটি পুনরায় আসবে)
                      </Text>
                    )}
                  </MotionFeedbackBanner>
                )}
              </ScrollView>

              {answered && (
                <View style={{ paddingVertical: 14 }}>
                  <BlastPressable
                    onPress={handleNextQuestion}
                    style={{
                      backgroundColor:
                        selectedAns === currentQuestion.correctAnswer
                          ? "#16A34A"
                          : "#D97706",
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
                      {qIndex + 1 < questionQueue.length
                        ? selectedAns === currentQuestion.correctAnswer
                          ? "Next Question →"
                          : "Continue (Will Repeat Later) →"
                        : "Finish Quiz & Claim +15 XP 🎉"}
                    </Text>
                  </BlastPressable>
                </View>
              )}
            </View>
          )}

          {quizTopic && quizFinished && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 24
              }}
            >
              <Award size={56} color="#16A34A" />
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#F0FDF9" : "#062E22",
                  marginTop: 14,
                  marginBottom: 6
                }}
              >
                Score: {correctCount} / {quizTopic.quiz.length}
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
                You completed the 5-question grammar quiz for{" "}
                {quizTopic.titleDe} and earned +15 XP!
              </Text>
              <BlastPressable
                onPress={() => setQuizTopic(null)}
                style={{
                  backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                  paddingHorizontal: 28,
                  paddingVertical: 14,
                  borderRadius: 999
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Inter_700Bold",
                    color: "#FFFFFF"
                  }}
                >
                  Back to Grammar Topics
                </Text>
              </BlastPressable>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
