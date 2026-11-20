import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { VOCABULARY_ITEMS } from "../data/vocabulary";
import { VocabularyItem } from "../types";

const LAST_NOTIFIED_DATE_KEY = "@lernde_last_wotd_notif_date";
const REMINDER_ENABLED_KEY = "@lernde_daily_reminder_enabled";

export function getTodayDateKey(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Deterministically picks one Word of the Day from the full vocabulary pool (A1–B2 + Daily + Topics).
 */
export function getWordOfTheDay(dateKey: string = getTodayDateKey()): VocabularyItem {
  const pool = VOCABULARY_ITEMS;
  if (pool.length === 0) {
    throw new Error("VOCABULARY_ITEMS is empty");
  }
  let hash = 2166136261;
  for (let i = 0; i < dateKey.length; i++) {
    hash ^= dateKey.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const index = Math.abs(hash) % pool.length;
  return pool[index];
}

/**
 * Picks a random word from the full vocabulary pool, avoiding `excludeId` when possible.
 */
export function getRandomVocabWord(excludeId?: string): VocabularyItem {
  const pool = VOCABULARY_ITEMS;
  if (pool.length <= 1) return pool[0];
  let candidate = pool[Math.floor(Math.random() * pool.length)];
  if (excludeId && candidate.id === excludeId) {
    candidate = pool[(pool.indexOf(candidate) + 1) % pool.length];
  }
  return candidate;
}

export async function isDailyReminderEnabled(): Promise<boolean> {
  try {
    const val = await AsyncStorage.getItem(REMINDER_ENABLED_KEY);
    return val !== "false";
  } catch {
    return true;
  }
}

export async function setDailyReminderEnabled(enabled: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(REMINDER_ENABLED_KEY, enabled ? "true" : "false");
  } catch {
    // Ignore storage errors
  }
}

/**
 * Requests browser notification permission on Web when supported, and enables daily reminder.
 */
export async function requestDailyNotificationPermission(): Promise<
  "granted" | "denied" | "in-app"
> {
  await setDailyReminderEnabled(true);
  if (
    Platform.OS === "web" &&
    typeof window !== "undefined" &&
    "Notification" in window
  ) {
    try {
      const perm = await window.Notification.requestPermission();
      return perm === "granted" ? "granted" : "denied";
    } catch {
      return "in-app";
    }
  }
  return "in-app";
}

/**
 * Checks if today's "Come back and learn + Word of the Day" notification should be shown.
 * Fires a Web Notification (if permitted) and returns `true` once per day for the in-app banner.
 */
export async function checkAndTriggerDailyWordNotification(
  word: VocabularyItem
): Promise<boolean> {
  try {
    const enabled = await isDailyReminderEnabled();
    if (!enabled) return false;

    const today = getTodayDateKey();
    const lastDate = await AsyncStorage.getItem(LAST_NOTIFIED_DATE_KEY);
    if (lastDate === today) {
      return false;
    }

    await AsyncStorage.setItem(LAST_NOTIFIED_DATE_KEY, today);

    const germanWord = word.article
      ? `${word.article} ${word.german}`
      : word.german;

    if (
      Platform.OS === "web" &&
      typeof window !== "undefined" &&
      "Notification" in window &&
      window.Notification.permission === "granted"
    ) {
      new window.Notification("LernDE • Word of the Day", {
        body: `Come back and learn! Today's Word of the Day: ${germanWord} (${word.english})`
      });
    }

    return true;
  } catch {
    return false;
  }
}
