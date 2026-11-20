import React from "react";
import { PracticeQuestion } from "../types";
import { checkExactAnswer, checkTypingAnswer } from "../engine/answerChecker";
import { Cloze } from "./Cloze";
import { Matching } from "./Matching";
import { MultipleChoice } from "./MultipleChoice";
import { SentenceBuilder } from "./SentenceBuilder";
import { TypingQuestion } from "./TypingQuestion";

export interface AnswerDraftState {
  selectedOption: string | null;
  typedText: string;
  builtWords: string[];
  clozeAnswers: Record<number, string>;
  matchingCompleted: boolean;
  matchingFirstTry: boolean;
}

export const EMPTY_ANSWER_DRAFT: AnswerDraftState = {
  selectedOption: null,
  typedText: "",
  builtWords: [],
  clozeAnswers: {},
  matchingCompleted: false,
  matchingFirstTry: true
};

export function canSubmitAnswerDraft(
  question: PracticeQuestion,
  draft: AnswerDraftState
): boolean {
  switch (question.type) {
    case "word_typing":
      return draft.typedText.trim().length > 0;
    case "word_matching":
      return draft.matchingCompleted;
    case "grammar_sentence_builder":
      return draft.builtWords.length > 0;
    case "story_cloze": {
      const blanks = question.clozeBlanks ?? [];
      return (
        blanks.length > 0 &&
        blanks.every((b) => Boolean(draft.clozeAnswers[b.index]))
      );
    }
    default:
      return draft.selectedOption !== null;
  }
}

export function evaluateAnswerDraft(
  question: PracticeQuestion,
  draft: AnswerDraftState
): boolean {
  switch (question.type) {
    case "word_typing":
      return checkTypingAnswer(draft.typedText, question.correctAnswer, {
        acceptUmlautFallback: true
      }).correct;
    case "word_matching":
      return draft.matchingCompleted && draft.matchingFirstTry;
    case "grammar_sentence_builder":
      return checkExactAnswer(
        draft.builtWords.join(" "),
        question.correctAnswer
      );
    case "story_cloze": {
      const blanks = question.clozeBlanks ?? [];
      return (
        blanks.length > 0 &&
        blanks.every((b) =>
          checkExactAnswer(draft.clozeAnswers[b.index] ?? "", b.answer)
        )
      );
    }
    default:
      return checkExactAnswer(draft.selectedOption ?? "", question.correctAnswer);
  }
}

export function formatUserAnswerDraft(
  question: PracticeQuestion,
  draft: AnswerDraftState
): string {
  switch (question.type) {
    case "word_typing":
      return draft.typedText.trim() || "(empty)";
    case "word_matching":
      return draft.matchingFirstTry
        ? "Matched all 5 on first try"
        : "Matched all 5 (with retries)";
    case "grammar_sentence_builder":
      return draft.builtWords.join(" ") || "(empty)";
    case "story_cloze": {
      const blanks = question.clozeBlanks ?? [];
      return blanks
        .map((b) => draft.clozeAnswers[b.index] || "___")
        .join(" | ");
    }
    default:
      return draft.selectedOption ?? "(no answer)";
  }
}

interface QuestionInputProps {
  question: PracticeQuestion;
  draft: AnswerDraftState;
  showFeedback: boolean;
  disabled?: boolean;
  onChangeDraft: (updater: (prev: AnswerDraftState) => AnswerDraftState) => void;
  onSubmitTrigger: () => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  draft,
  showFeedback,
  disabled = false,
  onChangeDraft,
  onSubmitTrigger
}) => {
  switch (question.type) {
    case "word_typing":
      return (
        <TypingQuestion
          value={draft.typedText}
          onChangeText={(txt) =>
            onChangeDraft((prev) => ({ ...prev, typedText: txt }))
          }
          onSubmit={onSubmitTrigger}
          disabled={disabled}
          acceptUmlautFallback={true}
        />
      );

    case "word_matching":
      return (
        <Matching
          pairs={question.matchingPairs ?? []}
          disabled={disabled}
          onComplete={(firstTry) =>
            onChangeDraft((prev) => ({
              ...prev,
              matchingCompleted: true,
              matchingFirstTry: firstTry
            }))
          }
        />
      );

    case "grammar_sentence_builder":
      return (
        <SentenceBuilder
          wordBank={question.wordBank ?? []}
          selectedWords={draft.builtWords}
          onChangeWords={(words) =>
            onChangeDraft((prev) => ({ ...prev, builtWords: words }))
          }
          disabled={disabled}
        />
      );

    case "story_cloze":
      return (
        <Cloze
          segments={question.clozeSegments ?? []}
          blanks={question.clozeBlanks ?? []}
          answers={draft.clozeAnswers}
          onSelectBlankAnswer={(blankIndex, val) =>
            onChangeDraft((prev) => ({
              ...prev,
              clozeAnswers: { ...prev.clozeAnswers, [blankIndex]: val }
            }))
          }
          showFeedback={showFeedback}
          disabled={disabled}
        />
      );

    default:
      return (
        <MultipleChoice
          options={question.options ?? []}
          selectedOption={draft.selectedOption}
          correctAnswer={question.correctAnswer}
          showFeedback={showFeedback}
          disabled={disabled}
          onSelect={(opt) =>
            onChangeDraft((prev) => ({ ...prev, selectedOption: opt }))
          }
        />
      );
  }
};
