import React from "react";
import { Text, View } from "react-native";
import { useApp } from "../../context/AppContext";
import { AnimatedProgressBar } from "../../components/motion/MotionViews";

interface PracticeProgressBarProps {
  current: number;
  total: number;
  accentColor?: string;
}

export const ProgressBar: React.FC<PracticeProgressBarProps> = ({
  current,
  total,
  accentColor
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const safeTotal = Math.max(1, total);
  const clampedCurrent = Math.min(Math.max(1, current), safeTotal);
  const percent = Math.round((clampedCurrent / safeTotal) * 100);
  const fill = accentColor ?? (isPink ? "#DB2777" : "#0B6B4F");

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: safeTotal, now: clampedCurrent }}
      style={{ gap: 6 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text
          style={{
            fontSize: 12.5,
            fontFamily: "Inter_700Bold",
            color: isDark ? "#E2E8F0" : "#1E293B"
          }}
        >
          Question {clampedCurrent} of {safeTotal}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Inter_700Bold",
            color: fill
          }}
        >
          {percent}%
        </Text>
      </View>

      <AnimatedProgressBar
        percent={percent}
        height={10}
        trackColor={
          isDark
            ? isBlack
              ? "#262626"
              : "#082E22"
              : isPink
              ? "#FCE7F3"
              : "#C6E4D9"
        }
        fillColor={fill}
        gradientColors={
          isPink
            ? ["#DB2777", "#F472B6", "#FFCE00"]
            : ["#0B6B4F", "#34D399", "#FFCE00"]
        }
      />
    </View>
  );
};
