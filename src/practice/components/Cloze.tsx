import React, { useState } from "react";
import { Text, View } from "react-native";
import { useApp } from "../../context/AppContext";
import { BlastPressable } from "../../components/motion/BlastPressable";
import { ClozeBlank } from "../types";

interface ClozeProps {
  segments: string[];
  blanks: ClozeBlank[];
  answers: Record<number, string>;
  onSelectBlankAnswer: (blankIndex: number, value: string) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export const Cloze: React.FC<ClozeProps> = ({
  segments,
  blanks,
  answers,
  onSelectBlankAnswer,
  showFeedback,
  disabled = false
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isPink = themeMode === "pink";
  const [activeBlankIdx, setActiveBlankIdx] = useState<number>(0);

  const activeBlank = blanks.find((b) => b.index === activeBlankIdx) ?? blanks[0];

  return (
    <View style={{ gap: 14 }}>
      {/* Passage with interactive blank pills */}
      <View
        style={{
          backgroundColor: isDark ? "rgba(0,0,0,0.22)" : "rgba(11,107,79,0.06)",
          borderRadius: 16,
          padding: 14,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 4
        }}
      >
        {segments.map((seg, idx) => {
          const blank = blanks[idx];
          const chosen = blank ? answers[blank.index] : undefined;
          const isCurrent = blank && blank.index === activeBlankIdx;
          const isCorrect =
            showFeedback &&
            blank &&
            chosen?.toLowerCase() === blank.answer.toLowerCase();

          return (
            <React.Fragment key={`cloze-seg-${idx}`}>
              {seg ? (
                <Text
                  style={{
                    fontSize: 14.5,
                    lineHeight: 24,
                    fontFamily: "Inter_500Medium",
                    color: isDark ? "#E2E8F0" : "#0F172A"
                  }}
                >
                  {seg}
                </Text>
              ) : null}

              {blank && (
                <BlastPressable
                  disabled={disabled}
                  onPress={() => setActiveBlankIdx(blank.index)}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 8,
                    backgroundColor: showFeedback
                      ? isCorrect
                        ? "rgba(22, 163, 74, 0.22)"
                        : "rgba(220, 38, 38, 0.22)"
                      : isCurrent
                      ? isPink
                        ? "#DB2777"
                        : "#0B6B4F"
                      : isDark
                      ? "#082E22"
                      : "#FFFFFF",
                    borderWidth: 1.5,
                    borderColor: showFeedback
                      ? isCorrect
                        ? "#16A34A"
                        : "#DC2626"
                      : isCurrent
                      ? "#FFCE00"
                      : isDark
                      ? "#134E3A"
                      : "#0B6B4F"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Inter_700Bold",
                      color: isCurrent && !showFeedback
                        ? "#FFFFFF"
                        : isDark
                        ? "#F0FDF9"
                        : "#062E22"
                    }}
                  >
                    {chosen || `(${blank.index + 1}) ___`}
                  </Text>
                </BlastPressable>
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Options for active blank */}
      {activeBlank && (
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#A7F3D0" : "#0B6B4F"
            }}
          >
            Select word for Blank #{activeBlank.index + 1}:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {activeBlank.options.map((opt) => {
              const selected = answers[activeBlank.index] === opt;
              return (
                <BlastPressable
                  key={`opt-${activeBlank.index}-${opt}`}
                  disabled={disabled}
                  onPress={() => {
                    onSelectBlankAnswer(activeBlank.index, opt);
                    const nextBlank = blanks.find(
                      (b) => b.index > activeBlank.index && !answers[b.index]
                    );
                    if (nextBlank) setActiveBlankIdx(nextBlank.index);
                  }}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 9,
                    borderRadius: 12,
                    backgroundColor: selected
                      ? isPink
                        ? "#DB2777"
                        : "#0B6B4F"
                      : isDark
                      ? "#082E22"
                      : "#FFFFFF",
                    borderWidth: 1.5,
                    borderColor: selected
                      ? "#FFCE00"
                      : isDark
                      ? "#134E3A"
                      : "#C6E4D9"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Inter_600SemiBold",
                      color: selected
                        ? "#FFFFFF"
                        : isDark
                        ? "#F0FDF9"
                        : "#062E22"
                    }}
                  >
                    {opt}
                  </Text>
                </BlastPressable>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};
