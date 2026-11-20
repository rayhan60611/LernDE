import { BlastPressable } from "../motion/BlastPressable";
import { AnimatedChevron } from "../motion/MotionViews";
import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { Check, Globe, Heart, Moon, Sparkles, Sun } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { getLanguageMeta, LANGUAGE_MODE_OPTIONS } from "../../utils/i18n";
import { LernDELogo } from "./LernDELogo";

export const GlobalHeader: React.FC<{ subtitle?: string }> = ({ subtitle }) => {
  const { languageMode, setLanguageMode, themeMode, toggleTheme } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";
  const activeMeta = getLanguageMeta(languageMode);

  const logoScale = useSharedValue(1);
  const logoRotate = useSharedValue(0);
  const themeRotate = useSharedValue(0);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotateZ: `${logoRotate.value}deg` }
    ]
  }));

  const animatedThemeStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${themeRotate.value}deg` }]
  }));

  const handlePressLogo = () => {
    logoScale.value = withSequence(
      withTiming(1.18, { duration: 130 }),
      withSpring(1, { damping: 10, stiffness: 220 })
    );
    logoRotate.value = withSequence(
      withTiming(-8, { duration: 90 }),
      withTiming(8, { duration: 90 }),
      withSpring(0, { damping: 10, stiffness: 220 })
    );
  };

  const handleToggleTheme = () => {
    themeRotate.value = withSequence(
      withTiming(themeRotate.value + 180, { duration: 260 }),
      withTiming(0, { duration: 0 })
    );
    toggleTheme();
  };

  return (
    <View
      style={
        {
          marginHorizontal: 12,
          marginTop: 6,
          marginBottom: 4,
          borderRadius: 24,
          overflow: "hidden",
          backgroundColor: isBlack
            ? "rgba(18, 18, 18, 0.72)"
            : isPink
            ? "rgba(219, 39, 119, 0.22)"
            : isDark
            ? "rgba(11, 107, 79, 0.32)"
            : "rgba(11, 107, 79, 0.24)",
          borderWidth: 1.2,
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.24)"
            : "rgba(255, 255, 255, 0.65)",
          shadowColor: "#041E16",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.14,
          shadowRadius: 20,
          elevation: 8,
          backdropFilter: "blur(28px) saturate(190%)",
          WebkitBackdropFilter: "blur(28px) saturate(190%)"
        } as any
      }
    >
      {/* Top Specular Liquid Glass Reflection Rim */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 16,
          right: 16,
          height: 1.5,
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.35)"
            : "rgba(255, 255, 255, 0.85)",
          borderRadius: 999
        }}
      />

      {/* Subtle Inner Glass Sheen */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "52%",
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.28)"
        }}
      />

      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Brand Logo & Title */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            flexShrink: 1,
            paddingRight: 8
          }}
        >
          <BlastPressable onPress={handlePressLogo}>
            <Animated.View
              style={[
                {
                  borderWidth: 1.5,
                  borderColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: 11,
                  overflow: "hidden",
                  shadowColor: "#062E22",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.2,
                  shadowRadius: 6
                },
                animatedLogoStyle
              ]}
            >
              <LernDELogo size={36} variant="ios" />
            </Animated.View>
          </BlastPressable>

          <View style={{ flexShrink: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#FFFFFF" : "#052E22"
                }}
              >
                Lern
                <Text style={{ color: isDark ? "#FFCE00" : "#0B6B4F" }}>
                  DE
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "NotoSansBengali_700Bold",
                  color: isDark ? "#D6EFE6" : "#095740"
                }}
              >
                {activeMeta.badgeLabel}
              </Text>
            </View>
            {subtitle ? (
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_600SemiBold",
                  color: isDark ? "#A7F3D0" : "#0B6B4F",
                  marginTop: 1
                }}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Right Controls: Language Dropdown + Theme Toggle */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <BlastPressable
            onPress={() => setDropdownOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Select explanation language"
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: isPink
                ? "rgba(219, 39, 119, 0.85)"
                : "rgba(11, 107, 79, 0.85)",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.45)"
            }}
          >
            <Globe size={13} color="#FFCE00" />
            <Text
              style={{
                fontSize: 11.5,
                fontFamily: "NotoSansBengali_700Bold",
                color: "#FFFFFF"
              }}
            >
              {activeMeta.shortLabel}
            </Text>
            <AnimatedChevron expanded={dropdownOpen} size={13} color="#FFFFFF" />
          </BlastPressable>

          <Modal
            visible={dropdownOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setDropdownOpen(false)}
          >
            <Pressable
              onPress={() => setDropdownOpen(false)}
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                paddingTop: 64,
                paddingRight: 16
              }}
            >
              <Animated.View
                entering={FadeInDown.springify().damping(18).stiffness(220)}
                exiting={FadeOutUp.duration(140)}
                style={{
                  width: 245,
                  borderRadius: 18,
                  padding: 8,
                  backgroundColor: isBlack
                    ? "#141414"
                    : isDark
                    ? "#082E22"
                    : "#FFFFFF",
                  borderWidth: 1.5,
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.22)"
                    : isPink
                    ? "#FBCFE8"
                    : "#C6E4D9",
                  shadowColor: "#000000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.28,
                  shadowRadius: 20,
                  elevation: 16,
                  gap: 4
                }}
              >
                {LANGUAGE_MODE_OPTIONS.map((opt) => {
                  const active = languageMode === opt.mode;
                  return (
                    <TouchableOpacity
                      key={opt.mode}
                      activeOpacity={0.75}
                      onPress={() => {
                        setLanguageMode(opt.mode);
                        setDropdownOpen(false);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 12,
                        paddingVertical: 9,
                        borderRadius: 12,
                        backgroundColor: active
                          ? isDark
                            ? "#064E3B"
                            : isPink
                            ? "#FDF2F8"
                            : "#EAF7F2"
                          : "transparent"
                      }}
                    >
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "NotoSansBengali_700Bold",
                            color: active
                              ? isDark
                                ? "#FFCE00"
                                : isPink
                                ? "#DB2777"
                                : "#0B6B4F"
                              : isDark
                              ? "#F0FDF9"
                              : "#062E22"
                          }}
                        >
                          {opt.flag} {opt.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "NotoSansBengali_500Medium",
                            color: isDark ? "#94A3B8" : "#64748B",
                            marginTop: 1
                          }}
                        >
                          {opt.subtitle}
                        </Text>
                      </View>
                      {active && (
                        <Check
                          size={16}
                          color={
                            isDark
                              ? "#FFCE00"
                              : isPink
                              ? "#DB2777"
                              : "#0B6B4F"
                          }
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </Animated.View>
            </Pressable>
          </Modal>

          <BlastPressable
            onPress={handleToggleTheme}
            accessibilityRole="button"
            accessibilityLabel="Toggle Light or Dark mode"
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.12)"
                : "rgba(255, 255, 255, 0.5)",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.25)"
                : "rgba(255, 255, 255, 0.78)"
            }}
          >
            <Animated.View style={animatedThemeStyle}>
              {isBlack ? (
                <Sparkles size={16} color="#FFFFFF" />
              ) : isPink ? (
                <Heart size={16} color="#DB2777" fill="#DB2777" />
              ) : isDark ? (
                <Sun size={16} color="#FFCE00" />
              ) : (
                <Moon size={16} color="#0B6B4F" />
              )}
            </Animated.View>
          </BlastPressable>
        </View>
      </View>
    </View>
  );
};
