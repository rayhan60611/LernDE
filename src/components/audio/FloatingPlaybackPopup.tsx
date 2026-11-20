import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { Pause, Play, Square, Volume2 } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import {
  pauseGermanSpeech,
  resumeGermanSpeech,
  setCurrentSpeechScreen,
  stopGermanSpeech,
  useActiveSpeechHighlight
} from "../../utils/tts";
import { usePageScrolled } from "../common/ScrollToTopButton";

function normalizeTabPath(path: string | null): string {
  if (!path) return "/";
  const stripped = path.replace(/^\/\(tabs\)/, "") || "/";
  if (stripped === "/index") return "/";
  return stripped;
}

function getScreenLabel(path: string | null): string {
  const norm = normalizeTabPath(path);
  switch (norm) {
    case "/read":
      return "Read & Play";
    case "/practice":
      return "Practice";
    case "/grammar":
      return "Grammar";
    case "/vocabulary":
      return "Vocabulary";
    case "/profile":
      return "Profile";
    default:
      return "Learn";
  }
}

export const FloatingPlaybackPopup: React.FC<{
  currentPath: string;
  isCompactFooter: boolean;
}> = ({ currentPath, isCompactFooter }) => {
  const router = useRouter();
  const { themeMode } = useApp();
  const speechState = useActiveSpeechHighlight();

  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";
  const isScrolled = usePageScrolled();

  const targetBottom = isScrolled ? 14 : isCompactFooter ? 64 : 90;
  const targetLeft = isScrolled ? 76 : 14;
  const animatedBottom = useSharedValue(targetBottom);
  const animatedLeft = useSharedValue(targetLeft);
  const speakerPulse = useSharedValue(1);

  useEffect(() => {
    setCurrentSpeechScreen(normalizeTabPath(currentPath));
  }, [currentPath]);

  useEffect(() => {
    animatedBottom.value = withSpring(targetBottom, {
      damping: 19,
      stiffness: 175
    });
    animatedLeft.value = withSpring(targetLeft, {
      damping: 19,
      stiffness: 175
    });
  }, [targetBottom, targetLeft, animatedBottom, animatedLeft]);

  useEffect(() => {
    if (speechState.isPlaying && !speechState.isPaused) {
      speakerPulse.value = withRepeat(
        withSequence(
          withTiming(1.09, { duration: 550, easing: Easing.inOut(Easing.sin) }),
          withTiming(1, { duration: 550, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
    } else {
      speakerPulse.value = withSpring(1, { damping: 14, stiffness: 200 });
    }
  }, [speechState.isPlaying, speechState.isPaused, speakerPulse]);

  const positionAnimatedStyle = useAnimatedStyle(() => ({
    bottom: animatedBottom.value,
    left: animatedLeft.value
  }));

  const speakerBadgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: speakerPulse.value }]
  }));

  const isActive =
    speechState.activeText !== null &&
    (speechState.isPlaying || speechState.isPaused);
  const isDifferentScreen =
    speechState.originPath !== null &&
    normalizeTabPath(currentPath) !== normalizeTabPath(speechState.originPath);

  if (!isActive || !isDifferentScreen) {
    return null;
  }

  const originLabel = getScreenLabel(speechState.originPath);
  const accentColor = isPink ? "#DB2777" : "#0B6B4F";

  return (
    <Animated.View
      entering={FadeInDown.springify().damping(18)}
      exiting={FadeOutDown.duration(180)}
      style={[
        {
          position: "absolute",
          right: 14,
          zIndex: 50
        },
        positionAnimatedStyle
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 20,
          backgroundColor: isBlack
            ? "rgba(20, 20, 20, 0.96)"
            : isDark
            ? "rgba(17, 29, 25, 0.96)"
            : isPink
            ? "rgba(255, 245, 250, 0.97)"
            : "rgba(255, 255, 255, 0.97)",
          borderWidth: 1.5,
          borderColor: isDark
            ? "rgba(52, 211, 153, 0.35)"
            : isPink
            ? "rgba(219, 39, 119, 0.35)"
            : "rgba(11, 107, 79, 0.28)",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.45 : 0.16,
          shadowRadius: 18,
          elevation: 12
        }}
      >
        {/* Tap text preview to jump back to the originating screen */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (speechState.originPath) {
              router.push(normalizeTabPath(speechState.originPath) as any);
            }
          }}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10
          }}
        >
          <Animated.View
            style={[
              {
                width: 36,
                height: 36,
                borderRadius: 12,
                backgroundColor: speechState.isPaused
                  ? isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(100,116,139,0.14)"
                  : accentColor,
                alignItems: "center",
                justifyContent: "center"
              },
              speakerBadgeAnimatedStyle
            ]}
          >
            <Volume2
              size={18}
              color={
                speechState.isPaused
                  ? isDark
                    ? "#CBD5E1"
                    : "#475569"
                  : "#FFFFFF"
              }
            />
          </Animated.View>

          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 10,
                letterSpacing: 0.5,
                color: speechState.isPaused
                  ? isDark
                    ? "#94A3B8"
                    : "#64748B"
                  : isDark
                  ? "#34D399"
                  : accentColor
              }}
            >
              {speechState.isPaused ? "PAUSED" : "NOW PLAYING"} • {originLabel.toUpperCase()}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 13,
                marginTop: 1,
                color: isDark ? "#F8FAFC" : "#0F172A"
              }}
            >
              {speechState.activeText}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Pause / Resume Button */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            if (speechState.isPaused) {
              resumeGermanSpeech();
            } else {
              pauseGermanSpeech();
            }
          }}
          accessibilityRole="button"
          accessibilityLabel={speechState.isPaused ? "Resume playback" : "Pause playback"}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 11,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: accentColor
          }}
        >
          {speechState.isPaused ? (
            <Play size={14} color="#FFFFFF" fill="#FFFFFF" />
          ) : (
            <Pause size={14} color="#FFFFFF" fill="#FFFFFF" />
          )}
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 11.5,
              color: "#FFFFFF"
            }}
          >
            {speechState.isPaused ? "Play" : "Pause"}
          </Text>
        </TouchableOpacity>

        {/* Stop Button */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            stopGermanSpeech();
          }}
          accessibilityRole="button"
          accessibilityLabel="Stop playback"
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: isDark
              ? "rgba(239, 68, 68, 0.2)"
              : "rgba(239, 68, 68, 0.12)",
            borderWidth: 1,
            borderColor: isDark
              ? "rgba(248, 113, 113, 0.35)"
              : "rgba(220, 38, 38, 0.25)"
          }}
        >
          <Square
            size={12}
            color={isDark ? "#F87171" : "#DC2626"}
            fill={isDark ? "#F87171" : "#DC2626"}
          />
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 11.5,
              color: isDark ? "#F87171" : "#DC2626"
            }}
          >
            Stop
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
