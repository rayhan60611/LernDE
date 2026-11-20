import { CEFRLevel } from "../types";

export type PracticeModeId =
  | "quick"
  | "exam"
  | "game"
  | "mistakes"
  | "review_due";

export type QuestionSource = "words" | "grammar" | "story";

export type PracticeQuestionType =
  | "word_mc_de_to_en"
  | "word_mc_en_to_de"
  | "word_article"
  | "word_typing"
  | "word_matching"
  | "grammar_fill_blank"
  | "grammar_sentence_builder"
  | "grammar_error_spotting"
  | "grammar_case_ending"
  | "story_cloze"
  | "story_comprehension"
  | "story_vocab_context";

export interface LessonLink {
  route: "/(tabs)/vocabulary" | "/(tabs)/grammar" | "/(tabs)/read";
  label: string;
  level?: CEFRLevel;
}

export interface MatchingPair {
  id: string;
  german: string;
  meaning: string;
  meaningBn?: string;
}

export interface ClozeBlank {
  index: number;
  answer: string;
  options: string[];
}

export interface PracticeQuestion {
  id: string;
  itemId: string;
  source: QuestionSource;
  type: PracticeQuestionType;
  level: CEFRLevel;
  topic: string;
  prompt: string;
  subPrompt?: string;
  /** Optional native-language (BN/HI/UR/AR) prompt/meaning hint */
  nativeHintEn?: string;
  nativeHintBn?: string;
  deHint?: string;
  /** Multiple choice / article / error spotting / comprehension options */
  options?: string[];
  /** Primary expected answer string */
  correctAnswer: string;
  /** Sentence builder shuffled word bank */
  wordBank?: string[];
  /** Matching game 5 pairs */
  matchingPairs?: MatchingPair[];
  /** Cloze test passage segments & blanks */
  clozeSegments?: string[];
  clozeBlanks?: ClozeBlank[];
  /** Passage excerpt for story comprehension / vocab in context */
  passageTitle?: string;
  passageExcerpt?: string;
  /** Short explanation shown after answering */
  explanation: string;
  explanationBn?: string;
  /** Link back to related Word, Grammar, or Story lesson */
  lessonLink: LessonLink;
}

export interface AttemptRecord {
  questionId: string;
  itemId: string;
  type: PracticeQuestionType;
  source: QuestionSource;
  topic: string;
  level: CEFRLevel;
  correct: boolean;
  userAnswer?: string;
  answeredAt: string;
  timeMs: number;
}

export interface LeitnerItemState {
  itemId: string;
  box: 1 | 2 | 3 | 4 | 5;
  nextReviewDate: string; // YYYY-MM-DD
  lastReviewedAt: string;
}

export interface ExamScoreRecord {
  examId: string;
  bestPercent: number;
  bestScore: number;
  totalQuestions: number;
  passed: boolean;
  lastAttemptAt: string;
}

export interface PracticeStorageState {
  attempts: AttemptRecord[];
  leitner: Record<string, LeitnerItemState>;
  streak: number;
  lastPracticeDate: string | null;
  xp: number;
  bestExamScores: Record<string, ExamScoreRecord>;
}

export interface WeakAreaSummary {
  topic: string;
  source: QuestionSource;
  wrongCount: number;
  totalCount: number;
  accuracyPercent: number;
}
