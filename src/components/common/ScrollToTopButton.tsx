import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { ArrowUp } from "lucide-react-native";
import { useApp } from "../../context/AppContext";

const SCROLL_THRESHOLD = 320;
const MENU_SHRINK_THRESHOLD = 65;
const BUTTON_SIZE = 46;
const HALF_SIZE = BUTTON_SIZE / 2;

let isPageScrolledGlobal = false;
const pageScrolledListeners = new Set<(scrolled: boolean) => void>();

export function setPageScrolledState(scrolled: boolean) {
  if (isPageScrolledGlobal === scrolled) return;
  isPageScrolledGlobal = scrolled;
  for (const listener of pageScrolledListeners) {
    listener(scrolled);
  }
}

export function usePageScrolled(): boolean {
  const [scrolled, setScrolled] = useState(isPageScrolledGlobal);
  useEffect(() => {
    setScrolled(isPageScrolledGlobal);
    pageScrolledListeners.add(setScrolled);
    return () => {
      pageScrolledListeners.delete(setScrolled);
    };
  }, []);
  return scrolled;
}

/**
 * Shared hook to track vertical scroll offset and smoothly scroll back to the top.
 */
export function useScrollToTop(threshold: number = SCROLL_THRESHOLD) {
  const scrollRef = useRef<ScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      if (y > MENU_SHRINK_THRESHOLD) {
        setPageScrolledState(true);
      } else if (y <= 25) {
        setPageScrolledState(false);
      }
      setShowScrollTop((prev) => {
        const next = y > threshold;
        return prev === next ? prev : next;
      });
    },
    [threshold]
  );

  const scrollToTop = useCallback(() => {
    setPageScrolledState(false);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return {
    scrollRef,
    showScrollTop,
    handleScroll,
    scrollToTop
  };
}

interface ScrollToTopButtonProps {
  visible: boolean;
  onPress: () => void;
  bottom?: number;
}

/**
 * Floating "Go Up" button that smoothly lifts upward, splits into two halves,
 * and vanishes when tapped.
 */
export function ScrollToTopButton({
  visible,
  onPress,
  bottom = 100
}: ScrollToTopButtonProps) {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const [isRendered, setIsRendered] = useState(visible);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const liftY = useSharedValue(16);
  const containerOpacity = useSharedValue(0);
  const containerScale = useSharedValue(0.8);
  const splitProgress = useSharedValue(0); // 0 = intact, 1 = split & vanished

  useEffect(() => {
    if (visible && !isAnimatingOut) {
      setIsRendered(true);
      splitProgress.value = 0;
      liftY.value = withTiming(0, {
        duration: 220,
        easing: Easing.out(Easing.cubic)
      });
      containerOpacity.value = withTiming(1, { duration: 200 });
      containerScale.value = withTiming(1, {
        duration: 220,
        easing: Easing.out(Easing.back(1.2))
      });
    } else if (!visible && !isAnimatingOut) {
      containerOpacity.value = withTiming(0, { duration: 160 });
      containerScale.value = withTiming(0.8, { duration: 160 });
      liftY.value = withTiming(16, { duration: 160 }, (finished) => {
        if (finished) {
          runOnJS(setIsRendered)(false);
        }
      });
    }
  }, [visible, isAnimatingOut, containerOpacity, containerScale, liftY, splitProgress]);

  const finishLaunch = useCallback(() => {
    setIsAnimatingOut(false);
    setIsRendered(false);
  }, []);

  const handlePress = useCallback(() => {
    if (isAnimatingOut) return;
    setIsAnimatingOut(true);
    onPress();

    // Stage 1: Smoothly go up
    liftY.value = withSequence(
      withTiming(-58, {
        duration: 260,
        easing: Easing.out(Easing.cubic)
      }),
      withTiming(-74, {
        duration: 240,
        easing: Easing.inOut(Easing.quad)
      })
    );

    // Stage 2: Split into two halves and vanish at the top
    splitProgress.value = withDelay(
      220,
      withTiming(
        1,
        {
          duration: 260,
          easing: Easing.out(Easing.cubic)
        },
        (finished) => {
          if (finished) {
            runOnJS(finishLaunch)();
          }
        }
      )
    );
  }, [isAnimatingOut, onPress, liftY, splitProgress, finishLaunch]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value * (1 - splitProgress.value),
    transform: [
      { translateY: liftY.value },
      { scale: containerScale.value * (1 - splitProgress.value * 0.35) }
    ]
  }));

  const leftHalfStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -splitProgress.value * 24 },
      { rotate: `${-splitProgress.value * 18}deg` }
    ]
  }));

  const rightHalfStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: splitProgress.value * 24 },
      { rotate: `${splitProgress.value * 18}deg` }
    ]
  }));

  if (!isRendered) return null;

  const backgroundColor = isPink
    ? "#DB2777"
    : isBlack
    ? "#1F2937"
    : isDark
    ? "#059669"
    : "#0B6B4F";

  const borderColor = isPink
    ? "#F9A8D4"
    : isDark
    ? "#34D399"
    : "#FFFFFF";

  const renderCircleFace = () => (
    <View
      style={{
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor,
        borderWidth: 1.5,
        borderColor,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ArrowUp size={22} color="#FFFFFF" strokeWidth={2.5} />
    </View>
  );

  return (
    <Animated.View
      pointerEvents={isAnimatingOut ? "none" : "box-none"}
      style={[
        {
          position: "absolute",
          right: 18,
          bottom,
          zIndex: 50
        },
        containerStyle
      ]}
    >
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel="Scroll to top"
        style={{
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          borderRadius: BUTTON_SIZE / 2,
          flexDirection: "row"
        }}
      >
        {/* Left half */}
        <Animated.View
          style={[
            {
              width: HALF_SIZE,
              height: BUTTON_SIZE,
              overflow: "hidden"
            },
            leftHalfStyle
          ]}
        >
          {renderCircleFace()}
        </Animated.View>

        {/* Right half */}
        <Animated.View
          style={[
            {
              width: HALF_SIZE,
              height: BUTTON_SIZE,
              overflow: "hidden"
            },
            rightHalfStyle
          ]}
        >
          <View style={{ marginLeft: -HALF_SIZE }}>{renderCircleFace()}</View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
