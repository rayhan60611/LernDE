import React, { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  RotateCcw,
  Sparkles,
  XCircle
} from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { useAppLanguage } from "../../utils/i18n";
import { MaterialGlassCard } from "../../components/common/MaterialGlassCard";
import { BlastPressable } from "../../components/motion/BlastPressable";
import { AnimatedChevron, MotionCollapse, MotionEntrance, MotionFloat } from "../../components/motion/MotionViews";
import { AttemptRecord, PracticeQuestion, QuestionSource } from "../types";
import { computeWeakAreas } from "../storage/practiceStorage";
import { formatTimeMMSS } from "./Timer";

interface ResultsScreenProps {
  title: string;
  attempts: AttemptRecord[];
  questions?: PracticeQuestion[];
  elapsedSeconds: number;
  xpEarned: number;
  isExam?: boolean;
  passMarkPercent?: number;
  onRetry: () => void;
  onReviewMistakes?: () => void;
  onBackToPractice: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  title,
  attempts,
  questions = [],
  elapsedSeconds,
  xpEarned,
  isExam = false,
  passMarkPercent = 60,
  onRetry,
  onReviewMistakes,
  onBackToPractice
}) => {
  const router = useRouter();
  const { themeMode } = useApp();
  const { showEn, showNative, nativeMeta, tx } = useAppLanguage();
  const nativeFlag = nativeMeta.flag === "🌐" ? "🇧🇩" : nativeMeta.flag;
  const isDark = themeMode === "dark" || themeMode === "black";
  const isPink = themeMode === "pink";
  const [detailsExpanded, setDetailsExpanded] = useState(true);

  const questionMap = new Map(questions.map((q) => [q.id, q]));

  const total = attempts.length;
  const correctCount = attempts.filter((a) => a.correct).length;
  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = !isExam || percent >= passMarkPercent;

  const weakAreas = computeWeakAreas(attempts, 3);
  const wrongCount = total - correctCount;

  const sectionBreakdown: Array<{
    source: QuestionSource;
    label: string;
    correct: number;
    total: number;
  }> = (["words", "grammar", "story"] as QuestionSource[])
    .map((src) => {
      const list = attempts.filter((a) => a.source === src);
      return {
        source: src,
        label: src === "words" ? "Words" : src === "grammar" ? "Grammar" : "Story",
        correct: list.filter((a) => a.correct).length,
        total: list.length
      };
    })
    .filter((s) => s.total > 0);

  return (
    <MotionEntrance direction="scale">
      <MaterialGlassCard
        borderRadius={24}
        padding={20}
        accentColor={passed ? "#16A34A" : "#DC2626"}
        watermarkText="award success"
      >
        <View style={{ alignItems: "center", marginBottom: 18 }}>
          <MotionFloat amplitude={3} duration={1500}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: passed ? "#DCFCE7" : "#FEE2E2",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: passed ? "#16A34A" : "#DC2626"
              }}
            >
              {passed ? (
                <Award size={38} color="#16A34A" />
              ) : (
                <XCircle size={38} color="#DC2626" />
              )}
            </View>
          </MotionFloat>

          <Text
            style={{
              fontSize: 22,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#F0FDF9" : "#062E22",
              marginTop: 12,
              textAlign: "center"
            }}
          >
            {title}
          </Text>

          {isExam && (
            <View
              style={{
                marginTop: 6,
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: passed ? "#16A34A" : "#DC2626"
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_700Bold",
                  color: "#FFFFFF"
                }}
              >
                {passed
                  ? `PASSED (${percent}% ≥ ${passMarkPercent}%)`
                  : `NOT PASSED (${percent}% < ${passMarkPercent}%)`}
              </Text>
            </View>
          )}
        </View>

        {/* Stats Row */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
          <View
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 16,
              backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(11,107,79,0.06)",
              alignItems: "center"
            }}
          >
            <CheckCircle2 size={18} color="#16A34A" />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#F0FDF9" : "#062E22",
                marginTop: 4
              }}
            >
              {correctCount}/{total}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Inter_600SemiBold",
                color: isDark ? "#94A3B8" : "#64748B"
              }}
            >
              {percent}% Score
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 16,
              backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(11,107,79,0.06)",
              alignItems: "center"
            }}
          >
            <Clock size={18} color="#2563EB" />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#F0FDF9" : "#062E22",
                marginTop: 4
              }}
            >
              {formatTimeMMSS(elapsedSeconds)}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Inter_600SemiBold",
                color: isDark ? "#94A3B8" : "#64748B"
              }}
            >
              Time
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 16,
              backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(11,107,79,0.06)",
              alignItems: "center"
            }}
          >
            <Sparkles size={18} color="#D97706" />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_700Bold",
                color: "#D97706",
                marginTop: 4
              }}
            >
              +{xpEarned}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Inter_600SemiBold",
                color: isDark ? "#94A3B8" : "#64748B"
              }}
            >
              XP Earned
            </Text>
          </View>
        </View>

        {/* Per-Section Breakdown (for Exam & Mixed Sessions) */}
        {sectionBreakdown.length > 1 && (
          <View
            style={{
              padding: 12,
              borderRadius: 14,
              backgroundColor: isDark ? "rgba(0,0,0,0.22)" : "rgba(11,107,79,0.05)",
              marginBottom: 14,
              gap: 6
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#A7F3D0" : "#0B6B4F",
                textTransform: "uppercase"
              }}
            >
              Section Breakdown
            </Text>
            {sectionBreakdown.map((sec) => {
              const secPct = Math.round((sec.correct / sec.total) * 100);
              return (
                <View
                  key={sec.source}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Inter_600SemiBold",
                      color: isDark ? "#E2E8F0" : "#1E293B"
                    }}
                  >
                    {sec.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Inter_700Bold",
                      color: secPct >= 60 ? "#16A34A" : "#DC2626"
                    }}
                  >
                    {sec.correct}/{sec.total} ({secPct}%)
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Weak Areas */}
        {weakAreas.length > 0 && (
          <View
            style={{
              padding: 12,
              borderRadius: 14,
              backgroundColor: isDark
                ? "rgba(220, 38, 38, 0.14)"
                : "rgba(239, 68, 68, 0.08)",
              borderWidth: 1,
              borderColor: "rgba(220, 38, 38, 0.28)",
              marginBottom: 16
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_700Bold",
                color: "#EF4444",
                marginBottom: 4
              }}
            >
              Weak Areas to Focus On:
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_600SemiBold",
                color: isDark ? "#FECACA" : "#991B1B"
              }}
            >
              Weak in {weakAreas.map((w) => w.topic).join(" and ")}
            </Text>
          </View>
        )}

        {/* Question-by-Question Result & Details */}
        {attempts.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <BlastPressable
              onPress={() => setDetailsExpanded((p) => !p)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 14,
                backgroundColor: isDark
                  ? "rgba(0,0,0,0.26)"
                  : "rgba(11,107,79,0.08)",
                marginBottom: 8
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#A7F3D0" : "#0B6B4F"
                }}
              >
                Answer Details ({correctCount} Right • {wrongCount} Wrong)
              </Text>
              <AnimatedChevron
                expanded={detailsExpanded}
                size={16}
                color={isDark ? "#A7F3D0" : "#0B6B4F"}
              />
            </BlastPressable>

            <MotionCollapse expanded={detailsExpanded}>
              <View style={{ gap: 10 }}>
                {attempts.map((att, idx) => {
                  const q = questionMap.get(att.questionId);
                  const secTime = (att.timeMs / 1000).toFixed(1);
                  return (
                    <View
                      key={`${att.questionId}-${idx}`}
                      style={{
                        padding: 12,
                        borderRadius: 14,
                        backgroundColor: att.correct
                          ? isDark
                            ? "rgba(22, 163, 74, 0.14)"
                            : "rgba(22, 163, 74, 0.08)"
                          : isDark
                          ? "rgba(220, 38, 38, 0.14)"
                          : "rgba(220, 38, 38, 0.08)",
                        borderWidth: 1,
                        borderColor: att.correct
                          ? "rgba(22, 163, 74, 0.38)"
                          : "rgba(220, 38, 38, 0.38)",
                        gap: 5
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
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
                          {att.correct ? (
                            <CheckCircle2 size={16} color="#16A34A" />
                          ) : (
                            <XCircle size={16} color="#DC2626" />
                          )}
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 12,
                              fontFamily: "Inter_700Bold",
                              color: att.correct ? "#16A34A" : "#DC2626",
                              flex: 1
                            }}
                          >
                            Q{idx + 1} • {att.level} • {att.topic}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "Inter_600SemiBold",
                            color: isDark ? "#94A3B8" : "#64748B"
                          }}
                        >
                          {secTime}s
                        </Text>
                      </View>

                      {q && (
                        <Text
                          style={{
                            fontSize: 13.5,
                            fontFamily: "Inter_700Bold",
                            color: isDark ? "#F0FDF9" : "#062E22"
                          }}
                        >
                          {q.prompt}
                        </Text>
                      )}

                      {att.userAnswer && (
                        <Text
                          style={{
                            fontSize: 12.5,
                            fontFamily: "Inter_600SemiBold",
                            color: att.correct ? "#16A34A" : "#DC2626"
                          }}
                        >
                          Your answer: {att.userAnswer}
                        </Text>
                      )}

                      {!att.correct && q && (
                        <Text
                          style={{
                            fontSize: 12.5,
                            fontFamily: "Inter_700Bold",
                            color: "#16A34A"
                          }}
                        >
                          Correct answer: {q.correctAnswer}
                        </Text>
                      )}

                      {q && (
                        <View style={{ gap: 2, marginTop: 2 }}>
                          {showEn && (
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: "Inter_500Medium",
                                color: isDark ? "#CBD5E1" : "#334155"
                              }}
                            >
                              🇬🇧 {q.explanation}
                            </Text>
                          )}
                          {showNative && (
                            <Text
                              style={{
                                fontSize: 12.5,
                                fontFamily: "NotoSansBengali_500Medium",
                                color: isDark ? "#93C5FD" : "#1D4ED8"
                              }}
                            >
                              {nativeFlag}{" "}
                              {tx(
                                q.explanation,
                                q.explanationBn || q.explanation,
                                q.deHint
                              )}
                            </Text>
                          )}
                        </View>
                      )}

                      {!att.correct && q && (
                        <BlastPressable
                          onPress={() => router.push(q.lessonLink.route as any)}
                          style={{
                            alignSelf: "flex-start",
                            marginTop: 4,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 999,
                            backgroundColor: isPink ? "#DB2777" : "#0B6B4F"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontFamily: "Inter_700Bold",
                              color: "#FFFFFF"
                            }}
                          >
                            Open lesson ({q.lessonLink.label})
                          </Text>
                          <ExternalLink size={11} color="#FFCE00" />
                        </BlastPressable>
                      )}
                    </View>
                  );
                })}
              </View>
            </MotionCollapse>
          </View>
        )}

        {/* Action Buttons */}
        <View style={{ gap: 10 }}>
          <BlastPressable
            onPress={onRetry}
            style={{
              backgroundColor: isPink ? "#DB2777" : "#0B6B4F",
              paddingVertical: 14,
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <RotateCcw size={16} color="#FFFFFF" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Inter_700Bold",
                color: "#FFFFFF"
              }}
            >
              Retry
            </Text>
          </BlastPressable>

          {wrongCount > 0 && onReviewMistakes && (
            <BlastPressable
              onPress={onReviewMistakes}
              style={{
                backgroundColor: "#D97706",
                paddingVertical: 13,
                borderRadius: 16,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 14.5,
                  fontFamily: "Inter_700Bold",
                  color: "#FFFFFF"
                }}
              >
                Review Mistakes ({wrongCount})
              </Text>
            </BlastPressable>
          )}

          <BlastPressable
            onPress={onBackToPractice}
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(11,107,79,0.1)",
              paddingVertical: 13,
              borderRadius: 16,
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 14.5,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#F0FDF9" : "#062E22"
              }}
            >
              Back to Practice
            </Text>
          </BlastPressable>
        </View>
      </MaterialGlassCard>
    </MotionEntrance>
  );
};
