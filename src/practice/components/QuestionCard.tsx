import React, { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  CheckCircle2,
  ExternalLink,
  XCircle
} from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { useAppLanguage } from "../../utils/i18n";
import { MaterialGlassCard } from "../../components/common/MaterialGlassCard";
import { BlastPressable } from "../../components/motion/BlastPressable";
import {
  MotionEntrance,
  MotionFeedbackBanner
} from "../../components/motion/MotionViews";
import { CEFR_META } from "../../constants/theme";
import { PracticeQuestion } from "../types";

interface QuestionCardProps {
  question: PracticeQuestion;
  children: React.ReactNode;
  showFeedback: boolean;
  isCorrect: boolean;
  hideHints?: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
  onNext: () => void;
  nextLabel?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  children,
  showFeedback,
  isCorrect,
  hideHints = false,
  canSubmit,
  onSubmit,
  onNext,
  nextLabel = "Continue →"
}) => {
  const router = useRouter();
  const { themeMode } = useApp();
  const { showEn, showNative, nativeMeta, tx } = useAppLanguage();
  const nativeFlag = nativeMeta.flag === "🌐" ? "🇧🇩" : nativeMeta.flag;
  const isDark = themeMode === "dark" || themeMode === "black";
  const isPink = themeMode === "pink";
  const accent = CEFR_META[question.level]?.badgeColor ?? "#0B6B4F";

  // Enter key submits or continues on Web
  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (showFeedback) {
        onNext();
      } else if (canSubmit) {
        onSubmit();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showFeedback, canSubmit, onSubmit, onNext]);

  return (
    <MotionEntrance direction="right" distance={20} triggerKey={question.id}>
      <MaterialGlassCard
        borderRadius={24}
        padding={18}
        accentColor={accent}
        watermarkText={`${question.topic} ${question.prompt}`}
      >
        {/* Badges */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12
          }}
        >
          <View
            style={{
              backgroundColor: accent,
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
              {question.level} • {question.source.toUpperCase()}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={{
              fontSize: 11.5,
              fontFamily: "Inter_600SemiBold",
              color: isDark ? "#A7F3D0" : "#0B6B4F"
            }}
          >
            {question.topic}
          </Text>
        </View>

        {/* Optional Story Excerpt */}
        {question.passageExcerpt && (
          <View
            style={{
              backgroundColor: isDark
                ? "rgba(0,0,0,0.26)"
                : "rgba(11,107,79,0.07)",
              borderRadius: 14,
              padding: 12,
              marginBottom: 12,
              borderLeftWidth: 3,
              borderLeftColor: accent
            }}
          >
            {question.passageTitle && (
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_700Bold",
                  color: accent,
                  marginBottom: 4
                }}
              >
                {question.passageTitle}
              </Text>
            )}
            <Text
              style={{
                fontSize: 13.5,
                lineHeight: 20,
                fontFamily: "Inter_500Medium",
                color: isDark ? "#E2E8F0" : "#1E293B"
              }}
            >
              {question.passageExcerpt}
            </Text>
          </View>
        )}

        {/* Question Prompt */}
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_700Bold",
            color: isDark ? "#F0FDF9" : "#062E22",
            marginBottom: question.subPrompt || (showNative && question.nativeHintEn && !hideHints) ? 4 : 14
          }}
        >
          {question.prompt}
        </Text>

        {!hideHints && showNative && question.nativeHintEn && (
          <Text
            style={{
              fontSize: 14,
              fontFamily: "NotoSansBengali_600SemiBold",
              color: isDark ? "#93C5FD" : "#1D4ED8",
              marginBottom: question.subPrompt ? 4 : 14
            }}
          >
            {nativeFlag}{" "}
            {tx(
              question.nativeHintEn,
              question.nativeHintBn || question.nativeHintEn,
              question.deHint
            )}
          </Text>
        )}

        {!hideHints && question.subPrompt && (
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Inter_500Medium",
              color: isDark ? "#94A3B8" : "#64748B",
              marginBottom: 14
            }}
          >
            {question.subPrompt}
          </Text>
        )}

        {/* Interactive Answer Input Area */}
        {children}

        {/* Instant Feedback Banner */}
        {showFeedback && (
          <MotionFeedbackBanner
            isCorrect={isCorrect}
            triggerKey={`${question.id}-fb`}
            style={{
              marginTop: 16,
              padding: 14,
              borderRadius: 16,
              backgroundColor: isCorrect
                ? isDark
                  ? "rgba(22, 163, 74, 0.2)"
                  : "#F0FDF4"
                : isDark
                ? "rgba(220, 38, 38, 0.2)"
                : "#FEF2F2",
              borderWidth: 1.5,
              borderColor: isCorrect ? "#16A34A" : "#DC2626",
              gap: 6
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              {isCorrect ? (
                <CheckCircle2 size={18} color="#16A34A" />
              ) : (
                <XCircle size={18} color="#DC2626" />
              )}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter_700Bold",
                  color: isCorrect ? "#16A34A" : "#DC2626"
                }}
              >
                {isCorrect
                  ? "Richtig! Correct!"
                  : `Incorrect • Answer: ${question.correctAnswer}`}
              </Text>
            </View>

            {showEn && (
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Inter_500Medium",
                  color: isDark ? "#E2E8F0" : "#1E293B"
                }}
              >
                🇬🇧 {question.explanation}
              </Text>
            )}
            {showNative && (
              <Text
                style={{
                  fontSize: 13.5,
                  fontFamily: "NotoSansBengali_500Medium",
                  color: isDark ? "#93C5FD" : "#1D4ED8"
                }}
              >
                {nativeFlag}{" "}
                {tx(
                  question.explanation,
                  question.explanationBn || question.explanation,
                  question.deHint
                )}
              </Text>
            )}

            {!isCorrect && (
              <BlastPressable
                onPress={() => router.push(question.lessonLink.route as any)}
                style={{
                  alignSelf: "flex-start",
                  marginTop: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingHorizontal: 11,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: isPink ? "#DB2777" : "#0B6B4F"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_700Bold",
                    color: "#FFFFFF"
                  }}
                >
                  Open lesson ({question.lessonLink.label})
                </Text>
                <ExternalLink size={12} color="#FFCE00" />
              </BlastPressable>
            )}
          </MotionFeedbackBanner>
        )}

        {/* Submit / Continue Button */}
        <View style={{ marginTop: 16 }}>
          {!showFeedback ? (
            <BlastPressable
              disabled={!canSubmit}
              onPress={onSubmit}
              style={{
                backgroundColor: canSubmit
                  ? isPink
                    ? "#DB2777"
                    : "#0B6B4F"
                  : isDark
                  ? "#1E293B"
                  : "#CBD5E1",
                paddingVertical: 14,
                borderRadius: 16,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter_700Bold",
                  color: "#FFFFFF"
                }}
              >
                Check Answer
              </Text>
            </BlastPressable>
          ) : (
            <BlastPressable
              onPress={onNext}
              style={{
                backgroundColor: isCorrect ? "#16A34A" : "#D97706",
                paddingVertical: 14,
                borderRadius: 16,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter_700Bold",
                  color: "#FFFFFF"
                }}
              >
                {nextLabel}
              </Text>
            </BlastPressable>
          )}
        </View>
      </MaterialGlassCard>
    </MotionEntrance>
  );
};
