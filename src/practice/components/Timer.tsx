import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Clock } from "lucide-react-native";
import { useApp } from "../../context/AppContext";

interface TimerProps {
  initialSeconds: number;
  running: boolean;
  onExpire: () => void;
  resetKey?: string | number;
  compact?: boolean;
}

export function formatTimeMMSS(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export const Timer: React.FC<TimerProps> = ({
  initialSeconds,
  running,
  onExpire,
  resetKey,
  compact = false
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds, resetKey]);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, secondsLeft, onExpire]);

  const isLow = secondsLeft <= 30;

  return (
    <View
      accessibilityLabel={`Time remaining ${formatTimeMMSS(secondsLeft)}`}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: compact ? 10 : 12,
        paddingVertical: compact ? 5 : 7,
        borderRadius: 999,
        backgroundColor: isLow
          ? "rgba(220, 38, 38, 0.16)"
          : isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(11, 107, 79, 0.1)",
        borderWidth: 1,
        borderColor: isLow ? "#DC2626" : "rgba(255, 206, 0, 0.45)"
      }}
    >
      <Clock size={compact ? 13 : 15} color={isLow ? "#EF4444" : "#FFCE00"} />
      <Text
        style={{
          fontSize: compact ? 12 : 13,
          fontFamily: "Inter_700Bold",
          color: isLow
            ? "#EF4444"
            : isDark
            ? "#F0FDF9"
            : "#062E22"
        }}
      >
        {formatTimeMMSS(secondsLeft)}
      </Text>
    </View>
  );
};
