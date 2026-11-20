import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Tabs, usePathname, useRouter } from "expo-router";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import {
  BookOpen,
  BookOpenCheck,
  GraduationCap,
  Layers,
  LucideIcon,
  Menu,
  Target,
  UserCheck,
  X
} from "lucide-react-native";
import { useApp } from "../../src/context/AppContext";
import { playClickSound } from "../../src/utils/soundEffects";
import { FloatingPlaybackPopup } from "../../src/components/audio";
import {
  setPageScrolledState,
  usePageScrolled
} from "../../src/components/common/ScrollToTopButton";

const TAB_PARTICLES = [
  { angle: 0, dist: 22, color: "#FFCE00" },
  { angle: Math.PI / 3, dist: 24, color: "#F2545B" },
  { angle: (2 * Math.PI) / 3, dist: 22, color: "#34D399" },
  { angle: Math.PI, dist: 24, color: "#FFCE00" },
  { angle: (4 * Math.PI) / 3, dist: 22, color: "#F2545B" },
  { angle: (5 * Math.PI) / 3, dist: 24, color: "#34D399" }
];

const TabParticle: React.FC<{
  angle: number;
  dist: number;
  color: string;
  progress: Animated.SharedValue<number>;
}> = ({ angle, dist, color, progress }) => {
  const style = useAnimatedStyle(() => {
    const p = progress.value;
    if (p <= 0.01 || p >= 0.99) {
      return { opacity: 0, transform: [{ scale: 0 }] };
    }
    return {
      opacity: interpolate(p, [0, 0.2, 0.7, 1], [0, 1, 0.8, 0]),
      transform: [
        { translateX: Math.cos(angle) * dist * p },
        { translateY: Math.sin(angle) * dist * p },
        { scale: interpolate(p, [0, 0.25, 1], [0.3, 1.3, 0]) }
      ]
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: color
        },
        style
      ]}
    />
  );
};

const AnimatedTabIcon: React.FC<{
  IconComponent: LucideIcon;
  color: string;
  focused: boolean;
  isDark: boolean;
  isPink: boolean;
  compact: boolean;
}> = ({ IconComponent, color, focused, isDark, isPink, compact }) => {
  const scale = useSharedValue(focused ? 1.12 : 1);
  const translateY = useSharedValue(focused ? -1.5 : 0);
  const blast = useSharedValue(0);
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    if (focused) {
      playClickSound();
      scale.value = withSequence(
        withTiming(0.86, { duration: 60 }),
        withTiming(1.24, {
          duration: 120,
          easing: Easing.out(Easing.back(2))
        }),
        withSpring(1.12, { damping: 10, stiffness: 220 })
      );
      translateY.value = withSpring(-1.5, { damping: 12, stiffness: 220 });
      blast.value = 0;
      blast.value = withTiming(1, {
        duration: 420,
        easing: Easing.out(Easing.cubic)
      });
    } else {
      scale.value = withSpring(1, { damping: 12, stiffness: 220 });
      translateY.value = withSpring(0, { damping: 12, stiffness: 220 });
    }
  }, [focused, scale, translateY, blast]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }]
  }));

  return (
    <Animated.View
      style={[
        {
          paddingHorizontal: compact ? 10 : 14,
          paddingVertical: compact ? 2 : 5,
          borderRadius: 999,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: focused
            ? isDark
              ? "rgba(255, 255, 255, 0.18)"
              : isPink
              ? "rgba(219, 39, 119, 0.18)"
              : "rgba(11, 107, 79, 0.22)"
            : "transparent",
          borderWidth: focused ? 1 : 0,
          borderColor: focused
            ? isDark
              ? "rgba(255, 255, 255, 0.35)"
              : "rgba(255, 255, 255, 0.75)"
            : "transparent"
        },
        animatedStyle
      ]}
    >
      <IconComponent size={compact ? 16 : 20} color={color} />
      {TAB_PARTICLES.map((tp, i) => (
        <TabParticle
          key={i}
          angle={tp.angle}
          dist={tp.dist}
          color={tp.color}
          progress={blast}
        />
      ))}
    </Animated.View>
  );
};

const FLOATING_MENU_ITEMS: Array<{
  key: string;
  label: string;
  route: string;
  matchPaths: string[];
  Icon: LucideIcon;
}> = [
  {
    key: "index",
    label: "Learn",
    route: "/",
    matchPaths: ["/", "/index", "/(tabs)", "/(tabs)/index"],
    Icon: GraduationCap
  },
  {
    key: "grammar",
    label: "Grammar",
    route: "/grammar",
    matchPaths: ["/grammar", "/(tabs)/grammar"],
    Icon: BookOpen
  },
  {
    key: "vocabulary",
    label: "Vocabulary",
    route: "/vocabulary",
    matchPaths: ["/vocabulary", "/(tabs)/vocabulary"],
    Icon: Layers
  },
  {
    key: "read",
    label: "Read & Play",
    route: "/read",
    matchPaths: ["/read", "/(tabs)/read"],
    Icon: BookOpenCheck
  },
  {
    key: "practice",
    label: "Practice",
    route: "/practice",
    matchPaths: ["/practice", "/(tabs)/practice"],
    Icon: Target
  },
  {
    key: "profile",
    label: "Profile",
    route: "/profile",
    matchPaths: ["/profile", "/(tabs)/profile"],
    Icon: UserCheck
  }
];

export default function TabLayout() {
  const { themeMode } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";
  const pathname = usePathname();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isScrolled = usePageScrolled();
  const [floatingMenuOpen, setFloatingMenuOpen] = useState(false);
  const minimizeProgress = useSharedValue(isScrolled ? 1 : 0);
  const menuOpenProgress = useSharedValue(0);

  // Full footer height on Learn page ("/" or "/index"), smaller compact height on all other pages
  const isLearnPage =
    pathname === "/" ||
    pathname === "/index" ||
    pathname === "/(tabs)" ||
    pathname === "/(tabs)/index";
  const isCompactFooter = !isLearnPage;
  const compactProgress = useSharedValue(isCompactFooter ? 1 : 0);

  useEffect(() => {
    setPageScrolledState(false);
    setFloatingMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isScrolled) {
      setFloatingMenuOpen(false);
    }
    minimizeProgress.value = withSpring(isScrolled ? 1 : 0, {
      damping: 19,
      stiffness: 165,
      mass: 0.85
    });
  }, [isScrolled]);

  useEffect(() => {
    compactProgress.value = withSpring(isCompactFooter ? 1 : 0, {
      damping: 20,
      stiffness: 180,
      mass: 0.85
    });
  }, [isCompactFooter]);

  useEffect(() => {
    menuOpenProgress.value = withSpring(
      floatingMenuOpen && isScrolled ? 1 : 0,
      {
        damping: 18,
        stiffness: 210,
        mass: 0.78
      }
    );
  }, [floatingMenuOpen, isScrolled]);

  const activeTintColor = isDark
    ? "#FFCE00"
    : isPink
    ? "#BE185D"
    : "#052E22";
  const inactiveTintColor = isDark
    ? "rgba(214, 239, 230, 0.72)"
    : isPink
    ? "rgba(131, 24, 67, 0.62)"
    : "rgba(6, 46, 34, 0.62)";

  const morphContainerAnimatedStyle = useAnimatedStyle(() => {
    const expandedMargin = interpolate(compactProgress.value, [0, 1], [14, 24]);
    const expandedBottom = interpolate(compactProgress.value, [0, 1], [12, 8]);
    const expandedHeight = interpolate(compactProgress.value, [0, 1], [68, 46]);
    const expandedRadius = interpolate(compactProgress.value, [0, 1], [32, 24]);
    const expandedWidth = Math.max(240, width - expandedMargin * 2);

    return {
      bottom: interpolate(minimizeProgress.value, [0, 1], [expandedBottom, 14]),
      left: interpolate(minimizeProgress.value, [0, 1], [expandedMargin, 16]),
      width: interpolate(minimizeProgress.value, [0, 1], [expandedWidth, 52]),
      height: interpolate(minimizeProgress.value, [0, 1], [expandedHeight, 52]),
      borderRadius: interpolate(
        minimizeProgress.value,
        [0, 1],
        [expandedRadius, 26]
      )
    };
  });

  const tabItemsRowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(minimizeProgress.value, [0, 0.42], [1, 0], "clamp"),
    transform: [
      {
        scale: interpolate(minimizeProgress.value, [0, 0.48], [1, 0.86], "clamp")
      }
    ]
  }));

  const circleTriggerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(minimizeProgress.value, [0.42, 1], [0, 1], "clamp"),
    transform: [
      {
        scale: interpolate(minimizeProgress.value, [0.35, 1], [0.55, 1], "clamp")
      },
      {
        rotate: `${interpolate(
          minimizeProgress.value,
          [0.35, 1],
          [-90, 0],
          "clamp"
        )}deg`
      }
    ]
  }));

  const floatingMenuAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(menuOpenProgress.value, [0, 1], [0, 1], "clamp"),
    transform: [
      {
        translateY: interpolate(
          menuOpenProgress.value,
          [0, 1],
          [isLandscape ? 8 : 22, 0],
          "clamp"
        )
      },
      {
        translateX: interpolate(
          menuOpenProgress.value,
          [0, 1],
          [isLandscape ? -22 : -10, 0],
          "clamp"
        )
      },
      {
        scale: interpolate(menuOpenProgress.value, [0, 1], [0.78, 1], "clamp")
      }
    ]
  }));

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        tabBar={() => null}
        screenOptions={{
          headerShown: false,
          // Only mount a tab when it is first visited.
          lazy: true,
          // Freeze hidden tabs so global state changes (XP, deck position,
          // settings...) don't re-render all 6 heavy screens on every tap.
          freezeOnBlur: true
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Learn" }} />
        <Tabs.Screen name="grammar" options={{ title: "Grammar" }} />
        <Tabs.Screen name="vocabulary" options={{ title: "Vocabulary" }} />
        <Tabs.Screen name="read" options={{ title: "Read & Play" }} />
        <Tabs.Screen name="practice" options={{ title: "Practice" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>

      {/* Backdrop when floating menu is open */}
      {isScrolled && floatingMenuOpen && (
        <Pressable
          onPress={() => setFloatingMenuOpen(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.22)",
            zIndex: 60
          }}
        />
      )}

      {/* Orientation-Aware Expanded Floating Menu */}
      <Animated.View
        pointerEvents={isScrolled && floatingMenuOpen ? "auto" : "none"}
        style={[
          {
            position: "absolute",
            bottom: isLandscape ? 14 : 74,
            left: isLandscape ? 78 : 16,
            right: isLandscape ? 16 : undefined,
            flexDirection: isLandscape ? "row" : "column",
            flexWrap: isLandscape ? "wrap" : "nowrap",
            alignItems: isLandscape ? "center" : "stretch",
            gap: 6,
            padding: 8,
            borderRadius: 22,
            backgroundColor: isBlack
              ? "rgba(18, 18, 18, 0.96)"
              : isDark
              ? "rgba(8, 46, 34, 0.96)"
              : isPink
              ? "rgba(255, 240, 245, 0.97)"
              : "rgba(255, 255, 255, 0.97)",
            borderWidth: 1.5,
            borderColor: isDark
              ? "rgba(255, 206, 0, 0.45)"
              : isPink
              ? "#F9A8D4"
              : "#0B6B4F",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 18,
            zIndex: 70
          },
          floatingMenuAnimatedStyle
        ]}
      >
        {FLOATING_MENU_ITEMS.map((item) => {
          const focused = item.matchPaths.includes(pathname);
          const ItemIcon = item.Icon;
          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.78}
              onPress={() => {
                playClickSound();
                setFloatingMenuOpen(false);
                router.push(item.route as any);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingHorizontal: 13,
                paddingVertical: 9,
                borderRadius: 14,
                backgroundColor: focused
                  ? isPink
                    ? "#DB2777"
                    : "#0B6B4F"
                  : "transparent",
                borderWidth: focused ? 1 : 0,
                borderColor: "#FFCE00"
              }}
            >
              <ItemIcon
                size={17}
                color={
                  focused
                    ? "#FFCE00"
                    : isDark
                    ? "#D6EFE6"
                    : isPink
                    ? "#BE185D"
                    : "#062E22"
                }
              />
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 12.5,
                  color: focused
                    ? "#FFFFFF"
                    : isDark
                    ? "#F0FDF9"
                    : "#062E22"
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* Smoothly Morphing Bottom Navbar <-> Floating Circle Button */}
      <Animated.View
        style={[
          {
            position: "absolute",
            overflow: "hidden",
            backgroundColor: isBlack
              ? "rgba(16, 16, 16, 0.78)"
              : isPink
              ? "rgba(219, 39, 119, 0.24)"
              : isDark
              ? "rgba(11, 107, 79, 0.38)"
              : "rgba(11, 107, 79, 0.24)",
            borderWidth: 1.2,
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.26)"
              : "rgba(255, 255, 255, 0.72)",
            shadowColor: "#041E16",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.24,
            shadowRadius: 24,
            elevation: 16,
            zIndex: 75,
            backdropFilter: "blur(30px) saturate(200%)",
            WebkitBackdropFilter: "blur(30px) saturate(200%)"
          } as any,
          morphContainerAnimatedStyle
        ]}
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
              ? "rgba(255, 255, 255, 0.38)"
              : "rgba(255, 255, 255, 0.88)",
            borderRadius: 999
          }}
        />
        {/* Top Half Liquid Glass Refraction Sheen */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(255, 255, 255, 0.32)"
          }}
        />

        {/* Expanded Full Navbar Tab Items */}
        <Animated.View
          pointerEvents={isScrolled ? "none" : "auto"}
          style={[
            {
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              paddingTop: isCompactFooter ? 3 : 6,
              paddingBottom: isCompactFooter ? 3 : 7,
              paddingHorizontal: 4
            },
            tabItemsRowAnimatedStyle
          ]}
        >
          {FLOATING_MENU_ITEMS.map((item) => {
            const focused = item.matchPaths.includes(pathname);
            const color = focused ? activeTintColor : inactiveTintColor;
            return (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.8}
                onPress={() => {
                  if (!focused) {
                    router.push(item.route as any);
                  }
                }}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <AnimatedTabIcon
                  IconComponent={item.Icon}
                  color={color}
                  focused={focused}
                  isDark={isDark}
                  isPink={isPink}
                  compact={isCompactFooter}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: isCompactFooter ? 9.5 : 11,
                    marginTop: isCompactFooter ? 1 : 3,
                    color
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* Minimized Circular Trigger Button Overlay */}
        <Animated.View
          pointerEvents={isScrolled ? "auto" : "none"}
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            },
            circleTriggerAnimatedStyle
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => {
              playClickSound();
              setFloatingMenuOpen((prev) => !prev);
            }}
            accessibilityRole="button"
            accessibilityLabel="Toggle floating navigation menu"
            style={{
              flex: 1,
              borderRadius: 26,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isPink ? "#DB2777" : "#0B6B4F",
              borderWidth: 2,
              borderColor: "#FFCE00"
            }}
          >
            {floatingMenuOpen ? (
              <X size={22} color="#FFCE00" />
            ) : (
              <Menu size={22} color="#FFCE00" />
            )}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <FloatingPlaybackPopup
        currentPath={pathname}
        isCompactFooter={isCompactFooter}
      />
    </View>
  );
}
