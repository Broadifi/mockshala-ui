import { useMemo } from "react";
import HtmlSetterExam from "@/components/htmlsetterforExam";
import QuestionOptions from "./QuestionOptions";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="border border-gray-150 shadow-none">
      <div className="px-0 lg:px-6 py-0">
        <div className="flex justify-between">
          <p className="text-title-darkblue font-semibold">
            Question. {questionNumber}
          </p>

          <Marks
            marks={question.marks ?? 0}
            negativeMarks={question.negativeMarks ?? 0}
          />
        </div>
      </div>

      <CardContent className="text-muted-foreground text-sm px-0 lg:px-6 h-[55vh] overflow-y-auto">
        <HtmlSetterExam html={question.questionText} />

        <QuestionOptions options={question.options ?? []} />
      </CardContent>
    </Card>
  );
}

export default QuestionView;
