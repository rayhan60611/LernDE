import { GRAMMAR_TOPICS } from "../../data/grammar";
import { READING_PASSAGES } from "../../data/passages";
import { VOCABULARY_ITEMS } from "../../data/vocabulary";
import {
  CEFRLevel,
  GrammarTopic,
  ReadingPassage,
  VocabularyItem
} from "../../types";
import {
  PRACTICE_GRAMMAR_ITEMS,
  PracticeGrammarItem
} from "../data/practiceGrammar";
import { ClozeBlank, MatchingPair, PracticeQuestion } from "../types";
import {
  buildShuffledOptions,
  getSameCategoryWordDistractors,
  getShuffledArticleOptions,
  pickUniqueDistractors
} from "./distractors";
import { shuffleArray } from "./seededRandom";

function filterByLevel<T extends { level: CEFRLevel }>(
  items: readonly T[],
  level?: CEFRLevel | "ALL"
): T[] {
  if (!level || level === "ALL") return [...items];
  return items.filter((item) => item.level === level);
}

// Cache distractor buckets for the default VOCABULARY_ITEMS array so Practice
// modes don't loop over all 6,471 words every time a round is built.
let cachedDefaultBuckets: Map<string, { english: string[]; german: string[] }> | null = null;
function getDistractorBuckets(
  words: readonly VocabularyItem[]
): Map<string, { english: string[]; german: string[] }> {
  if (words === VOCABULARY_ITEMS && cachedDefaultBuckets) {
    return cachedDefaultBuckets;
  }
  const poolByBucket = new Map<string, { english: string[]; german: string[] }>();
  const getBucket = (key: string) => {
    let b = poolByBucket.get(key);
    if (!b) {
      b = { english: [], german: [] };
      poolByBucket.set(key, b);
    }
    return b;
  };
  for (const w of words) {
    const cat = w.article ? "noun" : "other";
    getBucket(`${w.level}:${cat}`).english.push(w.english);
    getBucket(`${w.level}:${cat}`).german.push(w.german);
    getBucket(`ALL:${cat}`).english.push(w.english);
    getBucket(`ALL:${cat}`).german.push(w.german);
  }
  if (words === VOCABULARY_ITEMS) {
    cachedDefaultBuckets = poolByBucket;
  }
  return poolByBucket;
}

/**
 * Generates Word practice questions (MC DE->EN, MC EN->DE, Article, Typing, Matching).
 */
export function generateWordQuestions(
  options: {
    level?: CEFRLevel | "ALL";
    words?: readonly VocabularyItem[];
    rng?: () => number;
    includeMatching?: boolean;
    /** Optional limit on how many source words to generate questions from (keeps large pools instant) */
    maxSourceWords?: number;
    /** Optional filter to only generate questions for specific itemIds or questionIds */
    targetItemIds?: Set<string>;
  } = {}
): PracticeQuestion[] {
  const {
    level = "ALL",
    words = VOCABULARY_ITEMS,
    rng = Math.random,
    includeMatching = true,
    maxSourceWords,
    targetItemIds
  } = options;

  let filtered = filterByLevel(words, level);
  if (targetItemIds) {
    filtered = filtered.filter((w) => targetItemIds.has(w.id));
  } else if (maxSourceWords && filtered.length > maxSourceWords) {
    // Fast random sample without sorting the entire 6,000-word array
    const sampled: VocabularyItem[] = [];
    const used = new Set<number>();
    const attempts = maxSourceWords * 4;
    for (let i = 0; i < attempts && sampled.length < maxSourceWords; i++) {
      const idx = Math.floor(rng() * filtered.length);
      if (!used.has(idx)) {
        used.add(idx);
        sampled.push(filtered[idx]);
      }
    }
    filtered = sampled;
  }

  // Pre-index distractor pools once (cached across sessions for VOCABULARY_ITEMS)
  const poolByBucket = getDistractorBuckets(words);
  const getBucket = (key: string) =>
    poolByBucket.get(key) ?? { english: [], german: [] };

  const questions: PracticeQuestion[] = [];

  for (const w of filtered) {
    if (!w.id || !w.german || !w.english || !w.level) {
      console.warn("[Practice] Skipping invalid vocabulary item:", w);
      continue;
    }

    const cat = w.article ? "noun" : "other";
    const levelBucket = getBucket(`${w.level}:${cat}`);
    const allBucket = getBucket(`ALL:${cat}`);
    const enPool = levelBucket.english.length >= 10 ? levelBucket.english : allBucket.english;
    const dePool = levelBucket.german.length >= 10 ? levelBucket.german : allBucket.german;

    // 1. MC German -> Meaning
    const deToEnDistractors = pickUniqueDistractors(w.english, enPool, 3, rng);
    if (deToEnDistractors.length >= 1) {
      questions.push({
        id: `q-w-mc-de-${w.id}`,
        itemId: w.id,
        source: "words",
        type: "word_mc_de_to_en",
        level: w.level,
        topic: w.topic || "Vocabulary",
        prompt: `What does "${w.article ? `${w.article} ${w.german}` : w.german}" mean?`,
        subPrompt: w.exampleDe ? `Example: "${w.exampleDe}"` : undefined,
        deHint: w.german,
        options: buildShuffledOptions(w.english, deToEnDistractors, 4, rng),
        correctAnswer: w.english,
        explanation: `"${w.article ? `${w.article} ${w.german}` : w.german}" means "${w.english}".`,
        explanationBn: `"${w.article ? `${w.article} ${w.german}` : w.german}" অর্থ "${w.bangla}"।`,
        lessonLink: {
          route: "/(tabs)/vocabulary",
          label: `Open ${w.level} Vocabulary`,
          level: w.level
        }
      });
    }

    // 2. MC Meaning -> German
    const enToDeDistractors = pickUniqueDistractors(w.german, dePool, 3, rng);
    if (enToDeDistractors.length >= 1) {
      questions.push({
        id: `q-w-mc-en-${w.id}`,
        itemId: w.id,
        source: "words",
        type: "word_mc_en_to_de",
        level: w.level,
        topic: w.topic || "Vocabulary",
        prompt: `Which German word means "${w.english}"?`,
        nativeHintEn: w.english,
        nativeHintBn: w.bangla,
        deHint: w.german,
        options: buildShuffledOptions(w.german, enToDeDistractors, 4, rng),
        correctAnswer: w.german,
        explanation: `"${w.english}" in German is "${w.article ? `${w.article} ${w.german}` : w.german}".`,
        explanationBn: `"${w.bangla}"-এর জার্মান শব্দ "${w.article ? `${w.article} ${w.german}` : w.german}"।`,
        lessonLink: {
          route: "/(tabs)/vocabulary",
          label: `Open ${w.level} Vocabulary`,
          level: w.level
        }
      });
    }

    // 3. Article Quiz (der / die / das)
    if (w.article) {
      questions.push({
        id: `q-w-art-${w.id}`,
        itemId: w.id,
        source: "words",
        type: "word_article",
        level: w.level,
        topic: "der / die / das",
        prompt: `Choose the correct article for "${w.german}"`,
        subPrompt: `Meaning: ${w.english}`,
        nativeHintEn: w.english,
        nativeHintBn: w.bangla,
        deHint: w.german,
        options: getShuffledArticleOptions(rng),
        correctAnswer: w.article,
        explanation: `The noun "${w.german}" uses "${w.article}" (${w.article} ${w.german}).`,
        explanationBn: `"${w.german}" শব্দের সঠিক আর্টিকেল হলো "${w.article}" (${w.article} ${w.german})।`,
        lessonLink: {
          route: "/(tabs)/vocabulary",
          label: `Open ${w.level} Vocabulary`,
          level: w.level
        }
      });
    }

    // 4. Typing Question
    questions.push({
      id: `q-w-type-${w.id}`,
      itemId: w.id,
      source: "words",
      type: "word_typing",
      level: w.level,
      topic: w.topic || "Vocabulary",
      prompt: `Type the German word for "${w.english}"`,
      subPrompt: w.article ? `(Do not include der/die/das)` : undefined,
      nativeHintEn: w.english,
      nativeHintBn: w.bangla,
      deHint: w.german,
      correctAnswer: w.german,
      explanation: `The German word for "${w.english}" is "${w.german}"${w.article ? ` (${w.article} ${w.german})` : ""}.`,
      explanationBn: `"${w.bangla}"-এর জার্মান শব্দ "${w.german}"${w.article ? ` (${w.article} ${w.german})` : ""}।`,
      lessonLink: {
        route: "/(tabs)/vocabulary",
        label: `Open ${w.level} Vocabulary`,
        level: w.level
      }
    });
  }

  // 5. Matching Game (batches of 5 German words <-> meanings)
  if (includeMatching && filtered.length >= 5) {
    const shuffledForMatch = shuffleArray(filtered, rng);
    const maxMatchCards = Math.min(20, Math.floor(shuffledForMatch.length / 5));
    for (let i = 0; i < maxMatchCards; i++) {
      const slice = shuffledForMatch.slice(i * 5, i * 5 + 5);
      const pairs: MatchingPair[] = slice.map((item) => ({
        id: item.id,
        german: item.article ? `${item.article} ${item.german}` : item.german,
        meaning: item.english,
        meaningBn: item.bangla
      }));
      questions.push({
        id: `q-w-match-${slice[0].id}-${i}`,
        itemId: slice[0].id,
        source: "words",
        type: "word_matching",
        level: slice[0].level,
        topic: "Word Matching",
        prompt: "Connect each German word to its English meaning",
        matchingPairs: pairs,
        correctAnswer: "matched-all-5",
        explanation: pairs.map((p) => `${p.german} = ${p.meaning}`).join(" • "),
        lessonLink: {
          route: "/(tabs)/vocabulary",
          label: `Open ${slice[0].level} Vocabulary`,
          level: slice[0].level
        }
      });
    }
  }

  return questions;
}

/**
 * Generates Grammar practice questions from `PRACTICE_GRAMMAR_ITEMS` and `GRAMMAR_TOPICS`.
 * Skips invalid items and logs a console warning.
 */
export function generateGrammarQuestions(
  options: {
    level?: CEFRLevel | "ALL";
    practiceItems?: readonly PracticeGrammarItem[];
    topics?: readonly GrammarTopic[];
    rng?: () => number;
    includeSentenceBuilder?: boolean;
  } = {}
): PracticeQuestion[] {
  const {
    level = "ALL",
    practiceItems = PRACTICE_GRAMMAR_ITEMS,
    topics = GRAMMAR_TOPICS,
    rng = Math.random,
    includeSentenceBuilder = true
  } = options;

  const questions: PracticeQuestion[] = [];
  const filteredPractice = filterByLevel(practiceItems, level);

  const fallbackVerbForms = [
    "gehe",
    "gehst",
    "geht",
    "gehen",
    "bin",
    "bist",
    "ist",
    "sind",
    "habe",
    "hast",
    "hat",
    "haben",
    "kann",
    "können",
    "konnte",
    "wird",
    "werden"
  ];

  for (const item of filteredPractice) {
    if (!item.id || !item.sentence || !item.answer || !item.level) {
      console.warn("[Practice] Skipping incomplete grammar item:", item);
      continue;
    }

    if (item.kind === "sentence_builder") {
      if (!includeSentenceBuilder) continue;
      const tokens = item.wordBank?.length
        ? item.wordBank
        : item.answer.split(/\s+/).filter(Boolean);
      if (tokens.length < 3) {
        console.warn("[Practice] Skipping short sentence_builder item:", item.id);
        continue;
      }
      questions.push({
        id: `q-g-sb-${item.id}`,
        itemId: item.id,
        source: "grammar",
        type: "grammar_sentence_builder",
        level: item.level,
        topic: item.topic,
        prompt: "Arrange the words into a correct German sentence",
        wordBank: shuffleArray(tokens, rng),
        correctAnswer: item.answer,
        explanation: item.explanation,
        lessonLink: {
          route: "/(tabs)/grammar",
          label: `Open ${item.level} Grammar`,
          level: item.level
        }
      });
      continue;
    }

    const qType =
      item.kind === "case_ending"
        ? "grammar_case_ending"
        : item.kind === "error_spotting"
        ? "grammar_error_spotting"
        : "grammar_fill_blank";

    const distractorPool = item.distractors?.length
      ? item.distractors
      : fallbackVerbForms;

    questions.push({
      id: `q-g-${item.id}`,
      itemId: item.id,
      source: "grammar",
      type: qType,
      level: item.level,
      topic: item.topic,
      prompt: item.sentence,
      options: buildShuffledOptions(item.answer, distractorPool, 4, rng),
      correctAnswer: item.answer,
      explanation: item.explanation,
      lessonLink: {
        route: "/(tabs)/grammar",
        label: `Open ${item.level} Grammar`,
        level: item.level
      }
    });
  }

  // Also pull quiz questions from GRAMMAR_TOPICS
  const filteredTopics = filterByLevel(topics, level);
  for (const topic of filteredTopics) {
    if (!topic.id || !topic.level || !Array.isArray(topic.quiz)) {
      console.warn("[Practice] Skipping invalid grammar topic:", topic?.id);
      continue;
    }
    for (const q of topic.quiz) {
      if (!q.id || !q.question || !q.correctAnswer || !q.options?.length) {
        console.warn("[Practice] Skipping invalid grammar quiz item:", q?.id);
        continue;
      }
      questions.push({
        id: `q-g-topic-${q.id}`,
        itemId: q.id,
        source: "grammar",
        type: "grammar_fill_blank",
        level: topic.level,
        topic: topic.titleEn.replace(/^\d+\.\s*/, ""),
        prompt: q.question,
        options: shuffleArray(q.options, rng),
        correctAnswer: q.correctAnswer,
        explanation: q.explanationEn,
        explanationBn: q.explanationBn,
        lessonLink: {
          route: "/(tabs)/grammar",
          label: `Open ${topic.level} Grammar`,
          level: topic.level
        }
      });
    }
  }

  return questions;
}

/**
 * Builds a Cloze test (5-8 blanks) + comprehension + vocabulary-in-context questions from a passage.
 */
export function buildQuestionsForPassage(
  passage: ReadingPassage,
  allPassages: readonly ReadingPassage[],
  rng: () => number = Math.random
): PracticeQuestion[] {
  if (
    !passage ||
    !passage.id ||
    !passage.level ||
    !Array.isArray(passage.sentences) ||
    passage.sentences.length === 0
  ) {
    console.warn("[Practice] Skipping invalid story passage:", passage?.id);
    return [];
  }

  const results: PracticeQuestion[] = [];
  const fullText = passage.sentences.map((s) => s.de).join(" ");
  const tokens = fullText.split(/\s+/).filter(Boolean);

  // 1. Cloze test: pick 5-8 clean alphabetic words (length >= 4)
  const cleanCandidates = tokens
    .map((tok, idx) => ({
      idx,
      raw: tok,
      clean: tok.replace(/[.,!?;:„“"()]/g, "")
    }))
    .filter((t) => /^[A-Za-zÄÖÜäöüß]{4,}$/.test(t.clean));

  const targetBlanksCount = Math.min(
    8,
    Math.max(5, Math.floor(cleanCandidates.length / 4))
  );

  if (cleanCandidates.length >= 5) {
    const chosenIndices = new Set<number>();
    const chosenBlanks = shuffleArray(cleanCandidates, rng)
      .filter((c) => {
        // Avoid duplicate answers in the same cloze if possible
        return true;
      })
      .slice(0, targetBlanksCount)
      .sort((a, b) => a.idx - b.idx);

    chosenBlanks.forEach((b) => chosenIndices.add(b.idx));

    const allCandidateWords = cleanCandidates.map((c) => c.clean);
    const segments: string[] = [];
    const blanks: ClozeBlank[] = [];
    let currentSegment: string[] = [];
    let blankOrder = 0;

    tokens.forEach((tok, idx) => {
      const match = chosenBlanks.find((b) => b.idx === idx);
      if (match) {
        const trailingPunct = tok.slice(match.clean.length);
        segments.push(currentSegment.join(" "));
        currentSegment = trailingPunct ? [trailingPunct] : [];
        const distractors = pickUniqueDistractors(
          match.clean,
          allCandidateWords,
          3,
          rng
        );
        blanks.push({
          index: blankOrder++,
          answer: match.clean,
          options: buildShuffledOptions(match.clean, distractors, 4, rng)
        });
      } else {
        currentSegment.push(tok);
      }
    });
    segments.push(currentSegment.join(" "));

    if (blanks.length >= 5) {
      results.push({
        id: `q-s-cloze-${passage.id}`,
        itemId: passage.id,
        source: "story",
        type: "story_cloze",
        level: passage.level,
        topic: passage.category || "Reading Comprehension",
        passageTitle: passage.titleDe,
        prompt: `Fill in the ${blanks.length} missing words in "${passage.titleDe}"`,
        clozeSegments: segments,
        clozeBlanks: blanks,
        correctAnswer: blanks.map((b) => b.answer).join(" | "),
        explanation: `Complete text: "${passage.sentences[0].de}"`,
        lessonLink: {
          route: "/(tabs)/read",
          label: `Open ${passage.level} Story`,
          level: passage.level
        }
      });
    }
  }

  // 2. Comprehension (True/False + Multiple Choice about the text)
  const firstSentence = passage.sentences[0];
  const otherPassages = allPassages.filter((p) => p.id !== passage.id);

  if (firstSentence?.en && otherPassages.length >= 3) {
    const wrongSummaries = shuffleArray(otherPassages, rng)
      .slice(0, 3)
      .map((p) => p.sentences[0]?.en)
      .filter((s): s is string => Boolean(s));

    if (wrongSummaries.length >= 2) {
      results.push({
        id: `q-s-comp-mc-${passage.id}`,
        itemId: passage.id,
        source: "story",
        type: "story_comprehension",
        level: passage.level,
        topic: passage.category || "Reading Comprehension",
        passageTitle: passage.titleDe,
        passageExcerpt: passage.sentences.slice(0, 3).map((s) => s.de).join(" "),
        prompt: `Which statement is true about "${passage.titleDe}"?`,
        options: buildShuffledOptions(firstSentence.en, wrongSummaries, 4, rng),
        correctAnswer: firstSentence.en,
        explanation: `In the passage: "${firstSentence.de}" (${firstSentence.en}).`,
        lessonLink: {
          route: "/(tabs)/read",
          label: `Open ${passage.level} Story`,
          level: passage.level
        }
      });
    }

    // True / False question
    const isTrueStatement = rng() >= 0.45;
    const falseSample = otherPassages[0]?.sentences[0]?.en;
    if (isTrueStatement || !falseSample) {
      results.push({
        id: `q-s-comp-tf-${passage.id}`,
        itemId: passage.id,
        source: "story",
        type: "story_comprehension",
        level: passage.level,
        topic: passage.category || "Reading Comprehension",
        passageTitle: passage.titleDe,
        passageExcerpt: passage.sentences.slice(0, 2).map((s) => s.de).join(" "),
        prompt: `True or False: "${firstSentence.en}"`,
        options: shuffleArray(["True", "False"], rng),
        correctAnswer: "True",
        explanation: `True — the text says: "${firstSentence.de}".`,
        lessonLink: {
          route: "/(tabs)/read",
          label: `Open ${passage.level} Story`,
          level: passage.level
        }
      });
    } else {
      results.push({
        id: `q-s-comp-tf-${passage.id}`,
        itemId: passage.id,
        source: "story",
        type: "story_comprehension",
        level: passage.level,
        topic: passage.category || "Reading Comprehension",
        passageTitle: passage.titleDe,
        passageExcerpt: passage.sentences.slice(0, 2).map((s) => s.de).join(" "),
        prompt: `True or False: "${falseSample}"`,
        options: shuffleArray(["True", "False"], rng),
        correctAnswer: "False",
        explanation: `False — this passage actually describes: "${firstSentence.en}".`,
        lessonLink: {
          route: "/(tabs)/read",
          label: `Open ${passage.level} Story`,
          level: passage.level
        }
      });
    }
  }

  // 3. Vocabulary in Context from passage.dictionary
  const dictEntries = Object.values(passage.dictionary || {});
  const allMeanings = dictEntries.map((d) => d.english).filter(Boolean);
  for (const entry of dictEntries.slice(0, 4)) {
    if (!entry.surface || !entry.english) continue;
    const distractorMeanings = pickUniqueDistractors(
      entry.english,
      [
        ...allMeanings,
        ...VOCABULARY_ITEMS.slice(0, 60).map((v) => v.english)
      ],
      3,
      rng
    );
    if (distractorMeanings.length < 2) continue;

    results.push({
      id: `q-s-ctx-${passage.id}-${entry.surface}`,
      itemId: `${passage.id}::${entry.lemma || entry.surface}`,
      source: "story",
      type: "story_vocab_context",
      level: passage.level,
      topic: passage.category || "Vocabulary in Context",
      passageTitle: passage.titleDe,
      passageExcerpt: entry.exampleDe || firstSentence.de,
      prompt: `What does "${entry.surface}" mean in this sentence?`,
      deHint: entry.lemma || entry.surface,
      options: buildShuffledOptions(entry.english, distractorMeanings, 4, rng),
      correctAnswer: entry.english,
      explanation: `"${entry.surface}" (${entry.partOfSpeech}) means "${entry.english}".`,
      explanationBn: `"${entry.surface}" (${entry.partOfSpeech}) অর্থ "${entry.bangla}"।`,
      lessonLink: {
        route: "/(tabs)/read",
        label: `Open ${passage.level} Story`,
        level: passage.level
      }
    });
  }

  return results;
}

export function generateStoryQuestions(
  options: {
    level?: CEFRLevel | "ALL";
    passages?: readonly ReadingPassage[];
    rng?: () => number;
    maxPassages?: number;
    targetItemIds?: Set<string>;
  } = {}
): PracticeQuestion[] {
  const {
    level = "ALL",
    passages = READING_PASSAGES,
    rng = Math.random,
    maxPassages,
    targetItemIds
  } = options;
  let filtered = filterByLevel(passages, level);
  if (targetItemIds) {
    filtered = filtered.filter(
      (p) =>
        targetItemIds.has(p.id) ||
        Array.from(targetItemIds).some((id) => id.startsWith(`${p.id}::`))
    );
  } else if (maxPassages && filtered.length > maxPassages) {
    filtered = shuffleArray(filtered, rng).slice(0, maxPassages);
  }
  const questions: PracticeQuestion[] = [];
  for (const p of filtered) {
    questions.push(...buildQuestionsForPassage(p, passages, rng));
  }
  return questions;
}
