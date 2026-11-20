import React, { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { CheckCircle2, XCircle } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { BlastPressable } from "../../components/motion/BlastPressable";
import { checkExactAnswer } from "../engine/answerChecker";

interface MultipleChoiceProps {
  options: string[];
  selectedOption: string | null;
  correctAnswer: string;
  showFeedback: boolean;
  disabled?: boolean;
  onSelect: (option: string) => void;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  options,
  selectedOption,
  correctAnswer,
  showFeedback,
  disabled = false,
  onSelect
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  // Keyboard support (1-4 keys on web)
  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined" || disabled) {
      return;
    }
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < options.length) {
        onSelect(options[idx]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [options, disabled, onSelect]);

  return (
    <View style={{ gap: 10 }}>
      {options.map((option, idx) => {
        const isSelected = selectedOption === option;
        const isRight = checkExactAnswer(option, correctAnswer);

        let borderColor = isDark
          ? isBlack
            ? "#262626"
            : "#134E3A"
          : isPink
          ? "#FBCFE8"
          : "#C6E4D9";
        let bgColor = isDark ? (isBlack ? "#141414" : "#082E22") : "#FFFFFF";

        if (showFeedback) {
          if (isRight) {
            borderColor = "#16A34A";
            bgColor = isDark ? "rgba(22, 163, 74, 0.22)" : "#F0FDF4";
          } else if (isSelected) {
            borderColor = "#DC2626";
            bgColor = isDark ? "rgba(220, 38, 38, 0.22)" : "#FEF2F2";
          }
        } else if (isSelected) {
          borderColor = isPink ? "#DB2777" : "#0B6B4F";
          bgColor = isDark ? "#064E3B" : isPink ? "#FDF2F8" : "#EAF7F2";
        }

        return (
          <BlastPressable
            key={`${option}-${idx}`}
            disabled={disabled}
            onPress={() => onSelect(option)}
            accessibilityRole="button"
            accessibilityLabel={`Option ${idx + 1}: ${option}`}
            accessibilityState={{ selected: isSelected }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
              borderRadius: 16,
              backgroundColor: bgColor,
              borderWidth: 2,
              borderColor
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1
              }}
            >
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isSelected
                    ? isPink
                      ? "#DB2777"
                      : "#0B6B4F"
                    : isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(11,107,79,0.08)"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_700Bold",
                    color: isSelected
                      ? "#FFFFFF"
                      : isDark
                      ? "#A7F3D0"
                      : "#0B6B4F"
                  }}
                >
                  {idx + 1}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter_600SemiBold",
                  color: isDark ? "#F0FDF9" : "#062E22",
                  flex: 1
                }}
              >
                {option}
              </Text>
            </View>

            {showFeedback && isRight && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <CheckCircle2 size={18} color="#16A34A" />
              </View>
            )}
            {showFeedback && isSelected && !isRight && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <XCircle size={18} color="#DC2626" />
              </View>
            )}
          </BlastPressable>
        );
      })}
    </View>
  );
};
