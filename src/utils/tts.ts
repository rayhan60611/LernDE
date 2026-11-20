import { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Speech from "expo-speech";
import { TTSAccentStyle, TTSSpeed, TTSVoiceGender } from "../types";

export interface ActiveSpeechState {
  activeText: string | null;
  activeWordIndex: number;
  isPlaying: boolean;
  isPaused: boolean;
  originPath: string | null;
}

let activeSpeechState: ActiveSpeechState = {
  activeText: null,
  activeWordIndex: -1,
  isPlaying: false,
  isPaused: false,
  originPath: null
};
let currentScreenPath: string | null = null;
let lastSpeakOptions: {
  gender: TTSVoiceGender;
  accent?: TTSAccentStyle;
  rate: number;
  onDone?: () => void;
  onStopped?: () => void;
  onError?: () => void;
} | null = null;
let suppressNextStop = false;
let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<(state: ActiveSpeechState) => void>();

export function setCurrentSpeechScreen(path: string) {
  currentScreenPath = path;
}

function notifySpeechListeners(next: ActiveSpeechState) {
  activeSpeechState = next;
  for (const listener of listeners) {
    listener(next);
  }
}

function clearFallbackTimer() {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }
}

export function stopActiveSpeechHighlight() {
  clearFallbackTimer();
  if (
    activeSpeechState.activeText !== null ||
    activeSpeechState.isPlaying ||
    activeSpeechState.isPaused
  ) {
    notifySpeechListeners({
      activeText: null,
      activeWordIndex: -1,
      isPlaying: false,
      isPaused: false,
      originPath: null
    });
  }
}

/**
 * Subscribe to the currently spoken German text and word index for live caption highlighting.
 */
export function useActiveSpeechHighlight(): ActiveSpeechState {
  const [state, setState] = useState<ActiveSpeechState>(activeSpeechState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return state;
}

function getWordRanges(text: string): Array<{ start: number; end: number; token: string }> {
  const ranges: Array<{ start: number; end: number; token: string }> = [];
  const regex = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    ranges.push({
      start: match.index,
      end: match.index + match[0].length,
      token: match[0]
    });
  }
  return ranges;
}

export const TTS_SPEED_OPTIONS: Array<{
  value: TTSSpeed;
  label: string;
  desc: string;
}> = [
  { value: 0.6, label: "0.6x", desc: "Very Slow" },
  { value: 0.8, label: "0.8x", desc: "Slow" },
  { value: 1.0, label: "1.0x", desc: "Normal" },
  { value: 1.2, label: "1.2x", desc: "Fast" }
];

// Robotic Apple Eloquence / legacy compact voices to heavily deprioritize
const ROBOTIC_VOICE_KEYWORDS = [
  "eloquence",
  "eddy",
  "sandy",
  "reed",
  "shelley",
  "grandpa",
  "grandma",
  "rocko",
  "flo",
  "albert",
  "bad news",
  "bahh",
  "bells",
  "boing",
  "bubbles",
  "cellos",
  "good news",
  "jester",
  "organ",
  "superstar",
  "trinoids",
  "whisper",
  "wobble",
  "zarvox",
  "compact"
];

const FEMALE_KEYWORDS = [
  "anna",
  "helena",
  "petra",
  "vicki",
  "katja",
  "hedda",
  "amelie",
  "seraphina",
  "marlene",
  "claire",
  "isha",
  "veena",
  "lekha",
  "neerja",
  "sangeeta",
  "tanisha",
  "aditi",
  "raveena",
  "female",
  "woman",
  "frau"
];

const MALE_KEYWORDS = [
  "markus",
  "yannick",
  "martin",
  "viktor",
  "stefan",
  "conrad",
  "klaus",
  "daniel",
  "hans",
  "rishi",
  "prabhat",
  "bashkar",
  "nabanita",
  "male",
  "man",
  "mann"
];

let cachedAllVoices: Speech.Voice[] | null = null;

async function getAllVoices(): Promise<Speech.Voice[]> {
  if (cachedAllVoices) return cachedAllVoices;
  try {
    const all = await Speech.getAvailableVoicesAsync();
    cachedAllVoices = all;
    return all;
  } catch {
    return [];
  }
}

function scoreVoice(
  voice: Speech.Voice,
  gender: TTSVoiceGender,
  accent: TTSAccentStyle
): number {
  const haystack = `${voice.name ?? ""} ${voice.identifier ?? ""}`.toLowerCase();
  const lang = (voice.language ?? "").toLowerCase();

  let score = 0;

  // Strongly prefer natural / neural / cloud / enhanced voices
  const isNatural =
    voice.quality === Speech.VoiceQuality.Enhanced ||
    haystack.includes("natural") ||
    haystack.includes("neural") ||
    haystack.includes("online") ||
    haystack.includes("enhanced") ||
    haystack.includes("premium") ||
    haystack.includes("siri") ||
    haystack.includes("google");

  if (isNatural) score += 80;

  // Penalize robotic Eloquence / legacy compact voices
  for (const bad of ROBOTIC_VOICE_KEYWORDS) {
    if (haystack.includes(bad)) score -= 120;
  }

  // Language / accent matching
  if (accent === "south-asian") {
    if (lang === "en-in" || lang === "bn-bd" || lang === "bn-in") score += 70;
    else if (lang.startsWith("en-in") || lang.startsWith("bn")) score += 60;
    else if (lang.startsWith("en-gb") || lang.startsWith("en-us")) score += 20;
  } else {
    if (lang === "de-de") score += 70;
    else if (lang.startsWith("de")) score += 55;
  }

  if (gender === "female") {
    for (const kw of FEMALE_KEYWORDS) {
      if (haystack.includes(kw)) score += 45;
    }
    for (const kw of MALE_KEYWORDS) {
      if (haystack.includes(kw)) score -= 55;
    }
  } else {
    for (const kw of MALE_KEYWORDS) {
      if (haystack.includes(kw)) score += 45;
    }
    for (const kw of FEMALE_KEYWORDS) {
      if (haystack.includes(kw)) score -= 55;
    }
  }

  return score;
}

export async function resolveGermanVoiceConfig(
  gender: TTSVoiceGender,
  accent: TTSAccentStyle = "de-natural"
): Promise<{
  voice?: string;
  language: string;
  pitch: number;
}> {
  const allVoices = await getAllVoices();

  const pool =
    accent === "south-asian"
      ? allVoices.filter((v) => {
          const l = (v.language ?? "").toLowerCase();
          return l.startsWith("en-in") || l.startsWith("bn");
        })
      : allVoices.filter((v) =>
          (v.language ?? "").toLowerCase().startsWith("de")
        );

  const candidates =
    pool.length > 0
      ? pool
      : accent === "south-asian"
      ? allVoices.filter((v) =>
          (v.language ?? "").toLowerCase().startsWith("en")
        )
      : allVoices;

  const fallbackLanguage = accent === "south-asian" ? "en-IN" : "de-DE";

  if (candidates.length === 0) {
    return {
      language: fallbackLanguage,
      pitch: gender === "female" ? 1.0 : 0.92
    };
  }

  const ranked = [...candidates].sort(
    (a, b) => scoreVoice(b, gender, accent) - scoreVoice(a, gender, accent)
  );
  const best = ranked[0];
  const bestHaystack = `${best.name ?? ""} ${best.identifier ?? ""}`.toLowerCase();
  const matchedExplicitMale = MALE_KEYWORDS.some((kw) =>
    bestHaystack.includes(kw)
  );

  // Keep pitch natural (1.0) to avoid robotic synthesis artifacts
  return {
    voice: best.identifier,
    language: best.language || fallbackLanguage,
    pitch: gender === "female" ? 1.0 : matchedExplicitMale ? 0.98 : 0.9
  };
}

let fallbackScheduleFn: (() => void) | null = null;

export async function speakGerman(
  text: string,
  options: {
    gender: TTSVoiceGender;
    accent?: TTSAccentStyle;
    rate: number;
    onDone?: () => void;
    onStopped?: () => void;
    onError?: () => void;
    /** Internal: used when resuming from a word index on platforms without Speech.pause */
    startWordIndex?: number;
    preserveOriginPath?: string | null;
  }
) {
  clearFallbackTimer();
  suppressNextStop = true;
  await Speech.stop();
  suppressNextStop = false;

  lastSpeakOptions = {
    gender: options.gender,
    accent: options.accent,
    rate: options.rate,
    onDone: options.onDone,
    onStopped: options.onStopped,
    onError: options.onError
  };

  const ranges = getWordRanges(text);
  const startIdx = Math.max(0, Math.min(options.startWordIndex ?? 0, Math.max(0, ranges.length - 1)));
  const spokenText =
    startIdx > 0 && ranges[startIdx]
      ? text.slice(ranges[startIdx].start)
      : text;
  const charOffset = startIdx > 0 && ranges[startIdx] ? ranges[startIdx].start : 0;

  let receivedBoundary = false;
  let fallbackIndex = startIdx;
  const originPath =
    options.preserveOriginPath !== undefined
      ? options.preserveOriginPath
      : currentScreenPath;

  notifySpeechListeners({
    activeText: text,
    activeWordIndex: ranges.length > 0 ? startIdx : -1,
    isPlaying: true,
    isPaused: false,
    originPath
  });

  const scheduleNextFallback = () => {
    clearFallbackTimer();
    if (
      receivedBoundary ||
      fallbackIndex + 1 >= ranges.length ||
      !activeSpeechState.isPlaying ||
      activeSpeechState.isPaused
    ) {
      return;
    }
    const currentToken = ranges[fallbackIndex]?.token ?? "";
    const delayMs = Math.max(
      170,
      Math.round((currentToken.length * 52 + 140) / Math.max(options.rate, 0.5))
    );
    fallbackTimer = setTimeout(() => {
      if (
        receivedBoundary ||
        activeSpeechState.activeText !== text ||
        !activeSpeechState.isPlaying ||
        activeSpeechState.isPaused
      ) {
        return;
      }
      fallbackIndex += 1;
      if (fallbackIndex < ranges.length) {
        notifySpeechListeners({
          ...activeSpeechState,
          activeWordIndex: fallbackIndex
        });
        scheduleNextFallback();
      }
    }, delayMs);
  };

  fallbackScheduleFn = scheduleNextFallback;
  scheduleNextFallback();

  const { voice, language, pitch } = await resolveGermanVoiceConfig(
    options.gender,
    options.accent ?? "de-natural"
  );

  const finish = (cb?: () => void, isStopEvent = false) => {
    if (isStopEvent && suppressNextStop) {
      suppressNextStop = false;
      return;
    }
    clearFallbackTimer();
    fallbackScheduleFn = null;
    if (activeSpeechState.activeText === text) {
      notifySpeechListeners({
        activeText: null,
        activeWordIndex: -1,
        isPlaying: false,
        isPaused: false,
        originPath: null
      });
    }
    cb?.();
  };

  Speech.speak(spokenText, {
    language,
    voice,
    rate: options.rate,
    pitch,
    onBoundary: (event: { charIndex?: number }) => {
      if (typeof event?.charIndex !== "number" || ranges.length === 0) return;
      receivedBoundary = true;
      clearFallbackTimer();
      const globalCharIndex = event.charIndex + charOffset;
      const idx = ranges.findIndex(
        (r) => globalCharIndex >= r.start && globalCharIndex <= r.end
      );
      if (idx !== -1) {
        fallbackIndex = idx;
        notifySpeechListeners({
          ...activeSpeechState,
          activeWordIndex: idx
        });
      }
    },
    onDone: () => finish(options.onDone, false),
    onStopped: () => finish(options.onStopped, true),
    onError: () => finish(options.onError, false)
  });
}

export async function pauseGermanSpeech() {
  if (!activeSpeechState.activeText || activeSpeechState.isPaused) return;
  clearFallbackTimer();
  notifySpeechListeners({
    ...activeSpeechState,
    isPlaying: false,
    isPaused: true
  });
  try {
    if (Platform.OS === "android") {
      suppressNextStop = true;
      await Speech.stop();
    } else {
      await Speech.pause();
    }
  } catch {
    // Fallback: already marked paused in state
  }
}

export async function resumeGermanSpeech() {
  if (!activeSpeechState.activeText || !activeSpeechState.isPaused) return;
  const text = activeSpeechState.activeText;
  const wordIdx = Math.max(0, activeSpeechState.activeWordIndex);
  const originPath = activeSpeechState.originPath;

  if (Platform.OS === "android") {
    if (lastSpeakOptions) {
      await speakGerman(text, {
        ...lastSpeakOptions,
        startWordIndex: wordIdx,
        preserveOriginPath: originPath
      });
    }
    return;
  }

  notifySpeechListeners({
    ...activeSpeechState,
    isPlaying: true,
    isPaused: false
  });
  try {
    await Speech.resume();
    fallbackScheduleFn?.();
  } catch {
    if (lastSpeakOptions) {
      await speakGerman(text, {
        ...lastSpeakOptions,
        startWordIndex: wordIdx,
        preserveOriginPath: originPath
      });
    }
  }
}

export async function stopGermanSpeech() {
  clearFallbackTimer();
  fallbackScheduleFn = null;
  suppressNextStop = false;
  const onStoppedCb = lastSpeakOptions?.onStopped;
  lastSpeakOptions = null;
  stopActiveSpeechHighlight();
  try {
    await Speech.stop();
  } catch {
    // Ignore stop errors
  }
  onStoppedCb?.();
}
