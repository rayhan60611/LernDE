export interface AnswerCheckOptions {
  /** Whether ae/oe/ue/ss ASCII fallbacks are accepted for ä/ö/ü/ß (default: true). */
  acceptUmlautFallback?: boolean;
}

export interface AnswerCheckResult {
  correct: boolean;
  usedUmlautFallback: boolean;
}

function normalizeWhitespaceAndCase(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function toAsciiUmlautFallback(value: string): string {
  return value
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

/**
 * Checks a user's typed answer against the expected German/meaning answer.
 * - Ignores leading/trailing spaces and capitalization differences.
 * - Treats umlauts (ä, ö, ü, ß) as strictly required unless `acceptUmlautFallback` is enabled
 *   (in which case ae/oe/ue/ss is accepted and `usedUmlautFallback` is flagged).
 */
export function checkTypingAnswer(
  userInput: string,
  expectedAnswer: string,
  options: AnswerCheckOptions = {}
): AnswerCheckResult {
  const { acceptUmlautFallback = false } = options;
  const normUser = normalizeWhitespaceAndCase(userInput);
  const normExpected = normalizeWhitespaceAndCase(expectedAnswer);

  if (!normUser || !normExpected) {
    return { correct: false, usedUmlautFallback: false };
  }

  if (normUser === normExpected) {
    return { correct: true, usedUmlautFallback: false };
  }

  if (acceptUmlautFallback) {
    const asciiUser = toAsciiUmlautFallback(normUser);
    const asciiExpected = toAsciiUmlautFallback(normExpected);
    if (asciiUser === asciiExpected) {
      return { correct: true, usedUmlautFallback: true };
    }
  }

  return { correct: false, usedUmlautFallback: false };
}

/**
 * Checks exact/normalized option equality for MC, fill-blank, sentence builder, etc.
 */
export function checkExactAnswer(userAnswer: string, expectedAnswer: string): boolean {
  return normalizeWhitespaceAndCase(userAnswer) === normalizeWhitespaceAndCase(expectedAnswer);
}
