import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useApp } from "../../context/AppContext";
import { WordWatermark } from "../vocabulary/WordWatermark";

interface MaterialGlassCardProps {
  children: React.ReactNode;
  accentColor?: string;
  borderColor?: string;
  watermarkText?: string;
  borderRadius?: number;
  padding?: number;
  animatedLayout?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Reusable 3D Material Glass card with frosted surface, beveled inner rim,
 * top specular reflection, ambient accent glow, optional topic watermark, and 3D drop shade.
 */
export const MaterialGlassCard: React.FC<MaterialGlassCardProps> = ({
  children,
  accentColor,
  borderColor,
  watermarkText,
  borderRadius = 22,
  padding = 18,
  style
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const resolvedAccent = accentColor ?? (isPink ? "#DB2777" : "#0B6B4F");
  const resolvedBorder =
    borderColor ??
    (isDark
      ? isBlack
        ? "rgba(255, 255, 255, 0.16)"
        : "rgba(52, 211, 153, 0.28)"
      : isPink
      ? "rgba(219, 39, 119, 0.28)"
      : "rgba(11, 107, 79, 0.24)");

  const cardStyle = [
    {
      backgroundColor: isBlack
        ? "rgba(18, 18, 22, 0.92)"
        : isPink && !isDark
        ? "rgba(255, 244, 249, 0.92)"
        : isDark
        ? "rgba(10, 50, 38, 0.88)"
        : "rgba(255, 255, 255, 0.92)",
      borderRadius,
      padding,
      overflow: "hidden" as const,
      borderWidth: 1.5,
      borderColor: resolvedBorder,
      shadowColor: isDark ? "#000000" : "#041E16",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: isDark ? 0.42 : 0.14,
      shadowRadius: 18,
      elevation: 10
    } as any,
    style
  ];

  return (
    <View style={cardStyle}>
      {/* 3D Inner Bevel Rim */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 1,
          left: 1,
          right: 1,
          bottom: 1,
          borderRadius: Math.max(8, borderRadius - 1.5),
          borderTopWidth: 1.5,
          borderLeftWidth: 1.2,
          borderRightWidth: 0.8,
          borderBottomWidth: 1.5,
          borderTopColor: isDark
            ? "rgba(255, 255, 255, 0.24)"
            : "rgba(255, 255, 255, 0.9)",
          borderLeftColor: isDark
            ? "rgba(255, 255, 255, 0.14)"
            : "rgba(255, 255, 255, 0.7)",
          borderRightColor: isDark
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(255, 255, 255, 0.4)",
          borderBottomColor: isDark
            ? "rgba(0, 0, 0, 0.36)"
            : "rgba(6, 46, 34, 0.08)"
        }}
      />
      {/* Top Specular Reflection Rim */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 24,
          right: 24,
          height: 1.8,
          borderRadius: 999,
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.32)"
            : "rgba(255, 255, 255, 0.94)"
        }}
      />
      {/* Upper Glass Refraction Sheen */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "42%",
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.04)"
            : "rgba(255, 255, 255, 0.24)"
        }}
      />
      {/* Subtle Ambient Accent Glow */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -34,
          right: -34,
          width: 115,
          height: 115,
          borderRadius: 58,
          backgroundColor: resolvedAccent,
          opacity: isDark ? 0.12 : 0.07
        }}
      />
      {/* Optional Word/Topic Watermark */}
      {watermarkText ? (
        <WordWatermark
          text={watermarkText}
          accentColor={resolvedAccent}
          isDark={isDark}
        />
      ) : null}
      {children}
    </View>
  );
};
