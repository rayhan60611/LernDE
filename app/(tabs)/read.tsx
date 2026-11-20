import { BlastPressable } from "../../src/components/motion/BlastPressable";
import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  EyeOff,
  Search,
  Sparkles,
  Star,
  X
} from "lucide-react-native";
import { GlobalHeader } from "../../src/components/common/GlobalHeader";
import { CEFRLevelPills } from "../../src/components/common/CEFRLevelPills";
import { GenderNounBadge } from "../../src/components/common/GenderNounBadge";
import { MaterialGlassCard } from "../../src/components/common/MaterialGlassCard";
import { AnimatedStarButton } from "../../src/components/common/AnimatedStarButton";
import {
  ScrollToTopButton,
  useScrollToTop
} from "../../src/components/common/ScrollToTopButton";
import { SectionProgressBar } from "../../src/components/common/SectionProgressBar";
import {
  AnimatedChevron,
  MotionCollapse,
  MotionEntrance,
  MotionLayoutCard
} from "../../src/components/motion/MotionViews";
import { useWordInspector } from "../../src/context/WordInspectorContext";
import { SpeakButton, VoicePracticeButton } from "../../src/components/audio";
import { useActiveSpeechHighlight } from "../../src/utils/tts";
import { playFeedbackSound } from "../../src/utils/soundEffects";
import {
  lookupPassageWord,
  READING_PASSAGES
} from "../../src/data/passages";
import { CEFR_META, GENDER_COLORS } from "../../src/constants/theme";
import { useApp } from "../../src/context/AppContext";
import { useAppLanguage } from "../../src/utils/i18n";
import {
  CEFRLevel,
  PassageWordEntry,
  ReadingPassage,
  VocabularyItem
} from "../../src/types";

export default function ReadAndPlayScreen() {
  const router = useRouter();
  const {
    activeLevel,
    setActiveLevel,
    languageMode,
    themeMode,
    savedWords,
    isWordSaved,
    toggleSavedWord,
    readSelectedPassageId,
    setReadSelectedPassageId,
    readShowAllLevels,
    setReadShowAllLevels,
    readShowFullTranslation,
    setReadShowFullTranslation,
    completedReadPassageIds,
    toggleReadPassageCompleted
  } = useApp();

  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";
  const { scrollRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop();
  const { inspectWord } = useWordInspector();
  const { showEn, showNative, nativeMeta, tx } = useAppLanguage();
  const nativeFlag = nativeMeta.flag === "🌐" ? "🇧🇩" : nativeMeta.flag;
  const { activeText: activeSpokenText, activeWordIndex } =
    useActiveSpeechHighlight();

  const showAllLevels = readShowAllLevels;
  const setShowAllLevels = setReadShowAllLevels;
  const selectedPassageId = readSelectedPassageId || READING_PASSAGES[0].id;
  const setSelectedPassageId = setReadSelectedPassageId;
  const showFullTranslation = readShowFullTranslation;
  const setShowFullTranslation = setReadShowFullTranslation;

  // Collapsible story state & search (matching Grammar section style)
  const [expandedPassageIds, setExpandedPassageIds] = useState<
    Record<string, boolean>
  >({});
  const [searchQuery, setSearchQuery] = useState("");

  // Word Inspector Popup Modal State
  const [inspectedWord, setInspectedWord] = useState<PassageWordEntry | null>(
    null
  );

  const filteredPassages = useMemo(() => {
    const byLevel = showAllLevels
      ? READING_PASSAGES
      : READING_PASSAGES.filter((p) => p.level === activeLevel);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byLevel;

    return byLevel.filter((p) => {
      if (
        p.titleDe.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.titleBn.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ) {
        return true;
      }
      return p.sentences.some(
        (s) =>
          s.de.toLowerCase().includes(q) ||
          s.en.toLowerCase().includes(q) ||
          s.bn.toLowerCase().includes(q)
      );
    });
  }, [showAllLevels, activeLevel, searchQuery]);

  const readLevelLabels = useMemo(() => {
    const labels: Partial<Record<CEFRLevel, string>> = {};
    const doneIds = completedReadPassageIds ?? [];
    for (const lvl of ["A1", "A2", "B1", "B2"] as CEFRLevel[]) {
      const list = READING_PASSAGES.filter((p) => p.level === lvl);
      const done = list.filter((p) => doneIds.includes(p.id)).length;
      labels[lvl] = `${done}/${list.length} stories`;
    }
    return labels;
  }, [completedReadPassageIds]);

  const totalCompletedReadCount = useMemo(
    () =>
      READING_PASSAGES.filter((p) =>
        (completedReadPassageIds ?? []).includes(p.id)
      ).length,
    [completedReadPassageIds]
  );

  const completedInFilteredCount = useMemo(
    () =>
      filteredPassages.filter((p) =>
        (completedReadPassageIds ?? []).includes(p.id)
      ).length,
    [filteredPassages, completedReadPassageIds]
  );

  const togglePassage = (passageId: string) => {
    setExpandedPassageIds((prev) => ({
      ...prev,
      [passageId]: !prev[passageId]
    }));
  };

  const allExpanded =
    filteredPassages.length > 0 &&
    filteredPassages.every((p) => !!expandedPassageIds[p.id]);

  const toggleAllPassages = () => {
    if (allExpanded) {
      setExpandedPassageIds({});
    } else {
      const next: Record<string, boolean> = {};
      for (const p of filteredPassages) {
        next[p.id] = true;
      }
      setExpandedPassageIds(next);
    }
  };

  const activePassage: ReadingPassage = useMemo(() => {
    const found = filteredPassages.find((p) => p.id === selectedPassageId);
    return found ?? filteredPassages[0] ?? READING_PASSAGES[0];
  }, [filteredPassages, selectedPassageId]);

  const fullPassageGermanText = useMemo(
    () => activePassage.sentences.map((s) => s.de).join(" "),
    [activePassage]
  );

  const handleTapWord = (
    rawToken: string,
    passage: ReadingPassage,
    sentence: { de: string; en: string; bn: string }
  ) => {
    const entry = lookupPassageWord(rawToken, passage, sentence);
    inspectWord(entry, {
      level: passage.level,
      sentenceDe: sentence.de,
      sentenceEn: sentence.en,
      sentenceBn: sentence.bn
    });
  };

  const handleToggleFavoriteFromInspector = (entry: PassageWordEntry) => {
    const vocabItem: VocabularyItem = {
      id: `reader-${entry.lemma.toLowerCase()}`,
      level: activePassage.level,
      topic: "Saved from Reader",
      article: entry.article,
      german: entry.lemma,
      plural: entry.plural,
      english: entry.english,
      bangla: entry.bangla,
      exampleDe: entry.exampleDe,
      exampleEn: entry.exampleEn,
      exampleBn: entry.exampleBn
    };
    toggleSavedWord(vocabItem);
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: isDark ? (isBlack ? "#000000" : "#041E16") : (isPink ? "#FFF0F5" : "#EDF7F3")
      }}
    >
      {/* Top Banner Button: "Practice Saved Favorites (X words)" */}
      <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
        <BlastPressable
          onPress={() =>
            router.push({
              pathname: "/(tabs)/vocabulary",
              params: { deck: "saved" }
            })
          }
          style={{
            backgroundColor: isDark ? "rgba(217, 119, 6, 0.2)" : "#FEF3C7",
            borderWidth: 1.5,
            borderColor: "#D97706",
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Star size={17} color="#D97706" fill="#D97706" />
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#FDE68A" : "#92400E"
              }}
            >
              Practice Saved Favorites ({savedWords.length} words)
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_700Bold",
              color: "#D97706"
            }}
          >
            Open Deck →
          </Text>
        </BlastPressable>
      </View>

      {/* Top Sticky Audio Bar: Full-Passage Narration (1.0x / 0.7x) & Translation Toggle */}
      <MaterialGlassCard
        borderRadius={16}
        padding={12}
        style={{
          marginHorizontal: 16,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#94A3B8" : "#64748B",
              textTransform: "uppercase"
            }}
          >
            Full Audio:
          </Text>
          <SpeakButton
            text={fullPassageGermanText}
            size="sm"
            showSlowOption={true}
            label="Narrate 1.0x"
          />
        </View>

        <BlastPressable
          onPress={() => setShowFullTranslation(!showFullTranslation)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
            backgroundColor: showFullTranslation
              ? (isPink ? "#DB2777" : "#0B6B4F")
              : isDark
              ? (isBlack ? "#171717" : "#052219")
              : (isPink ? "#FCE7F3" : "#E2F2EC")
          }}
        >
          {showFullTranslation ? (
            <Eye size={14} color="#FFFFFF" />
          ) : (
            <EyeOff size={14} color={isDark ? "#94A3B8" : "#64748B"} />
          )}
          <Text
            style={{
              fontSize: 11,
              fontFamily: "NotoSansBengali_700Bold",
              color: showFullTranslation
                ? "#FFFFFF"
                : isDark
                ? "#94A3B8"
                : "#475569"
            }}
          >
            {showFullTranslation
              ? `${nativeMeta.pairShortLabel} Shown`
              : `Show ${nativeMeta.pairShortLabel}`}
          </Text>
        </BlastPressable>
      </MaterialGlassCard>

      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 105 }}
      >
        {/* CEFR Level Filter */}
        <CEFRLevelPills
          selectedLevel={activeLevel}
          onSelectLevel={(lvl: CEFRLevel) => {
            setShowAllLevels(false);
            setActiveLevel(lvl);
            const firstForLvl = READING_PASSAGES.find((p) => p.level === lvl);
            if (firstForLvl) setSelectedPassageId(firstForLvl.id);
          }}
          showAllOption={true}
          isAllSelected={showAllLevels}
          onSelectAll={() => setShowAllLevels(true)}
          customLevelLabels={readLevelLabels}
          allLabel={`${totalCompletedReadCount}/${READING_PASSAGES.length}`}
        />

        <SectionProgressBar
          label={
            showAllLevels
              ? "Overall Read & Play Progress"
              : `${activeLevel} Read & Play Progress`
          }
          completed={
            showAllLevels
              ? totalCompletedReadCount
              : READING_PASSAGES.filter(
                  (p) =>
                    p.level === activeLevel &&
                    (completedReadPassageIds ?? []).includes(p.id)
                ).length
          }
          total={
            showAllLevels
              ? READING_PASSAGES.length
              : READING_PASSAGES.filter((p) => p.level === activeLevel).length
          }
        />

        {/* Story Search Bar */}
        <View style={{ paddingHorizontal: 16, marginTop: 4, marginBottom: 4 }}>
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
              placeholder="Search stories (e.g. Karim, Café, Markt, Perfekt)..."
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

        {/* Collapsible Story List (Grammar Section Style) */}
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
                  color: isDark ? "#A7F3D0" : isPink ? "#9D174D" : "#1F5E48"
                }}
              >
                {completedInFilteredCount}/{filteredPassages.length} Completed •{" "}
                {filteredPassages.length} Stories
              </Text>
              <Pressable
                onPress={toggleAllPassages}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 999,
                  backgroundColor: isDark
                    ? isBlack
                      ? "#171717"
                      : "#0B3B2C"
                    : isPink
                    ? "#FCE7F3"
                    : "#DCFCE7"
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#6EE7B7" : isPink ? "#BE185D" : "#0B6B4F"
                  }}
                >
                  {allExpanded ? "Minimize All" : "Open All"}
                </Text>
              </Pressable>
            </View>

            {filteredPassages.length === 0 && (
              <View
                style={{
                  backgroundColor: isDark
                    ? isBlack
                      ? "#0F0F0F"
                      : "#082E22"
                    : "#FFFFFF",
                  borderRadius: 20,
                  padding: 24,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: isDark
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
                    fontSize: 15,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#F0FDF9" : "#062E22",
                    marginBottom: 6
                  }}
                >
                  No stories found
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

            {filteredPassages.map((passage, pIdx) => {
              const isExpanded = !!expandedPassageIds[passage.id];
              const isPassageDone = (completedReadPassageIds ?? []).includes(
                passage.id
              );
              const meta = CEFR_META[passage.level];
              const storyNumber = pIdx + 1;
              const cleanTitle = passage.titleDe.replace(/^\d+\.\s*/, "");
              const passageFullGerman = passage.sentences
                .map((s) => s.de)
                .join(" ");

              return (
                <MaterialGlassCard
                  key={passage.id}
                  animatedLayout={true}
                  borderRadius={22}
                  padding={18}
                  accentColor={meta.badgeColor}
                  watermarkText={isExpanded ? `${passage.titleDe} ${passage.titleEn} ${passage.category}` : undefined}
                >
                  {/* Collapsible Story Header */}
                  <Pressable
                    onPress={() => {
                      setSelectedPassageId(passage.id);
                      togglePassage(passage.id);
                    }}
                  >
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
                            backgroundColor: isDark
                              ? isBlack
                                ? "#262626"
                                : "#134E3A"
                              : isPink
                              ? "#FCE7F3"
                              : "#E2F2EC",
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 999
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontFamily: "Inter_700Bold",
                              color: isDark
                                ? "#6EE7B7"
                                : isPink
                                ? "#BE185D"
                                : "#0B6B4F"
                            }}
                          >
                            Story {storyNumber}: {cleanTitle}
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
                            {passage.level} STORY
                          </Text>
                        </View>

                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation();
                            playFeedbackSound(!isPassageDone);
                            toggleReadPassageCompleted(passage.id);
                          }}
                          hitSlop={6}
                          style={{
                            backgroundColor: isPassageDone
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
                            borderColor: isPassageDone
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
                              isPassageDone
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
                              color: isPassageDone
                                ? "#16A34A"
                                : isDark
                                ? "#CBD5E1"
                                : "#475569"
                            }}
                          >
                            {isPassageDone
                              ? "Completed • +20 XP"
                              : "Mark Complete (+20 XP)"}
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
                            text={passageFullGerman}
                            size="sm"
                            showSlowOption={true}
                            label="Narrate"
                          />
                        )}
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isDark
                              ? isBlack
                                ? "#171717"
                                : "#052219"
                              : isPink
                              ? "#FDF2F8"
                              : "#F0FDF9"
                          }}
                        >
                          <AnimatedChevron
                            expanded={isExpanded}
                            size={18}
                            color={
                              isDark
                                ? "#6EE7B7"
                                : isPink
                                ? "#DB2777"
                                : "#0B6B4F"
                            }
                          />
                        </View>
                      </View>
                    </View>

                    {/* Story Titles & Grammar Focus */}
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22",
                        marginBottom: 4
                      }}
                    >
                      {passage.titleDe}
                    </Text>

                    {showEn && (
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#D6EFE6" : "#1F5E48",
                          marginBottom: 2
                        }}
                      >
                        🇬🇧 {passage.titleEn}
                      </Text>
                    )}

                    {showNative && (
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: "NotoSansBengali_600SemiBold",
                          color: isDark ? "#93C5FD" : "#1D4ED8",
                          marginBottom: 6
                        }}
                      >
                        {nativeFlag}{" "}
                        {tx(passage.titleEn, passage.titleBn, passage.titleDe)}
                      </Text>
                    )}

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: isExpanded ? 12 : 0
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#94A3B8" : "#64748B"
                        }}
                      >
                        Grammar Focus: {passage.category} • {passage.readingTimeMinutes} min
                      </Text>
                    </View>
                  </Pressable>

                  <MotionCollapse expanded={isExpanded}>
                      <View
                        style={{
                          marginBottom: 14,
                          backgroundColor: isDark
                            ? isBlack
                              ? "#171717"
                              : "#052219"
                            : isPink
                            ? "#FDF2F8"
                            : "#EAF7F2",
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 12,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 6
                        }}
                      >
                        <Sparkles
                          size={14}
                          color={isPink ? "#DB2777" : "#0B6B4F"}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "NotoSansBengali_500Medium",
                            color: isDark ? "#D6EFE6" : "#064E3B",
                            flex: 1
                          }}
                        >
                          Tap ANY German word to inspect gender, meaning (
                          {nativeMeta.pairShortLabel}), audio, and voice practice!
                        </Text>
                      </View>

                      {/* Unified Paragraph Story Reader */}
                      {(() => {
                        const paragraphTokens: Array<{
                          token: string;
                          sentence: { de: string; en: string; bn: string };
                          globalIdx: number;
                        }> = [];
                        let gIdx = 0;
                        for (const sentence of passage.sentences) {
                          const words = sentence.de
                            .split(/\s+/)
                            .filter((w) => w.length > 0);
                          for (const token of words) {
                            paragraphTokens.push({
                              token,
                              sentence,
                              globalIdx: gIdx
                            });
                            gIdx += 1;
                          }
                        }

                        const fullEnglish = passage.sentences
                          .map((s) => s.en)
                          .join(" ");
                        const fullBangla = passage.sentences
                          .map((s) => s.bn)
                          .join(" ");

                        return (
                          <View
                            style={{
                              backgroundColor: isDark
                                ? isBlack
                                  ? "#171717"
                                  : "#052219"
                                : isPink
                                ? "#FFF0F5"
                                : "#EDF7F3",
                              borderRadius: 16,
                              padding: 15,
                              borderWidth: 1,
                              borderColor: isDark
                                ? isBlack
                                  ? "#262626"
                                  : "#082E22"
                                : isPink
                                ? "#FBCFE8"
                                : "#C6E4D9"
                            }}
                          >
                            {/* Flowing German Paragraph with Tap-to-Inspect & Live Caption Highlighting */}
                            <View
                              style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 5,
                                marginBottom: 12
                              }}
                            >
                              {paragraphTokens.map(
                                ({ token, sentence, globalIdx }) => {
                                  const entry = lookupPassageWord(
                                    token,
                                    passage,
                                    sentence
                                  );
                                  const favorited =
                                    isWordSaved(entry.lemma) ||
                                    isWordSaved(entry.surface);
                                  const articleColor = entry.article
                                    ? GENDER_COLORS[entry.article].hex
                                    : undefined;
                                  const isSpokenWord =
                                    activeSpokenText === passageFullGerman &&
                                    globalIdx === activeWordIndex;

                                  return (
                                    <Pressable
                                      key={`${passage.id}-w-${globalIdx}`}
                                      onPress={() =>
                                        handleTapWord(token, passage, sentence)
                                      }
                                      style={({ pressed }) => ({
                                        paddingHorizontal: isSpokenWord ? 5 : 2,
                                        paddingVertical: 2,
                                        borderRadius: 6,
                                        backgroundColor: isSpokenWord
                                          ? isPink
                                            ? "#DB2777"
                                            : isDark
                                            ? "#FACC15"
                                            : "#0B6B4F"
                                          : favorited
                                          ? isDark
                                            ? "rgba(245, 158, 11, 0.25)"
                                            : "#FEF3C7"
                                          : pressed
                                          ? isDark
                                            ? "rgba(255,255,255,0.08)"
                                            : "rgba(11,107,79,0.1)"
                                          : "transparent",
                                        borderBottomWidth: articleColor
                                          ? 2
                                          : favorited
                                          ? 1.5
                                          : 1,
                                        borderBottomColor: isSpokenWord
                                          ? "transparent"
                                          : articleColor ??
                                            (favorited
                                              ? "#F59E0B"
                                              : isDark
                                              ? "rgba(214,239,230,0.2)"
                                              : "rgba(11,107,79,0.18)")
                                      })}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          lineHeight: 24,
                                          fontFamily: "Inter_500Medium",
                                          color: isSpokenWord
                                            ? isDark && !isPink
                                              ? "#062E22"
                                              : "#FFFFFF"
                                            : favorited
                                            ? isDark
                                              ? "#FDE68A"
                                              : "#92400E"
                                            : isDark
                                            ? isPink
                                              ? "#FFF0F5"
                                              : "#EDF7F3"
                                            : isBlack
                                            ? "#171717"
                                            : "#052219"
                                        }}
                                      >
                                        {token}
                                      </Text>
                                    </Pressable>
                                  );
                                }
                              )}
                            </View>

                            {/* Full Paragraph Translations (toggled via top bar) */}
                            <MotionCollapse expanded={showFullTranslation}>
                              <View
                                style={{
                                  borderTopWidth: 1,
                                  borderTopColor: isDark
                                    ? isBlack
                                      ? "#262626"
                                      : "#134E3A"
                                    : isPink
                                    ? "#FBCFE8"
                                    : "#C6E4D9",
                                  paddingTop: 10,
                                  marginBottom: 12,
                                  gap: 6
                                }}
                              >
                                {showEn && (
                                  <Text
                                    style={{
                                      fontSize: 13,
                                      lineHeight: 20,
                                      fontFamily: "Inter_500Medium",
                                      color: isDark ? "#CBD5E1" : "#475569"
                                    }}
                                  >
                                    🇬🇧 {fullEnglish}
                                  </Text>
                                )}
                                {showNative && (
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      lineHeight: 22,
                                      fontFamily: "NotoSansBengali_500Medium",
                                      color: isDark ? "#93C5FD" : "#1D4ED8"
                                    }}
                                  >
                                    {nativeFlag}{" "}
                                    {tx(fullEnglish, fullBangla)}
                                  </Text>
                                )}
                              </View>
                            </MotionCollapse>

                            {/* Story Audio & Voice Practice Row */}
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: 8,
                                borderTopWidth: 1,
                                borderTopColor: isDark
                                  ? isBlack
                                    ? "#262626"
                                    : "#134E3A"
                                  : isPink
                                  ? "#FBCFE8"
                                  : "#C6E4D9",
                                paddingTop: 10
                              }}
                            >
                              <SpeakButton
                                text={passageFullGerman}
                                size="sm"
                                showSlowOption={true}
                                label="Listen Story"
                              />
                              <VoicePracticeButton
                                targetText={passageFullGerman}
                                translationEn={fullEnglish}
                                translationBn={fullBangla}
                                size="sm"
                                label="Practice Story"
                              />
                            </View>
                          </View>
                        );
                      })()}
                  </MotionCollapse>
                </MaterialGlassCard>
              );
            })}
          </View>
        </MotionEntrance>
      </ScrollView>

      <ScrollToTopButton visible={showScrollTop} onPress={scrollToTop} />

      {/* WORD INSPECTOR POPUP MODAL */}
      <Modal
        visible={!!inspectedWord}
        animationType="fade"
        transparent
        onRequestClose={() => setInspectedWord(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            justifyContent: "center",
            paddingHorizontal: 20
          }}
        >
          {inspectedWord && (
            <MotionEntrance
              direction="scale"
              triggerKey={inspectedWord.surface}
            >
            <MaterialGlassCard
              borderRadius={24}
              padding={20}
              accentColor={
                inspectedWord.article
                  ? GENDER_COLORS[inspectedWord.article].hex
                  : undefined
              }
              borderColor={
                inspectedWord.article
                  ? GENDER_COLORS[inspectedWord.article].hex
                  : undefined
              }
              watermarkText={`${inspectedWord.lemma} ${inspectedWord.english}`}
            >
              {/* Top Row: Part of Speech + Close */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12
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
                    WORD INSPECTOR • {inspectedWord.partOfSpeech.toUpperCase()}
                  </Text>
                </View>

                <BlastPressable
                  onPress={() => setInspectedWord(null)}
                  style={{
                    padding: 6,
                    borderRadius: 999,
                    backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC")
                  }}
                >
                  <X size={18} color={isDark ? "#94A3B8" : "#475569"} />
                </BlastPressable>
              </View>

              {/* 1. Clicked Word & Dictionary Lemma + Color-Coded Article (der/die/das) + Plural */}
              <View style={{ marginBottom: 12 }}>
                <GenderNounBadge
                  article={inspectedWord.article}
                  noun={inspectedWord.lemma}
                  plural={inspectedWord.plural}
                  size="lg"
                />
                {inspectedWord.surface.toLowerCase() !==
                  inspectedWord.lemma.toLowerCase() && (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_500Medium",
                      color: isDark ? "#94A3B8" : "#64748B",
                      marginTop: 4
                    }}
                  >
                    Clicked form in text: „{inspectedWord.surface}“ → Lemma:{" "}
                    {inspectedWord.lemma}
                  </Text>
                )}
              </View>

              {/* 2. <SpeakButton /> (1.0x & 0.7x) & 3. <VoicePracticeButton /> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16
                }}
              >
                <SpeakButton
                  text={
                    inspectedWord.article
                      ? `${inspectedWord.article} ${inspectedWord.lemma}`
                      : inspectedWord.lemma
                  }
                  size="md"
                  showSlowOption={true}
                />
                <VoicePracticeButton
                  targetText={
                    inspectedWord.article
                      ? `${inspectedWord.article} ${inspectedWord.lemma}`
                      : inspectedWord.lemma
                  }
                  translationEn={inspectedWord.english}
                  translationBn={inspectedWord.bangla}
                  size="md"
                  label="Practice Word"
                />
              </View>

              {/* 4. English AND Bangla (বাংলা) Meanings */}
              <View
                style={{
                  backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                  borderRadius: 16,
                  padding: 14,
                  marginBottom: 14,
                  borderWidth: 1,
                  borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#F0FDF9" : "#062E22",
                    marginBottom: 6
                  }}
                >
                  🇬🇧 English: {inspectedWord.english}
                </Text>
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
                      inspectedWord.english,
                      inspectedWord.bangla,
                      inspectedWord.lemma
                    )}
                  </Text>
                )}

                <View
                  style={{
                    marginTop: 10,
                    paddingTop: 10,
                    borderTopWidth: 1,
                    borderTopColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9")
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Inter_600SemiBold",
                      color: isDark ? "#D6EFE6" : "#1F5E48"
                    }}
                  >
                    „{inspectedWord.exampleDe}“
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "NotoSansBengali_400Regular",
                      color: isDark ? "#94A3B8" : "#64748B",
                      marginTop: 2
                    }}
                  >
                    {inspectedWord.exampleEn}
                    {showNative
                      ? ` • ${tx(
                          inspectedWord.exampleEn,
                          inspectedWord.exampleBn,
                          inspectedWord.exampleDe
                        )}`
                      : ""}
                  </Text>
                </View>
              </View>

              {/* 5. "★ Add to Favorites" / "★ Saved" Toggle Button synced with Tab 3 Vocabulary */}
              <AnimatedStarButton
                isStarred={isWordSaved(inspectedWord.lemma)}
                onToggle={() =>
                  handleToggleFavoriteFromInspector(inspectedWord)
                }
                size="lg"
                fullWidth={true}
                label={
                  isWordSaved(inspectedWord.lemma)
                    ? "★ Saved in Tab 3 Vocabulary (Tap to Unstar)"
                    : "★ Add to Favorites (Sync with Vocabulary)"
                }
              />
            </MaterialGlassCard>
            </MotionEntrance>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
