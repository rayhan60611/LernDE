import { BlastPressable } from "../motion/BlastPressable";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent
} from "expo-speech-recognition";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";
import {
  Award,
  CheckCircle2,
  Mic,
  MicOff,
  RotateCcw,
  Sparkles,
  X
} from "lucide-react-native";
import { SpeakButton } from "./SpeakButton";
import { evaluatePronunciation } from "../../utils/pronunciation";
import { playFeedbackSound } from "../../utils/soundEffects";
import { useApp } from "../../context/AppContext";
import { WordMatchResult } from "../../types";
import { useAppLanguage } from "../../utils/i18n";

export interface VoicePracticeModalProps {
  visible: boolean;
  onClose: () => void;
  targetText: string;
  translationEn: string;
  translationBn: string;
  onSuccess?: (score: number) => void;
}

export const VoicePracticeModal: React.FC<VoicePracticeModalProps> = ({
  visible,
  onClose,
  targetText,
  translationEn,
  translationBn,
  onSuccess
}) => {
  const { themeMode, recordSpeakingScore } = useApp();
  const { showEn, showNative, nativeMeta, tx } = useAppLanguage();
  const nativeFlag = nativeMeta.flag === "🌐" ? "🇧🇩" : nativeMeta.flag;
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [wordResults, setWordResults] = useState<WordMatchResult[]>([]);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSimulatorInput, setShowSimulatorInput] = useState(false);

  const micScale = useSharedValue(1);

  useEffect(() => {
    if (isListening) {
      micScale.value = withRepeat(
        withSequence(
          withTiming(1.18, { duration: 450 }),
          withTiming(1.0, { duration: 450 })
        ),
        -1,
        true
      );
    } else {
      cancelAnimation(micScale);
      micScale.value = withTiming(1, { duration: 150 });
    }
  }, [isListening, micScale]);

  const animatedMicStyle = useAnimatedStyle(() => ({
    transform: [{ scale: micScale.value }]
  }));

  // Reset state when modal opens for a new phrase
  useEffect(() => {
    if (visible) {
      setIsListening(false);
      setTranscript("");
      setScore(null);
      setWordResults([]);
      setXpAwarded(false);
      setErrorMessage(null);
      setShowSimulatorInput(false);
    } else {
      try {
        ExpoSpeechRecognitionModule.stop();
      } catch {
        // Ignore if not running
      }
    }
  }, [visible, targetText]);

  const runEvaluation = useCallback(
    (spokenText: string) => {
      if (!spokenText.trim()) return;
      const result = evaluatePronunciation(targetText, spokenText);
      setScore(result.score);
      setWordResults(result.wordResults);
      playFeedbackSound(result.isPassing);

      const gotBonus = recordSpeakingScore(result.score);
      if (gotBonus) {
        setXpAwarded(true);
        onSuccess?.(result.score);
      }
    },
    [targetText, recordSpeakingScore, onSuccess]
  );

  // Listen to native speech recognition events
  useSpeechRecognitionEvent("start", () => {
    setIsListening(true);
    setErrorMessage(null);
  });

  useSpeechRecognitionEvent("end", () => {
    setIsListening(false);
  });

  useSpeechRecognitionEvent("result", (event) => {
    const latestTranscript = event.results?.[0]?.transcript ?? "";
    setTranscript(latestTranscript);
    if (event.isFinal) {
      runEvaluation(latestTranscript);
    } else {
      // Live preview word highlighting even during interim results
      const interim = evaluatePronunciation(targetText, latestTranscript);
      setWordResults(interim.wordResults);
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    setIsListening(false);
    setErrorMessage(
      event.message ||
        "Speech recognition unavailable on this device/simulator. Use Simulator Voice Test below."
    );
    setShowSimulatorInput(true);
  });

  const handleToggleMic = async () => {
    if (isListening) {
      try {
        ExpoSpeechRecognitionModule.stop();
      } catch {
        setIsListening(false);
      }
      if (transcript.trim()) {
        runEvaluation(transcript);
      }
      return;
    }

    setErrorMessage(null);
    setScore(null);
    setXpAwarded(false);

    try {
      const perm =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!perm.granted) {
        setErrorMessage(
          "Microphone or Speech Recognition permission was not granted. You can test pronunciation below."
        );
        setShowSimulatorInput(true);
        return;
      }

      ExpoSpeechRecognitionModule.start({
        lang: "de-DE",
        interimResults: true,
        maxAlternatives: 1,
        continuous: false
      });
    } catch {
      setErrorMessage(
        "Native speech engine not detected in simulator. Use the Interactive Voice Simulator below."
      );
      setShowSimulatorInput(true);
    }
  };

  const handleRetry = () => {
    setTranscript("");
    setScore(null);
    setWordResults([]);
    setXpAwarded(false);
    setErrorMessage(null);
  };

  const targetWords = targetText.trim().split(/\s+/);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          justifyContent: "flex-end"
        }}
      >
        <View
          style={{
            backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : "#FFFFFF",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 34,
            maxHeight: "90%",
            borderTopWidth: 1,
            borderColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FBCFE8" : "#C6E4D9")
          }}
        >
          {/* Handle Bar */}
          <View
            style={{
              width: 44,
              height: 5,
              borderRadius: 3,
              backgroundColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
              alignSelf: "center",
              marginBottom: 14
            }}
          />

          {/* Top Bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View
                style={{
                  backgroundColor: isDark ? "#064E3B" : (isPink ? "#FDF2F8" : "#EAF7F2"),
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 999
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_700Bold",
                    color: isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")
                  }}
                >
                  DE-DE VOICE STUDIO • +5 XP
                </Text>
              </View>
            </View>

            <BlastPressable
              onPress={onClose}
              style={{
                padding: 8,
                borderRadius: 999,
                backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FCE7F3" : "#E2F2EC")
              }}
            >
              <X size={20} color={isDark ? "#94A3B8" : "#475569"} />
            </BlastPressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Step 1: Listen & Target Phrase Card */}
            <View
              style={{
                backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                borderRadius: 20,
                padding: 18,
                borderWidth: 1,
                borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                marginBottom: 18
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#94A3B8" : "#64748B",
                    textTransform: "uppercase",
                    letterSpacing: 0.6
                  }}
                >
                  1. Listen & Speak Aloud
                </Text>
                <SpeakButton
                  text={targetText}
                  size="sm"
                  showSlowOption={true}
                />
              </View>

              {/* Word-by-Word Highlighted Target Text */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 12
                }}
              >
                {targetWords.map((word, idx) => {
                  const evalItem = wordResults[idx];
                  let wordColor = isDark ? (isPink ? "#FFF0F5" : "#EDF7F3") : (isBlack ? "#171717" : "#052219");
                  let wordBg = "transparent";
                  let borderCol = "transparent";

                  if (evalItem) {
                    if (evalItem.matched) {
                      wordColor = "#16A34A";
                      wordBg = isDark
                        ? "rgba(22, 163, 74, 0.18)"
                        : "#DCFCE7";
                      borderCol = "#16A34A";
                    } else {
                      wordColor = score !== null ? "#DC2626" : "#D97706";
                      wordBg = isDark
                        ? "rgba(220, 38, 38, 0.18)"
                        : "#FEF3C7";
                      borderCol = score !== null ? "#DC2626" : "#D97706";
                    }
                  }

                  return (
                    <View
                      key={`${word}-${idx}`}
                      style={{
                        paddingHorizontal: evalItem ? 8 : 2,
                        paddingVertical: evalItem ? 4 : 2,
                        borderRadius: 8,
                        backgroundColor: wordBg,
                        borderWidth: evalItem ? 1 : 0,
                        borderColor: borderCol
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 21,
                          fontFamily: "Inter_700Bold",
                          color: wordColor
                        }}
                      >
                        {word}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* Meanings */}
              {showEn && !!translationEn && (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_500Medium",
                    color: isDark ? "#D6EFE6" : "#475569",
                    marginBottom: 4
                  }}
                >
                  🇬🇧 {translationEn}
                </Text>
              )}
              {showNative && (!!translationBn || !!translationEn) && (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "NotoSansBengali_500Medium",
                    color: isDark ? "#93C5FD" : "#1D4ED8"
                  }}
                >
                  {nativeFlag} {tx(translationEn, translationBn, targetText)}
                </Text>
              )}
            </View>

            {/* Step 2: Live Transcript Preview */}
            <View
              style={{
                backgroundColor: isDark ? (isBlack ? "#000000" : "#041E16") : (isPink ? "#FCE7F3" : "#E2F2EC"),
                borderRadius: 16,
                padding: 14,
                minHeight: 74,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: isListening
                  ? (isPink ? "#DB2777" : "#0B6B4F")
                  : isDark
                  ? (isBlack ? "#0F0F0F" : "#082E22")
                  : "#A7D7C5",
                marginBottom: 16
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_600SemiBold",
                  color: isListening
                    ? (isPink ? "#DB2777" : "#0B6B4F")
                    : isDark
                    ? "#64748B"
                    : "#94A3B8",
                  textTransform: "uppercase",
                  marginBottom: 4
                }}
              >
                {isListening
                  ? "Listening (de-DE)... Speak now"
                  : "Live Recognized Transcript"}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Inter_600SemiBold",
                  color: transcript
                    ? isDark
                      ? (isPink ? "#FFF0F5" : "#EDF7F3")
                      : (isBlack ? "#171717" : "#052219")
                    : isDark
                    ? "#475569"
                    : "#94A3B8"
                }}
              >
                {transcript || "Tap the microphone below and speak in German..."}
              </Text>
            </View>

            {/* Score & Feedback Banner */}
            {score !== null && (
              <View
                style={{
                  backgroundColor:
                    score >= 80
                      ? isDark
                        ? "rgba(22, 163, 74, 0.2)"
                        : "#F0FDF4"
                      : isDark
                      ? "rgba(217, 119, 6, 0.2)"
                      : "#FFFBEB",
                  borderRadius: 16,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: score >= 80 ? "#16A34A" : "#D97706",
                  marginBottom: 16
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8
                    }}
                  >
                    {score >= 80 ? (
                      <CheckCircle2 size={22} color="#16A34A" />
                    ) : (
                      <RotateCcw size={22} color="#D97706" />
                    )}
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Inter_700Bold",
                          color: score >= 80 ? "#16A34A" : "#D97706"
                        }}
                      >
                        Accuracy Score: {score}%
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "NotoSansBengali_500Medium",
                          color: isDark ? "#D6EFE6" : "#475569"
                        }}
                      >
                        {score >= 80
                          ? "Ausgezeichnet! চমৎকার উচ্চারণ!"
                          : "Fast geschafft! লাল/হলুদ শব্দগুলো আবার চেষ্টা করুন।"}
                      </Text>
                    </View>
                  </View>

                  {xpAwarded && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        backgroundColor: "#16A34A",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 999
                      }}
                    >
                      <Award size={14} color="#FFFFFF" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_700Bold",
                          color: "#FFFFFF"
                        }}
                      >
                        +5 XP
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Optional Simulator / Fallback Input if device has no hardware mic */}
            {(showSimulatorInput || errorMessage) && (
              <View
                style={{
                  backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                  borderRadius: 14,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
                  marginBottom: 16
                }}
              >
                {errorMessage && (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_500Medium",
                      color: "#D97706",
                      marginBottom: 8
                    }}
                  >
                    {errorMessage}
                  </Text>
                )}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#94A3B8" : "#475569",
                    marginBottom: 6
                  }}
                >
                  Simulator / Keyboard Speech Tester:
                </Text>
                <TextInput
                  value={transcript}
                  onChangeText={setTranscript}
                  placeholder={targetText}
                  placeholderTextColor={isDark ? "#475569" : "#94A3B8"}
                  style={{
                    backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : "#FFFFFF",
                    color: isDark ? "#F0FDF9" : "#062E22",
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 9,
                    borderWidth: 1,
                    borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : "#A7D7C5",
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    marginBottom: 8
                  }}
                />
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <BlastPressable
                    onPress={() => runEvaluation(transcript || targetText)}
                    style={{
                      flex: 1,
                      backgroundColor: (isPink ? "#DB2777" : "#0B6B4F"),
                      paddingVertical: 9,
                      borderRadius: 10,
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 13
                      }}
                    >
                      Evaluate Spoken Text
                    </Text>
                  </BlastPressable>
                  <BlastPressable
                    onPress={() => {
                      setTranscript(targetText);
                      runEvaluation(targetText);
                    }}
                    style={{
                      backgroundColor: "#0D9488",
                      paddingHorizontal: 12,
                      paddingVertical: 9,
                      borderRadius: 10,
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 4
                    }}
                  >
                    <Sparkles size={14} color="#FFFFFF" />
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 13
                      }}
                    >
                      Simulate 100%
                    </Text>
                  </BlastPressable>
                </View>
              </View>
            )}

            {/* Animated Microphone Control */}
            <View
              style={{
                alignItems: "center",
                marginTop: 4,
                marginBottom: 8
              }}
            >
              <Animated.View style={animatedMicStyle}>
                <BlastPressable
                  onPress={handleToggleMic}
                  accessibilityRole="button"
                  accessibilityLabel={
                    isListening ? "Stop speaking" : "Start speaking German"
                  }
                  style={{
                    width: 78,
                    height: 78,
                    borderRadius: 39,
                    backgroundColor: isListening ? "#DC2626" : (isPink ? "#DB2777" : "#0B6B4F"),
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: isListening ? "#DC2626" : (isPink ? "#DB2777" : "#0B6B4F"),
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.35,
                    shadowRadius: 12,
                    elevation: 8
                  }}
                >
                  {isListening ? (
                    <MicOff size={32} color="#FFFFFF" />
                  ) : (
                    <Mic size={32} color="#FFFFFF" />
                  )}
                </BlastPressable>
              </Animated.View>

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  fontFamily: "Inter_600SemiBold",
                  color: isDark ? "#94A3B8" : "#475569"
                }}
              >
                {isListening
                  ? "Tap to Stop & Score"
                  : "Tap Microphone to Speak German (de-DE)"}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                  marginTop: 12
                }}
              >
                {score !== null && (
                  <BlastPressable
                    onPress={handleRetry}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 7,
                      borderRadius: 999,
                      backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FCE7F3" : "#E2F2EC")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#D6EFE6" : "#475569"
                      }}
                    >
                      Reset & Retry
                    </Text>
                  </BlastPressable>
                )}

                {!showSimulatorInput && (
                  <BlastPressable
                    onPress={() => setShowSimulatorInput(true)}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 7,
                      borderRadius: 999,
                      backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : (isPink ? "#FCE7F3" : "#E2F2EC")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_600SemiBold",
                        color: isDark ? "#94A3B8" : "#64748B"
                      }}
                    >
                      Simulator / Type Mode
                    </Text>
                  </BlastPressable>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
