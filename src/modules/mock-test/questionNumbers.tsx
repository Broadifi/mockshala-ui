import { useQuestionStore } from "@/stores/questionStore";
import { Timer } from "lucide-react";

function QuestionNumbers() {
  const { questions, setCurrentQuestion } = useQuestionStore();

  // console.log(questions);

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
            <p className="font-semibold text-blue-800">00:59:23</p>
          </div>
        </div>
      </div>

      {/* Question Palette */}
      <div className="border-t mt-3 pt-2 flex flex-col gap-2 flex-1 overflow-y-auto">
        <p className="text-title-darkblue font-medium pb-2 shrink-0">
          Questions Palette
        </p>

        <div className="flex flex-wrap gap-2">
          {questions.map((q, index) => (
            <button
              key={q._id}
              onClick={() => handleCurrentQuestion(q._id)}
              className="bg-gray-200 w-9 h-9 lg:w-10 lg:h-10 rounded-md flex items-center justify-center hover:cursor-pointer"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionNumbers;
