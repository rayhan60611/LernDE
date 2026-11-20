import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { useApp } from "../../context/AppContext";
import { AnimatedProgressBar } from "../motion/MotionViews";
import { MaterialGlassCard } from "./MaterialGlassCard";

interface SectionProgressBarProps {
  label: string;
  completed: number;
  total: number;
  accentColor?: string;
}

/**
 * Compact top progress bar displaying completion count and percentage
 * across Grammar, Vocabulary, and Read & Play screens with smooth spring fill.
 */
export function SectionProgressBar({
  label,
  completed,
  total,
  accentColor
}: SectionProgressBarProps) {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const safeTotal = Math.max(total, 1);
  const clampedCompleted = Math.min(Math.max(completed, 0), safeTotal);
  const percent = total > 0 ? Math.round((clampedCompleted / total) * 100) : 0;

  const fillColor =
    accentColor ?? (isPink ? "#DB2777" : isDark ? "#10B981" : "#0B6B4F");

  const badgeScale = useSharedValue(1);

  useEffect(() => {
    badgeScale.value = withSequence(
      withTiming(1.14, { duration: 110 }),
      withSpring(1, { damping: 12, stiffness: 220 })
    );
  }, [percent, completed, badgeScale]);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }]
  }));

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 4, marginBottom: 6 }}>
      <MaterialGlassCard
        borderRadius={16}
        padding={12}
        accentColor={fillColor}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 7
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#E2E8F0" : "#1E293B"
            }}
          >
            {label}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Inter_600SemiBold",
                color: isDark ? "#94A3B8" : "#64748B"
              }}
            >
              {completed}/{total}
            </Text>
            <Animated.View
              style={[
                {
                  backgroundColor: isDark
                    ? isBlack
                      ? "#1F2937"
                      : "#0B3B2C"
                    : isPink
                    ? "#FCE7F3"
                    : "#E2F2EC",
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 999
                },
                badgeAnimatedStyle
              ]}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_700Bold",
                  color: fillColor
                }}
              >
                {percent}%
              </Text>
            </Animated.View>
          </View>
        </View>

        <AnimatedProgressBar
          percent={percent}
          height={10}
          trackColor={
            isDark
              ? isBlack
                ? "#262626"
                : "#052219"
              : isPink
              ? "#FCE7F3"
              : "#E2F2EC"
          }
          fillColor={fillColor}
          gradientColors={
            isPink
              ? ["#DB2777", "#F472B6", "#FFCE00"]
              : ["#0B6B4F", "#10B981", "#FFCE00"]
          }
        />
      </MaterialGlassCard>
    </View>
  );
}
