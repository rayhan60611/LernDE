import { useCallback, useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { LanguageMode } from "../types";

export interface LanguageOptionMeta {
  mode: LanguageMode;
  shortLabel: string;
  pairShortLabel: string;
  badgeLabel: string;
  flag: string;
  title: string;
  subtitle: string;
  meaningHeader: string;
  isRTL?: boolean;
}

export const LANGUAGE_MODE_OPTIONS: LanguageOptionMeta[] = [
  {
    mode: "en",
    shortLabel: "EN",
    pairShortLabel: "EN",
    badgeLabel: "(EN)",
    flag: "🇬🇧",
    title: "English Only (EN)",
    subtitle: "Clean English explanations",
    meaningHeader: "🇬🇧 English Meaning"
  },
  {
    mode: "bn",
    shortLabel: "বাং",
    pairShortLabel: "EN/বাং",
    badgeLabel: "(EN/বাং)",
    flag: "🇧🇩",
    title: "বাংলা (Bangla)",
    subtitle: "English + বাংলা ব্যাখ্যা",
    meaningHeader: "🇧🇩 বাংলা অর্থ (Bangla Meaning)"
  },
  {
    mode: "both",
    shortLabel: "EN + বাং",
    pairShortLabel: "EN/বাং",
    badgeLabel: "(EN/বাং)",
    flag: "🌐",
    title: "English + বাংলা (Dual)",
    subtitle: "Side-by-side bridge",
    meaningHeader: "🇧🇩 বাংলা অর্থ (Bangla Meaning)"
  },
  {
    mode: "hi",
    shortLabel: "HI • हिन्दी",
    pairShortLabel: "EN/हिन्दी",
    badgeLabel: "(EN/HI)",
    flag: "🇮🇳",
    title: "हिन्दी (Hindi)",
    subtitle: "English + हिंदी में अर्थ और व्याख्या",
    meaningHeader: "🇮🇳 हिन्दी अर्थ (Hindi Meaning)"
  },
  {
    mode: "ur",
    shortLabel: "UR • اردو",
    pairShortLabel: "EN/اردو",
    badgeLabel: "(EN/UR)",
    flag: "🇵🇰",
    title: "اردو (Urdu)",
    subtitle: "English + اردو میں معنی اور وضاحت",
    meaningHeader: "🇵🇰 اردو معنی (Urdu Meaning)",
    isRTL: true
  },
  {
    mode: "ar",
    shortLabel: "AR • العربية",
    pairShortLabel: "EN/العربية",
    badgeLabel: "(EN/AR)",
    flag: "🇸🇦",
    title: "العربية (Arabic)",
    subtitle: "English + المعنى والشرح باللغة العربية",
    meaningHeader: "🇸🇦 المعنى بالعربية (Arabic Meaning)",
    isRTL: true
  }
];

export function getLanguageMeta(mode: LanguageMode): LanguageOptionMeta {
  return (
    LANGUAGE_MODE_OPTIONS.find((o) => o.mode === mode) ??
    LANGUAGE_MODE_OPTIONS[2]
  );
}

// Static high-frequency translations for instant offline rendering in Hindi, Urdu, and Arabic
const STATIC_PHRASE_DICT: Record<
  string,
  { hi: string; ur: string; ar: string }
> = {
  "i live in frankfurt am main and speak german confidently every day.": {
    hi: "मैं फ्रैंकफर्ट एम मेन में रहता हूँ और हर दिन आत्मविश्वास के साथ जर्मन बोलता हूँ।",
    ur: "میں فرینکفرٹ ایم مین میں رہتا ہوں اور ہر روز اعتماد کے ساتھ جرمن بولتا ہوں۔",
    ar: "أعيش في فرانكفورت أم ماين وأتحدث الألمانية بثقة كل يوم."
  },
  "interactive path • a1 to b2": {
    hi: "इंटरैक्टिव पथ • A1 से B2",
    ur: "انٹرایکٹو راستہ • A1 سے B2",
    ar: "مسار تفاعلي • من A1 إلى B2"
  },
  "train station": {
    hi: "रेलवे स्टेशन",
    ur: "ریلوے اسٹেশন",
    ar: "محطة القطار"
  },
  "interface / api": {
    hi: "इंटरफ़ेस / कनेक्शन (API)",
    ur: "انٹرفیس / رابطہ (API)",
    ar: "واجهة برمجية (API)"
  },
  "afterwards i walk to the train station.": {
    hi: "उसके बाद मैं रेलवे स्टेशन जाता हूँ।",
    ur: "اس کے بعد میں ریلوے اسٹیشن جاتا ہوں۔",
    ar: "بعد ذلك أذهب إلى محطة القطار."
  },
  "we document every interface carefully.": {
    hi: "हम प्रत्येक इंटरफ़ेस को सावधानीपूर्वक डॉक्यूमेंट करते हैं।",
    ur: "ہم ہر انٹرفیس کو احتیاط سے دستاویز کرتے ہیں۔",
    ar: "نحن نوثق كل واجهة بعناية."
  },
  "greetings & introductions": {
    hi: "अभिवादन और परिचय",
    ur: "سلام اور تعارف",
    ar: "التحيات والتعارف"
  },
  "regular verbs & pronouns": {
    hi: "नियमित क्रियाएं और सर्वनाम",
    ur: "باقاعدہ افعال اور ضمائر",
    ar: "الأفعال المنتظمة والضمائر"
  },
  "numbers, time & daily routine": {
    hi: "संख्याएं, समय और दैनिक दिनचर्या",
    ur: "اعداد، وقت اور روزمرہ کا معمول",
    ar: "الأرقام والوقت والروتين اليومي"
  },
  "articles & gender rules (der, die, das)": {
    hi: "आर्टिकल और लिंग नियम (der, die, das)",
    ur: "آرٹیکلز اور جنس کے اصول (der, die, das)",
    ar: "أدوات التعريف وقواعد الجنس (der, die, das)"
  },
  "present tense verb conjugation (präsens)": {
    hi: "वर्तमान काल क्रिया रूप (Präsens)",
    ur: "فعل حال کی گردان (Präsens)",
    ar: "تصريف الأفعال في المضارع (Präsens)"
  },
  "sentence structure: verb in position 2 (v2)": {
    hi: "वाक्य संरचना: क्रिया दूसरे स्थान पर (V2)",
    ur: "جملے کی ساخت: فعل دوسرے مقام پر (V2)",
    ar: "بنية الجملة: الفعل في الموقع الثاني (V2)"
  }
};

const WORD_LEVEL_DICT: Record<
  string,
  { hi: string; ur: string; ar: string }
> = {
  hello: { hi: "नमस्ते", ur: "ہیلو / السلام علیکم", ar: "مرحباً" },
  "good morning": { hi: "सुप्रभात", ur: "صبح بخیر", ar: "صباح الخير" },
  "good day": { hi: "शुभ दिन", ur: "دن بخیر", ar: "نهارك سعيد" },
  "good evening": { hi: "शुभ संध्या", ur: "شام بخیر", ar: "مساء الخير" },
  "good night": { hi: "शुभ रात्रि", ur: "شب بخیر", ar: "تصبح على خير" },
  "thank you": { hi: "धन्यवाद", ur: "شکریہ", ar: "شكراً لك" },
  please: { hi: "कृपया", ur: "براہ کرم", ar: "من فضلك" },
  yes: { hi: "हाँ", ur: "جی ہاں", ar: "نعم" },
  no: { hi: "नहीं", ur: "نہیں", ar: "لا" },
  water: { hi: "पानी", ur: "پانی", ar: "ماء" },
  bread: { hi: "रोटी / ब्रेड", ur: "روٹی / بریڈ", ar: "خبز" },
  coffee: { hi: "कॉफ़ी", ur: "کافی", ar: "قهوة" },
  tea: { hi: "चाय", ur: "چائے", ar: "شاي" },
  house: { hi: "घर", ur: "گھر", ar: "منزل" },
  apartment: { hi: "अपार्टमेंट / फ्लैट", ur: "فلیٹ / اپارٹمنٹ", ar: "شقة" },
  city: { hi: "शहर", ur: "شہر", ar: "مدينة" },
  street: { hi: "सड़क", ur: "سڑک / گلی", ar: "شارع" },
  book: { hi: "किताब", ur: "کتاب", ar: "كتاب" },
  school: { hi: "स्कूल / विद्यालय", ur: "اسکول", ar: "مدرسة" },
  university: { hi: "विश्वविद्यालय", ur: "یونیورسٹی", ar: "جامعة" },
  work: { hi: "काम", ur: "کام", ar: "عمل" },
  office: { hi: "कार्यालय / दफ़्तर", ur: "دفتر", ar: "مكتب" },
  friend: { hi: "दोस्त / मित्र", ur: "دوست", ar: "صديق" },
  family: { hi: "परिवार", ur: "خاندان", ar: "عائلة" },
  mother: { hi: "माँ", ur: "ماں / والدہ", ar: "أم" },
  father: { hi: "पिता", ur: "والد", ar: "أب" },
  brother: { hi: "भाई", ur: "بھائی", ar: "أخ" },
  sister: { hi: "बहन", ur: "بہن", ar: "أخت" },
  child: { hi: "बच्चा", ur: "بچہ", ar: "طفل" },
  time: { hi: "समय", ur: "وقت", ar: "وقت" },
  day: { hi: "दिन", ur: "دن", ar: "يوم" },
  today: { hi: "आज", ur: "آج", ar: "اليوم" },
  tomorrow: { hi: "कल (आने वाला)", ur: "کل (آنے والا)", ar: "غداً" },
  yesterday: { hi: "कल (बीता हुआ)", ur: "کل (گزرا ہوا)", ar: "أمس" },
  car: { hi: "गाड़ी / कार", ur: "گاڑی / کار", ar: "سيارة" },
  train: { hi: "ट्रेन / रेलगाड़ी", ur: "ٹرین / ریل گاڑی", ar: "قطار" },
  bus: { hi: "बस", ur: "بس", ar: "حافلة" },
  doctor: { hi: "डॉक्टर / चिकित्सक", ur: "ڈاکٹر", ar: "طبيب" },
  hospital: { hi: "अस्पताल", ur: "ہسپتال", ar: "مستشفى" },
  money: { hi: "पैसा / धन", ur: "پیسہ / رقم", ar: "مال" },
  language: { hi: "भाषा", ur: "زبان", ar: "لغة" },
  german: { hi: "जर्मन", ur: "جرمن", ar: "الألمانية" }
};

const TRANSLATION_CACHE: Record<string, string> = {};
const IN_FLIGHT_KEYS = new Set<string>();
const translationListeners = new Set<() => void>();
let notifyTimer: ReturnType<typeof setTimeout> | null = null;

function notifyTranslationUpdated() {
  if (notifyTimer) return;
  notifyTimer = setTimeout(() => {
    notifyTimer = null;
    for (const listener of translationListeners) {
      listener();
    }
  }, 90);
}

const BENGALI_REGEX = /[\u0980-\u09FF]/;

function cleanSourceForTranslation(
  enText?: string,
  bnText?: string,
  deText?: string
): { query: string; sourceLang: "en" | "bn" | "de" } {
  const cleanEn = (enText ?? "").trim();
  if (cleanEn && !BENGALI_REGEX.test(cleanEn)) {
    return { query: cleanEn, sourceLang: "en" };
  }
  const cleanDe = (deText ?? "").trim();
  if (cleanDe) {
    return { query: cleanDe, sourceLang: "de" };
  }
  const cleanBn = (bnText ?? "")
    .replace(/\(উচ্চারণ:.*?\)/g, "")
    .trim();
  return { query: cleanBn, sourceLang: "bn" };
}

function lookupStaticTranslation(
  query: string,
  targetLang: "hi" | "ur" | "ar"
): string | null {
  const norm = query.trim().toLowerCase();
  if (!norm) return null;

  if (STATIC_PHRASE_DICT[norm]) {
    return STATIC_PHRASE_DICT[norm][targetLang];
  }
  if (WORD_LEVEL_DICT[norm]) {
    return WORD_LEVEL_DICT[norm][targetLang];
  }
  // Strip leading "to " or articles "the / a" for single-word lookups
  const stripped = norm
    .replace(/^(to|the|a|an)\s+/i, "")
    .split(/[\/,;]/)[0]
    .trim();
  if (WORD_LEVEL_DICT[stripped]) {
    return WORD_LEVEL_DICT[stripped][targetLang];
  }
  return null;
}

async function fetchTargetTranslationAsync(
  query: string,
  sourceLang: "en" | "bn" | "de",
  targetLang: "hi" | "ur" | "ar" | "en",
  cacheKey: string
) {
  if (IN_FLIGHT_KEYS.has(cacheKey) || TRANSLATION_CACHE[cacheKey]) return;
  IN_FLIGHT_KEYS.add(cacheKey);

  try {
    // 1. Try Google GTX free endpoint first for fast, accurate Hindi/Urdu/Arabic script
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      query
    )}`;
    const res = await fetch(gtxUrl);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.[0])) {
        const joined = data[0]
          .map((seg: any) => (typeof seg?.[0] === "string" ? seg[0] : ""))
          .join("")
          .trim();
        if (joined) {
          TRANSLATION_CACHE[cacheKey] = joined;
          notifyTranslationUpdated();
          return;
        }
      }
    }
  } catch {
    // Fallback to MyMemory below
  }

  try {
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      query
    )}&langpair=${sourceLang}|${targetLang}`;
    const res = await fetch(mmUrl);
    if (res.ok) {
      const data = await res.json();
      const translated: string | undefined = data?.responseData?.translatedText;
      if (
        translated &&
        translated.trim() &&
        !translated.includes("MYMEMORY WARNING")
      ) {
        TRANSLATION_CACHE[cacheKey] = translated.trim();
        notifyTranslationUpdated();
      }
    }
  } catch {
    // Keep fallback
  } finally {
    IN_FLIGHT_KEYS.delete(cacheKey);
  }
}

/**
 * Translates a pair of `(enText, bnText, deText?)` according to the active `languageMode`.
 * - For `"bn"` or `"both"`: returns `bnText` immediately.
 * - For `"en"`: returns `enText` immediately.
 * - For `"hi"`, `"ur"`, or `"ar"`: returns cached / dictionary translation immediately
 *   and triggers a background neural translation if not yet cached.
 */
export function translateSecondaryText(
  enText: string | undefined,
  bnText: string | undefined,
  languageMode: LanguageMode,
  deText?: string
): string {
  if (languageMode === "bn" || languageMode === "both") {
    return bnText || enText || "";
  }
  if (languageMode === "en") {
    return enText || bnText || "";
  }

  const targetLang = languageMode; // "hi" | "ur" | "ar"
  const { query, sourceLang } = cleanSourceForTranslation(
    enText,
    bnText,
    deText
  );
  if (!query) return bnText || enText || "";

  const staticHit = lookupStaticTranslation(query, targetLang);
  if (staticHit) {
    return staticHit;
  }

  const cacheKey = `${targetLang}::${sourceLang}::${query.toLowerCase()}`;
  if (TRANSLATION_CACHE[cacheKey]) {
    return TRANSLATION_CACHE[cacheKey];
  }

  // Trigger background fetch and return clean fallback while loading
  fetchTargetTranslationAsync(query, sourceLang, targetLang, cacheKey);
  return query;
}

export function translateEnglishText(
  enText?: string,
  bnText?: string,
  deText?: string
): string {
  const cleanEn = (enText ?? "").trim();
  if (cleanEn && !BENGALI_REGEX.test(cleanEn)) {
    return cleanEn;
  }
  const cleanDe = (deText ?? "").trim();
  const cleanBn = (bnText ?? "")
    .replace(/\(উচ্চারণ:.*?\)/g, "")
    .trim();
  const query = cleanDe || cleanBn;
  const sourceLang: "de" | "bn" = cleanDe ? "de" : "bn";
  if (!query) return cleanEn;

  const cacheKey = `en::${sourceLang}::${query.toLowerCase()}`;
  if (TRANSLATION_CACHE[cacheKey]) {
    return TRANSLATION_CACHE[cacheKey];
  }
  fetchTargetTranslationAsync(query, sourceLang, "en", cacheKey);
  return cleanDe || cleanEn;
}

/**
 * Hook that subscribes a screen/component to `languageMode` and live translation updates.
 */
export function useAppLanguage() {
  const { languageMode, setLanguageMode } = useApp();
  const [, setTick] = useState(0);

  useEffect(() => {
    const onUpdate = () => setTick((t) => t + 1);
    translationListeners.add(onUpdate);
    return () => {
      translationListeners.delete(onUpdate);
    };
  }, [languageMode]);

  // Always show English alongside any selected explanation language
  const showEn = true;
  const showNative = languageMode !== "en";
  const nativeMeta = getLanguageMeta(languageMode);

  const tx = useCallback(
    (enText?: string, bnText?: string, deText?: string): string => {
      return translateSecondaryText(enText, bnText, languageMode, deText);
    },
    [languageMode]
  );

  const txEn = useCallback(
    (enText?: string, bnText?: string, deText?: string): string => {
      return translateEnglishText(enText, bnText, deText);
    },
    []
  );

  return {
    languageMode,
    setLanguageMode,
    showEn,
    showNative,
    nativeMeta,
    tx,
    txEn
  };
}
