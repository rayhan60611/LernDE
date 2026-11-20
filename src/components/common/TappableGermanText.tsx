import React from "react";
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { useWordInspector } from "../../context/WordInspectorContext";
import { useApp } from "../../context/AppContext";
import { useActiveSpeechHighlight } from "../../utils/tts";

interface TappableGermanTextProps {
  text: string;
  level?: string;
  sentenceEn?: string;
  sentenceBn?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Renders any German sentence or phrase as individually tappable words.
 * Touching any word opens the global Word Details Popup with English & Bangla meanings,
 * gender color coding, audio pronunciation, and Star toggle.
 */
export const TappableGermanText: React.FC<TappableGermanTextProps> = ({
  text,
  level,
  sentenceEn,
  sentenceBn,
  textStyle,
  containerStyle
}) => {
  const { inspectWord } = useWordInspector();
  const { themeMode } = useApp();
  const { activeText, activeWordIndex } = useActiveSpeechHighlight();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isBlack = themeMode === "black";
  const isPink = themeMode === "pink";

  const tokens = text.split(/\s+/).filter((t) => t.length > 0);
  const isSpeakingThis = activeText === text;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 4
        },
        containerStyle
      ]}
    >
      {tokens.map((token, idx) => {
        const isSpokenWord = isSpeakingThis && idx === activeWordIndex;
        return (
        <Pressable
          key={`${token}-${idx}`}
          onPress={() =>
            inspectWord(token, {
              level,
              sentenceDe: text,
              sentenceEn,
              sentenceBn
            })
          }
          style={({ pressed }) => ({
            paddingHorizontal: isSpokenWord ? 5 : 3,
            paddingVertical: 1,
            borderRadius: 6,
            backgroundColor: isSpokenWord
              ? isPink
                ? "#DB2777"
                : isDark
                ? "#FACC15"
                : "#0B6B4F"
              : pressed
              ? isDark
                ? "rgba(255, 206, 0, 0.25)"
                : "rgba(11, 107, 79, 0.14)"
              : "transparent",
            borderBottomWidth: 1,
            borderBottomColor: isSpokenWord
              ? "transparent"
              : isDark
              ? "rgba(214, 239, 230, 0.22)"
              : "rgba(11, 107, 79, 0.2)"
          })}
        >
          <Text
            style={[
              textStyle,
              isSpokenWord && {
                color: isDark && !isPink ? "#062E22" : "#FFFFFF"
              }
            ]}
          >
            {token}
          </Text>
        </Pressable>
        );
      })}
    </View>
  );
};
