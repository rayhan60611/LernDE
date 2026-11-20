import { Platform, Vibration } from "react-native";
import * as Speech from "expo-speech";

let sharedAudioCtx: any = null;
let vibrationEnabledState = true;
let soundEnabledState = true;

export function setVibrationEnabledState(enabled: boolean): void {
  vibrationEnabledState = enabled;
}

export function setSoundEnabledState(enabled: boolean): void {
  soundEnabledState = enabled;
}

/**
 * Triggers tactile haptic vibration for a right or wrong result if enabled in Profile.
 */
export function triggerResultVibration(isCorrect: boolean): void {
  if (!vibrationEnabledState) return;
  try {
    if (
      Platform.OS === "web" &&
      typeof navigator !== "undefined" &&
      typeof navigator.vibrate === "function"
    ) {
      navigator.vibrate(isCorrect ? 45 : [70, 50, 90]);
      return;
    }
    if (Platform.OS !== "web") {
      if (isCorrect) {
        Vibration.vibrate(45);
      } else {
        Vibration.vibrate([0, 70, 50, 90]);
      }
    }
  } catch {
    // Ignore vibration errors on unsupported devices
  }
}

function getWebAudioContext(): any {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Plays a crisp, tactile bubble-pop + micro-sparkle sound when any button is clicked.
 */
export function playClickSound(): void {
  if (!soundEnabledState) return;
  try {
    const ctx = getWebAudioContext();
    if (ctx) {
      const now = ctx.currentTime;

      // 1. Tactile pop impulse (320 Hz -> 680 Hz fast pop)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.055);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.075);

      // 2. Micro particle sparkle overtone (1320 Hz)
      const spark = ctx.createOscillator();
      const sparkGain = ctx.createGain();
      spark.type = "triangle";
      spark.frequency.setValueAtTime(1320, now + 0.02);
      spark.frequency.exponentialRampToValueAtTime(1760, now + 0.09);
      sparkGain.gain.setValueAtTime(0.08, now + 0.02);
      sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
      spark.connect(sparkGain);
      sparkGain.connect(ctx.destination);
      spark.start(now + 0.02);
      spark.stop(now + 0.095);
    }
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Plays a crisp, airy card-swipe "whoosh" sound when sliding a flashcard left or right.
 */
export function playSwipeSound(direction: "left" | "right" = "right"): void {
  if (!soundEnabledState) return;
  try {
    const ctx = getWebAudioContext();
    if (ctx) {
      const now = ctx.currentTime;
      const duration = 0.16;

      // 1. Filtered noise burst for tactile paper/card whoosh
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.setValueAtTime(2.2, now);
      if (direction === "right") {
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(1100, now + duration);
      } else {
        filter.frequency.setValueAtTime(950, now);
        filter.frequency.exponentialRampToValueAtTime(280, now + duration);
      }

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.22, now + 0.04);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + duration);

      // 2. Subtle soft sine glide
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(direction === "right" ? 240 : 380, now);
      osc.frequency.exponentialRampToValueAtTime(
        direction === "right" ? 440 : 210,
        now + duration
      );
      oscGain.gain.setValueAtTime(0.1, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    }
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Plays a bright, uplifting two-note major chime (E5 -> A5) for a CORRECT answer.
 */
export function playCorrectSound(): void {
  if (!soundEnabledState) return;
  try {
    const ctx = getWebAudioContext();
    if (ctx) {
      const now = ctx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.28, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.16);

      // Note 2: A5 (880 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880.0, now + 0.11);
      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.setValueAtTime(0.32, now + 0.11);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.11);
      osc2.stop(now + 0.42);
      return;
    }

    if (Platform.OS !== "web") {
      Speech.stop().then(() => {
        Speech.speak("Richtig!", {
          language: "de-DE",
          pitch: 1.25,
          rate: 1.15
        });
      });
    }
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Plays a gentle descending two-tone buzz (F3 -> C#3) for a WRONG answer.
 */
export function playWrongSound(): void {
  if (!soundEnabledState) return;
  try {
    const ctx = getWebAudioContext();
    if (ctx) {
      const now = ctx.currentTime;

      // Note 1: F3 (174.61 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(174.61, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.18);

      // Note 2: C#3 (138.59 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(138.59, now + 0.15);
      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.setValueAtTime(0.22, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.42);
      return;
    }

    if (Platform.OS !== "web") {
      Speech.stop().then(() => {
        Speech.speak("Leider falsch", {
          language: "de-DE",
          pitch: 0.85,
          rate: 1.1
        });
      });
    }
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Plays a sparkling arpeggio chime when starring a word,
 * or a soft descending pop when unstarring/deleting a word.
 */
export function playStarSound(isStarred: boolean): void {
  if (!soundEnabledState) return;
  try {
    const ctx = getWebAudioContext();
    if (ctx) {
      const now = ctx.currentTime;
      if (isStarred) {
        // Sparkling ascending C6-E6-G6 twinkle
        const freqs = [587.33, 880.0, 1174.66];
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const start = now + idx * 0.055;
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, start);
          gain.gain.setValueAtTime(0.24, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.22);
        });
      } else {
        // Soft descending pop when unstarring
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.16);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    }
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Convenience helper to play either the correct or wrong sound effect + haptic vibration.
 */
export function playFeedbackSound(isCorrect: boolean): void {
  triggerResultVibration(isCorrect);
  if (isCorrect) {
    playCorrectSound();
  } else {
    playWrongSound();
  }
}
