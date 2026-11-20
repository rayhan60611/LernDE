import React, { useEffect } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { ChevronDown } from "lucide-react-native";

interface MotionEntranceProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
  triggerKey?: string | number | boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Staggered spring-physics entrance wrapper that animates on mount
 * and re-animates smoothly whenever `triggerKey` changes.
 */
export const MotionEntrance: React.FC<MotionEntranceProps> = ({
  children,
  delay = 0,
  direction = "up",
  distance = 22,
  triggerKey,
  style
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(
    direction === "left" ? -distance : direction === "right" ? distance : 0
  );
  const translateY = useSharedValue(
    direction === "up" ? distance : direction === "down" ? -distance : 0
  );
  const scale = useSharedValue(direction === "scale" ? 0.88 : 0.97);

  useEffect(() => {
    opacity.value = 0;
    translateX.value =
      direction === "left" ? -distance : direction === "right" ? distance : 0;
    translateY.value =
      direction === "up" ? distance : direction === "down" ? -distance : 0;
    scale.value = direction === "scale" ? 0.88 : 0.97;

    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 280, easing: Easing.out(Easing.cubic) })
    );
    translateX.value = withDelay(
      delay,
      withSpring(0, { damping: 16, stiffness: 170 })
    );
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping: 16, stiffness: 170 })
    );
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 14, stiffness: 180 })
    );
  }, [delay, direction, distance, triggerKey, opacity, translateX, translateY, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ]
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

interface MotionPressableProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  scaleTo?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Tactile spring-physics pressable wrapper that scales down on touch/click
 * and springs back on release.
 */
export const MotionPressable: React.FC<MotionPressableProps> = ({
  children,
  onPress,
  disabled = false,
  scaleTo = 0.96,
  style
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(scaleTo, { damping: 15, stiffness: 300 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 12, stiffness: 260 });
        }}
        style={style}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

interface MotionFloatProps {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Continuous gentle vertical floating / breathing motion for icons, badges, and rings.
 */
export const MotionFloat: React.FC<MotionFloatProps> = ({
  children,
  amplitude = 4,
  duration = 1600,
  style
}) => {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(
      withSequence(
        withTiming(-amplitude, {
          duration,
          easing: Easing.inOut(Easing.sin)
        }),
        withTiming(amplitude, {
          duration,
          easing: Easing.inOut(Easing.sin)
        })
      ),
      -1,
      true
    );
    return () => {
      offset.value = 0;
    };
  }, [amplitude, duration, offset]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }]
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

interface AnimatedProgressBarProps {
  percent: number;
  height?: number;
  trackColor: string;
  fillColor: string;
  gradientColors?: [string, string, string];
  style?: StyleProp<ViewStyle>;
}

/**
 * Smoothly animated 3D gradient horizontal progress bar using spring physics.
 */
export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  percent,
  height = 10,
  trackColor,
  fillColor,
  gradientColors,
  style
}) => {
  const clamped = Math.min(100, Math.max(0, percent));
  const progress = useSharedValue(clamped);

  const [c1, c2] = gradientColors ?? [fillColor, "#34D399", "#FFCE00"];

  useEffect(() => {
    progress.value = withSpring(clamped, {
      damping: 18,
      stiffness: 130,
      mass: 0.85
    });
  }, [clamped, progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${Math.min(100, Math.max(0, progress.value))}%`
  }));

  return (
    <View
      style={[
        {
          height,
          borderRadius: 999,
          backgroundColor: trackColor,
          overflow: "hidden",
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.16)",
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255, 255, 255, 0.42)"
        },
        style
      ]}
    >
      <Animated.View
        style={[
          {
            height: "100%",
            borderRadius: 999,
            overflow: "hidden",
            backgroundColor: c1
          },
          fillStyle
        ]}
      >
        {/* Right-half gradient accent */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "45%",
            backgroundColor: c2,
            opacity: 0.55
          }}
        />
        {/* 3D Top Specular Gloss Highlight */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "42%",
            backgroundColor: "rgba(255, 255, 255, 0.36)"
          }}
        />
      </Animated.View>
    </View>
  );
};

interface AnimatedChevronProps {
  expanded: boolean;
  size?: number;
  color: string;
}

/**
 * Smoothly rotates a chevron icon 0deg <-> 180deg when expanded state changes.
 */
export const AnimatedChevron: React.FC<AnimatedChevronProps> = ({
  expanded,
  size = 18,
  color
}) => {
  const rotation = useSharedValue(expanded ? 180 : 0);

  useEffect(() => {
    rotation.value = withSpring(expanded ? 180 : 0, {
      damping: 16,
      stiffness: 210,
      mass: 0.8
    });
  }, [expanded, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }]
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ChevronDown size={size} color={color} />
    </Animated.View>
  );
};

interface MotionCollapseProps {
  expanded: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Smoothly animates collapsible card/dropdown sections with spring entry & exit.
 */
export const MotionCollapse: React.FC<MotionCollapseProps> = ({
  expanded,
  children,
  style
}) => {
  if (!expanded) return null;
  return (
    <Animated.View
      entering={FadeInDown.springify().damping(19).stiffness(210).mass(0.8)}
      exiting={FadeOutUp.duration(150)}
      layout={LinearTransition.springify().damping(20).stiffness(200)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

interface MotionLayoutCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Animated container that smoothly transitions its layout bounds when children expand or collapse.
 */
export const MotionLayoutCard: React.FC<MotionLayoutCardProps> = ({
  children,
  style
}) => {
  return (
    <Animated.View
      layout={LinearTransition.springify().damping(20).stiffness(200)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

interface MotionFeedbackBannerProps {
  isCorrect: boolean;
  triggerKey?: string | number | boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Animated right/wrong feedback container:
 * - Correct: Celebratory elastic pop-in
 * - Wrong: Tactile horizontal attention shake + fade in
 */
export const MotionFeedbackBanner: React.FC<MotionFeedbackBannerProps> = ({
  isCorrect,
  triggerKey,
  children,
  style
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.92);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    opacity.value = 0;
    translateY.value = 10;
    opacity.value = withTiming(1, { duration: 200 });
    translateY.value = withSpring(0, { damping: 16, stiffness: 200 });

    if (isCorrect) {
      scale.value = 0.9;
      translateX.value = 0;
      scale.value = withSequence(
        withTiming(1.04, { duration: 130, easing: Easing.out(Easing.back(2)) }),
        withSpring(1, { damping: 12, stiffness: 220 })
      );
    } else {
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      translateX.value = withSequence(
        withTiming(-9, { duration: 55 }),
        withTiming(9, { duration: 55 }),
        withTiming(-6, { duration: 50 }),
        withTiming(6, { duration: 50 }),
        withSpring(0, { damping: 12, stiffness: 240 })
      );
    }
  }, [isCorrect, triggerKey, opacity, scale, translateX, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ]
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};
