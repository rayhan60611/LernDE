import { BlastPressable } from "../motion/BlastPressable";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import * as Speech from "expo-speech";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { Snail, Volume2 } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import {
  speakGerman,
  stopGermanSpeech
} from "../../utils/tts";

export interface SpeakButtonProps {
  text: string;
  size?: "sm" | "md";
  showSlowOption?: boolean;
  label?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  text,
  size = "md",
  showSlowOption = true,
  label
}) => {
  const { themeMode, ttsVoiceGender, ttsAccentStyle, ttsSpeed } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const [activeMode, setActiveMode] = useState<"normal" | "slow" | null>(null);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (activeMode !== null) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.12, { duration: 380 }),
          withTiming(1.0, { duration: 380 })
        ),
        -1,
        true
      );
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(1, { duration: 150 });
    }
    return () => {
      cancelAnimation(pulse);
    };
  }, [activeMode, pulse]);

  const animatedNormalStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }]
  }));

  const speakWithMode = useCallback(
    async (mode: "normal" | "slow") => {
      try {
        if (activeMode === mode) {
          await stopGermanSpeech();
          setActiveMode(null);
          return;
        }
        await Speech.stop();
        setActiveMode(mode);
        const rate =
          mode === "normal"
            ? ttsSpeed
            : Math.max(0.55, Number((ttsSpeed * 0.7).toFixed(2)));
        await speakGerman(text, {
          gender: ttsVoiceGender,
          accent: ttsAccentStyle,
          rate,
          onDone: () => setActiveMode(null),
          onStopped: () => setActiveMode(null),
          onError: () => setActiveMode(null)
        });
      } catch {
        setActiveMode(null);
      }
    },
    [text, activeMode, ttsVoiceGender, ttsAccentStyle, ttsSpeed]
  );

  const isSmall = size === "sm";
  const iconSize = isSmall ? 15 : 18;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      {/* Standard Speaker Button (uses user's selected playback speed) */}
      <Animated.View style={animatedNormalStyle}>
        <BlastPressable
          onPress={() => speakWithMode("normal")}
          accessibilityRole="button"
          accessibilityLabel={`Listen to ${text} at ${ttsSpeed}x speed`}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingHorizontal: isSmall ? 9 : 12,
            paddingVertical: isSmall ? 6 : 8,
            borderRadius: 999,
            backgroundColor:
              activeMode === "normal"
                ? (isPink ? "#DB2777" : "#0B6B4F")
                : isDark
                ? (isBlack ? "#0F0F0F" : "#082E22")
                : (isPink ? "#FDF2F8" : "#EAF7F2"),
            borderWidth: 1,
            borderColor:
              activeMode === "normal"
                ? (isPink ? "#DB2777" : "#0B6B4F")
                : isDark
                ? (isBlack ? "#262626" : "#134E3A")
                : "#A7F3D0"
          }}
        >
          <Volume2
            size={iconSize}
            color={
              activeMode === "normal"
                ? "#FFFFFF"
                : isDark
                ? "#34D399"
                : (isPink ? "#DB2777" : "#0B6B4F")
            }
          />
          <Text
            style={{
              fontSize: isSmall ? 11 : 12,
              fontFamily: "Inter_600SemiBold",
              color:
                activeMode === "normal"
                  ? "#FFFFFF"
                  : isDark
                  ? "#6EE7B7"
                  : (isPink ? "#DB2777" : "#0B6B4F")
            }}
          >
            {label ?? `${ttsSpeed}x`}
          </Text>
        </BlastPressable>
      </Animated.View>

      {/* Optional Slow / Syllable Button */}
      {showSlowOption && (
        <Animated.View style={activeMode === "slow" ? animatedNormalStyle : undefined}>
          <BlastPressable
            onPress={() => speakWithMode("slow")}
            accessibilityRole="button"
            accessibilityLabel={`Listen to ${text} slowly`}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingHorizontal: isSmall ? 8 : 10,
              paddingVertical: isSmall ? 6 : 8,
              borderRadius: 999,
              backgroundColor:
                activeMode === "slow"
                  ? "#0D9488"
                  : isDark
                  ? (isBlack ? "#0F0F0F" : "#082E22")
                  : "#F0FDFA",
              borderWidth: 1,
              borderColor:
                activeMode === "slow"
                  ? "#0D9488"
                  : isDark
                  ? (isBlack ? "#262626" : "#134E3A")
                  : "#99F6E4"
            }}
          >
            <Snail
              size={iconSize}
              color={
                activeMode === "slow"
                  ? "#FFFFFF"
                  : isDark
                  ? "#2DD4BF"
                  : "#0F766E"
              }
            />
            <Text
              style={{
                fontSize: isSmall ? 11 : 12,
                fontFamily: "Inter_600SemiBold",
                color:
                  activeMode === "slow"
                    ? "#FFFFFF"
                    : isDark
                    ? "#5EEAD4"
                    : "#0F766E"
              }}
            >
              Slow
            </Text>
          </BlastPressable>
        </Animated.View>
      )}
    </View>
  );
};
