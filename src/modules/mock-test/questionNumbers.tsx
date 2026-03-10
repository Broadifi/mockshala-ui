import { Timer } from "lucide-react";

function QuestionNumbers() {
  return (
    <div className="p-4">
      {/* Timer */}
      <div className="flex justify-end">
        <div className="border border-blue-500 rounded-lg p-2 w-fit bg-blue-50">
          <p className="uppercase text-gray-500 font-medium">Time Left</p>
          <div className="flex gap-2">
            <Timer className="text-blue-800" />
            <p className="font-semibold text-blue-800">00:59:23</p>
          </div>
        </div>
      </div>

      {/* Questions Number */}
      <div className="border-t mt-3 py-3 flex flex-col gap-2">
        <p className="text-title-darkblue font-medium pb-4">Questions Palette</p>
        <div>
          <button className="bg-gray-200 px-4 py-2 rounded-md">
            <span>1</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionNumbers;
