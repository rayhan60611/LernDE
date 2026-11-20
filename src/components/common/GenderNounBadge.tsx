import React from "react";
import { Pressable, Text, View } from "react-native";
import { GENDER_COLORS } from "../../constants/theme";
import { GermanArticle } from "../../types";
import { useApp } from "../../context/AppContext";
import { useWordInspector } from "../../context/WordInspectorContext";

interface GenderNounBadgeProps {
  article?: GermanArticle;
  noun: string;
  plural?: string;
  size?: "sm" | "md" | "lg";
  tappable?: boolean;
}

export const GenderNounBadge: React.FC<GenderNounBadgeProps> = ({
  article,
  noun,
  plural,
  size = "md",
  tappable = true
}) => {
  const { themeMode } = useApp();
  const { inspectWord } = useWordInspector();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const handlePress = () => {
    if (!tappable) return;
    // If noun contains slash (e.g. "der Student / das Buch"), inspect first noun
    const cleanTarget = noun.split("/")[0].replace(/^(der|die|das)\s+/i, "").trim();
    inspectWord(cleanTarget);
  };

  if (!article) {
    return (
      <Pressable disabled={!tappable} onPress={handlePress}>
        <Text
          style={{
            fontSize: size === "lg" ? 24 : size === "md" ? 17 : 14,
            fontFamily: "Inter_700Bold",
            color: isDark ? "#F0FDF9" : "#062E22",
            textDecorationLine: tappable ? "underline" : "none",
            textDecorationStyle: "dotted"
          }}
        >
          {noun}
        </Text>
      </Pressable>
    );
  }

  const palette = GENDER_COLORS[article];
  const fontSize = size === "lg" ? 24 : size === "md" ? 16 : 13;

  return (
    <Pressable
      disabled={!tappable}
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 6
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isDark ? palette.bgDark : palette.bgLight,
          borderColor: isDark ? palette.borderDark : palette.borderLight,
          borderWidth: 1,
          paddingHorizontal: size === "lg" ? 12 : 9,
          paddingVertical: size === "lg" ? 6 : 4,
          borderRadius: 10,
          gap: 5
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: palette.hex
          }}
        />
        <Text
          style={{
            fontSize,
            fontFamily: "Inter_700Bold",
            color: palette.hex
          }}
        >
          {article} {noun}
        </Text>
      </View>

      {plural ? (
        <Text
          style={{
            fontSize: size === "lg" ? 13 : 11,
            fontFamily: "Inter_500Medium",
            color: isDark ? "#94A3B8" : "#64748B"
          }}
        >
          (Pl: {plural})
        </Text>
      ) : null}
    </Pressable>
  );
};
