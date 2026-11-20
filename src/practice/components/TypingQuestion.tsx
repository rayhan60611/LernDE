import React from "react";
import { Text, TextInput, View } from "react-native";
import { useApp } from "../../context/AppContext";
import { BlastPressable } from "../../components/motion/BlastPressable";

interface TypingQuestionProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  acceptUmlautFallback?: boolean;
}

export const TypingQuestion: React.FC<TypingQuestionProps> = ({
  value,
  onChangeText,
  onSubmit,
  disabled = false,
  acceptUmlautFallback = true
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const umlautKeys = ["ä", "ö", "ü", "ß"];

  return (
    <View style={{ gap: 10 }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Type the German word..."
        placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
        accessibilityLabel="Type your German answer"
        style={{
          backgroundColor: isDark
            ? isBlack
              ? "#141414"
              : "#052219"
            : "#FFFFFF",
          color: isDark ? "#F0FDF9" : "#062E22",
          borderRadius: 16,
          paddingHorizontal: 14,
          paddingVertical: 14,
          fontSize: 16,
          fontFamily: "Inter_600SemiBold",
          borderWidth: 2,
          borderColor: isDark
            ? "#134E3A"
            : isPink
            ? "#F9A8D4"
            : "#0B6B4F"
        }}
      />

      {/* Quick Umlaut Tap Helper */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8
        }}
      >
        <View style={{ flexDirection: "row", gap: 6 }}>
          {umlautKeys.map((ch) => (
            <BlastPressable
              key={ch}
              disabled={disabled}
              onPress={() => onChangeText(`${value}${ch}`)}
              style={{
                paddingHorizontal: 11,
                paddingVertical: 6,
                borderRadius: 10,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : isPink
                  ? "#FCE7F3"
                  : "#E2F2EC",
                borderWidth: 1,
                borderColor: isDark ? "#262626" : "#C6E4D9"
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#F0FDF9" : "#062E22"
                }}
              >
                {ch}
              </Text>
            </BlastPressable>
          ))}
        </View>

        <Text
          style={{
            fontSize: 11,
            fontFamily: "Inter_500Medium",
            color: isDark ? "#94A3B8" : "#64748B"
          }}
        >
          {acceptUmlautFallback
            ? "Tip: ae / oe / ue / ss also accepted"
            : "Exact umlauts (ä, ö, ü, ß) required"}
        </Text>
      </View>
    </View>
  );
};
