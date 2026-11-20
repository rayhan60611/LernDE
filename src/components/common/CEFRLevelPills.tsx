import { BlastPressable } from "../motion/BlastPressable";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { CEFR_LEVELS, CEFR_META } from "../../constants/theme";
import { getSectionWordsByLevel } from "../../data/vocabulary";
import { CEFRLevel } from "../../types";
import { useApp } from "../../context/AppContext";

interface CEFRLevelPillsProps {
  selectedLevel: CEFRLevel;
  onSelectLevel: (level: CEFRLevel) => void;
  showAllOption?: boolean;
  isAllSelected?: boolean;
  onSelectAll?: () => void;
  showWordCounts?: boolean;
  customLevelLabels?: Partial<Record<CEFRLevel, string>>;
  allLabel?: string;
}

const AnimatedPillItem: React.FC<{
  active: boolean;
  children: React.ReactNode;
}> = ({ active, children }) => {
  const scale = useSharedValue(active ? 1.03 : 1);
  const translateY = useSharedValue(active ? -1.5 : 0);

  useEffect(() => {
    if (active) {
      scale.value = withSequence(
        withTiming(1.07, { duration: 110 }),
        withSpring(1.02, { damping: 14, stiffness: 220 })
      );
      translateY.value = withSpring(-1.5, { damping: 14, stiffness: 210 });
    } else {
      scale.value = withSpring(1, { damping: 16, stiffness: 200 });
      translateY.value = withSpring(0, { damping: 16, stiffness: 200 });
    }
  }, [active, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }]
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export const CEFRLevelPills: React.FC<CEFRLevelPillsProps> = ({
  selectedLevel,
  onSelectLevel,
  showAllOption = false,
  isAllSelected = false,
  onSelectAll,
  showWordCounts = true,
  customLevelLabels,
  allLabel
}) => {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  return (
    <View style={{ paddingVertical: 8 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 2,
          gap: 8
        }}
      >
        {showAllOption && (
          <AnimatedPillItem active={isAllSelected}>
            <BlastPressable
              onPress={onSelectAll}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: isAllSelected
                  ? isPink
                    ? "#DB2777"
                    : "#0B6B4F"
                  : isDark
                  ? isBlack
                    ? "#0F0F0F"
                    : "#082E22"
                  : isPink
                  ? "#FCE7F3"
                  : "#E2F2EC",
                borderWidth: 1,
                borderColor: isAllSelected
                  ? isPink
                    ? "#DB2777"
                    : "#0B6B4F"
                  : isDark
                  ? isBlack
                    ? "#262626"
                    : "#134E3A"
                  : isPink
                  ? "#FBCFE8"
                  : "#C6E4D9"
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Inter_700Bold",
                  color: isAllSelected
                    ? "#FFFFFF"
                    : isDark
                    ? "#A7D7C5"
                    : "#475569"
                }}
              >
                All (A1–B2){allLabel ? ` (${allLabel})` : ""}
              </Text>
            </BlastPressable>
          </AnimatedPillItem>
        )}

        {CEFR_LEVELS.map((lvl) => {
          const active = !isAllSelected && selectedLevel === lvl;
          const meta = CEFR_META[lvl];
          const wordCount = getSectionWordsByLevel(lvl).length;
          return (
            <AnimatedPillItem key={lvl} active={active}>
              <BlastPressable
                onPress={() => onSelectLevel(lvl)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                  backgroundColor: active
                    ? meta.badgeColor
                    : isDark
                    ? isBlack
                      ? "#0F0F0F"
                      : "#082E22"
                    : "#FFFFFF",
                  borderWidth: 1,
                  borderColor: active
                    ? meta.badgeColor
                    : isDark
                    ? isBlack
                      ? "#262626"
                      : "#134E3A"
                    : isPink
                    ? "#FBCFE8"
                    : "#C6E4D9"
                }}
              >
                <View
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 3.5,
                    backgroundColor: active ? "#FFFFFF" : meta.badgeColor
                  }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_700Bold",
                    color: active
                      ? "#FFFFFF"
                      : isDark
                      ? isPink
                        ? "#FFF0F5"
                        : "#EDF7F3"
                      : isBlack
                      ? "#171717"
                      : "#052219"
                  }}
                >
                  {lvl}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_600SemiBold",
                    color: active
                      ? "rgba(255,255,255,0.92)"
                      : isDark
                      ? "#94A3B8"
                      : "#64748B"
                  }}
                >
                  {customLevelLabels?.[lvl]
                    ? `${meta.nameDe} (${customLevelLabels[lvl]})`
                    : showWordCounts
                    ? `${meta.nameDe} (${wordCount} words)`
                    : meta.nameDe}
                </Text>
              </BlastPressable>
            </AnimatedPillItem>
          );
        })}
      </ScrollView>
    </View>
  );
};
