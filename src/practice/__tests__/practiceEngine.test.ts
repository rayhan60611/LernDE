import test from "node:test";
import assert from "node:assert/strict";
import { hashStringToSeed, mulberry32, shuffleArray } from "../engine/seededRandom";
import {
  buildShuffledOptions,
  pickUniqueDistractors
} from "../engine/distractors";
import {
  getDueLeitnerItems,
  isLeitnerItemDue,
  LEITNER_INTERVAL_DAYS,
  updateLeitnerBox
} from "../engine/leitner";
import { checkExactAnswer, checkTypingAnswer } from "../engine/answerChecker";

test("seeded randomness: same seed produces identical sequences and shuffles", () => {
  const rngA = mulberry32(hashStringToSeed("exam-1"));
  const rngB = mulberry32(hashStringToSeed("exam-1"));
  const rngDifferent = mulberry32(hashStringToSeed("exam-2"));

  const seqA = Array.from({ length: 10 }, () => rngA());
  const seqB = Array.from({ length: 10 }, () => rngB());
  const seqDiff = Array.from({ length: 10 }, () => rngDifferent());

  assert.deepEqual(seqA, seqB);
  assert.notDeepEqual(seqA, seqDiff);

  const items = ["der", "die", "das", "ein", "eine", "kein"];
  const s1 = shuffleArray(items, mulberry32(42));
  const s2 = shuffleArray(items, mulberry32(42));
  assert.deepEqual(s1, s2);
});

test("distractor generation: no duplicates and never includes the correct answer", () => {
  const answer = "Tisch";
  const pool = [
    "Tisch",
    "tisch",
    "  Tisch ",
    "Stuhl",
    "Stuhl",
    "Lampe",
    "Buch",
    "Fenster"
  ];

  const distractors = pickUniqueDistractors(answer, pool, 3, mulberry32(7));
  assert.equal(distractors.length, 3);
  assert.equal(new Set(distractors.map((d) => d.toLowerCase())).size, 3);
  assert.ok(!distractors.some((d) => d.toLowerCase() === answer.toLowerCase()));

  const options = buildShuffledOptions(answer, pool, 4, mulberry32(7));
  assert.equal(options.length, 4);
  assert.equal(new Set(options.map((o) => o.toLowerCase())).size, 4);
  assert.ok(options.includes(answer));
});

test("Leitner system: correct moves up 1 box (max 5) and wrong resets to box 1", () => {
  const today = "2026-11-18";

  const b2 = updateLeitnerBox(undefined, "w-1", true, today);
  assert.equal(b2.box, 2);
  assert.equal(LEITNER_INTERVAL_DAYS[2], 2);
  assert.equal(b2.nextReviewDate, "2026-11-20");

  const b3 = updateLeitnerBox(b2, "w-1", true, today);
  assert.equal(b3.box, 3);
  assert.equal(b3.nextReviewDate, "2026-11-22");

  const b4 = updateLeitnerBox(b3, "w-1", true, today);
  assert.equal(b4.box, 4);
  assert.equal(b4.nextReviewDate, "2026-11-26");

  const b5 = updateLeitnerBox(b4, "w-1", true, today);
  assert.equal(b5.box, 5);
  assert.equal(b5.nextReviewDate, "2026-12-04");

  // Cap at box 5
  const stillB5 = updateLeitnerBox(b5, "w-1", true, today);
  assert.equal(stillB5.box, 5);

  // Wrong answer sends back to box 1
  const resetB1 = updateLeitnerBox(b5, "w-1", false, today);
  assert.equal(resetB1.box, 1);
  assert.equal(resetB1.nextReviewDate, "2026-11-19");

  assert.equal(isLeitnerItemDue(resetB1, "2026-11-18"), false);
  assert.equal(isLeitnerItemDue(resetB1, "2026-11-19"), true);

  const due = getDueLeitnerItems({ "w-1": resetB1, "w-2": b5 }, "2026-11-19");
  assert.deepEqual(
    due.map((d) => d.itemId),
    ["w-1"]
  );
});

test("answer checking: trims whitespace/case and handles strict umlauts vs fallback", () => {
  assert.equal(checkExactAnswer("  Gehe ", "gehe"), true);
  assert.equal(checkExactAnswer("der", "die"), false);

  // Strict umlauts when fallback disabled
  const strictFail = checkTypingAnswer("  schoen ", "schön", {
    acceptUmlautFallback: false
  });
  assert.equal(strictFail.correct, false);

  const strictPass = checkTypingAnswer("  SCHÖN ", "schön", {
    acceptUmlautFallback: false
  });
  assert.equal(strictPass.correct, true);
  assert.equal(strictPass.usedUmlautFallback, false);

  // Fallback accepted when enabled
  const fallbackPass = checkTypingAnswer("schoen", "schön", {
    acceptUmlautFallback: true
  });
  assert.equal(fallbackPass.correct, true);
  assert.equal(fallbackPass.usedUmlautFallback, true);
});
