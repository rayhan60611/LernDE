import type { VocabularyItem } from "../../types";
import { shuffleArray } from "./seededRandom";

/**
 * Generates up to `desiredCount` unique distractor strings from `candidatePool`
 * that never equal `correctAnswer` (case-insensitive) and never duplicate each other.
 */
export function pickUniqueDistractors(
  correctAnswer: string,
  candidatePool: readonly string[],
  desiredCount: number = 3,
  rng: () => number = Math.random
): string[] {
  const normAnswer = correctAnswer.trim().toLowerCase();
  const seen = new Set<string>([normAnswer]);

  // Fast O(1) random sampling when pool is large
  if (candidatePool.length > 24) {
    const picked: string[] = [];
    const maxAttempts = desiredCount * 10;
    for (let i = 0; i < maxAttempts && picked.length < desiredCount; i++) {
      const idx = Math.floor(rng() * candidatePool.length);
      const trimmed = candidatePool[idx].trim();
      const norm = trimmed.toLowerCase();
      if (!trimmed || seen.has(norm)) continue;
      seen.add(norm);
      picked.push(trimmed);
    }
    if (picked.length === desiredCount) return picked;
  }

  const validCandidates: string[] = [];
  for (const raw of candidatePool) {
    const trimmed = raw.trim();
    const norm = trimmed.toLowerCase();
    if (!trimmed || seen.has(norm)) continue;
    seen.add(norm);
    validCandidates.push(trimmed);
  }

  return shuffleArray(validCandidates, rng).slice(0, desiredCount);
}

/**
 * Builds shuffled multiple-choice options containing `correctAnswer` and up to 3 distractors.
 */
export function buildShuffledOptions(
  correctAnswer: string,
  distractorPool: readonly string[],
  totalOptions: number = 4,
  rng: () => number = Math.random
): string[] {
  const distractors = pickUniqueDistractors(
    correctAnswer,
    distractorPool,
    Math.max(1, totalOptions - 1),
    rng
  );
  return shuffleArray([correctAnswer.trim(), ...distractors], rng);
}

/**
 * Generates same-category word distractors:
 * - Nouns (items with `article`) are paired with other nouns.
 * - Non-nouns (verbs, adjectives, phrases) are paired with other non-nouns.
 */
export function getSameCategoryWordDistractors(
  target: VocabularyItem,
  allWords: readonly VocabularyItem[],
  field: "english" | "german",
  rng: () => number = Math.random
): string[] {
  const isNoun = Boolean(target.article);
  const sameLevelSameCategory = allWords.filter(
    (w) =>
      w.id !== target.id &&
      Boolean(w.article) === isNoun &&
      w.level === target.level
  );
  const fallbackSameCategory = allWords.filter(
    (w) => w.id !== target.id && Boolean(w.article) === isNoun
  );

  const pool =
    sameLevelSameCategory.length >= 10
      ? sameLevelSameCategory
      : fallbackSameCategory;

  return pickUniqueDistractors(
    target[field],
    pool.map((w) => w[field]),
    3,
    rng
  );
}

/**
 * Always returns the 3 German articles shuffled.
 */
export function getShuffledArticleOptions(
  rng: () => number = Math.random
): string[] {
  return shuffleArray(["der", "die", "das"], rng);
}
