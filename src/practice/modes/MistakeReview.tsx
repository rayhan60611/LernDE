import React, { useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { ArrowLeft, CheckCircle2 } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { MaterialGlassCard } from "../../components/common/MaterialGlassCard";
import { BlastPressable } from "../../components/motion/BlastPressable";
import { playFeedbackSound } from "../../utils/soundEffects";
import {
  generateGrammarQuestions,
  generateStoryQuestions,
  generateWordQuestions
} from "../engine/generators";
import { shuffleArray } from "../engine/seededRandom";
import {
  getMistakeQuestionIds,
  recordPracticeAttempt
} from "../storage/practiceStorage";
import { AttemptRecord, PracticeStorageState } from "../types";
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

interface MistakeReviewProps {
  storageState: PracticeStorageState;
  onStorageUpdated: (next: PracticeStorageState) => void;
  onBack: () => void;
}

export const MistakeReview: React.FC<MistakeReviewProps> = ({
  storageState,
  onStorageUpdated,
  onBack
}) => {
  const { themeMode, addXP } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isPink = themeMode === "pink";
  const accent = isPink ? "#DB2777" : "#0B6B4F";

  const mistakeQuestions = useMemo(() => {
    const wrongIds = new Set(getMistakeQuestionIds(storageState.attempts));
    if (wrongIds.size === 0) return [];
    const targetItemIds = new Set(
      storageState.attempts
        .filter((a) => wrongIds.has(a.questionId))
        .map((a) => a.itemId)
    );
    const fullPool = [
      ...generateWordQuestions({ includeMatching: false, targetItemIds }),
      ...generateGrammarQuestions(),
      ...generateStoryQuestions({ targetItemIds })
    ];
    return shuffleArray(fullPool.filter((q) => wrongIds.has(q.id))).slice(0, 15);
  }, [storageState.attempts]);

  const [idx, setIdx] = useState(0);
  const [draft, setDraft] = useState<AnswerDraftState>(EMPTY_ANSWER_DRAFT);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [finished, setFinished] = useState(false);

  const startRef = useRef<number>(Date.now());
  const qStartRef = useRef<number>(Date.now());

  if (mistakeQuestions.length === 0) {
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

        <MaterialGlassCard borderRadius={22} padding={22} accentColor="#16A34A">
          <View style={{ alignItems: "center", gap: 10 }}>
            <CheckCircle2 size={42} color="#16A34A" />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#F0FDF9" : "#062E22",
                textAlign: "center"
              }}
            >
              No mistakes to review yet!
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_500Medium",
                color: isDark ? "#94A3B8" : "#64748B",
                textAlign: "center"
              }}
            >
              Any questions you miss in Quick Practice, Exam Mode, or Game Mode will appear here automatically.
            </Text>
            <BlastPressable
              onPress={onBack}
              style={{
                marginTop: 6,
                backgroundColor: accent,
                paddingHorizontal: 22,
                paddingVertical: 11,
                borderRadius: 999
              }}
            >
              <Text style={{ fontFamily: "Inter_700Bold", color: "#FFFFFF" }}>
                Back to Practice
              </Text>
            </BlastPressable>
          </View>
        </MaterialGlassCard>
      </View>
    );
  }

  if (finished) {
    const elapsedSeconds = Math.round((Date.now() - startRef.current) / 1000);
    return (
      <ResultsScreen
        title="Mistake Review Complete!"
        attempts={attempts}
        questions={mistakeQuestions}
        elapsedSeconds={elapsedSeconds}
        xpEarned={xpEarned}
        onRetry={() => {
          setIdx(0);
          setDraft(EMPTY_ANSWER_DRAFT);
          setShowFeedback(false);
          setAttempts([]);
          setXpEarned(0);
          setFinished(false);
          startRef.current = Date.now();
        }}
        onBackToPractice={onBack}
      />
    );
  }

  const currentQuestion = mistakeQuestions[idx];
  const canSubmit = canSubmitAnswerDraft(currentQuestion, draft);

  const handleSubmit = async () => {
    if (!canSubmit || showFeedback) return;
    const ok = evaluateAnswerDraft(currentQuestion, draft);
    playFeedbackSound(ok);
    setIsCorrect(ok);
    setShowFeedback(true);

    const earned = ok ? 6 : 1;
    setXpEarned((p) => p + earned);
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
      timeMs: Date.now() - qStartRef.current
    };
    setAttempts((prev) => [...prev, record]);
    const nextStorage = await recordPracticeAttempt(record, earned);
    onStorageUpdated(nextStorage);
  };

  const handleNext = () => {
    if (idx + 1 >= mistakeQuestions.length) {
      setFinished(true);
      return;
    }
    setIdx((p) => p + 1);
    setDraft(EMPTY_ANSWER_DRAFT);
    setShowFeedback(false);
    setIsCorrect(false);
    qStartRef.current = Date.now();
  };

  return (
    <View style={{ gap: 12 }}>
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
            fontSize: 12.5,
            fontFamily: "Inter_700Bold",
            color: isDark ? "#F0FDF9" : "#062E22"
          }}
        >
          Back
        </Text>
      </BlastPressable>

      <ProgressBar current={idx + 1} total={mistakeQuestions.length} />

      <QuestionCard
        question={currentQuestion}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
        onNext={handleNext}
        nextLabel={idx + 1 >= mistakeQuestions.length ? "Finish Review 🎉" : "Next Mistake →"}
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
