import { useEffect, useState, useCallback } from "react";
import {
  useQuestionStore,
  usePaletteQuestions,
  getQuestionStatus,
} from "@/stores/questionStore";
import type { QuestionStatus } from "@/stores/questionStore";
import { Timer } from "lucide-react";

// ─── Status → palette color mapping ──────────────────────────────────
const statusStyles: Record<QuestionStatus, string> = {
  answered: "bg-answered text-white",
  notAnswered: "bg-notAnswered text-white",
  marked: "bg-marked text-white",
  markedAndAnswered: "bg-markedAnswered text-white",
  notVisited: "bg-gray-200 text-gray-700",
};

// ─── Timer hook ──────────────────────────────────────────────────────
function useCountdownTimer() {
  const timerStartedAt = useQuestionStore((s) => s.timerStartedAt);
  const timerDuration = useQuestionStore((s) => s.timerDuration);
  const examType = useQuestionStore((s) => s.examType);
  const advanceToNextSection = useQuestionStore(
    (s) => s.advanceToNextSection
  );

  const computeRemaining = useCallback(() => {
    if (!timerStartedAt) return timerDuration;
    const elapsed = Math.floor((Date.now() - timerStartedAt) / 1000);
    return Math.max(0, timerDuration - elapsed);
  }, [timerStartedAt, timerDuration]);

  const [remaining, setRemaining] = useState(computeRemaining);

  useEffect(() => {
    setRemaining(computeRemaining());

    const interval = setInterval(() => {
      const val = computeRemaining();
      setRemaining(val);

      // SEQUENTIAL: auto-advance when timer hits 0
      if (val <= 0 && examType === "SEQUENTIAL") {
        advanceToNextSection();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [computeRemaining, examType, advanceToNextSection]);

  return remaining;
}

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// ─── Component ───────────────────────────────────────────────────────
function QuestionNumbers() {
  const setCurrentQuestion = useQuestionStore((s) => s.setCurrentQuestion);
  const currentQuestionId = useQuestionStore((s) => s.currentQuestionId);
  const paletteQuestions = usePaletteQuestions();
  const remaining = useCountdownTimer();

  const handleCurrentQuestion = (id: string) => {
    setCurrentQuestion(id);
  };

  return (
    <div className="px-4 py-2 h-full flex flex-col overflow-hidden">
      {/* Timer */}
      <div className="flex justify-end shrink-0">
        <div className="border border-blue-200 rounded-lg p-2 w-fit bg-blue-50">
          <p className="uppercase text-gray-500 font-medium text-sm">
            Time Left
          </p>
          <div className="flex gap-2">
            <Timer className="text-blue-800" />
            <p className="font-semibold text-blue-800">
              {formatTime(remaining)}
            </p>
          </div>
        </div>
      </div>

      {/* Question Palette */}
      <div className="border-t mt-3 pt-2 flex flex-col gap-2 flex-1 overflow-y-auto">
        <p className="text-title-darkblue font-medium pb-2 shrink-0">
          Questions Palette
        </p>

        <div className="flex flex-wrap gap-2">
          {paletteQuestions.map((q, index) => {
            const status = getQuestionStatus(q);
            const isActive = q._id === currentQuestionId;

            return (
              <button
                key={q._id}
                onClick={() => handleCurrentQuestion(q._id)}
                className={`w-9 h-9 lg:w-10 lg:h-10 rounded-md flex items-center justify-center
                  hover:cursor-pointer transition-all duration-150 text-sm font-medium
                  ${statusStyles[status]}
                  ${isActive ? "ring-2 ring-blue-600 ring-offset-1" : ""}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuestionNumbers;
