import React, { useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";
import { ArrowLeft, Flame, Heart, Zap } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { CEFRLevel } from "../../types";
import { BlastPressable } from "../../components/motion/BlastPressable";
import { playFeedbackSound } from "../../utils/soundEffects";
import { buildQuickPracticeSession } from "../engine/selector";
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
import { Timer } from "../components/Timer";

interface GameModeProps {
  storageState: PracticeStorageState;
  onStorageUpdated: (next: PracticeStorageState) => void;
  onReviewMistakes: () => void;
  onBack: () => void;
}

function buildEscalatingGameDeck(attempts: AttemptRecord[]): PracticeQuestion[] {
  const levels: CEFRLevel[] = ["A1", "A2", "B1", "B2"];
  let deck: PracticeQuestion[] = [];
  for (const lvl of levels) {
    deck = deck.concat(
      buildQuickPracticeSession({
        source: "all",
        level: lvl,
        count: 4,
        attempts
      })
    );
  }
  return deck;
}

export const GameMode: React.FC<GameModeProps> = ({
  storageState,
  onStorageUpdated,
  onReviewMistakes,
  onBack
}) => {
  const { themeMode, addXP } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";

  const [speedRound, setSpeedRound] = useState(true);
  const [questions, setQuestions] = useState<PracticeQuestion[]>(() =>
    buildEscalatingGameDeck(storageState.attempts)
  );
  const [idx, setIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [draft, setDraft] = useState<AnswerDraftState>(EMPTY_ANSWER_DRAFT);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [finished, setFinished] = useState(false);

  const startRef = useRef<number>(Date.now());
  const qStartRef = useRef<number>(Date.now());

  const restartGame = () => {
    setQuestions(buildEscalatingGameDeck(storageState.attempts));
    setIdx(0);
    setLives(3);
    setStreak(0);
    setXpEarned(0);
    setDraft(EMPTY_ANSWER_DRAFT);
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts([]);
    setFinished(false);
    startRef.current = Date.now();
    qStartRef.current = Date.now();
  };

  const currentQuestion = questions[idx];

  const handleAnswerResult = useCallback(
    async (ok: boolean) => {
      if (!currentQuestion || showFeedback) return;
      playFeedbackSound(ok);
      setIsCorrect(ok);
      setShowFeedback(true);

      const nextLives = ok ? lives : lives - 1;
      setLives(nextLives);
      const nextStreak = ok ? streak + 1 : 0;
      setStreak(nextStreak);

      const earned = ok ? 6 + Math.min(10, nextStreak * 2) : 0;
      if (earned > 0) {
        setXpEarned((prev) => prev + earned);
        addXP(earned);
      }

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
    },
    [currentQuestion, showFeedback, lives, streak, addXP, onStorageUpdated]
  );

  if (finished || !currentQuestion) {
    const elapsedSeconds = Math.round((Date.now() - startRef.current) / 1000);
    return (
      <ResultsScreen
        title={lives <= 0 ? "Game Over! (0 Lives Left)" : "Game Mode Victory!"}
        attempts={attempts}
        questions={questions}
        elapsedSeconds={elapsedSeconds}
        xpEarned={xpEarned}
        onRetry={restartGame}
        onReviewMistakes={onReviewMistakes}
        onBackToPractice={onBack}
      />
    );
  }

  const canSubmit = canSubmitAnswerDraft(currentQuestion, draft);

  const handleSubmit = () => {
    if (!canSubmit || showFeedback) return;
    const ok = evaluateAnswerDraft(currentQuestion, draft);
    handleAnswerResult(ok);
  };

  const handleNext = () => {
    if (lives <= 0 || idx + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIdx((prev) => prev + 1);
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
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8
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
            Exit
          </Text>
        </BlastPressable>

        {/* Lives */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {[1, 2, 3].map((n) => (
            <Heart
              key={n}
              size={18}
              color="#EF4444"
              fill={n <= lives ? "#EF4444" : "transparent"}
            />
          ))}
        </View>

        {/* Streak & Speed Round Toggle */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Flame size={16} color="#F97316" />
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_700Bold",
                color: "#F97316"
              }}
            >
              {streak}
            </Text>
          </View>

          <BlastPressable
            onPress={() => setSpeedRound((p) => !p)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingHorizontal: 9,
              paddingVertical: 5,
              borderRadius: 999,
              backgroundColor: speedRound ? "#D97706" : isDark ? "#082E22" : "#E2F2EC"
            }}
          >
            <Zap size={12} color={speedRound ? "#FFFFFF" : "#64748B"} />
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Inter_700Bold",
                color: speedRound ? "#FFFFFF" : "#64748B"
              }}
            >
              Speed
            </Text>
          </BlastPressable>

          {speedRound && (
            <Timer
              initialSeconds={18}
              running={!showFeedback && !finished}
              resetKey={`${idx}-${currentQuestion.id}`}
              compact={true}
              onExpire={() => handleAnswerResult(false)}
            />
          )}
        </View>
      </View>

      <ProgressBar current={idx + 1} total={questions.length} />

      <QuestionCard
        question={currentQuestion}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
        onNext={handleNext}
        nextLabel={
          lives <= 0
            ? "See Game Results"
            : idx + 1 >= questions.length
            ? "Claim Victory 🎉"
            : "Next Challenge →"
        }
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
