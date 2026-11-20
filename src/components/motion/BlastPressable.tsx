import React, { useCallback, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { playClickSound } from "../../utils/soundEffects";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ParticleSpec {
  angleRad: number;
  distance: number;
  size: number;
  color: string;
}

const PARTICLES: ParticleSpec[] = [
  { angleRad: 0, distance: 34, size: 7, color: "#FFCE00" },
  { angleRad: (Math.PI * 1) / 5, distance: 40, size: 6, color: "#F2545B" },
  { angleRad: (Math.PI * 2) / 5, distance: 32, size: 7, color: "#34D399" },
  { angleRad: (Math.PI * 3) / 5, distance: 38, size: 5, color: "#FFCE00" },
  { angleRad: (Math.PI * 4) / 5, distance: 35, size: 7, color: "#0B6B4F" },
  { angleRad: Math.PI, distance: 34, size: 6, color: "#F2545B" },
  { angleRad: (Math.PI * 6) / 5, distance: 40, size: 7, color: "#38BDF8" },
  { angleRad: (Math.PI * 7) / 5, distance: 32, size: 5, color: "#FFCE00" },
  { angleRad: (Math.PI * 8) / 5, distance: 38, size: 7, color: "#34D399" },
  { angleRad: (Math.PI * 9) / 5, distance: 35, size: 6, color: "#F2545B" }
];

const BlastParticle: React.FC<{
  spec: ParticleSpec;
  progress: Animated.SharedValue<number>;
}> = ({ spec, progress }) => {
  const style = useAnimatedStyle(() => {
    const p = progress.value;
    if (p <= 0.01 || p >= 0.99) {
      return { opacity: 0, transform: [{ scale: 0 }] };
    }
    const tx = Math.cos(spec.angleRad) * spec.distance * p;
    const ty = Math.sin(spec.angleRad) * spec.distance * p;
    const sc = interpolate(p, [0, 0.2, 0.75, 1], [0.2, 1.35, 0.9, 0]);
    const op = interpolate(p, [0, 0.15, 0.7, 1], [0, 1, 0.85, 0]);
    return {
      opacity: op,
      transform: [{ translateX: tx }, { translateY: ty }, { scale: sc }]
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          width: spec.size,
          height: spec.size,
          borderRadius: spec.size / 2,
          backgroundColor: spec.color
        },
        style
      ]}
    />
  );
};

export interface BlastPressableProps extends Omit<PressableProps, "style"> {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  muteClickSound?: boolean;
}

/**
 * Universal Button Replacement with:
 * 1. Elastic Bounce Animation (Squish -> Overshoot -> Spring settle)
 * 2. 360-degree Particle Blast + Shockwave Ring Effect
 * 3. Tactile Click Pop + Sparkle Sound
 */
export const BlastPressable: React.FC<BlastPressableProps> = ({
  children,
  onPress,
  onPressIn,
  onPressOut,
  disabled,
  style,
  muteClickSound = false,
  ...rest
}) => {
  const scale = useSharedValue(1);
  const blastProgress = useSharedValue(0);
  // Particle overlay is only mounted while the blast animation is running.
  // Keeping 11 hidden animated views mounted on every button (142 buttons,
  // up to 50 per list) made mounting/re-rendering very slow on low-end phones.
  const [isBlasting, setIsBlasting] = useState(false);
  const endBlast = useCallback(() => setIsBlasting(false), []);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const shockwaveStyle = useAnimatedStyle(() => {
    const p = blastProgress.value;
    if (p <= 0.01 || p >= 0.99) {
      return { opacity: 0, transform: [{ scale: 0.4 }] };
    }
    return {
      opacity: interpolate(p, [0, 0.2, 1], [0.7, 0.45, 0]),
      transform: [{ scale: interpolate(p, [0, 1], [0.5, 2.2]) }]
    };
  });

  const handlePressIn = (e: GestureResponderEvent) => {
    scale.value = withTiming(0.91, {
      duration: 85,
      easing: Easing.out(Easing.quad)
    });
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    scale.value = withSpring(1, { damping: 10, stiffness: 260 });
    onPressOut?.(e);
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (!muteClickSound) {
      playClickSound();
    }

    // 1. Elastic Bounce (Squish -> Pop 1.11x -> Spring 1.0x)
    scale.value = withSequence(
      withTiming(0.89, { duration: 60 }),
      withTiming(1.11, {
        duration: 120,
        easing: Easing.out(Easing.back(2.2))
      }),
      withSpring(1, { damping: 9, stiffness: 240 })
    );

    // 2. Particle Blast + Shockwave Ring (0 -> 1)
    setIsBlasting(true);
    blastProgress.value = 0;
    blastProgress.value = withTiming(
      1,
      {
        duration: 460,
        easing: Easing.out(Easing.cubic)
      },
      (finished) => {
        if (finished) {
          runOnJS(endBlast)();
        }
      }
    );

    onPress?.(e);
  };

  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[style, animatedButtonStyle]}
    >
      {children}

      {/* Center Particle Blast Emitter Overlay (mounted only during blast) */}
      {isBlasting && (
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          zIndex: 50
        }}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "#FFCE00"
            },
            shockwaveStyle
          ]}
        />
        {PARTICLES.map((spec, idx) => (
          <BlastParticle key={idx} spec={spec} progress={blastProgress} />
        ))}
      </View>
      )}
    </AnimatedPressable>
  );
};
