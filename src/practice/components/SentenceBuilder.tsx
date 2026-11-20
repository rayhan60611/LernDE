import React from "react";
import { Text, View } from "react-native";
import { useApp } from "../../context/AppContext";
import { BlastPressable } from "../../components/motion/BlastPressable";

interface SentenceBuilderProps {
  wordBank: string[];
  selectedWords: string[];
  onChangeWords: (words: string[]) => void;
  disabled?: boolean;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  wordBank,
  selectedWords,
  onChangeWords,
  disabled = false
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  return (
    <View style={{ gap: 14 }}>
      {/* Constructed Sentence Slot */}
      <View
        style={{
          minHeight: 70,
          backgroundColor: isDark
            ? isBlack
              ? "#171717"
              : "#052219"
            : isPink
            ? "#FCE7F3"
            : "#E2F2EC",
          borderRadius: 16,
          padding: 12,
          borderWidth: 1.5,
          borderColor: isDark ? "#134E3A" : "#A7D7C5",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center"
        }}
      >
        {selectedWords.length === 0 ? (
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
          selectedWords.map((w, i) => (
            <BlastPressable
              key={`built-${w}-${i}`}
              disabled={disabled}
              onPress={() =>
                onChangeWords(selectedWords.filter((_, idx) => idx !== i))
              }
              style={{
                backgroundColor: isPink ? "#DB2777" : "#0B6B4F",
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
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {wordBank.map((word, idx) => {
          const usedCount = selectedWords.filter((w) => w === word).length;
          const totalCount = wordBank.filter((w) => w === word).length;
          const isUsedUp = usedCount >= totalCount;

          return (
            <BlastPressable
              key={`bank-${word}-${idx}`}
              disabled={disabled || isUsedUp}
              onPress={() => onChangeWords([...selectedWords, word])}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 12,
                backgroundColor: isUsedUp
                  ? isDark
                    ? "#052219"
                    : "#E2F2EC"
                  : isDark
                  ? "#082E22"
                  : "#FFFFFF",
                borderWidth: 1,
                borderColor: isDark ? "#134E3A" : "#A7D7C5",
                opacity: isUsedUp ? 0.35 : 1
              }}
            >
              <Text
                style={{
                  fontSize: 14.5,
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
  );
};
