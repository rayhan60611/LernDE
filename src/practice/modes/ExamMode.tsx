import React, { useCallback, useRef, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import { ArrowLeft, Award, ShieldCheck } from "lucide-react-native";
import { useApp } from "../../context/AppContext";
import { MaterialGlassCard } from "../../components/common/MaterialGlassCard";
import { BlastPressable } from "../../components/motion/BlastPressable";
import { buildSeededExam, FixedExamDefinition } from "../engine/selector";
import {
  recordExamResult,
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
import { Timer } from "../components/Timer";

const EXAM_PRESETS = [
  { id: "exam-1", title: "Exam 1 • A1 Foundation", level: "A1" as const, durationSeconds: 12 * 60 },
  { id: "exam-2", title: "Exam 2 • A2 Elementary", level: "A2" as const, durationSeconds: 15 * 60 },
  { id: "exam-3", title: "Exam 3 • B1 Intermediate", level: "B1" as const, durationSeconds: 18 * 60 }
];

interface ExamModeProps {
  storageState: PracticeStorageState;
  onStorageUpdated: (next: PracticeStorageState) => void;
  onReviewMistakes: () => void;
  onBack: () => void;
}

export const ExamMode: React.FC<ExamModeProps> = ({
  storageState,
  onStorageUpdated,
  onReviewMistakes,
  onBack
}) => {
  const { themeMode, addXP } = useApp();
  const isDark = themeMode === "dark" || themeMode === "black";
  const isPink = themeMode === "pink";
  const accent = isPink ? "#DB2777" : "#0B6B4F";

  const [activeExam, setActiveExam] = useState<FixedExamDefinition | null>(null);
  const [idx, setIdx] = useState(0);
  const [draft, setDraft] = useState<AnswerDraftState>(EMPTY_ANSWER_DRAFT);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const startRef = useRef<number>(Date.now());
  const qStartRef = useRef<number>(Date.now());

  const startExam = (preset: (typeof EXAM_PRESETS)[number]) => {
    const built = buildSeededExam(
      preset.id,
      preset.title,
      preset.level,
      preset.durationSeconds
    );
    setActiveExam(built);
    setIdx(0);
    setDraft(EMPTY_ANSWER_DRAFT);
    setAttempts([]);
    setFinished(false);
    setXpEarned(0);
    startRef.current = Date.now();
    qStartRef.current = Date.now();
  };

  const finishExam = useCallback(
    async (finalAttempts: AttemptRecord[], exam: FixedExamDefinition) => {
      const correct = finalAttempts.filter((a) => a.correct).length;
      const total = exam.questions.length;
      const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
      const passed = percent >= 60;
      const bonusXP = correct * 5 + (passed ? 25 : 5);
      setXpEarned(bonusXP);
      addXP(bonusXP);

      const next = await recordExamResult({
        examId: exam.id,
        bestPercent: percent,
        bestScore: correct,
        totalQuestions: total,
        passed,
        lastAttemptAt: new Date().toISOString()
      });
      onStorageUpdated(next);
      setFinished(true);
    },
    [addXP, onStorageUpdated]
  );

  const confirmLeaveExam = () => {
    const msg = "Leave exam in progress? Your current exam attempt will be lost.";
    if (Platform.OS === "web" && typeof window !== "undefined") {
      if (window.confirm(msg)) {
        setActiveExam(null);
      }
      return;
    }
    Alert.alert("Leave Exam?", msg, [
      { text: "Stay", style: "cancel" },
      { text: "Leave Exam", style: "destructive", onPress: () => setActiveExam(null) }
    ]);
  };

  if (!activeExam) {
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
              fontSize: 13,
              fontFamily: "Inter_700Bold",
              color: isDark ? "#F0FDF9" : "#062E22"
            }}
          >
            Back to Practice
          </Text>
        </BlastPressable>

        <MaterialGlassCard borderRadius={22} padding={18} watermarkText="exam test">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <ShieldCheck size={20} color="#FFCE00" />
            <Text
              style={{
                fontSize: 19,
                fontFamily: "Inter_700Bold",
                color: isDark ? "#F0FDF9" : "#062E22"
              }}
            >
              Fixed Seeded Exams
            </Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Inter_500Medium",
              color: isDark ? "#94A3B8" : "#64748B",
              marginBottom: 14
            }}
          >
            Each exam has a fixed set of 10 Words + 10 Grammar + 1 Story (up to 5 questions), timed countdown, no hints, and a 60% pass mark.
          </Text>

          <View style={{ gap: 10 }}>
            {EXAM_PRESETS.map((preset) => {
              const best = storageState.bestExamScores[preset.id];
              return (
                <BlastPressable
                  key={preset.id}
                  onPress={() => startExam(preset)}
                  style={{
                    padding: 14,
                    borderRadius: 16,
                    backgroundColor: isDark ? "#052219" : "#FFFFFF",
                    borderWidth: 1.5,
                    borderColor: best?.passed ? "#16A34A" : isDark ? "#134E3A" : "#C6E4D9",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Inter_700Bold",
                        color: isDark ? "#F0FDF9" : "#062E22"
                      }}
                    >
                      {preset.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_500Medium",
                        color: isDark ? "#94A3B8" : "#64748B",
                        marginTop: 2
                      }}
                    >
                      {Math.round(preset.durationSeconds / 60)} min • 25 Questions • Pass: 60%
                    </Text>
                  </View>

                  {best ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 999,
                        backgroundColor: best.passed ? "#DCFCE7" : "#FEF3C7"
                      }}
                    >
                      <Award size={13} color={best.passed ? "#16A34A" : "#D97706"} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Inter_700Bold",
                          color: best.passed ? "#16A34A" : "#B45309"
                        }}
                      >
                        Best: {best.bestPercent}%
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontFamily: "Inter_700Bold",
                        color: accent
                      }}
                    >
                      Start →
                    </Text>
                  )}
                </BlastPressable>
              );
            })}
          </View>
        </MaterialGlassCard>
      </View>
    );
  }

  if (finished) {
    const elapsedSeconds = Math.round((Date.now() - startRef.current) / 1000);
    return (
      <ResultsScreen
        title={`${activeExam.title} Results`}
        attempts={attempts}
        questions={activeExam.questions}
        elapsedSeconds={elapsedSeconds}
        xpEarned={xpEarned}
        isExam={true}
        passMarkPercent={60}
        onRetry={() => {
          const preset = EXAM_PRESETS.find((p) => p.id === activeExam.id) ?? EXAM_PRESETS[0];
          startExam(preset);
        }}
        onReviewMistakes={onReviewMistakes}
        onBackToPractice={onBack}
      />
    );
  }

  const currentQuestion = activeExam.questions[idx];
  const canSubmit = canSubmitAnswerDraft(currentQuestion, draft);

  // Exam mode: NO instant feedback — record and advance immediately
  const handleExamSubmitAndAdvance = async () => {
    if (!canSubmit) return;
    const ok = evaluateAnswerDraft(currentQuestion, draft);
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

    const nextAttempts = [...attempts, record];
    setAttempts(nextAttempts);
    const nextStorage = await recordPracticeAttempt(record, 0);
    onStorageUpdated(nextStorage);

    if (idx + 1 >= activeExam.questions.length) {
      await finishExam(nextAttempts, activeExam);
    } else {
      setIdx((prev) => prev + 1);
      setDraft(EMPTY_ANSWER_DRAFT);
      qStartRef.current = Date.now();
    }
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
          onPress={confirmLeaveExam}
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
            Leave Exam
          </Text>
        </BlastPressable>

        <Timer
          initialSeconds={activeExam.durationSeconds}
          running={!finished}
          resetKey={activeExam.id}
          onExpire={() => finishExam(attempts, activeExam)}
        />
      </View>

      <ProgressBar current={idx + 1} total={activeExam.questions.length} />

      <QuestionCard
        question={currentQuestion}
        showFeedback={false}
        isCorrect={false}
        hideHints={true}
        canSubmit={canSubmit}
        onSubmit={handleExamSubmitAndAdvance}
        onNext={handleExamSubmitAndAdvance}
      >
        <QuestionInput
          question={currentQuestion}
          draft={draft}
          showFeedback={false}
          onChangeDraft={setDraft}
          onSubmitTrigger={handleExamSubmitAndAdvance}
        />
      </QuestionCard>
    </View>
  );
};
