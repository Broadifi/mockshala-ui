import { useMemo } from "react";
import HtmlSetterExam from "@/components/htmlsetterforExam";
import QuestionOptions from "./QuestionOptions";
import Marks from "./marks";
import { useQuestionStore } from "@/stores/questionStore";

function QuestionView() {
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestionId = useQuestionStore(
    (state) => state.currentQuestionIndex,
  );

  const { question, questionNumber } = useMemo(() => {
    const index = questions.findIndex((q) => q._id === currentQuestionId);

    return {
      question: questions[index],
      questionNumber: index + 1,
    };
  }, [questions, currentQuestionId]);

  if (!question) return null;

  return (
    <div className=" border border-gray-150 shadow-none py-3 rounded-lg h-full flex flex-col overflow-hidden px-4 ">
      <div className=" py-0 shrink-0">
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

        <QuestionOptions options={question.options ?? []} />
      </div>
    </div>
  );
}

export default QuestionView;
