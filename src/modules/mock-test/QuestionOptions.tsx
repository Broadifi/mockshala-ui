import HtmlSetterExam from "@/components/htmlsetterforExam";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Option {
  _id: string;
  optionText: string;
}

interface OptionsProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

function QuestionOptions({ options, value, onChange }: OptionsProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="flex flex-col gap-4 mt-4"
    >
      {options.map((option) => (
        <label
          key={option._id}
          className="flex items-start gap-3 p-4 rounded-xl border border-gray-200
          hover:border-blue-400 hover:bg-blue-100 transition-all cursor-pointer data-[state=checked]:border-blue-100 data-[state=checked]:bg-blue-50"
        >
          <RadioGroupItem value={option._id} id={option._id}  className="mt-1 peer border-gray-400
           data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
         
          <div>
            <HtmlSetterExam html={option.optionText} />
          </div>
        </label>
      ))}
    </RadioGroup>
  );
}

export default QuestionOptions;
