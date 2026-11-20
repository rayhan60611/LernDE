import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AttemptRecord,
  ExamScoreRecord,
  PracticeStorageState,
  QuestionSource,
  WeakAreaSummary
} from "../types";
import { getTodayISO, updateLeitnerBox } from "../engine/leitner";

const PRACTICE_STORAGE_KEY = "@lernde_practice_state_v1";

const INITIAL_PRACTICE_STATE: PracticeStorageState = {
  attempts: [],
  leitner: {},
  streak: 0,
  lastPracticeDate: null,
  xp: 0,
  bestExamScores: {}
};

function getYesterdayISO(todayISO: string): string {
  const d = new Date(`${todayISO}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().split("T")[0];
}

export async function loadPracticeState(): Promise<PracticeStorageState> {
  try {
    const raw = await AsyncStorage.getItem(PRACTICE_STORAGE_KEY);
    if (!raw) return { ...INITIAL_PRACTICE_STATE };
    const parsed = JSON.parse(raw) as Partial<PracticeStorageState>;
    return {
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      leitner: parsed.leitner ?? {},
      streak: typeof parsed.streak === "number" ? parsed.streak : 0,
      lastPracticeDate: parsed.lastPracticeDate ?? null,
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      bestExamScores: parsed.bestExamScores ?? {}
    };
  } catch {
    return { ...INITIAL_PRACTICE_STATE };
  }
}

export async function savePracticeState(
  state: PracticeStorageState
): Promise<void> {
  try {
    await AsyncStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Keep UI responsive if storage fails
  }
}

/**
 * Records a single question attempt, updates Leitner box, streak, and XP.
 */
export async function recordPracticeAttempt(
  attempt: AttemptRecord,
  xpDelta: number = attempt.correct ? 5 : 1
): Promise<PracticeStorageState> {
  const prev = await loadPracticeState();
  const today = getTodayISO();
  const yesterday = getYesterdayISO(today);

  let nextStreak = prev.streak;
  if (prev.lastPracticeDate !== today) {
    nextStreak = prev.lastPracticeDate === yesterday ? prev.streak + 1 : 1;
  }

  const nextLeitner = {
    ...prev.leitner,
    [attempt.itemId]: updateLeitnerBox(
      prev.leitner[attempt.itemId],
      attempt.itemId,
      attempt.correct,
      today
    )
  };

  const nextState: PracticeStorageState = {
    ...prev,
    attempts: [...prev.attempts.slice(-499), attempt],
    leitner: nextLeitner,
    streak: nextStreak,
    lastPracticeDate: today,
    xp: prev.xp + xpDelta
  };

  await savePracticeState(nextState);
  return nextState;
}

/**
 * Saves best exam score if the new percentage beats the previous best.
 */
export async function recordExamResult(
  record: ExamScoreRecord
): Promise<PracticeStorageState> {
  const prev = await loadPracticeState();
  const existing = prev.bestExamScores[record.examId];
  const nextBest =
    !existing || record.bestPercent >= existing.bestPercent ? record : existing;

  const nextState: PracticeStorageState = {
    ...prev,
    bestExamScores: {
      ...prev.bestExamScores,
      [record.examId]: nextBest
    }
  };
  await savePracticeState(nextState);
  return nextState;
}

/**
 * Aggregates topics with the lowest accuracy / highest wrong counts.
 */
export function computeWeakAreas(
  attempts: readonly AttemptRecord[],
  limit: number = 4
): WeakAreaSummary[] {
  const map = new Map<
    string,
    { topic: string; source: QuestionSource; wrong: number; total: number }
  >();

  for (const a of attempts) {
    const key = `${a.source}::${a.topic}`;
    const entry = map.get(key) ?? {
      topic: a.topic,
      source: a.source,
      wrong: 0,
      total: 0
    };
    entry.total += 1;
    if (!a.correct) entry.wrong += 1;
    map.set(key, entry);
  }

  return Array.from(map.values())
    .filter((e) => e.wrong > 0)
    .map((e) => ({
      topic: e.topic,
      source: e.source,
      wrongCount: e.wrong,
      totalCount: e.total,
      accuracyPercent: Math.round(((e.total - e.wrong) / e.total) * 100)
    }))
    .sort((a, b) => b.wrongCount - a.wrongCount || a.accuracyPercent - b.accuracyPercent)
    .slice(0, limit);
}

/**
 * Returns unique `questionId`s where the user's most recent attempt was wrong.
 */
export function getMistakeQuestionIds(
  attempts: readonly AttemptRecord[]
): string[] {
  const latestByQuestion = new Map<string, boolean>();
  for (const a of attempts) {
    latestByQuestion.set(a.questionId, a.correct);
  }
  const wrongIds: string[] = [];
  for (const [qId, wasCorrect] of latestByQuestion.entries()) {
    if (!wasCorrect) wrongIds.push(qId);
  }
  return wrongIds;
}
