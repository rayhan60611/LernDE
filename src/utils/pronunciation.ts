import { WordMatchResult } from "../types";

/**
 * Normalizes a German word or token for case-insensitive, punctuation-insensitive comparison.
 */
export function normalizeGermanWord(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:"„“”'’()[\]—–-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Also supports alternative umlaut spellings (ae -> ä, oe -> ö, ue -> ü, ss -> ß)
 * so speech recognition variants match accurately.
 */
function canonicalUmlautForm(word: string): string {
  return normalizeGermanWord(word)
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

/**
 * Evaluates spoken German transcript against a target German word or sentence.
 * Returns word-by-word match results and a 0–100% accuracy score.
 */
export function evaluatePronunciation(
  targetText: string,
  spokenTranscript: string
): {
  score: number;
  wordResults: WordMatchResult[];
  isPassing: boolean;
} {
  const targetTokens = targetText
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);

  if (targetTokens.length === 0) {
    return { score: 0, wordResults: [], isPassing: false };
  }

  const spokenNormalizedTokens = spokenTranscript
    .trim()
    .split(/\s+/)
    .map((t) => normalizeGermanWord(t))
    .filter((t) => t.length > 0);

  const spokenCanonicalSet = new Set(
    spokenNormalizedTokens.map((t) => canonicalUmlautForm(t))
  );
  const spokenRawSet = new Set(spokenNormalizedTokens);

  let matchedCount = 0;

  const wordResults: WordMatchResult[] = targetTokens.map((rawWord) => {
    const norm = normalizeGermanWord(rawWord);
    const canon = canonicalUmlautForm(rawWord);

    const isDirectMatch =
      spokenRawSet.has(norm) || spokenCanonicalSet.has(canon);

    // Also allow close substring match for long compound words (>= 6 chars)
    const isCompoundCloseMatch =
      !isDirectMatch &&
      norm.length >= 6 &&
      spokenNormalizedTokens.some(
        (spoken) =>
          spoken.length >= 4 &&
          (norm.includes(spoken) || spoken.includes(norm))
      );

    const matched = isDirectMatch || isCompoundCloseMatch;
    if (matched) {
      matchedCount += 1;
    }

    return {
      word: rawWord,
      normalized: norm,
      matched
    };
  });

  const score = Math.round((matchedCount / targetTokens.length) * 100);
  return {
    score,
    wordResults,
    isPassing: score >= 80
  };
}
