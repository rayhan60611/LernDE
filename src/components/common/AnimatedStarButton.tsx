import { BlastPressable } from "../motion/BlastPressable";
import React from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { Star } from "lucide-react-native";
import { playStarSound } from "../../utils/soundEffects";
import { useApp } from "../../context/AppContext";

interface AnimatedStarButtonProps {
  isStarred: boolean;
  onToggle: () => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const AnimatedStarButton: React.FC<AnimatedStarButtonProps> = ({
  isStarred,
  onToggle,
  label,
  size = "sm",
  fullWidth = false
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotate.value}deg` }
    ]
  }));

  const handlePress = () => {
    const nextStarred = !isStarred;
    playStarSound(nextStarred);

    if (nextStarred) {
      // Pop & spin burst when starring
      scale.value = withSequence(
        withTiming(1.48, { duration: 140 }),
        withSpring(1, { damping: 8, stiffness: 220 })
      );
      rotate.value = withSequence(
        withTiming(24, { duration: 110 }),
        withTiming(-16, { duration: 110 }),
        withSpring(0, { damping: 10, stiffness: 200 })
      );
    } else {
      // Soft shrink & bounce when unstarring
      scale.value = withSequence(
        withTiming(0.72, { duration: 120 }),
        withSpring(1, { damping: 12, stiffness: 220 })
      );
      rotate.value = withSequence(
        withTiming(-22, { duration: 110 }),
        withSpring(0, { damping: 12, stiffness: 200 })
      );
    }

    onToggle();
  };

  const iconSize = size === "lg" ? 18 : size === "md" ? 16 : 14;

  return (
    <Animated.View style={[animatedStyle, fullWidth ? { width: "100%" } : undefined]}>
      <BlastPressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={isStarred ? "Unstar word" : "Star word"}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          paddingHorizontal: size === "lg" ? 16 : size === "md" ? 13 : 11,
          paddingVertical: size === "lg" ? 13 : size === "md" ? 8 : 6,
          borderRadius: size === "lg" ? 14 : 999,
          backgroundColor: isStarred
            ? size === "lg"
              ? "#D97706"
              : "#FEF3C7"
            : size === "lg"
            ? (isPink ? "#DB2777" : "#0B6B4F")
            : isDark
            ? (isBlack ? "#0F0F0F" : "#082E22")
            : (isPink ? "#FCE7F3" : "#E2F2EC"),
          borderWidth: 1,
          borderColor: isStarred
            ? "#D97706"
            : size === "lg"
            ? (isPink ? "#DB2777" : "#0B6B4F")
            : isDark
            ? (isBlack ? "#262626" : "#134E3A")
            : (isPink ? "#FBCFE8" : "#C6E4D9")
        }}
      >
        <Star
          size={iconSize}
          color={
            isStarred
              ? size === "lg"
                ? "#FFFFFF"
                : "#D97706"
              : size === "lg"
              ? "#FFFFFF"
              : isDark
              ? "#94A3B8"
              : "#64748B"
          }
          fill={
            isStarred
              ? size === "lg"
                ? "#FFFFFF"
                : "#D97706"
              : "none"
          }
        />
        {label !== undefined ? (
          <Text
            style={{
              fontSize: size === "lg" ? 14 : 12,
              fontFamily: "Inter_700Bold",
              color: isStarred
                ? size === "lg"
                  ? "#FFFFFF"
                  : "#B45309"
                : size === "lg"
                ? "#FFFFFF"
                : isDark
                ? "#94A3B8"
                : "#475569"
            }}
          >
            {label}
          </Text>
        ) : null}
      </BlastPressable>
    </Animated.View>
  );
};
