import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { CheckCircle2 } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { useAppLanguage } from "../../utils/i18n";
import { BlastPressable } from "../../components/motion/BlastPressable";
import { MatchingPair } from "../types";
import { shuffleArray } from "../engine/seededRandom";

interface MatchingProps {
  pairs: MatchingPair[];
  disabled?: boolean;
  onComplete: (allCorrectOnFirstTry: boolean) => void;
}

export const Matching: React.FC<MatchingProps> = ({
  pairs,
  disabled = false,
  onComplete
}) => {
  const { themeMode } = useApp();
  const { showNative, nativeMeta, tx } = useAppLanguage();
  const nativeFlag = nativeMeta.flag === "🌐" ? "🇧🇩" : nativeMeta.flag;
  const isDark = themeMode === "dark" || themeMode === "black";
  const isPink = themeMode === "pink";

  const shuffledMeanings = useMemo(
    () => shuffleArray(pairs),
    [pairs]
  );

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hadMistake, setHadMistake] = useState(false);

  useEffect(() => {
    setSelectedLeftId(null);
    setMatchedIds([]);
    setWrongFlash(false);
    setHadMistake(false);
  }, [pairs]);

  const handlePickMeaning = (pair: MatchingPair) => {
    if (disabled || !selectedLeftId || matchedIds.includes(pair.id)) return;
    if (selectedLeftId === pair.id) {
      const next = [...matchedIds, pair.id];
      setMatchedIds(next);
      setSelectedLeftId(null);
      if (next.length === pairs.length) {
        onComplete(!hadMistake);
      }
    } else {
      setHadMistake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 450);
    }
  };

  return (
    <View style={{ gap: 10 }}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "Inter_600SemiBold",
          color: wrongFlash
            ? "#EF4444"
            : isDark
            ? "#94A3B8"
            : "#64748B"
        }}
      >
        {wrongFlash
          ? "Not a match — try again!"
          : `Matched ${matchedIds.length}/${pairs.length} pairs`}
      </Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        {/* Left: German Words */}
        <View style={{ flex: 1, gap: 8 }}>
          {pairs.map((p) => {
            const matched = matchedIds.includes(p.id);
            const selected = selectedLeftId === p.id;
            return (
              <BlastPressable
                key={`de-${p.id}`}
                disabled={disabled || matched}
                onPress={() => setSelectedLeftId(p.id)}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 11,
                  borderRadius: 12,
                  backgroundColor: matched
                    ? "rgba(22, 163, 74, 0.16)"
                    : selected
                    ? isPink
                      ? "#DB2777"
                      : "#0B6B4F"
                    : isDark
                    ? "#082E22"
                    : "#FFFFFF",
                  borderWidth: 1.5,
                  borderColor: matched
                    ? "#16A34A"
                    : selected
                    ? "#FFCE00"
                    : isDark
                    ? "#134E3A"
                    : "#C6E4D9",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: matched ? 0.65 : 1
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_700Bold",
                    color: selected
                      ? "#FFFFFF"
                      : isDark
                      ? "#F0FDF9"
                      : "#062E22",
                    flex: 1
                  }}
                >
                  {p.german}
                </Text>
                {matched && <CheckCircle2 size={14} color="#16A34A" />}
              </BlastPressable>
            );
          })}
        </View>

        {/* Right: Meanings */}
        <View style={{ flex: 1, gap: 8 }}>
          {shuffledMeanings.map((p) => {
            const matched = matchedIds.includes(p.id);
            return (
              <BlastPressable
                key={`en-${p.id}`}
                disabled={disabled || matched || !selectedLeftId}
                onPress={() => handlePickMeaning(p)}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 11,
                  borderRadius: 12,
                  backgroundColor: matched
                    ? "rgba(22, 163, 74, 0.16)"
                    : isDark
                    ? "#082E22"
                    : "#FFFFFF",
                  borderWidth: 1.5,
                  borderColor: matched
                    ? "#16A34A"
                    : isDark
                    ? "#134E3A"
                    : "#C6E4D9",
                  opacity: matched ? 0.65 : 1
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_600SemiBold",
                    color: isDark ? "#D6EFE6" : "#1E293B"
                  }}
                >
                  {p.meaning}
                </Text>
                {showNative && (
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 11.5,
                      fontFamily: "NotoSansBengali_500Medium",
                      color: isDark ? "#93C5FD" : "#1D4ED8",
                      marginTop: 2
                    }}
                  >
                    {nativeFlag}{" "}
                    {tx(p.meaning, p.meaningBn || p.meaning, p.german)}
                  </Text>
                )}
              </BlastPressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};
