export type CEFRLevel = "A1" | "A2" | "B1" | "B2";

export type GermanArticle = "der" | "die" | "das";

export type LanguageMode = "en" | "bn" | "both" | "hi" | "ur" | "ar";

export type ThemeMode = "light" | "dark" | "black" | "pink";

export type TTSVoiceGender = "female" | "male";

export type TTSAccentStyle = "de-natural" | "south-asian";

export type TTSSpeed = 0.6 | 0.8 | 1.0 | 1.2;

export type DailyGoalXP = 10 | 30 | 50;

export type SRSRating = "Again" | "Hard" | "Good" | "Easy";

export interface WordMatchResult {
  word: string;
  normalized: string;
  matched: boolean;
}

export interface VocabularyItem {
  id: string;
  day?: string;
  chapter?: string;
  sourceCsv?: "a1.csv" | "a2.csv" | "b1.csv" | "b2.csv" | "vocabulary.csv" | "b2";
  level: CEFRLevel;
  topic: string;
  article?: GermanArticle;
  german: string;
  fullGerman?: string;
  plural?: string;
  english: string;
  bangla: string;
  phoneticHint?: string;
  exampleDe: string;
  exampleEn: string;
  exampleBn: string;
}

export interface SRSCardProgress {
  wordId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  dueDate: string;
  lastRating?: SRSRating;
}

export type ExerciseType =
  | "listening"
  | "sentence_builder"
  | "article_match"
  | "speaking";

export interface LessonExercise {
  id: string;
  type: ExerciseType;
  promptDe: string;
  promptEn: string;
  promptBn: string;
  /** For listening & article_match */
  options?: string[];
  correctAnswer: string;
  /** For article_match */
  noun?: string;
  plural?: string;
  article?: GermanArticle;
  /** For sentence_builder */
  wordBank?: string[];
  /** Explanation shown on answer */
  tipEn: string;
  tipBn: string;
}

export interface LessonUnit {
  id: string;
  level: CEFRLevel;
  unitNumber: number;
  titleDe: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  xpReward: number;
  keyNouns: Array<{
    article: GermanArticle;
    noun: string;
    plural: string;
    en: string;
    bn: string;
  }>;
  exercises: LessonExercise[];
}

export interface GrammarExample {
  german: string;
  english: string;
  bangla: string;
  nounHighlight?: string;
  article?: GermanArticle;
}

export interface GrammarQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanationEn: string;
  explanationBn: string;
}

export interface GrammarTable {
  titleEn: string;
  titleBn?: string;
  headers: string[];
  rows: string[][];
}

export interface GrammarTopic {
  id: string;
  level: CEFRLevel;
  titleDe: string;
  titleEn: string;
  titleBn: string;
  formula: string;
  explanationEn: string;
  explanationBn: string;
  banglaParallelNoteEn: string;
  banglaParallelNoteBn: string;
  tables?: GrammarTable[];
  examples: GrammarExample[];
  quiz: GrammarQuizQuestion[];
}

export interface PassageWordEntry {
  surface: string;
  lemma: string;
  article?: GermanArticle;
  plural?: string;
  partOfSpeech: string;
  english: string;
  bangla: string;
  exampleDe: string;
  exampleEn: string;
  exampleBn: string;
}

export interface ReadingSentence {
  de: string;
  en: string;
  bn: string;
}

export interface ReadingPassage {
  id: string;
  level: CEFRLevel;
  category: string;
  titleDe: string;
  titleEn: string;
  titleBn: string;
  readingTimeMinutes: number;
  sentences: ReadingSentence[];
  dictionary: Record<string, PassageWordEntry>;
}
