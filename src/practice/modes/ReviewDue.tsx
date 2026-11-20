import React, { useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { ArrowLeft, CalendarCheck, Layers } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { MaterialGlassCard } from "../../components/common/MaterialGlassCard";
import { BlastPressable } from "../../components/motion/BlastPressable";
import { playFeedbackSound } from "../../utils/soundEffects";
import {
  generateGrammarQuestions,
  generateStoryQuestions,
  generateWordQuestions
} from "../engine/generators";
import { getDueLeitnerItems, LEITNER_INTERVAL_DAYS } from "../engine/leitner";
import { recordPracticeAttempt } from "../storage/practiceStorage";
import { AttemptRecord, PracticeQuestion, PracticeStorageState } from "../types";
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

interface ReviewDueProps {
  storageState: PracticeStorageState;
  onStorageUpdated: (next: PracticeStorageState) => void;
  onBack: () => void;
}

export const ReviewDue: React.FC<ReviewDueProps> = ({
  storageState,
  onStorageUpdated,
  onBack
}) => {
  const { themeMode, addXP } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isPink = themeMode === "pink";
  const accent = isPink ? "#DB2777" : "#0B6B4F";

  const dueItems = useMemo(
    () => getDueLeitnerItems(storageState.leitner),
    [storageState.leitner]
  );

  const dueQuestions = useMemo(() => {
    if (dueItems.length === 0) return [];
    const dueSet = new Set(dueItems.map((d) => d.itemId));
    const pool = [
      ...generateWordQuestions({ includeMatching: false, targetItemIds: dueSet }),
      ...generateGrammarQuestions(),
      ...generateStoryQuestions({ targetItemIds: dueSet })
    ];
    const pickedByItem = new Map<string, PracticeQuestion>();
    for (const q of pool) {
      if (dueSet.has(q.itemId) && !pickedByItem.has(q.itemId)) {
        pickedByItem.set(q.itemId, q);
      }
    }
    return dueItems
      .map((d) => pickedByItem.get(d.itemId))
      .filter((q): q is PracticeQuestion => Boolean(q))
      .slice(0, 15);
  }, [dueItems]);

  const [idx, setIdx] = useState(0);
  const [draft, setDraft] = useState<AnswerDraftState>(EMPTY_ANSWER_DRAFT);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [finished, setFinished] = useState(false);

  const startRef = useRef<number>(Date.now());
  const qStartRef = useRef<number>(Date.now());

  if (dueQuestions.length === 0) {
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

        <MaterialGlassCard borderRadius={22} padding={22} accentColor="#0D9488">
          <View style={{ alignItems: "center", gap: 10 }}>
            <CalendarCheck size={42} color="#0D9488" />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#F0FDF9" : "#062E22",
                textAlign: "center"
              }}
            >
              Nothing due for review today!
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_500Medium",
                color: isDark ? "#94A3B8" : "#64748B",
                textAlign: "center"
              }}
            >
              Your 5-box Leitner spaced repetition queue is all caught up. Complete Quick Practice or Exam sessions to schedule items.
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
        title="Spaced Repetition Review Complete!"
        attempts={attempts}
        questions={dueQuestions}
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

  const currentQuestion = dueQuestions[idx];
  const leitnerInfo = storageState.leitner[currentQuestion.itemId];
  const boxNumber = leitnerInfo?.box ?? 1;
  const canSubmit = canSubmitAnswerDraft(currentQuestion, draft);

  const handleSubmit = async () => {
    if (!canSubmit || showFeedback) return;
    const ok = evaluateAnswerDraft(currentQuestion, draft);
    playFeedbackSound(ok);
    setIsCorrect(ok);
    setShowFeedback(true);

    const earned = ok ? 5 : 1;
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
    if (idx + 1 >= dueQuestions.length) {
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <BlastPressable
          onPress={onBack}
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
            Back
          </Text>
        </BlastPressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 999,
            backgroundColor: isDark ? "#082E22" : "#E2F2EC"
          }}
        >
          <Layers size={13} color="#0D9488" />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_700Bold",
              color: "#0D9488"
            }}
          >
            Leitner Box {boxNumber}/5 ({LEITNER_INTERVAL_DAYS[boxNumber]}d)
          </Text>
        </View>
      </View>

      <ProgressBar current={idx + 1} total={dueQuestions.length} />

      <QuestionCard
        question={currentQuestion}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
        onNext={handleNext}
        nextLabel={idx + 1 >= dueQuestions.length ? "Finish Due Review 🎉" : "Next Due Item →"}
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
