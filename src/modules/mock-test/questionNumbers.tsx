import { useExamStore } from "@/stores/examStore";
import { Timer } from "lucide-react";

function QuestionNumbers() {
  const { examData } = useExamStore();

  const questions = examData?.section.flatMap((section) => section.questions) ?? [];

  console.log(questions);
  

  return (
    <div className="px-4 py-2">
      {/* Timer */}
      <div className="flex justify-end">
        <div className="border border-blue-200 rounded-lg p-2 w-fit bg-blue-50">
          <p className="uppercase text-gray-500 font-medium">Time Left</p>
          <div className="flex gap-2">
            <Timer className="text-blue-800" />
            <p className="font-semibold text-blue-800">00:59:23</p>
          </div>
        </div>
      </div>

      {/* Question Palette */}
      <div className="border-t mt-3 py-3 flex flex-col gap-2 h-[56vh] overflow-y-auto">
        <p className="text-title-darkblue font-medium pb-4">
          Questions Palette
        </p>

        <div className="flex flex-wrap gap-2">
          {questions.map((q, index) => (
            <button
              key={q._id}
              className="bg-gray-200 w-10 h-10 rounded-md flex items-center justify-center hover:cursor-pointer"
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