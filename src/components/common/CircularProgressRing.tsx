import React, { useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { useApp } from "../../context/AppContext";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
let ringGradCounter = 0;

interface CircularProgressRingProps {
  current: number;
  goal: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgressRing: React.FC<CircularProgressRingProps> = ({
  current,
  goal,
  size = 78,
  strokeWidth = 9
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const gradId = useMemo(() => `ring-grad-${++ringGradCounter}`, []);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(1, Math.max(0, goal > 0 ? current / goal : 0));
  const isGoalReached = current >= goal;

  const animatedRatio = useSharedValue(ratio);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    animatedRatio.value = withSpring(ratio, {
      damping: 17,
      stiffness: 115,
      mass: 0.9
    });
    pulseScale.value = withSequence(
      withTiming(1.09, { duration: 115 }),
      withSpring(1, { damping: 12, stiffness: 220 })
    );
  }, [ratio, current, goal, animatedRatio, pulseScale]);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedRatio.value)
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }]
  }));

  const gradStart = isGoalReached
    ? "#FDE047"
    : isPink
    ? "#F472B6"
    : "#34D399";
  const gradMid = isGoalReached
    ? "#F59E0B"
    : isPink
    ? "#DB2777"
    : "#0B6B4F";
  const gradEnd = isGoalReached ? "#16A34A" : "#FFCE00";

  const innerSize = size - strokeWidth * 2 - 4;

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: isGoalReached
            ? "#F59E0B"
            : isPink
            ? "#DB2777"
            : "#0B6B4F",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: isDark ? 0.45 : 0.24,
          shadowRadius: 10,
          elevation: 8
        },
        containerAnimatedStyle
      ]}
    >
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={gradStart} />
            <Stop offset="55%" stopColor={gradMid} />
            <Stop offset="100%" stopColor={gradEnd} />
          </LinearGradient>
        </Defs>
        {/* 3D Recessed Groove Track */}
        <Circle
          stroke={
            isDark
              ? isBlack
                ? "#262626"
                : "#062E22"
              : isPink
              ? "#FBCFE8"
              : "#C6E4D9"
          }
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Animated 3D Gradient Progress Arc */}
        <AnimatedCircle
          stroke={`url(#${gradId})`}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedCircleProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Elevated 3D Center Glass Medallion */}
      <View
        style={{
          position: "absolute",
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize / 2,
          backgroundColor: isDark
            ? isBlack
              ? "rgba(24, 24, 28, 0.9)"
              : "rgba(8, 46, 34, 0.9)"
            : "rgba(255, 255, 255, 0.92)",
          borderWidth: 1,
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.16)"
            : "rgba(255, 255, 255, 0.96)",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.4 : 0.1,
          shadowRadius: 4,
          elevation: 3
        }}
      >
        <Text
          style={{
            fontSize: 12.5,
            fontFamily: "Inter_700Bold",
            color: isGoalReached
              ? "#D97706"
              : isDark
              ? isPink
                ? "#FFF0F5"
                : "#EDF7F3"
              : isPink
              ? "#DB2777"
              : "#0B6B4F"
          }}
        >
          {current}/{goal}
        </Text>
        <Text
          style={{
            fontSize: 8.5,
            fontFamily: "Inter_600SemiBold",
            color: isDark ? "#94A3B8" : "#64748B"
          }}
        >
          XP
        </Text>
      </View>
    </Animated.View>
  );
};
