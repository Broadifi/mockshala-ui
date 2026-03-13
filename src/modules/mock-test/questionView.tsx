import { useEffect } from "react";
import HtmlSetterExam from "@/components/htmlsetterforExam";
import QuestionOptions from "./QuestionOptions";
import Marks from "./marks";
import {
  useQuestionStore,
  useCurrentQuestion,
} from "@/stores/questionStore";

function QuestionView() {
  const question = useCurrentQuestion();
  const sections = useQuestionStore((s) => s.sections);
  const currentQuestionId = useQuestionStore((s) => s.currentQuestionId);
  const setPendingAnswer = useQuestionStore((s) => s.setPendingAnswer);
  const pendingAnswerId = useQuestionStore((s) => s.pendingAnswerId);
  const markVisited = useQuestionStore((s) => s.markVisited);

  // Mark question as visited when it becomes current
  useEffect(() => {
    if (currentQuestionId) {
      markVisited(currentQuestionId);
    }
  }, [currentQuestionId]);

  if (!question) return null;

  // Compute display number (1-based across all sections)
  const allQuestions = sections.flatMap((s) => s.questions);
  const questionNumber =
    allQuestions.findIndex((q) => q._id === question._id) + 1;

  const handleOptionChange = (optionId: string) => {
    const selectedOption = question.options?.find((o) => o._id === optionId);
    setPendingAnswer(optionId, selectedOption?.optionText ?? "");
  };

  return (
    <div className="border border-gray-150 shadow-none py-3 rounded-lg h-full flex flex-col overflow-hidden px-4">
      <div className="py-0 shrink-0">
        <div className="flex justify-between">
          <p className="text-title-darkblue font-semibold text-sm sm:text-base">
            Question. {questionNumber}
          </p>

          <Marks
            marks={question.marks ?? 0}
            negativeMarks={question.negativeMarks ?? 0}
          />
        </div>
      </div>

      <div className="text-muted-foreground text-sm flex-1 overflow-y-auto mt-2">
        <HtmlSetterExam html={question.questionText} />

        <QuestionOptions
          options={question.options ?? []}
          value={pendingAnswerId ?? ""}
          onChange={handleOptionChange}
        />
      </div>
    </div>
  );
}

export default QuestionView;
