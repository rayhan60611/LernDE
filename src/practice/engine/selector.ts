import { READING_PASSAGES } from "../../data/passages";
import { CEFRLevel } from "../../types";
import { AttemptRecord, PracticeQuestion, QuestionSource } from "../types";
import {
  buildQuestionsForPassage,
  generateGrammarQuestions,
  generateStoryQuestions,
  generateWordQuestions
} from "./generators";
import { hashStringToSeed, mulberry32, shuffleArray } from "./seededRandom";

/**
 * Computes how many wrong attempts each `itemId` has.
 */
export function buildWrongCountMap(
  attempts: readonly AttemptRecord[]
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const a of attempts) {
    if (!a.correct) {
      counts[a.itemId] = (counts[a.itemId] ?? 0) + 1;
    }
  }
  return counts;
}

/**
 * Selects `count` unique questions without repetition, weighted toward items
 * the user has answered wrong more often.
 */
export function selectWeightedQuestions(
  pool: readonly PracticeQuestion[],
  count: number,
  attempts: readonly AttemptRecord[] = [],
  rng: () => number = Math.random
): PracticeQuestion[] {
  if (pool.length === 0 || count <= 0) return [];

  const wrongCounts = buildWrongCountMap(attempts);
  const remaining = [...pool];
  const selected: PracticeQuestion[] = [];
  const usedIds = new Set<string>();

  while (selected.length < count && remaining.length > 0) {
    let totalWeight = 0;
    const weights = remaining.map((q) => {
      const wrong = wrongCounts[q.itemId] ?? 0;
      const w = 1 + wrong * 2.5;
      totalWeight += w;
      return w;
    });

    let threshold = rng() * totalWeight;
    let chosenIdx = 0;
    for (let i = 0; i < remaining.length; i++) {
      threshold -= weights[i];
      if (threshold <= 0) {
        chosenIdx = i;
        break;
      }
    }

    const [picked] = remaining.splice(chosenIdx, 1);
    if (!usedIds.has(picked.id)) {
      usedIds.add(picked.id);
      selected.push(picked);
    }
  }

  return selected;
}

/**
 * Builds a Quick Practice session (5-10 questions) filtered by source and level.
 */
export function buildQuickPracticeSession(params: {
  source: QuestionSource | "all";
  level: CEFRLevel | "ALL";
  count: number;
  attempts: readonly AttemptRecord[];
}): PracticeQuestion[] {
  const { source, level, count, attempts } = params;
  let pool: PracticeQuestion[] = [];

  if (source === "all" || source === "words") {
    pool = pool.concat(
      generateWordQuestions({
        level,
        maxSourceWords: Math.max(25, count * 4)
      })
    );
  }
  if (source === "all" || source === "grammar") {
    pool = pool.concat(generateGrammarQuestions({ level }));
  }
  if (source === "all" || source === "story") {
    pool = pool.concat(
      generateStoryQuestions({ level, maxPassages: Math.max(8, count * 2) })
    );
  }

  return selectWeightedQuestions(pool, count, attempts);
}

export interface FixedExamDefinition {
  id: string;
  title: string;
  level: CEFRLevel | "ALL";
  durationSeconds: number;
  questions: PracticeQuestion[];
}

/**
 * Builds a FIXED, reproducible Exam using mulberry32 seeded randomness:
 * Structure: 10 words + 10 grammar + 1 story passage with 5 questions = 25 questions.
 * Always produces the exact same questions in the exact same order for a given `examId`.
 */
export function buildSeededExam(
  examId: string,
  title: string,
  level: CEFRLevel | "ALL" = "ALL",
  durationSeconds: number = 15 * 60
): FixedExamDefinition {
  const rng = mulberry32(hashStringToSeed(examId));

  // 10 fixed word questions (excluding multi-pair matching for clean timed exam scoring)
  const wordPool = generateWordQuestions({
    level,
    rng,
    includeMatching: false,
    maxSourceWords: 40
  });
  const examWords = shuffleArray(wordPool, rng).slice(0, 10);

  // 10 fixed grammar questions (MC/fill-blank/case/error-spotting)
  const grammarPool = generateGrammarQuestions({
    level,
    rng,
    includeSentenceBuilder: false
  });
  const examGrammar = shuffleArray(grammarPool, rng).slice(0, 10);

  // 1 story passage with up to 5 questions
  const candidatePassages =
    level === "ALL"
      ? READING_PASSAGES
      : READING_PASSAGES.filter((p) => p.level === level);
  const pickedPassage =
    candidatePassages.length > 0
      ? shuffleArray(candidatePassages, rng)[0]
      : READING_PASSAGES[0];
  const passageQs = buildQuestionsForPassage(
    pickedPassage,
    READING_PASSAGES,
    rng
  ).slice(0, 5);

  return {
    id: examId,
    title,
    level,
    durationSeconds,
    questions: [...examWords, ...examGrammar, ...passageQs]
  };
}
