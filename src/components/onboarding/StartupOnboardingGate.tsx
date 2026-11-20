import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { ArrowRight, Camera, Sparkles, UserCheck } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { LernDELogo } from "../common/LernDELogo";
import { MaterialGlassCard } from "../common/MaterialGlassCard";
import { BlastPressable } from "../motion/BlastPressable";
import {
  AnimatedProgressBar,
  MotionEntrance,
  MotionFloat
} from "../motion/MotionViews";
import { LANGUAGE_MODE_OPTIONS } from "../../utils/i18n";
import { playStarSound } from "../../utils/soundEffects";

const AVATAR_PRESETS = [
  {
    id: "preset-dev",
    label: "Scholar",
    uri: "https://api.dicebear.com/9.x/avataaars/png?seed=RayhanFrankfurt&backgroundColor=0b6b4f"
  },
  {
    id: "preset-student",
    label: "Learner",
    uri: "https://api.dicebear.com/9.x/avataaars/png?seed=FrankfurtInformatics&backgroundColor=ffce00"
  },
  {
    id: "preset-speaker",
    label: "Speaker",
    uri: "https://api.dicebear.com/9.x/avataaars/png?seed=DeutschProfi&backgroundColor=b6e3f4"
  },
  {
    id: "preset-explorer",
    label: "Traveler",
    uri: "https://api.dicebear.com/9.x/avataaars/png?seed=BerlinMain&backgroundColor=c0aede"
  }
];

export const StartupOnboardingGate: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const {
    isHydrated,
    hasCompletedOnboarding,
    completeOnboarding,
    userName,
    userAge,
    userGender,
    userEmail,
    userAvatarUri,
    updateUserProfile,
    languageMode,
    setLanguageMode,
    themeMode
  } = useApp();

  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const [splashDone, setSplashDone] = useState(false);
  const [splashPercent, setSplashPercent] = useState(25);

  // First-time onboarding draft state
  const [draftName, setDraftName] = useState(
    userName && userName !== "M. M. Rayhan Parvez" ? userName : ""
  );
  const [draftAge, setDraftAge] = useState(userAge || "");
  const [draftGender, setDraftGender] = useState(userGender || "Male");
  const [draftEmail, setDraftEmail] = useState(
    userEmail && userEmail !== "mmrp.cse@gmail.com" ? userEmail : ""
  );
  const [draftAvatarUri, setDraftAvatarUri] = useState<string | null>(
    userAvatarUri
  );
  const [nameError, setNameError] = useState(false);

  const logoScale = useSharedValue(0.65);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic)
    });
    logoScale.value = withSpring(1, {
      damping: 12,
      stiffness: 170
    });

    const t1 = setTimeout(() => setSplashPercent(68), 100);
    const t2 = setTimeout(() => setSplashPercent(100), 420);
    const t3 = setTimeout(() => setSplashDone(true), 850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [logoOpacity, logoScale]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }]
  }));

  const handlePickPhotoFromDevice = () => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event: any) => {
        const file = event?.target?.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setDraftAvatarUri(reader.result);
          }
        };
        reader.readAsDataURL(file);
      };
      input.click();
    }
  };

  const handleLetsGo = () => {
    const cleanName = draftName.trim();
    if (!cleanName) {
      setNameError(true);
      return;
    }
    setNameError(false);
    updateUserProfile({
      userName: cleanName,
      userAge: draftAge.trim() || "25",
      userGender: draftGender || "Male",
      userEmail: draftEmail.trim() || "learner@lernde.app",
      userAvatarUri: draftAvatarUri
    });
    playStarSound(true);
    completeOnboarding();
  };

  const showSplash = !isHydrated || !splashDone;

  if (showSplash) {
    return (
      <Animated.View
        exiting={FadeOut.duration(320)}
        style={{
          flex: 1,
          backgroundColor: isBlack
            ? "#000000"
            : isPink
            ? "#9D174D"
            : "#052E22",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32
        }}
      >
        {/* Ambient Background Glows */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: 140,
            backgroundColor: isPink ? "#F472B6" : "#10B981",
            opacity: 0.16
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            bottom: 80,
            right: -40,
            width: 190,
            height: 190,
            borderRadius: 95,
            backgroundColor: "#FFCE00",
            opacity: 0.12
          }}
        />

        <Animated.View style={[{ alignItems: "center" }, animatedLogoStyle]}>
          <MotionFloat amplitude={5} duration={1500}>
            <View
              style={{
                padding: 6,
                borderRadius: 34,
                borderWidth: 2.5,
                borderColor: "#FFCE00",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 18 },
                shadowOpacity: 0.45,
                shadowRadius: 28,
                elevation: 18
              }}
            >
              <LernDELogo size={112} variant="ios" />
            </View>
          </MotionFloat>

          <Text
            style={{
              marginTop: 22,
              fontSize: 34,
              fontFamily: "Inter_700Bold",
              color: "#FFFFFF",
              letterSpacing: 0.5
            }}
          >
            Lern<Text style={{ color: "#FFCE00" }}>DE</Text>
          </Text>

          <Text
            style={{
              marginTop: 6,
              fontSize: 13.5,
              fontFamily: "Inter_600SemiBold",
              color: "rgba(236, 253, 245, 0.85)",
              textAlign: "center"
            }}
          >
            Master German A1–B2 • Interactive & Bilingual
          </Text>

          <View style={{ width: 190, marginTop: 28 }}>
            <AnimatedProgressBar
              percent={splashPercent}
              height={6}
              trackColor="rgba(255, 255, 255, 0.18)"
              fillColor="#FFCE00"
            />
          </View>
        </Animated.View>

        <View
          style={{
            position: "absolute",
            bottom: 34,
            left: 24,
            right: 24,
            alignItems: "center",
            gap: 3
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_700Bold",
              color: "#FFCE00",
              textAlign: "center"
            }}
          >
            Developed by M. M. Rayhan Parvez
          </Text>
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Inter_500Medium",
              color: "rgba(236, 253, 245, 0.72)",
              textAlign: "center"
            }}
          >
            © {new Date().getFullYear()} M. M. Rayhan Parvez. All rights reserved.
          </Text>
        </View>
      </Animated.View>
    );
  }

  // First-time-only onboarding screen (shown until completed, persisted until app is deleted)
  if (!hasCompletedOnboarding) {
    const accent = isPink ? "#DB2777" : "#0B6B4F";
    return (
      <Animated.View
        entering={FadeIn.duration(340)}
        style={{
          flex: 1,
          backgroundColor: isDark
            ? isBlack
              ? "#000000"
              : "#041E16"
            : isPink
            ? "#FFF0F5"
            : "#EDF7F3"
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 18,
                paddingTop: 18,
                paddingBottom: 36,
                gap: 16
              }}
            >
              {/* Welcome Header with Logo */}
              <MotionEntrance delay={40} direction="down">
                <View style={{ alignItems: "center", marginBottom: 4 }}>
                  <View
                    style={{
                      padding: 4,
                      borderRadius: 24,
                      borderWidth: 2,
                      borderColor: "#FFCE00",
                      backgroundColor: accent,
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 10 },
                      shadowOpacity: 0.22,
                      shadowRadius: 18,
                      elevation: 10
                    }}
                  >
                    <LernDELogo size={68} variant="ios" />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 12
                    }}
                  >
                    <Sparkles size={18} color="#FFCE00" />
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      Welcome to LernDE!
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Inter_500Medium",
                      color: isDark ? "#A7F3D0" : "#475569",
                      textAlign: "center",
                      marginTop: 4
                    }}
                  >
                    Set up your profile once to personalize your German learning
                    journey.
                  </Text>
                </View>
              </MotionEntrance>

              {/* 3D Material Glass Profile Picture & Details Card */}
              <MotionEntrance delay={120} direction="up">
                <MaterialGlassCard
                  borderRadius={24}
                  padding={18}
                  accentColor={accent}
                  watermarkText="user profile"
                >
                  {/* Profile Picture Preview & Picker */}
                  <View style={{ alignItems: "center", marginBottom: 16 }}>
                    <View style={{ position: "relative" }}>
                      <View
                        style={{
                          width: 88,
                          height: 88,
                          borderRadius: 24,
                          overflow: "hidden",
                          borderWidth: 2.5,
                          borderColor: "#FFCE00",
                          backgroundColor: accent,
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {draftAvatarUri ? (
                          <Image
                            source={{ uri: draftAvatarUri }}
                            style={{ width: 88, height: 88 }}
                            resizeMode="cover"
                          />
                        ) : (
                          <LernDELogo size={88} variant="ios" />
                        )}
                      </View>

                      <BlastPressable
                        onPress={handlePickPhotoFromDevice}
                        style={{
                          position: "absolute",
                          bottom: -4,
                          right: -4,
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          backgroundColor: "#FFCE00",
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 2,
                          borderColor: isDark ? "#082E22" : "#FFFFFF"
                        }}
                      >
                        <Camera size={15} color="#052E22" />
                      </BlastPressable>
                    </View>

                    <Text
                      style={{
                        fontSize: 11.5,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginTop: 8
                      }}
                    >
                      Choose an Avatar or Upload Photo
                    </Text>

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        gap: 10,
                        paddingTop: 10,
                        paddingHorizontal: 4
                      }}
                    >
                      <BlastPressable
                        onPress={() => setDraftAvatarUri(null)}
                        style={{
                          alignItems: "center",
                          padding: 6,
                          borderRadius: 14,
                          backgroundColor:
                            draftAvatarUri === null
                              ? isDark
                                ? "#064E3B"
                                : "#EAF7F2"
                              : "transparent",
                          borderWidth: 1.5,
                          borderColor:
                            draftAvatarUri === null
                              ? "#FFCE00"
                              : isDark
                              ? "#134E3A"
                              : "#C6E4D9"
                        }}
                      >
                        <View
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            overflow: "hidden"
                          }}
                        >
                          <LernDELogo size={42} variant="ios" />
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: "Inter_600SemiBold",
                            color: isDark ? "#D6EFE6" : "#062E22",
                            marginTop: 3
                          }}
                        >
                          Logo
                        </Text>
                      </BlastPressable>

                      {AVATAR_PRESETS.map((preset) => {
                        const selected = draftAvatarUri === preset.uri;
                        return (
                          <BlastPressable
                            key={preset.id}
                            onPress={() => setDraftAvatarUri(preset.uri)}
                            style={{
                              alignItems: "center",
                              padding: 6,
                              borderRadius: 14,
                              backgroundColor: selected
                                ? isDark
                                  ? "#064E3B"
                                  : "#EAF7F2"
                                : "transparent",
                              borderWidth: 1.5,
                              borderColor: selected
                                ? "#FFCE00"
                                : isDark
                                ? "#134E3A"
                                : "#C6E4D9"
                            }}
                          >
                            <Image
                              source={{ uri: preset.uri }}
                              style={{
                                width: 42,
                                height: 42,
                                borderRadius: 12
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: "Inter_600SemiBold",
                                color: isDark ? "#D6EFE6" : "#062E22",
                                marginTop: 3
                              }}
                            >
                              {preset.label}
                            </Text>
                          </BlastPressable>
                        );
                      })}
                    </ScrollView>
                  </View>

                  {/* Full Name */}
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#D6EFE6" : "#062E22",
                        marginBottom: 4
                      }}
                    >
                      Your Full Name *
                    </Text>
                    <TextInput
                      value={draftName}
                      onChangeText={(txt) => {
                        setDraftName(txt);
                        if (nameError && txt.trim()) setNameError(false);
                      }}
                      placeholder="Enter your name"
                      placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                      style={{
                        backgroundColor: isDark
                          ? isBlack
                            ? "#171717"
                            : "#052219"
                          : "#FFFFFF",
                        color: isDark ? "#F0FDF9" : "#062E22",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderWidth: 1.5,
                        borderColor: nameError
                          ? "#EF4444"
                          : isDark
                          ? "#134E3A"
                          : "#C6E4D9",
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 14
                      }}
                    />
                    {nameError && (
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_600SemiBold",
                          color: "#EF4444",
                          marginTop: 4
                        }}
                      >
                        Please enter your name to continue.
                      </Text>
                    )}
                  </View>

                  {/* Age & Gender Row */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginBottom: 10
                    }}
                  >
                    <View style={{ width: 92 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#D6EFE6" : "#062E22",
                          marginBottom: 4
                        }}
                      >
                        Age
                      </Text>
                      <TextInput
                        value={draftAge}
                        onChangeText={setDraftAge}
                        keyboardType="numeric"
                        placeholder="25"
                        placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                        style={{
                          backgroundColor: isDark
                            ? isBlack
                              ? "#171717"
                              : "#052219"
                            : "#FFFFFF",
                          color: isDark ? "#F0FDF9" : "#062E22",
                          borderRadius: 12,
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          borderWidth: 1,
                          borderColor: isDark ? "#134E3A" : "#C6E4D9",
                          fontFamily: "Inter_600SemiBold",
                          fontSize: 14
                        }}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#D6EFE6" : "#062E22",
                          marginBottom: 4
                        }}
                      >
                        Gender
                      </Text>
                      <View style={{ flexDirection: "row", gap: 6 }}>
                        {(["Male", "Female", "Other"] as const).map((g) => {
                          const active = draftGender === g;
                          return (
                            <BlastPressable
                              key={g}
                              onPress={() => setDraftGender(g)}
                              style={{
                                flex: 1,
                                paddingVertical: 10,
                                borderRadius: 12,
                                alignItems: "center",
                                backgroundColor: active
                                  ? accent
                                  : isDark
                                  ? "#052219"
                                  : "#FFFFFF",
                                borderWidth: 1,
                                borderColor: active
                                  ? "#FFCE00"
                                  : isDark
                                  ? "#134E3A"
                                  : "#C6E4D9"
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: "Inter_700Bold",
                                  color: active
                                    ? "#FFFFFF"
                                    : isDark
                                    ? "#D6EFE6"
                                    : "#062E22"
                                }}
                              >
                                {g}
                              </Text>
                            </BlastPressable>
                          );
                        })}
                      </View>
                    </View>
                  </View>

                  {/* Email Address */}
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#D6EFE6" : "#062E22",
                        marginBottom: 4
                      }}
                    >
                      Email Address (Optional)
                    </Text>
                    <TextInput
                      value={draftEmail}
                      onChangeText={setDraftEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="you@example.com"
                      placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                      style={{
                        backgroundColor: isDark
                          ? isBlack
                            ? "#171717"
                            : "#052219"
                          : "#FFFFFF",
                        color: isDark ? "#F0FDF9" : "#062E22",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: isDark ? "#134E3A" : "#C6E4D9",
                        fontFamily: "Inter_500Medium",
                        fontSize: 13
                      }}
                    />
                  </View>

                  {/* Explanation Language Quick Selector */}
                  <View style={{ marginBottom: 16 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#D6EFE6" : "#062E22",
                        marginBottom: 6
                      }}
                    >
                      Preferred Explanation Language
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 6
                      }}
                    >
                      {LANGUAGE_MODE_OPTIONS.map((opt) => {
                        const active = languageMode === opt.mode;
                        return (
                          <BlastPressable
                            key={opt.mode}
                            onPress={() => setLanguageMode(opt.mode)}
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 6,
                              borderRadius: 999,
                              backgroundColor: active
                                ? accent
                                : isDark
                                ? "#052219"
                                : "#FFFFFF",
                              borderWidth: 1,
                              borderColor: active
                                ? "#FFCE00"
                                : isDark
                                ? "#134E3A"
                                : "#C6E4D9"
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 11.5,
                                fontFamily: "NotoSansBengali_700Bold",
                                color: active
                                  ? "#FFFFFF"
                                  : isDark
                                  ? "#D6EFE6"
                                  : "#062E22"
                              }}
                            >
                              {opt.flag} {opt.shortLabel}
                            </Text>
                          </BlastPressable>
                        );
                      })}
                    </View>
                  </View>

                  {/* Let's Go Button */}
                  <BlastPressable
                    onPress={handleLetsGo}
                    style={{
                      backgroundColor: accent,
                      paddingVertical: 15,
                      borderRadius: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      borderWidth: 1.5,
                      borderColor: "#FFCE00",
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.24,
                      shadowRadius: 14,
                      elevation: 8
                    }}
                  >
                    <UserCheck size={18} color="#FFCE00" />
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      Let's Go!
                    </Text>
                    <ArrowRight size={18} color="#FFCE00" />
                  </BlastPressable>
                </MaterialGlassCard>
              </MotionEntrance>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Animated.View>
    );
  }

  return <>{children}</>;
};
