import { PassageWordEntry, VocabularyItem } from "../types";
import { GLOBAL_GERMAN_DICTIONARY } from "../data/passages";
import { VOCABULARY_ITEMS } from "../data/vocabulary";

export interface WordDetailData {
  id: string;
  surface: string;
  lemma: string;
  article?: "der" | "die" | "das";
  plural?: string;
  level?: string;
  chapterOrTopic?: string;
  partOfSpeech: string;
  english: string;
  bangla: string;
  phoneticHint?: string;
  exampleDe: string;
  exampleEn: string;
  exampleBn: string;
}

const ENGLISH_TRANSLATION_CACHE: Record<string, string> = {};

const BENGALI_CHAR_REGEX = /[\u0980-\u09FF]/;

/**
 * Checks whether the current `english` field actually lacks a real English translation
 * (e.g., empty, contains Bengali script from CSVs without `en`, or is a generic placeholder).
 */
export function needsEnglishTranslation(englishText?: string): boolean {
  if (!englishText) return true;
  const trimmed = englishText.trim();
  if (!trimmed) return true;
  if (BENGALI_CHAR_REGEX.test(trimmed)) return true;
  if (
    trimmed.startsWith("German term ") ||
    trimmed.startsWith("In context:")
  ) {
    return true;
  }
  return false;
}

// Fast lookup map across all 6,471+ words
const VOCAB_LOOKUP_MAP: Record<string, VocabularyItem> = {};
for (const item of VOCABULARY_ITEMS) {
  const key = item.german.trim().toLowerCase();
  if (key && !VOCAB_LOOKUP_MAP[key]) {
    VOCAB_LOOKUP_MAP[key] = item;
  }
}

/**
 * Resolves a string token, VocabularyItem, or PassageWordEntry into a unified WordDetailData object.
 */
export function resolveWordDetails(
  input: string | VocabularyItem | PassageWordEntry,
  context?: {
    level?: string;
    sentenceDe?: string;
    sentenceEn?: string;
    sentenceBn?: string;
  }
): WordDetailData {
  if (typeof input !== "string" && "german" in input) {
    // VocabularyItem
    const item = input;
    return {
      id: item.id,
      surface: item.german,
      lemma: item.german,
      article: item.article,
      plural: item.plural,
      level: item.level,
      chapterOrTopic: item.chapter || item.day || item.topic,
      partOfSpeech: item.article ? "Nomen" : item.topic,
      english: item.english,
      bangla: item.bangla,
      phoneticHint: item.phoneticHint,
      exampleDe: item.exampleDe,
      exampleEn: item.exampleEn,
      exampleBn: item.exampleBn
    };
  }

  if (typeof input !== "string" && "lemma" in input) {
    // PassageWordEntry
    return {
      id: `inspector-${input.lemma.toLowerCase()}`,
      surface: input.surface,
      lemma: input.lemma,
      article: input.article,
      plural: input.plural,
      level: context?.level,
      chapterOrTopic: input.partOfSpeech,
      partOfSpeech: input.partOfSpeech,
      english: input.english,
      bangla: input.bangla,
      exampleDe: input.exampleDe,
      exampleEn: input.exampleEn,
      exampleBn: input.exampleBn
    };
  }

  // Raw German word string
  const cleaned = input.replace(/[.,!?;:"„“”'’()[\]—–-]/g, "").trim();
  const key = cleaned.toLowerCase();

  // 1. Check GLOBAL_GERMAN_DICTIONARY
  if (GLOBAL_GERMAN_DICTIONARY[key]) {
    const g = GLOBAL_GERMAN_DICTIONARY[key];
    return {
      id: `dict-${g.lemma.toLowerCase()}`,
      surface: cleaned,
      lemma: g.lemma,
      article: g.article,
      plural: g.plural,
      level: context?.level,
      chapterOrTopic: g.partOfSpeech,
      partOfSpeech: g.partOfSpeech,
      english: g.english,
      bangla: g.bangla,
      exampleDe: context?.sentenceDe || g.exampleDe,
      exampleEn: context?.sentenceEn || g.exampleEn,
      exampleBn: context?.sentenceBn || g.exampleBn
    };
  }

  // 2. Check 6,471+ CSV/Vocabulary items
  if (VOCAB_LOOKUP_MAP[key]) {
    const v = VOCAB_LOOKUP_MAP[key];
    return {
      id: v.id,
      surface: cleaned,
      lemma: v.german,
      article: v.article,
      plural: v.plural,
      level: v.level,
      chapterOrTopic: v.chapter || v.day || v.topic,
      partOfSpeech: v.article ? "Nomen" : v.topic,
      english: v.english,
      bangla: v.bangla,
      phoneticHint: v.phoneticHint,
      exampleDe: context?.sentenceDe || v.exampleDe,
      exampleEn: context?.sentenceEn || v.exampleEn,
      exampleBn: context?.sentenceBn || v.exampleBn
    };
  }

  // 3. Morphological fallback
  const isCapitalized =
    cleaned.length > 0 &&
    cleaned[0] === cleaned[0].toUpperCase() &&
    cleaned[0] !== cleaned[0].toLowerCase();

  return {
    id: `word-${key}`,
    surface: cleaned,
    lemma: cleaned,
    level: context?.level || "A1",
    partOfSpeech: isCapitalized ? "Nomen / Wort" : "Wort / Verbform",
    english: "",
    bangla: context?.sentenceBn
      ? `বাক্যের প্রেক্ষিতে: "${context.sentenceBn}"`
      : `জার্মান শব্দ "${cleaned}"`,
    exampleDe:
      context?.sentenceDe || `${cleaned} ist ein deutsches Wort.`,
    exampleEn:
      context?.sentenceEn || `"${cleaned}" is a German word.`,
    exampleBn:
      context?.sentenceBn || `"${cleaned}" একটি জার্মান শব্দ।`
  };
}

/**
 * Fetches an English translation for a German word (with Bangla fallback)
 * using MyMemory free translation API and caches the result in memory.
 */
export async function fetchEnglishTranslation(
  germanWord: string,
  banglaMeaning?: string
): Promise<string | null> {
  const cleanDe = germanWord.trim();
  if (!cleanDe) return null;

  const cacheKey = cleanDe.toLowerCase();
  if (ENGLISH_TRANSLATION_CACHE[cacheKey]) {
    return ENGLISH_TRANSLATION_CACHE[cacheKey];
  }

  // Try German -> English first
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      cleanDe
    )}&langpair=de|en`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const translated: string | undefined =
        data?.responseData?.translatedText;
      if (
        translated &&
        translated.trim() &&
        translated.trim().toLowerCase() !== cleanDe.toLowerCase() &&
        !translated.includes("MYMEMORY WARNING")
      ) {
        ENGLISH_TRANSLATION_CACHE[cacheKey] = translated.trim();
        return translated.trim();
      }
    }
  } catch {
    // Fallback to Bangla -> English below
  }

  // Fallback: Bangla -> English if Bangla meaning is available
  if (banglaMeaning && BENGALI_CHAR_REGEX.test(banglaMeaning)) {
    const cleanBn = banglaMeaning
      .replace(/\(উচ্চারণ:.*?\)/g, "")
      .replace(/\(Plural\)/gi, "")
      .trim();
    if (cleanBn) {
      try {
        const urlBn = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          cleanBn
        )}&langpair=bn|en`;
        const resBn = await fetch(urlBn);
        if (resBn.ok) {
          const dataBn = await resBn.json();
          const translatedBn: string | undefined =
            dataBn?.responseData?.translatedText;
          if (
            translatedBn &&
            translatedBn.trim() &&
            !BENGALI_CHAR_REGEX.test(translatedBn) &&
            !translatedBn.includes("MYMEMORY WARNING")
          ) {
            ENGLISH_TRANSLATION_CACHE[cacheKey] = translatedBn.trim();
            return translatedBn.trim();
          }
        }
      } catch {
        // Ignore network errors
      }
    }
  }

  return null;
}
