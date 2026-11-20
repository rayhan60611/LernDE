import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { ArrowLeft, Play } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { CEFRLevel } from "../../types";
import { MaterialGlassCard } from "../../components/common/MaterialGlassCard";
import { BlastPressable } from "../../components/motion/BlastPressable";
import { playFeedbackSound } from "../../utils/soundEffects";
import { buildQuickPracticeSession } from "../engine/selector";
import { recordPracticeAttempt } from "../storage/practiceStorage";
import {
  AttemptRecord,
  PracticeQuestion,
  PracticeStorageState,
  QuestionSource
} from "../types";
import { ProgressBar } from "../components/ProgressBar";
import { QuestionCard } from "../components/QuestionCard";
import {
  AnswerDraftState,
  canSubmitAnswerDraft,
  EMPTY_ANSWER_DRAFT,
  evaluateAnswerDraft,
  formatUserAnswerDraft,
  QuestionInput
} from "../components/QuestionInput";
import { ResultsScreen } from "../components/ResultsScreen";

interface QuickPracticeProps {
  storageState: PracticeStorageState;
  onStorageUpdated: (next: PracticeStorageState) => void;
  onReviewMistakes: () => void;
  onBack: () => void;
}

export const QuickPractice: React.FC<QuickPracticeProps> = ({
  storageState,
  onStorageUpdated,
  onReviewMistakes,
  onBack
}) => {
  const { themeMode, addXP } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isPink = themeMode === "pink";
  const accent = isPink ? "#DB2777" : "#0B6B4F";

  const [source, setSource] = useState<QuestionSource | "all">("all");
  const [level, setLevel] = useState<CEFRLevel | "ALL">("ALL");
  const [count, setCount] = useState<5 | 8 | 10>(8);

  const [questions, setQuestions] = useState<PracticeQuestion[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [draft, setDraft] = useState<AnswerDraftState>(EMPTY_ANSWER_DRAFT);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionAttempts, setSessionAttempts] = useState<AttemptRecord[]>([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [finished, setFinished] = useState(false);

  const sessionStartRef = useRef<number>(Date.now());
  const questionStartRef = useRef<number>(Date.now());

  const startSession = () => {
    const picked = buildQuickPracticeSession({
      source,
      level,
      count,
      attempts: storageState.attempts
    });
    setQuestions(picked);
    setIdx(0);
    setDraft(EMPTY_ANSWER_DRAFT);
    setShowFeedback(false);
    setIsCorrect(false);
    setSessionAttempts([]);
    setXpEarned(0);
    setFinished(false);
    sessionStartRef.current = Date.now();
    questionStartRef.current = Date.now();
  };

  if (!questions) {
    return (
      <View style={{ gap: 14 }}>
        <BlastPressable
          onPress={onBack}
          style={{
            alignSelf: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderRadius: 999,
            backgroundColor: isDark ? "#082E22" : "#FFFFFF"
          }}
        >
          <ArrowLeft size={15} color={isDark ? "#F0FDF9" : "#062E22"} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#F0FDF9" : "#062E22"
            }}
          >
            Back to Practice
          </Text>
        </BlastPressable>

        <MaterialGlassCard borderRadius={22} padding={18} watermarkText="quick practice">
          <Text
            style={{
              fontSize: 19,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#F0FDF9" : "#062E22",
              marginBottom: 4
            }}
          >
            Quick Practice
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Inter_500Medium",
              color: isDark ? "#94A3B8" : "#64748B",
              marginBottom: 16
            }}
          >
            Pick your content source, CEFR level, and length (5–10 questions) with instant feedback.
          </Text>

          {/* Source Filter */}
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#A7F3D0" : "#0B6B4F",
              marginBottom: 6
            }}
          >
            Content Source
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {(
              [
                { key: "all", label: "All Mix" },
                { key: "words", label: "Words" },
                { key: "grammar", label: "Grammar" },
                { key: "story", label: "Story" }
              ] as const
            ).map((opt) => {
              const active = source === opt.key;
              return (
                <BlastPressable
                  key={opt.key}
                  onPress={() => setSource(opt.key)}
                  style={{
                    paddingHorizontal: 13,
                    paddingVertical: 8,
                    borderRadius: 999,
                    backgroundColor: active
                      ? accent
                      : isDark
                      ? "#052219"
                      : "#FFFFFF",
                    borderWidth: 1.5,
                    borderColor: active ? "#FFCE00" : isDark ? "#134E3A" : "#C6E4D9"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Inter_700Bold",
                      color: active ? "#FFFFFF" : isDark ? "#D6EFE6" : "#062E22"
                    }}
                  >
                    {opt.label}
                  </Text>
                </BlastPressable>
              );
            })}
          </View>

          {/* Level Filter */}
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#A7F3D0" : "#0B6B4F",
              marginBottom: 6
            }}
          >
            CEFR Level
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {(["ALL", "A1", "A2", "B1", "B2"] as const).map((lvl) => {
              const active = level === lvl;
              return (
                <BlastPressable
                  key={lvl}
                  onPress={() => setLevel(lvl)}
                  style={{
                    paddingHorizontal: 13,
                    paddingVertical: 8,
                    borderRadius: 999,
                    backgroundColor: active
                      ? accent
                      : isDark
                      ? "#052219"
                      : "#FFFFFF",
                    borderWidth: 1.5,
                    borderColor: active ? "#FFCE00" : isDark ? "#134E3A" : "#C6E4D9"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Inter_700Bold",
                      color: active ? "#FFFFFF" : isDark ? "#D6EFE6" : "#062E22"
                    }}
                  >
                    {lvl === "ALL" ? "All Levels" : lvl}
                  </Text>
                </BlastPressable>
              );
            })}
          </View>

          {/* Question Count */}
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#A7F3D0" : "#0B6B4F",
              marginBottom: 6
            }}
          >
            Questions
          </Text>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 18 }}>
            {([5, 8, 10] as const).map((n) => {
              const active = count === n;
              return (
                <BlastPressable
                  key={n}
                  onPress={() => setCount(n)}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 12,
                    alignItems: "center",
                    backgroundColor: active
                      ? accent
                      : isDark
                      ? "#052219"
                      : "#FFFFFF",
                    borderWidth: 1.5,
                    borderColor: active ? "#FFCE00" : isDark ? "#134E3A" : "#C6E4D9"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Inter_700Bold",
                      color: active ? "#FFFFFF" : isDark ? "#D6EFE6" : "#062E22"
                    }}
                  >
                    {n} Questions
                  </Text>
                </BlastPressable>
              );
            })}
          </View>

          <BlastPressable
            onPress={startSession}
            style={{
              backgroundColor: accent,
              paddingVertical: 15,
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              borderWidth: 1.5,
              borderColor: "#FFCE00"
            }}
          >
            <Play size={17} color="#FFFFFF" fill="#FFFFFF" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Inter_700Bold",
                color: "#FFFFFF"
              }}
            >
              Start Quick Practice
            </Text>
          </BlastPressable>
        </MaterialGlassCard>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <MaterialGlassCard borderRadius={22} padding={20}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Inter_700Bold",
            color: isDark ? "#F0FDF9" : "#062E22",
            marginBottom: 8
          }}
        >
          Not enough questions for this filter
        </Text>
        <BlastPressable
          onPress={() => setQuestions(null)}
          style={{
            backgroundColor: accent,
            paddingVertical: 12,
            borderRadius: 14,
            alignItems: "center"
          }}
        >
          <Text style={{ fontFamily: "Inter_700Bold", color: "#FFFFFF" }}>
            Change Filters
          </Text>
        </BlastPressable>
      </MaterialGlassCard>
    );
  }

  if (finished) {
    const elapsedSeconds = Math.round((Date.now() - sessionStartRef.current) / 1000);
    return (
      <ResultsScreen
        title="Quick Practice Complete!"
        attempts={sessionAttempts}
        questions={questions}
        elapsedSeconds={elapsedSeconds}
        xpEarned={xpEarned}
        onRetry={startSession}
        onReviewMistakes={onReviewMistakes}
        onBackToPractice={onBack}
      />
    );
  }

  const currentQuestion = questions[idx];
  const canSubmit = canSubmitAnswerDraft(currentQuestion, draft);

  const handleSubmit = async () => {
    if (!canSubmit || showFeedback) return;
    const ok = evaluateAnswerDraft(currentQuestion, draft);
    playFeedbackSound(ok);
    setIsCorrect(ok);
    setShowFeedback(true);

    const earned = ok ? 5 : 1;
    setXpEarned((prev) => prev + earned);
    addXP(earned);

    const record: AttemptRecord = {
      questionId: currentQuestion.id,
      itemId: currentQuestion.itemId,
      type: currentQuestion.type,
      source: currentQuestion.source,
      topic: currentQuestion.topic,
      level: currentQuestion.level,
      correct: ok,
      userAnswer: formatUserAnswerDraft(currentQuestion, draft),
      answeredAt: new Date().toISOString(),
      timeMs: Date.now() - questionStartRef.current
    };
    setSessionAttempts((prev) => [...prev, record]);
    const nextStorage = await recordPracticeAttempt(record, earned);
    onStorageUpdated(nextStorage);
  };

  const handleNext = () => {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIdx((prev) => prev + 1);
    setDraft(EMPTY_ANSWER_DRAFT);
    setShowFeedback(false);
    setIsCorrect(false);
    questionStartRef.current = Date.now();
  };

  return (
    <View style={{ gap: 14 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <BlastPressable
          onPress={() => setQuestions(null)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderRadius: 999,
            backgroundColor: isDark ? "#082E22" : "#FFFFFF"
          }}
        >
          <ArrowLeft size={15} color={isDark ? "#F0FDF9" : "#062E22"} />
          <Text
            style={{
              fontSize: 12.5,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#F0FDF9" : "#062E22"
            }}
          >
            Quit
          </Text>
        </BlastPressable>

        <Text
          style={{
            fontSize: 12.5,
            fontFamily: "Inter_700Bold",
            color: "#D97706"
          }}
        >
          +{xpEarned} XP
        </Text>
      </View>

      <ProgressBar current={idx + 1} total={questions.length} />

      <QuestionCard
        question={currentQuestion}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
        onNext={handleNext}
        nextLabel={idx + 1 >= questions.length ? "Finish Session 🎉" : "Next Question →"}
      >
        <QuestionInput
          question={currentQuestion}
          draft={draft}
          showFeedback={showFeedback}
          disabled={showFeedback}
          onChangeDraft={setDraft}
          onSubmitTrigger={handleSubmit}
        />
      </QuestionCard>
    </View>
  );
};
