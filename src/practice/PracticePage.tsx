import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AlertTriangle,
  Award,
  CalendarCheck,
  Flame,
  Gamepad2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react-native";
import { useApp } from "../context/AppContext";
import { useAppLanguage } from "../utils/i18n";
import { GlobalHeader } from "../components/common/GlobalHeader";
import { MaterialGlassCard } from "../components/common/MaterialGlassCard";
import { BlastPressable } from "../components/motion/BlastPressable";
import { MotionEntrance, MotionFloat } from "../components/motion/MotionViews";
import {
  ScrollToTopButton,
  useScrollToTop
} from "../components/common/ScrollToTopButton";
import { getDueLeitnerItems } from "./engine/leitner";
import {
  computeWeakAreas,
  getMistakeQuestionIds,
  loadPracticeState
} from "./storage/practiceStorage";
import { PracticeModeId, PracticeStorageState } from "./types";
import { QuickPractice } from "./modes/QuickPractice";
import { ExamMode } from "./modes/ExamMode";
import { GameMode } from "./modes/GameMode";
import { MistakeReview } from "./modes/MistakeReview";
import { ReviewDue } from "./modes/ReviewDue";

export const PracticePage: React.FC = () => {
  const { themeMode, totalXP, streak } = useApp();
  const { nativeMeta } = useAppLanguage();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";
  const accent = isPink ? "#DB2777" : "#0B6B4F";

  const { scrollRef, showScrollTop, handleScroll, scrollToTop } =
    useScrollToTop();

  const [activeMode, setActiveMode] = useState<PracticeModeId | null>(null);
  const [storageState, setStorageState] = useState<PracticeStorageState>({
    attempts: [],
    leitner: {},
    streak: 0,
    lastPracticeDate: null,
    xp: 0,
    bestExamScores: {}
  });

  useEffect(() => {
    loadPracticeState().then(setStorageState);
  }, []);

  const weakAreas = computeWeakAreas(storageState.attempts, 3);
  const mistakeCount = getMistakeQuestionIds(storageState.attempts).length;
  const dueCount = getDueLeitnerItems(storageState.leitner).length;

  const modeCards: Array<{
    id: PracticeModeId;
    title: string;
    subtitle: string;
    badge?: string;
    color: string;
    Icon: typeof Zap;
  }> = [
    {
      id: "quick",
      title: "Quick Practice",
      subtitle: "5–10 random questions by Words, Grammar, or Story with instant feedback.",
      badge: "Flexible",
      color: accent,
      Icon: Zap
    },
    {
      id: "exam",
      title: "Exam Mode",
      subtitle: "Fixed seeded exams (10 Words + 10 Grammar + 5 Story Qs), timed, 60% pass.",
      badge: "Fixed",
      color: "#2563EB",
      Icon: ShieldCheck
    },
    {
      id: "game",
      title: "Game Mode",
      subtitle: "3 lives, streak multiplier, escalating difficulty & Speed Round countdown.",
      badge: "Arcade",
      color: "#D97706",
      Icon: Gamepad2
    },
    {
      id: "mistakes",
      title: "Mistake Review",
      subtitle: "Replay the exact questions you missed in random order until mastered.",
      badge: mistakeCount > 0 ? `${mistakeCount} due` : "0",
      color: "#DC2626",
      Icon: RotateCcw
    },
    {
      id: "review_due",
      title: "Review Due (Leitner)",
      subtitle: "5-box spaced repetition (1, 2, 4, 8, 16 days) for items due today.",
      badge: dueCount > 0 ? `${dueCount} today` : "Caught up",
      color: "#0D9488",
      Icon: CalendarCheck
    }
  ];

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: isDark
          ? isBlack
            ? "#000000"
            : "#041E16"
          : isPink
          ? "#FFF0F5"
          : "#EDF7F3"
      }}
    >
      <GlobalHeader subtitle={`Practice Hub • ${nativeMeta.pairShortLabel}`} />
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 110,
          gap: 14
        }}
      >
        {activeMode === "quick" ? (
          <QuickPractice
            storageState={storageState}
            onStorageUpdated={setStorageState}
            onReviewMistakes={() => setActiveMode("mistakes")}
            onBack={() => setActiveMode(null)}
          />
        ) : activeMode === "exam" ? (
          <ExamMode
            storageState={storageState}
            onStorageUpdated={setStorageState}
            onReviewMistakes={() => setActiveMode("mistakes")}
            onBack={() => setActiveMode(null)}
          />
        ) : activeMode === "game" ? (
          <GameMode
            storageState={storageState}
            onStorageUpdated={setStorageState}
            onReviewMistakes={() => setActiveMode("mistakes")}
            onBack={() => setActiveMode(null)}
          />
        ) : activeMode === "mistakes" ? (
          <MistakeReview
            storageState={storageState}
            onStorageUpdated={setStorageState}
            onBack={() => setActiveMode(null)}
          />
        ) : activeMode === "review_due" ? (
          <ReviewDue
            storageState={storageState}
            onStorageUpdated={setStorageState}
            onBack={() => setActiveMode(null)}
          />
        ) : (
          <>
            {/* Practice Header & Stats */}
            <MotionEntrance delay={20} direction="down">
              <MaterialGlassCard
                borderRadius={22}
                padding={18}
                accentColor={accent}
                watermarkText="practice award"
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      Practice Hub
                    </Text>
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#A7F3D0" : "#475569",
                        marginTop: 2
                      }}
                    >
                      Generated from your Words, Grammar & Story lessons
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <MotionFloat amplitude={2} duration={1500}>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 7,
                          borderRadius: 14,
                          backgroundColor: isDark
                            ? "rgba(249,115,22,0.18)"
                            : "#FFF7ED",
                          borderWidth: 1,
                          borderColor: "#FB923C",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: 4
                        }}
                      >
                        <Flame size={15} color="#F97316" />
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "Inter_700Bold",
                            color: "#EA580C"
                          }}
                        >
                          {Math.max(streak, storageState.streak)}d
                        </Text>
                      </View>
                    </MotionFloat>

                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 7,
                        borderRadius: 14,
                        backgroundColor: isDark
                          ? "rgba(255,206,0,0.14)"
                          : "#FEFCE8",
                        borderWidth: 1,
                        borderColor: "#FACC15",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 4
                      }}
                    >
                      <Sparkles size={14} color="#D97706" />
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "Inter_700Bold",
                          color: "#D97706"
                        }}
                      >
                        {totalXP + storageState.xp} XP
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Weak Areas Summary */}
                <View
                  style={{
                    marginTop: 14,
                    padding: 11,
                    borderRadius: 14,
                    backgroundColor: isDark
                      ? "rgba(0,0,0,0.22)"
                      : "rgba(11,107,79,0.06)",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  {weakAreas.length > 0 ? (
                    <>
                      <AlertTriangle size={16} color="#F59E0B" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#FDE68A" : "#92400E",
                          flex: 1
                        }}
                      >
                        Weak areas: {weakAreas.map((w) => `${w.topic} (${w.accuracyPercent}%)`).join(", ")}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Award size={16} color="#16A34A" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#A7F3D0" : "#065F46",
                          flex: 1
                        }}
                      >
                        No weak areas detected yet — start any mode below!
                      </Text>
                    </>
                  )}
                </View>
              </MaterialGlassCard>
            </MotionEntrance>

            {/* 5 Practice Mode Cards */}
            {modeCards.map((card, i) => {
              const CardIcon = card.Icon;
              return (
                <MotionEntrance key={card.id} delay={50 + i * 35} direction="up">
                  <BlastPressable onPress={() => setActiveMode(card.id)}>
                    <MaterialGlassCard
                      borderRadius={20}
                      padding={16}
                      accentColor={card.color}
                      watermarkText={card.title}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 14
                        }}
                      >
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 16,
                            backgroundColor: card.color,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <CardIcon size={23} color="#FFFFFF" />
                        </View>

                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 8
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "Inter_700Bold",
                                color: isDark ? "#F0FDF9" : "#062E22"
                              }}
                            >
                              {card.title}
                            </Text>
                            {card.badge && (
                              <View
                                style={{
                                  paddingHorizontal: 9,
                                  paddingVertical: 3,
                                  borderRadius: 999,
                                  backgroundColor: isDark
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(11,107,79,0.08)"
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontFamily: "Inter_700Bold",
                                    color: card.color
                                  }}
                                >
                                  {card.badge}
                                </Text>
                              </View>
                            )}
                          </View>

                          <Text
                            style={{
                              fontSize: 12.5,
                              fontFamily: "Inter_500Medium",
                              color: isDark ? "#94A3B8" : "#64748B",
                              marginTop: 3
                            }}
                          >
                            {card.subtitle}
                          </Text>
                        </View>
                      </View>
                    </MaterialGlassCard>
                  </BlastPressable>
                </MotionEntrance>
              );
            })}
          </>
        )}
      </ScrollView>

      <ScrollToTopButton visible={showScrollTop} onPress={scrollToTop} />
    </SafeAreaView>
  );
};
