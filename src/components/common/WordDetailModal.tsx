import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, View } from "react-native";
import { BookOpen, Sparkles, X } from "lucide-react-native";
import { BlastPressable } from "../motion/BlastPressable";
import { SpeakButton, VoicePracticeButton } from "../audio";
import { AnimatedStarButton } from "./AnimatedStarButton";
import { GENDER_COLORS } from "../../constants/theme";
import { useApp } from "../../context/AppContext";
import { CEFRLevel, VocabularyItem } from "../../types";
import { useAppLanguage } from "../../utils/i18n";
import {
  fetchEnglishTranslation,
  needsEnglishTranslation,
  WordDetailData
} from "../../utils/wordTranslator";

interface WordDetailModalProps {
  wordData: WordDetailData | null;
  visible: boolean;
  onClose: () => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  wordData,
  visible,
  onClose
}) => {
  const { themeMode, isWordSaved, toggleSavedWord } = useApp();
  const { showNative, nativeMeta, tx } = useAppLanguage();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const [autoEnglish, setAutoEnglish] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    let active = true;
    if (!visible || !wordData) {
      setAutoEnglish(null);
      setIsTranslating(false);
      return;
    }

    if (needsEnglishTranslation(wordData.english)) {
      setAutoEnglish(null);
      setIsTranslating(true);
      const queryWord = wordData.article
        ? `${wordData.article} ${wordData.lemma}`
        : wordData.lemma;

      fetchEnglishTranslation(queryWord, wordData.bangla)
        .then((translated) => {
          if (active) {
            setAutoEnglish(translated);
          }
        })
        .finally(() => {
          if (active) {
            setIsTranslating(false);
          }
        });
    } else {
      setAutoEnglish(wordData.english);
      setIsTranslating(false);
    }

    return () => {
      active = false;
    };
  }, [visible, wordData]);

  if (!wordData) return null;

  const genderPalette = wordData.article
    ? GENDER_COLORS[wordData.article]
    : null;
  const borderColor = genderPalette
    ? genderPalette.hex
    : isDark
    ? (isBlack ? "#262626" : "#134E3A")
    : (isPink ? "#DB2777" : "#0B6B4F");

  const spokenText = wordData.article
    ? `${wordData.article} ${wordData.lemma}`
    : wordData.lemma;

  const displayEnglish =
    autoEnglish ||
    (!needsEnglishTranslation(wordData.english)
      ? wordData.english
      : isTranslating
      ? "Translating to English..."
      : wordData.exampleEn || wordData.lemma);

  const handleToggleFavorite = () => {
    const validLevels: CEFRLevel[] = ["A1", "A2", "B1", "B2"];
    const lvl: CEFRLevel = validLevels.includes(wordData.level as CEFRLevel)
      ? (wordData.level as CEFRLevel)
      : "A1";

    const item: VocabularyItem = {
      id: wordData.id,
      level: lvl,
      topic: wordData.chapterOrTopic || wordData.partOfSpeech,
      article: wordData.article,
      german: wordData.lemma,
      fullGerman: spokenText,
      plural: wordData.plural,
      english: displayEnglish,
      bangla: wordData.bangla,
      phoneticHint: wordData.phoneticHint,
      exampleDe: wordData.exampleDe,
      exampleEn: wordData.exampleEn,
      exampleBn: wordData.exampleBn
    };
    toggleSavedWord(item);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(4, 30, 22, 0.72)",
          justifyContent: "center",
          paddingHorizontal: 18
        }}
      >
        <View
          style={{
            backgroundColor: isDark ? (isBlack ? "#0F0F0F" : "#082E22") : "#FFFFFF",
            borderRadius: 26,
            padding: 20,
            maxHeight: "88%",
            borderWidth: 2,
            borderColor
          }}
        >
          {/* Top Bar */}
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
                gap: 6,
                backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FDF2F8" : "#EAF7F2"),
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999
              }}
            >
              <BookOpen size={13} color={isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")} />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_700Bold",
                  color: isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F")
                }}
              >
                WORD DETAILS •{" "}
                {wordData.level ? `${wordData.level} • ` : ""}
                {wordData.partOfSpeech.toUpperCase()}
              </Text>
            </View>

            <BlastPressable
              onPress={onClose}
              style={{
                padding: 7,
                borderRadius: 999,
                backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FCE7F3" : "#E2F2EC")
              }}
            >
              <X size={18} color={isDark ? "#D6EFE6" : "#062E22"} />
            </BlastPressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 1. Word + Gender Article + Plural + Pronunciation */}
            <View style={{ marginBottom: 14 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 8
                }}
              >
                {genderPalette ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: isDark
                        ? genderPalette.bgDark
                        : genderPalette.bgLight,
                      borderColor: genderPalette.hex,
                      borderWidth: 1.5,
                      paddingHorizontal: 14,
                      paddingVertical: 7,
                      borderRadius: 12,
                      gap: 7
                    }}
                  >
                    <View
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: 4.5,
                        backgroundColor: genderPalette.hex
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 24,
                        fontFamily: "Inter_700Bold",
                        color: genderPalette.hex
                      }}
                    >
                      {wordData.article} {wordData.lemma}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22"
                    }}
                  >
                    {wordData.lemma}
                  </Text>
                )}

                {wordData.plural ? (
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Inter_600SemiBold",
                      color: isDark ? "#94A3B8" : "#64748B"
                    }}
                  >
                    (Plural: {wordData.plural})
                  </Text>
                ) : null}
              </View>

              {genderPalette && (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "NotoSansBengali_600SemiBold",
                    color: genderPalette.hex,
                    marginTop: 5
                  }}
                >
                  {genderPalette.labelEn} • {genderPalette.labelBn}
                </Text>
              )}

              {wordData.phoneticHint && (
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginTop: 8,
                    backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : "#F0FDFA",
                    paddingHorizontal: 11,
                    paddingVertical: 4,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: isDark ? "#134E4A" : "#99F6E4"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "NotoSansBengali_600SemiBold",
                      color: isDark ? "#5EEAD4" : "#0F766E"
                    }}
                  >
                    উচ্চারণ: {wordData.phoneticHint}
                  </Text>
                </View>
              )}
            </View>

            {/* 2. Audio (1.0x / 0.7x) & Voice Practice */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 16
              }}
            >
              <SpeakButton
                text={spokenText}
                size="md"
                showSlowOption={true}
              />
              <VoicePracticeButton
                targetText={spokenText}
                translationEn={displayEnglish}
                translationBn={wordData.bangla}
                size="md"
                label="Practice Word"
              />
            </View>

            {/* 3. Full Details: English Translated Meaning + Bangla Meaning + Example */}
            <View
              style={{
                backgroundColor: isDark ? (isBlack ? "#171717" : "#052219") : (isPink ? "#FFF0F5" : "#EDF7F3"),
                borderRadius: 16,
                padding: 15,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                gap: 10
              }}
            >
              {/* English Meaning (Auto-translated if missing in CSV!) */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 3
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#6EE7B7" : (isPink ? "#DB2777" : "#0B6B4F"),
                      textTransform: "uppercase"
                    }}
                  >
                    🇬🇧 English Meaning
                  </Text>
                  {needsEnglishTranslation(wordData.english) && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                        backgroundColor: "rgba(255, 206, 0, 0.2)",
                        paddingHorizontal: 7,
                        paddingVertical: 2,
                        borderRadius: 999
                      }}
                    >
                      <Sparkles size={10} color="#D97706" />
                      <Text
                        style={{
                          fontSize: 9.5,
                          fontFamily: "Inter_700Bold",
                          color: isDark ? "#FFCE00" : "#B45309"
                        }}
                      >
                        Translated
                      </Text>
                    </View>
                  )}
                </View>

                {isTranslating ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      paddingVertical: 2
                    }}
                  >
                    <ActivityIndicator size="small" color={isPink ? "#DB2777" : "#0B6B4F"} />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#94A3B8" : "#64748B"
                      }}
                    >
                      Translating to English...
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22"
                    }}
                  >
                    {displayEnglish}
                  </Text>
                )}
              </View>

              {/* Native / Secondary Language Meaning */}
              {showNative && (
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                    paddingTop: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#93C5FD" : "#1D4ED8",
                      textTransform: "uppercase",
                      marginBottom: 3
                    }}
                  >
                    {nativeMeta.meaningHeader}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: "NotoSansBengali_700Bold",
                      color: isDark ? "#93C5FD" : "#1D4ED8"
                    }}
                  >
                    {tx(displayEnglish, wordData.bangla, wordData.lemma)}
                  </Text>
                </View>
              )}

              {/* Chapter / Topic & Example Sentence */}
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: isDark ? (isBlack ? "#262626" : "#134E3A") : (isPink ? "#FBCFE8" : "#C6E4D9"),
                  paddingTop: 10
                }}
              >
                {wordData.chapterOrTopic && (
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "NotoSansBengali_600SemiBold",
                      color: isDark ? "#94A3B8" : "#64748B",
                      marginBottom: 6
                    }}
                  >
                    Section: {wordData.chapterOrTopic}
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: 4
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_700Bold",
                      color: isDark ? "#F0FDF9" : "#062E22",
                      flex: 1
                    }}
                  >
                    „{wordData.exampleDe}“
                  </Text>
                  <SpeakButton
                    text={wordData.exampleDe}
                    size="sm"
                    showSlowOption={false}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "NotoSansBengali_500Medium",
                    color: isDark ? "#94A3B8" : "#475569"
                  }}
                >
                  {showNative
                    ? tx(
                        wordData.exampleEn,
                        wordData.exampleBn,
                        wordData.exampleDe
                      )
                    : wordData.exampleEn || wordData.exampleBn}
                </Text>
              </View>
            </View>

            {/* 4. Animated Star / Favorite Toggle */}
            <AnimatedStarButton
              isStarred={isWordSaved(wordData.lemma)}
              onToggle={handleToggleFavorite}
              size="lg"
              fullWidth={true}
              label={
                isWordSaved(wordData.lemma)
                  ? "★ Starred in Vocabulary (Tap to Unstar)"
                  : "★ Star Word (Save to Favorites)"
              }
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
