import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Award,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  Edit3,
  ExternalLink,
  Flame,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Mic,
  Moon,
  RotateCcw,
  Save,
  Sun,
  Target,
  User,
  Volume2
} from "lucide-react-native";
import { BlastPressable } from "../../src/components/motion/BlastPressable";
import { GenderNounBadge } from "../../src/components/common/GenderNounBadge";
import { LernDELogo } from "../../src/components/common/LernDELogo";
import { MaterialGlassCard } from "../../src/components/common/MaterialGlassCard";
import { TappableGermanText } from "../../src/components/common/TappableGermanText";
import {
  ScrollToTopButton,
  useScrollToTop
} from "../../src/components/common/ScrollToTopButton";
import {
  AnimatedChevron,
  MotionCollapse,
  MotionEntrance,
  MotionFeedbackBanner,
  MotionFloat,
  MotionLayoutCard
} from "../../src/components/motion/MotionViews";
import { SpeakButton, VoicePracticeButton } from "../../src/components/audio";
import { CEFR_LEVELS, CEFR_META } from "../../src/constants/theme";
import { useApp } from "../../src/context/AppContext";
import { DailyGoalXP } from "../../src/types";
import { LANGUAGE_MODE_OPTIONS, useAppLanguage } from "../../src/utils/i18n";
import {
  playFeedbackSound,
  playStarSound,
  triggerResultVibration
} from "../../src/utils/soundEffects";
import { speakGerman, TTS_SPEED_OPTIONS } from "../../src/utils/tts";

const AVATAR_PRESETS = [
  {
    id: "preset-dev",
    label: "Developer",
    uri: "https://api.dicebear.com/9.x/avataaars/png?seed=RayhanFrankfurt&backgroundColor=0b6b4f"
  },
  {
    id: "preset-student",
    label: "M.Sc. Scholar",
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

export default function ProfileScreen() {
  const {
    userName,
    userAge,
    userGender,
    userEmail,
    userAvatarUri,
    updateUserProfile,
    activeLevel,
    setActiveLevel,
    languageMode,
    setLanguageMode,
    themeMode,
    setThemeMode,
    ttsVoiceGender,
    setTtsVoiceGender,
    ttsAccentStyle,
    setTtsAccentStyle,
    ttsSpeed,
    setTtsSpeed,
    vibrationEnabled,
    setVibrationEnabled,
    soundEnabled,
    setSoundEnabled,
    toggleTheme,
    dailyGoal,
    setDailyGoal,
    dailyXP,
    totalXP,
    streak,
    streakHistory,
    speakingAccuracyAvg,
    savedWords,
    completedUnitIds
  } = useApp();

  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";
  const { scrollRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop();

  // Editable Profile State synced with AppContext
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [draftName, setDraftName] = useState(userName);
  const [draftAge, setDraftAge] = useState(userAge || "26");
  const [draftGender, setDraftGender] = useState(userGender || "Male");
  const [draftEmail, setDraftEmail] = useState(
    userEmail || "mmrp.cse@gmail.com"
  );
  const [draftAvatarUri, setDraftAvatarUri] = useState<string | null>(
    userAvatarUri
  );
  const [saveSuccessBanner, setSaveSuccessBanner] = useState(false);

  useEffect(() => {
    setDraftName(userName);
    setDraftAge(userAge || "26");
    setDraftGender(userGender || "Male");
    setDraftEmail(userEmail || "mmrp.cse@gmail.com");
    setDraftAvatarUri(userAvatarUri);
  }, [userName, userAge, userGender, userEmail, userAvatarUri]);

  // Open device image picker (Web FileReader + cross-platform fallback)
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
            updateUserProfile({
              userName: draftName.trim() || userName,
              userAge: draftAge.trim() || userAge,
              userGender: draftGender || userGender || "Male",
              userEmail: draftEmail.trim() || userEmail,
              userAvatarUri: reader.result
            });
            playStarSound(true);
            setSaveSuccessBanner(true);
            setTimeout(() => setSaveSuccessBanner(false), 3000);
          }
        };
        reader.readAsDataURL(file);
      };
      input.click();
    } else {
      setIsEditingProfile(true);
    }
  };

  const handleSaveProfile = () => {
    const finalName = draftName.trim() || "M. M. Rayhan Parvez";
    const finalAge = draftAge.trim() || "26";
    const finalGender = draftGender || "Male";
    const finalEmail =
      draftEmail.trim() || "mmrp.cse@gmail.com";

    updateUserProfile({
      userName: finalName,
      userAge: finalAge,
      userGender: finalGender,
      userEmail: finalEmail,
      userAvatarUri: draftAvatarUri
    });

    playFeedbackSound(true);
    setSaveSuccessBanner(true);
    setIsEditingProfile(false);
    setTimeout(() => setSaveSuccessBanner(false), 3200);
  };

  // Build 14-day Streak Calendar view
  const last14Days = useMemo(() => {
    const days: Array<{
      iso: string;
      dayNum: number;
      label: string;
      active: boolean;
    }> = [];
    const now = new Date();
    const shortLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const iso = d.toISOString().split("T")[0];
      days.push({
        iso,
        dayNum: d.getDate(),
        label: shortLabels[d.getDay()],
        active: streakHistory.includes(iso)
      });
    }
    return days;
  }, [streakHistory]);

  const openExternalLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  const dailyGoals: DailyGoalXP[] = [10, 30, 50];
  const { showEn, showNative, nativeMeta, tx } = useAppLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const profileMottoDe =
    "Ich lebe in Frankfurt am Main und spreche jeden Tag selbstbewusst Deutsch.";
  const profileMottoEn =
    "I live in Frankfurt am Main and speak German confidently every day.";
  const profileMottoBn =
    "আমি ফ্রাঙ্কফুর্ট আম মাইনে বাস করি এবং প্রতিদিন আত্মবিশ্বাসের সাথে জার্মান বলি।";

  const activePhotoUri = draftAvatarUri ?? userAvatarUri;

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: isDark ? (isBlack ? "#000000" : "#041E16") : (isPink ? "#FFF0F5" : "#EDF7F3")
      }}
    >
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 105, gap: 16 }}
      >
        <MotionEntrance delay={40} direction="up">
          <View style={{ gap: 16 }}>
            {/* User Avatar, Name, Age, Email & Active CEFR Badge Card */}
            <MaterialGlassCard
              borderRadius={22}
              padding={18}
              accentColor={CEFR_META[activeLevel].badgeColor}
              watermarkText="user profile study award"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14
                }}
              >
                {/* Profile Photo / Logo with Camera Upload Overlay */}
                <View style={{ position: "relative" }}>
                  <MotionFloat amplitude={3} duration={1700}>
                    <View
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 20,
                        overflow: "hidden",
                        borderWidth: 2.5,
                        borderColor: "#FFCE00",
                        backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {activePhotoUri ? (
                        <Image
                          source={{ uri: activePhotoUri }}
                          style={{ width: 72, height: 72 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <LernDELogo size={72} variant="ios" />
                      )}
                    </View>
                  </MotionFloat>

                  <BlastPressable
                    onPress={handlePickPhotoFromDevice}
                    style={{
                      position: "absolute",
                      bottom: -4,
                      right: -4,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: "#FFCE00",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 2,
                      borderColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF"
                    }}
                  >
                    <Camera size={14} color="#052E22" />
                  </BlastPressable>
                </View>

                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 18,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22",
                        flex: 1
                      }}
                    >
                      {userName}
                    </Text>

                    <BlastPressable
                      onPress={() => {
                        setIsEditingProfile((prev) => {
                          const next = !prev;
                          if (!next) {
                            setDraftName(userName);
                            setDraftAge(userAge || "26");
                            setDraftGender(userGender || "Male");
                            setDraftEmail(userEmail || "mmrp.cse@gmail.com");
                            setDraftAvatarUri(userAvatarUri);
                          }
                          return next;
                        });
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FDF2F8" : "#EAF7F2"),
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 999,
                        borderWidth: 1,
                        borderColor: (isPink ? "#DB2777" : "#0B6B4F")
                      }}
                    >
                      <Edit3
                        size={12}
                        color={isDark ? "#34D399" : (isPink ? "#DB2777" : "#0B6B4F")}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#34D399" : (isPink ? "#DB2777" : "#0B6B4F")
                        }}
                      >
                        {isEditingProfile ? "Close" : "Edit"}
                      </Text>
                    </BlastPressable>
                  </View>

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_500Medium",
                      color: isDark ? "#A7F3D0" : (isPink ? "#DB2777" : "#0B6B4F"),
                      marginTop: 2
                    }}
                  >
                    Age: {userAge || "26"} yrs • {userGender || "Male"} • {userEmail}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 8
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: CEFR_META[activeLevel].badgeColor,
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        borderRadius: 999
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_700Bold",
                          color: "#FFFFFF"
                        }}
                      >
                        LEVEL {activeLevel}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC"),
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        borderRadius: 999
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#D6EFE6" : "#475569"
                        }}
                      >
                        {completedUnitIds.length} Units • {savedWords.length}{" "}
                        Starred
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {saveSuccessBanner && (
                <MotionFeedbackBanner
                  isCorrect={true}
                  triggerKey={String(saveSuccessBanner)}
                  style={{
                    marginTop: 12,
                    backgroundColor: isDark
                      ? "rgba(22, 163, 74, 0.22)"
                      : "#DCFCE7",
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    borderWidth: 1,
                    borderColor: "#16A34A"
                  }}
                >
                  <CheckCircle2 size={15} color="#16A34A" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_700Bold",
                      color: "#16A34A"
                    }}
                  >
                    Profile updated & saved! (প্রোফাইল সফলভাবে আপডেট হয়েছে)
                  </Text>
                </MotionFeedbackBanner>
              )}
            </MaterialGlassCard>

            {/* USER PROFILE DETAILS / UPDATE SECTION */}
            <MaterialGlassCard
              animatedLayout={true}
              borderRadius={22}
              padding={18}
              borderColor={isEditingProfile ? "#FFCE00" : undefined}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  <User size={18} color={isDark ? "#FFCE00" : (isPink ? "#DB2777" : "#0B6B4F")} />
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22"
                    }}
                  >
                    {isEditingProfile
                      ? "Update User Profile (প্রোফাইল আপডেট)"
                      : "User Profile Details (প্রোফাইল তথ্য)"}
                  </Text>
                </View>

                {isEditingProfile && (
                  <BlastPressable
                    onPress={handlePickPhotoFromDevice}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 999
                    }}
                  >
                    <Camera size={13} color="#FFCE00" />
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      Upload Photo
                    </Text>
                  </BlastPressable>
                )}
              </View>

              <MotionEntrance
                direction="up"
                distance={14}
                triggerKey={isEditingProfile ? "edit-profile" : "view-profile"}
              >
              {!isEditingProfile ? (
                <View style={{ gap: 10 }}>
                  <View
                    style={{
                      backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                      borderRadius: 12,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginBottom: 2
                      }}
                    >
                      Full Name (নাম)
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      {userName || "M. M. Rayhan Parvez"}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#94A3B8" : "#64748B",
                          marginBottom: 2
                        }}
                      >
                        Age (বয়স)
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#F0FDF9" : "#062E22"
                        }}
                      >
                        {userAge || "26"} yrs
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#94A3B8" : "#64748B",
                          marginBottom: 2
                        }}
                      >
                        Gender (লিঙ্গ)
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#F0FDF9" : "#062E22"
                        }}
                      >
                        {userGender || "Male"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                      borderRadius: 12,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginBottom: 2
                      }}
                    >
                      Email Address (ই-মেইল)
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 13,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      {userEmail || "mmrp.cse@gmail.com"}
                    </Text>
                  </View>
                </View>
              ) : (
                <>
                  {/* Quick Avatar Photo Presets + Reset to Logo */}
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "Inter_600SemiBold",
                      color: isDark ? "#94A3B8" : "#64748B",
                      marginBottom: 8
                    }}
                  >
                    Choose Profile Photo or Upload from Device:
                  </Text>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingBottom: 12 }}
              >
                {/* Default LernDE Logo Option */}
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
                          : (isPink ? "#FDF2F8" : "#EAF7F2")
                        : "transparent",
                    borderWidth: 1.5,
                    borderColor:
                      draftAvatarUri === null
                        ? "#FFCE00"
                        : isDark
                        ? (isBlack ? "#262626" : "#134E3A")
                        : (isPink ? "#FBCFE8" : "#C6E4D9")
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      overflow: "hidden"
                    }}
                  >
                    <LernDELogo size={44} variant="ios" />
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: "Inter_600SemiBold",
                      color: isDark ? "#D6EFE6" : "#062E22",
                      marginTop: 4
                    }}
                  >
                    LernDE Logo
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
                            : (isPink ? "#FDF2F8" : "#EAF7F2")
                          : "transparent",
                        borderWidth: 1.5,
                        borderColor: selected
                          ? "#FFCE00"
                          : isDark
                          ? (isBlack ? "#262626" : "#134E3A")
                          : (isPink ? "#FBCFE8" : "#C6E4D9")
                      }}
                    >
                      <Image
                        source={{ uri: preset.uri }}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: "Inter_600SemiBold",
                          color: isDark ? "#D6EFE6" : "#062E22",
                          marginTop: 4
                        }}
                      >
                        {preset.label}
                      </Text>
                    </BlastPressable>
                  );
                })}
              </ScrollView>

              {/* Full Name Input */}
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#D6EFE6" : "#062E22",
                    marginBottom: 4
                  }}
                >
                  Full Name (নাম)
                </Text>
                <TextInput
                  value={draftName}
                  onChangeText={setDraftName}
                  placeholder="Enter your full name"
                  placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                  style={{
                    backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                    color: isDark ? "#F0FDF9" : "#062E22",
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 14
                  }}
                />
              </View>

              {/* Age & Gender Row */}
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
                <View style={{ width: 95 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_600SemiBold",
                      color: isDark ? "#D6EFE6" : "#062E22",
                      marginBottom: 4
                    }}
                  >
                    Age (বয়স)
                  </Text>
                  <TextInput
                    value={draftAge}
                    onChangeText={setDraftAge}
                    keyboardType="numeric"
                    placeholder="26"
                    placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                    style={{
                      backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                      color: isDark ? "#F0FDF9" : "#062E22",
                      borderRadius: 12,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
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
                    Gender (লিঙ্গ)
                  </Text>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    {(["Male", "Female", "Other"] as const).map((option) => {
                      const active = (draftGender || "Male") === option;
                      return (
                        <BlastPressable
                          key={option}
                          onPress={() => setDraftGender(option)}
                          style={{
                            flex: 1,
                            paddingVertical: 10,
                            borderRadius: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: active
                              ? isPink
                                ? "#DB2777"
                                : "#0B6B4F"
                              : isDark
                              ? isBlack
                                ? "#171717"
                                : "#052219"
                              : isPink
                              ? "#FFF0F5"
                              : "#EDF7F3",
                            borderWidth: 1,
                            borderColor: active
                              ? "#FFCE00"
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
                              fontSize: 12,
                              fontFamily: "Inter_700Bold",
                              color: active
                                ? "#FFFFFF"
                                : isDark
                                ? "#D6EFE6"
                                : "#062E22"
                            }}
                          >
                            {option}
                          </Text>
                        </BlastPressable>
                      );
                    })}
                  </View>
                </View>
              </View>

              {/* Email Row */}
              <View style={{ marginBottom: 14 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#D6EFE6" : "#062E22",
                    marginBottom: 4
                  }}
                >
                  Email Address (ই-মেইল)
                </Text>
                <TextInput
                  value={draftEmail}
                  onChangeText={setDraftEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="you@example.com"
                  placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                  style={{
                    backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                    color: isDark ? "#F0FDF9" : "#062E22",
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                    fontFamily: "Inter_500Medium",
                    fontSize: 13
                  }}
                />
              </View>

              {/* Save Profile Changes Button */}
              <BlastPressable
                onPress={handleSaveProfile}
                style={{
                  backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                  paddingVertical: 13,
                  borderRadius: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  borderWidth: 1,
                  borderColor: "#FFCE00"
                }}
              >
                <Save size={16} color="#FFCE00" />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_700Bold",
                    color: "#FFFFFF"
                  }}
                >
                  Save Profile Changes
                </Text>
              </BlastPressable>
                </>
              )}
              </MotionEntrance>
            </MaterialGlassCard>

            {/* Key Metrics Grid: Total XP, Speaking Accuracy Average, Day Streak */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <MaterialGlassCard
                borderRadius={18}
                padding={14}
                style={{ flex: 1, alignItems: "center" }}
              >
                <Award size={22} color={isPink ? "#DB2777" : "#0B6B4F"} />
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#F0FDF9" : "#062E22",
                    marginTop: 6
                  }}
                >
                  {totalXP}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#94A3B8" : "#64748B"
                  }}
                >
                  Total XP
                </Text>
              </MaterialGlassCard>

              <MaterialGlassCard
                borderRadius={18}
                padding={14}
                accentColor="#16A34A"
                style={{ flex: 1, alignItems: "center" }}
              >
                <Mic size={22} color="#16A34A" />
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Inter_700Bold",
                    color: "#16A34A",
                    marginTop: 6
                  }}
                >
                  {speakingAccuracyAvg}%
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#94A3B8" : "#64748B",
                    textAlign: "center"
                  }}
                >
                  Speaking Avg
                </Text>
              </MaterialGlassCard>

              <MaterialGlassCard
                borderRadius={18}
                padding={14}
                accentColor="#F97316"
                style={{ flex: 1, alignItems: "center" }}
              >
                <Flame size={22} color="#F97316" />
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Inter_700Bold",
                    color: "#EA580C",
                    marginTop: 6
                  }}
                >
                  {streak}d
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#94A3B8" : "#64748B"
                  }}
                >
                  Active Streak
                </Text>
              </MaterialGlassCard>
            </View>

            {/* Daily Speaking Motto & Gender Reference Card */}
            <MaterialGlassCard
              borderRadius={20}
              padding={16}
              watermarkText="voice speak success"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F"),
                    textTransform: "uppercase"
                  }}
                >
                  Daily Fluency Affirmation (Voice Practice)
                </Text>
                <GenderNounBadge
                  article="der"
                  noun="Erfolg"
                  plural="die Erfolge"
                  size="sm"
                />
              </View>

              <TappableGermanText
                text={profileMottoDe}
                level={activeLevel}
                sentenceEn={profileMottoEn}
                sentenceBn={profileMottoBn}
                containerStyle={{ marginBottom: 4 }}
                textStyle={{
                  fontSize: 15,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#F0FDF9" : "#062E22"
                }}
              />

              {showEn && (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_500Medium",
                    color: isDark ? "#D6EFE6" : "#475569"
                  }}
                >
                  🇬🇧 {profileMottoEn}
                </Text>
              )}
              {showNative && (
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "NotoSansBengali_500Medium",
                    color: isDark ? "#93C5FD" : "#1D4ED8",
                    marginTop: 2
                  }}
                >
                  {nativeMeta.flag === "🌐" ? "🇧🇩" : nativeMeta.flag}{" "}
                  {tx(profileMottoEn, profileMottoBn, profileMottoDe)}
                </Text>
              )}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 8,
                  marginTop: 12
                }}
              >
                <SpeakButton
                  text={profileMottoDe}
                  size="sm"
                  showSlowOption={true}
                />
                <VoicePracticeButton
                  targetText={profileMottoDe}
                  translationEn={profileMottoEn}
                  translationBn={profileMottoBn}
                  size="sm"
                />
              </View>
            </MaterialGlassCard>

            {/* Streak Calendar (14-Day Activity View) */}
            <MaterialGlassCard
              borderRadius={20}
              padding={16}
              accentColor="#F97316"
              watermarkText="calendar day"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12
                }}
              >
                <Calendar size={18} color="#F97316" />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#F0FDF9" : "#062E22"
                  }}
                >
                  Streak Calendar (Last 14 Days)
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: 6
                }}
              >
                {last14Days.map((d) => (
                  <View
                    key={d.iso}
                    style={{
                      width: "12.5%",
                      alignItems: "center",
                      paddingVertical: 8,
                      borderRadius: 12,
                      backgroundColor: d.active
                        ? "#F97316"
                        : isDark
                        ? (isBlack ? "#171717" : "#052219")
                        : (isPink ? "#FCE7F3" : "#E2F2EC")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: "Inter_600SemiBold",
                        color: d.active
                          ? "rgba(255,255,255,0.85)"
                          : isDark
                          ? "#64748B"
                          : "#94A3B8"
                      }}
                    >
                      {d.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "Inter_700Bold",
                        color: d.active
                          ? "#FFFFFF"
                          : isDark
                          ? "#D6EFE6"
                          : "#475569",
                        marginTop: 2
                      }}
                    >
                      {d.dayNum}
                    </Text>
                  </View>
                ))}
              </View>
            </MaterialGlassCard>

            {/* Preferences Card */}
            <MaterialGlassCard
              borderRadius={20}
              padding={16}
              style={{ gap: 16 }}
            >
              {/* Active CEFR Level Selector */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8
                  }}
                >
                  <GraduationCap size={17} color={isPink ? "#DB2777" : "#0B6B4F"} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22"
                    }}
                  >
                    Active CEFR Level
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
                >
                  {CEFR_LEVELS.map((lvl) => {
                    const active = activeLevel === lvl;
                    return (
                      <BlastPressable
                        key={lvl}
                        onPress={() => setActiveLevel(lvl)}
                        style={{
                          paddingHorizontal: 14,
                          paddingVertical: 8,
                          borderRadius: 12,
                          backgroundColor: active
                            ? (isPink ? "#DB2777" : "#0B6B4F")
                            : isDark
                            ? (isBlack ? "#171717" : "#052219")
                            : (isPink ? "#FCE7F3" : "#E2F2EC")
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "Inter_700Bold",
                            color: active
                              ? "#FFFFFF"
                              : isDark
                              ? "#D6EFE6"
                              : "#475569"
                          }}
                        >
                          {lvl}
                        </Text>
                      </BlastPressable>
                    );
                  })}
                </View>
              </View>

              {/* Daily Goal Selector (10 / 30 / 50 XP) */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8
                  }}
                >
                  <Target size={17} color="#16A34A" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22"
                    }}
                  >
                    Daily XP Goal ({dailyXP}/{dailyGoal} XP Today)
                  </Text>
                </View>

                <View style={{ flexDirection: "row", gap: 8 }}>
                  {dailyGoals.map((g) => {
                    const active = dailyGoal === g;
                    return (
                      <BlastPressable
                        key={g}
                        onPress={() => setDailyGoal(g)}
                        style={{
                          flex: 1,
                          paddingVertical: 10,
                          borderRadius: 12,
                          alignItems: "center",
                          backgroundColor: active
                            ? "#16A34A"
                            : isDark
                            ? (isBlack ? "#171717" : "#052219")
                            : (isPink ? "#FCE7F3" : "#E2F2EC")
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Inter_700Bold",
                            color: active
                              ? "#FFFFFF"
                              : isDark
                              ? "#D6EFE6"
                              : "#475569"
                          }}
                        >
                          {g} XP / day
                        </Text>
                      </BlastPressable>
                    );
                  })}
                </View>
              </View>

              {/* Explanation Language Preference (Dropdown) */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8
                  }}
                >
                  <Globe size={17} color="#2563EB" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22"
                    }}
                  >
                    Explanation Language Preference
                  </Text>
                </View>

                {/* Selected Language Dropdown Trigger */}
                <BlastPressable
                  onPress={() => setIsLangDropdownOpen((prev) => !prev)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    borderRadius: 14,
                    backgroundColor: isDark
                      ? isBlack
                        ? "#171717"
                        : "#064E3B"
                      : isPink
                      ? "#FDF2F8"
                      : "#EAF7F2",
                    borderWidth: 1.5,
                    borderColor: isPink ? "#DB2777" : "#0B6B4F"
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "NotoSansBengali_700Bold",
                        color: isDark
                          ? "#6EE7B7"
                          : isPink
                          ? "#DB2777"
                          : "#0B6B4F"
                      }}
                    >
                      {nativeMeta.flag} {nativeMeta.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11.5,
                        fontFamily: "NotoSansBengali_500Medium",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginTop: 2
                      }}
                    >
                      {nativeMeta.subtitle}
                    </Text>
                  </View>
                  <AnimatedChevron
                    expanded={isLangDropdownOpen}
                    size={18}
                    color={
                      isDark ? "#6EE7B7" : isPink ? "#DB2777" : "#0B6B4F"
                    }
                  />
                </BlastPressable>

                {/* Dropdown Options Menu */}
                <MotionCollapse expanded={isLangDropdownOpen}>
                  <View
                    style={{
                      marginTop: 8,
                      borderRadius: 14,
                      padding: 6,
                      gap: 4,
                      backgroundColor: isDark
                        ? isBlack
                          ? "#121212"
                          : "#052219"
                        : "#FFFFFF",
                      borderWidth: 1.5,
                      borderColor: isDark
                        ? isBlack
                          ? "#262626"
                          : "#134E3A"
                        : isPink
                        ? "#FBCFE8"
                        : "#C6E4D9"
                    }}
                  >
                    {LANGUAGE_MODE_OPTIONS.map((opt) => {
                      const active = languageMode === opt.mode;
                      return (
                        <BlastPressable
                          key={opt.mode}
                          onPress={() => {
                            setLanguageMode(opt.mode);
                            setIsLangDropdownOpen(false);
                          }}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            borderRadius: 10,
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
                        </BlastPressable>
                      );
                    })}
                  </View>
                </MotionCollapse>
              </View>

              {/* Appearance Mode (Light / Emerald Dark / Black OLED) */}
              <View style={{ paddingTop: 4 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10
                  }}
                >
                  {isDark ? (
                    <Moon size={17} color="#FBBF24" />
                  ) : (
                    <Sun size={17} color="#F59E0B" />
                  )}
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22"
                    }}
                  >
                    Appearance Theme
                  </Text>
                </View>

                <View style={{ flexDirection: "row", gap: 8 }}>
                  {(
                    [
                      { key: "light", label: "☀️ Light" },
                      { key: "dark", label: "🌲 Dark" },
                      { key: "black", label: "🖤 Black" },
                      { key: "pink", label: "🌸 Pink" }
                    ] as const
                  ).map((t) => {
                    const active = themeMode === t.key;
                    return (
                      <BlastPressable
                        key={t.key}
                        onPress={() => setThemeMode(t.key)}
                        style={{
                          flex: 1,
                          paddingVertical: 10,
                          borderRadius: 12,
                          alignItems: "center",
                          backgroundColor: active
                            ? t.key === "black"
                              ? "#000000"
                              : t.key === "pink"
                              ? "#DB2777"
                              : (isPink ? "#DB2777" : "#0B6B4F")
                            : isDark
                            ? (isBlack ? "#171717" : "#052219")
                            : (isPink ? "#FCE7F3" : "#E2F2EC"),
                          borderWidth: 1.5,
                          borderColor: active
                            ? t.key === "pink"
                              ? "#F9A8D4"
                              : "#FFCE00"
                            : isDark
                            ? (isBlack ? "#262626" : "#134E3A")
                            : (isPink ? "#FBCFE8" : "#C6E4D9")
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
                              : "#475569"
                          }}
                        >
                          {t.label}
                        </Text>
                      </BlastPressable>
                    );
                  })}
                </View>
              </View>

              {/* App Sound Effects (On / Off) */}
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      🔊 App Sound Effects
                    </Text>
                    <Text
                      style={{
                        fontSize: 11.5,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginTop: 2
                      }}
                    >
                      Button clicks, card swipes, and quiz sounds
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 6 }}>
                    {(
                      [
                        { value: true, label: "On" },
                        { value: false, label: "Off" }
                      ] as const
                    ).map((opt) => {
                      const active = (soundEnabled ?? true) === opt.value;
                      return (
                        <BlastPressable
                          key={`sound-${opt.label}`}
                          onPress={() => setSoundEnabled(opt.value)}
                          style={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 999,
                            backgroundColor: active
                              ? isPink
                                ? "#DB2777"
                                : "#0B6B4F"
                              : isDark
                              ? isBlack
                                ? "#171717"
                                : "#052219"
                              : isPink
                              ? "#FCE7F3"
                              : "#E2F2EC",
                            borderWidth: 1.5,
                            borderColor: active
                              ? "#FFCE00"
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
                              fontSize: 12,
                              fontFamily: "Inter_700Bold",
                              color: active
                                ? "#FFFFFF"
                                : isDark
                                ? "#D6EFE6"
                                : "#475569"
                            }}
                          >
                            {opt.label}
                          </Text>
                        </BlastPressable>
                      );
                    })}
                  </View>
                </View>
              </View>

              {/* Haptic Vibration Feedback (On / Off) */}
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      📳 Haptic Vibration Feedback
                    </Text>
                    <Text
                      style={{
                        fontSize: 11.5,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginTop: 2
                      }}
                    >
                      Vibrate on right or wrong quiz answers
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 6 }}>
                    {(
                      [
                        { value: true, label: "On" },
                        { value: false, label: "Off" }
                      ] as const
                    ).map((opt) => {
                      const active = (vibrationEnabled ?? true) === opt.value;
                      return (
                        <BlastPressable
                          key={opt.label}
                          onPress={() => {
                            setVibrationEnabled(opt.value);
                            if (opt.value) {
                              setTimeout(() => triggerResultVibration(true), 40);
                            }
                          }}
                          style={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 999,
                            backgroundColor: active
                              ? isPink
                                ? "#DB2777"
                                : "#0B6B4F"
                              : isDark
                              ? isBlack
                                ? "#171717"
                                : "#052219"
                              : isPink
                              ? "#FCE7F3"
                              : "#E2F2EC",
                            borderWidth: 1.5,
                            borderColor: active
                              ? "#FFCE00"
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
                              fontSize: 12,
                              fontFamily: "Inter_700Bold",
                              color: active
                                ? "#FFFFFF"
                                : isDark
                                ? "#D6EFE6"
                                : "#475569"
                            }}
                          >
                            {opt.label}
                          </Text>
                        </BlastPressable>
                      );
                    })}
                  </View>
                </View>
              </View>

              {/* German Voice & Playback Speed */}
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8
                    }}
                  >
                    <Volume2
                      size={17}
                      color={isDark ? "#34D399" : isPink ? "#DB2777" : "#0B6B4F"}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      German Voice & Speed
                    </Text>
                  </View>

                  <BlastPressable
                    onPress={() =>
                      speakGerman("Hallo! Ich lerne jeden Tag Deutsch.", {
                        gender: ttsVoiceGender,
                        accent: ttsAccentStyle,
                        rate: ttsSpeed
                      })
                    }
                    style={{
                      backgroundColor: isPink ? "#DB2777" : "#0B6B4F",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 999,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4
                    }}
                  >
                    <Volume2 size={12} color="#FFFFFF" />
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter_700Bold",
                        color: "#FFFFFF"
                      }}
                    >
                      Test Voice
                    </Text>
                  </BlastPressable>
                </View>

                {/* Voice Gender Switcher */}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#94A3B8" : "#64748B",
                    marginBottom: 6
                  }}
                >
                  Speaker Voice
                </Text>
                <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
                  {(
                    [
                      {
                        key: "female",
                        label: "👩 Young Female",
                        sub: "Clear & natural"
                      },
                      {
                        key: "male",
                        label: "👨 Male",
                        sub: "Deep & steady"
                      }
                    ] as const
                  ).map((v) => {
                    const active = ttsVoiceGender === v.key;
                    return (
                      <BlastPressable
                        key={v.key}
                        onPress={() => {
                          setTtsVoiceGender(v.key);
                          speakGerman("Hallo! Wie geht es dir?", {
                            gender: v.key,
                            accent: ttsAccentStyle,
                            rate: ttsSpeed
                          });
                        }}
                        style={{
                          flex: 1,
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          borderRadius: 12,
                          alignItems: "center",
                          backgroundColor: active
                            ? isPink
                              ? "#DB2777"
                              : "#0B6B4F"
                            : isDark
                            ? isBlack
                              ? "#171717"
                              : "#052219"
                            : isPink
                            ? "#FCE7F3"
                            : "#E2F2EC",
                          borderWidth: 1.5,
                          borderColor: active
                            ? isPink
                              ? "#F9A8D4"
                              : "#FFCE00"
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
                            fontSize: 12,
                            fontFamily: "Inter_700Bold",
                            color: active
                              ? "#FFFFFF"
                              : isDark
                              ? "#D6EFE6"
                              : "#062E22"
                          }}
                        >
                          {v.label}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: "Inter_500Medium",
                            color: active
                              ? "rgba(255,255,255,0.88)"
                              : isDark
                              ? "#94A3B8"
                              : "#64748B",
                            marginTop: 2
                          }}
                        >
                          {v.sub}
                        </Text>
                      </BlastPressable>
                    );
                  })}
                </View>

                {/* Voice Accent / Natural Style */}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#94A3B8" : "#64748B",
                    marginBottom: 6
                  }}
                >
                  Voice Accent Style
                </Text>
                <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
                  {(
                    [
                      {
                        key: "de-natural",
                        label: "🇩🇪 Native German",
                        sub: "Natural DE voice"
                      },
                      {
                        key: "south-asian",
                        label: "🇧🇩🇮🇳 Indian / BD",
                        sub: "Warm South Asian"
                      }
                    ] as const
                  ).map((a) => {
                    const active = ttsAccentStyle === a.key;
                    return (
                      <BlastPressable
                        key={a.key}
                        onPress={() => {
                          setTtsAccentStyle(a.key);
                          speakGerman("Hallo! Wie geht es dir?", {
                            gender: ttsVoiceGender,
                            accent: a.key,
                            rate: ttsSpeed
                          });
                        }}
                        style={{
                          flex: 1,
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          borderRadius: 12,
                          alignItems: "center",
                          backgroundColor: active
                            ? isPink
                              ? "#DB2777"
                              : "#0B6B4F"
                            : isDark
                            ? isBlack
                              ? "#171717"
                              : "#052219"
                            : isPink
                            ? "#FCE7F3"
                            : "#E2F2EC",
                          borderWidth: 1.5,
                          borderColor: active
                            ? isPink
                              ? "#F9A8D4"
                              : "#FFCE00"
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
                            fontSize: 12,
                            fontFamily: "Inter_700Bold",
                            color: active
                              ? "#FFFFFF"
                              : isDark
                              ? "#D6EFE6"
                              : "#062E22"
                          }}
                        >
                          {a.label}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: "Inter_500Medium",
                            color: active
                              ? "rgba(255,255,255,0.88)"
                              : isDark
                              ? "#94A3B8"
                              : "#64748B",
                            marginTop: 2
                          }}
                        >
                          {a.sub}
                        </Text>
                      </BlastPressable>
                    );
                  })}
                </View>

                {/* 4 Playback Speeds */}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#94A3B8" : "#64748B",
                    marginBottom: 6
                  }}
                >
                  Playback Speed (4 Speeds)
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  {TTS_SPEED_OPTIONS.map((sp) => {
                    const active = ttsSpeed === sp.value;
                    return (
                      <BlastPressable
                        key={sp.label}
                        onPress={() => {
                          setTtsSpeed(sp.value);
                          speakGerman("Deutsch lernen macht Spaß.", {
                            gender: ttsVoiceGender,
                            accent: ttsAccentStyle,
                            rate: sp.value
                          });
                        }}
                        style={{
                          flex: 1,
                          paddingVertical: 9,
                          borderRadius: 12,
                          alignItems: "center",
                          backgroundColor: active
                            ? isPink
                              ? "#DB2777"
                              : "#0B6B4F"
                            : isDark
                            ? isBlack
                              ? "#171717"
                              : "#052219"
                            : isPink
                            ? "#FCE7F3"
                            : "#E2F2EC",
                          borderWidth: 1.5,
                          borderColor: active
                            ? isPink
                              ? "#F9A8D4"
                              : "#FFCE00"
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
                            fontSize: 12,
                            fontFamily: "Inter_700Bold",
                            color: active
                              ? "#FFFFFF"
                              : isDark
                              ? "#D6EFE6"
                              : "#062E22"
                          }}
                        >
                          {sp.label}
                        </Text>
                        <Text
                          style={{
                            fontSize: 9,
                            fontFamily: "Inter_500Medium",
                            color: active
                              ? "rgba(255,255,255,0.85)"
                              : isDark
                              ? "#94A3B8"
                              : "#64748B",
                            marginTop: 1
                          }}
                        >
                          {sp.desc}
                        </Text>
                      </BlastPressable>
                    );
                  })}
                </View>
              </View>
            </MaterialGlassCard>

            {/* 5. EXECUTIVE "ABOUT THE DEVELOPER" SECTION */}
            <MaterialGlassCard
              borderRadius={24}
              padding={20}
              accentColor="#FFCE00"
              borderColor="#FFCE00"
              watermarkText="computer code"
              style={{
                backgroundColor: isPink
                  ? "rgba(219, 39, 119, 0.9)"
                  : "rgba(11, 107, 79, 0.92)",
                borderWidth: 2
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10
                }}
              >
                <Code2 size={18} color="#FFCE00" />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_700Bold",
                    color: "#FFCE00",
                    textTransform: "uppercase",
                    letterSpacing: 0.8
                  }}
                >
                  About the Developer
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Inter_700Bold",
                  color: "#FFFFFF",
                  marginBottom: 4
                }}
              >
                M. M. Rayhan Parvez
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Inter_600SemiBold",
                  color: "#D6EFE6",
                  lineHeight: 19,
                  marginBottom: 8
                }}
              >
                IT Professional & Software Developer | M.Sc. Informatics
                (Frankfurt University of Applied Sciences)
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 12
                }}
              >
                <MapPin size={15} color="#FFCE00" />
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_600SemiBold",
                    color: "#FFCE00"
                  }}
                >
                  Frankfurt am Main, Germany
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Inter_400Regular",
                  color: "#D6EFE6",
                  lineHeight: 20,
                  marginBottom: 6
                }}
              >
                Built in Frankfurt to help English and Bangla speakers master
                German from A1 survival basics to B2 professional workplace
                fluency.
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "NotoSansBengali_400Regular",
                  color: "#D6EFE6",
                  lineHeight: 21,
                  marginBottom: 16
                }}
              >
                ইংরেজি এবং বাংলাভাষী শিক্ষার্থীদের A1 প্রাত্যহিক কথোপকথন থেকে B2
                পেশাদার দক্ষতা পর্যন্ত জার্মান ভাষা অর্জনে সহায়তা করার লক্ষ্যে
                জার্মানির ফ্রাঙ্কফুর্টে নির্মিত।
              </Text>

              {/* Interactive Links for Email, LinkedIn, and GitHub */}
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                <BlastPressable
                  onPress={() =>
                    openExternalLink("mailto:mmrp.cse@gmail.com")
                  }
                  style={{
                    flex: 1,
                    minWidth: 95,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.18)"
                  }}
                >
                  <Mail size={15} color="#FFFFFF" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_600SemiBold",
                      color: "#FFFFFF"
                    }}
                  >
                    Email
                  </Text>
                  <ExternalLink size={11} color="#94A3B8" />
                </BlastPressable>

                <BlastPressable
                  onPress={() =>
                    openExternalLink(
                      "https://www.linkedin.com/in/rayhan60611/"
                    )
                  }
                  style={{
                    flex: 1,
                    minWidth: 95,
                    backgroundColor: "#0A66C2",
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6
                  }}
                >
                  <Linkedin size={15} color="#FFFFFF" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_600SemiBold",
                      color: "#FFFFFF"
                    }}
                  >
                    LinkedIn
                  </Text>
                  <ExternalLink size={11} color="#E0F2FE" />
                </BlastPressable>

                <BlastPressable
                  onPress={() =>
                    openExternalLink("https://github.com/rayhan60611")
                  }
                  style={{
                    flex: 1,
                    minWidth: 95,
                    backgroundColor: "#24292F",
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    borderWidth: 1,
                    borderColor: "#475569"
                  }}
                >
                  <Github size={15} color="#FFFFFF" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_600SemiBold",
                      color: "#FFFFFF"
                    }}
                  >
                    GitHub
                  </Text>
                  <ExternalLink size={11} color="#94A3B8" />
                </BlastPressable>
              </View>
            </MaterialGlassCard>
          </View>
        </MotionEntrance>
      </ScrollView>

      <ScrollToTopButton visible={showScrollTop} onPress={scrollToTop} />
    </SafeAreaView>
  );
}
