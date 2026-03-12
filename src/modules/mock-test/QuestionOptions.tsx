import HtmlSetterExam from "@/components/htmlsetterforExam";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuestionStore } from "@/stores/questionStore";

interface Option {
  _id: string;
  optionText: string;
}

interface OptionsProps {
  options: Option[];
}

function QuestionOptions({ options }: OptionsProps) {
  const { currentQuestionId, saveAnswer, questions } = useQuestionStore();

  const currentQuestion = questions.find((q) => q._id === currentQuestionId);

  const selectedOption = currentQuestion?.answerId ?? "";

  const onChange = (optionId: string) => {
    if (!currentQuestionId) return;

    const option = options.find((opt) => opt._id === optionId);

    if (!option) return;

    saveAnswer(currentQuestionId, {
      optionId: option._id,
      optionText: option.optionText,
    });
  };

  return (
    <RadioGroup
      value={selectedOption}
      onValueChange={onChange}
      className="flex flex-col gap-4 mt-4"
    >
      {options.map((option) => (
        <label
          key={option._id}
          htmlFor={option._id}
          className="flex items-start gap-3 p-4 rounded-xl border border-gray-200
          hover:border-blue-400 hover:bg-blue-100 transition-all cursor-pointer"
        >
          <RadioGroupItem
            value={option._id}
            id={option._id}
            className="mt-1 border-gray-400
            data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />

          <div>
            <HtmlSetterExam html={option.optionText} />
          </div>
        </label>
      ))}
    </RadioGroup>
  );
}

export default QuestionOptions;
