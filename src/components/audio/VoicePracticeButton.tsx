import { BlastPressable } from "../motion/BlastPressable";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { Mic } from "lucide-react-native";
import { VoicePracticeModal } from "./VoicePracticeModal";
import { useApp } from "../../context/AppContext";

export interface VoicePracticeButtonProps {
  targetText: string;
  translationEn: string;
  translationBn: string;
  onSuccess?: (score: number) => void;
  size?: "sm" | "md";
  label?: string;
}

export const VoicePracticeButton: React.FC<VoicePracticeButtonProps> = ({
  targetText,
  translationEn,
  translationBn,
  onSuccess,
  size = "md",
  label
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";
  const [modalVisible, setModalVisible] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const isSmall = size === "sm";

  return (
    <>
      <BlastPressable
        onPress={() => setModalVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={`Practice speaking ${targetText}`}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          paddingHorizontal: isSmall ? 10 : 13,
          paddingVertical: isSmall ? 6 : 8,
          borderRadius: 999,
          backgroundColor:
            bestScore !== null && bestScore >= 80
              ? isDark
                ? "rgba(22, 163, 74, 0.25)"
                : "#DCFCE7"
              : isDark
              ? "rgba(242, 84, 91, 0.18)"
              : "#FFF1F2",
          borderWidth: 1,
          borderColor:
            bestScore !== null && bestScore >= 80
              ? "#16A34A"
              : isDark
              ? "#F2545B"
              : "#FECDD3"
        }}
      >
        <Mic
          size={isSmall ? 14 : 16}
          color={
            bestScore !== null && bestScore >= 80
              ? "#16A34A"
              : "#F2545B"
          }
        />
        <Text
          style={{
            fontSize: isSmall ? 11 : 12,
            fontFamily: "Inter_600SemiBold",
            color:
              bestScore !== null && bestScore >= 80
                ? "#16A34A"
                : isDark
                ? "#FDA4AF"
                : "#E11D48"
          }}
        >
          {label ?? (bestScore !== null ? `Speak (${bestScore}%)` : "Speak")}
        </Text>
      </BlastPressable>

      <VoicePracticeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        targetText={targetText}
        translationEn={translationEn}
        translationBn={translationBn}
        onSuccess={(score) => {
          setBestScore((prev) => (prev === null ? score : Math.max(prev, score)));
          onSuccess?.(score);
        }}
      />
    </>
  );
};
