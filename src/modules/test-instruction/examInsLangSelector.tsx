import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExamLanguage } from "@/stores/examLanguageStore";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";

interface LanguageSelectorProps {
  showLabel?: boolean;
}

export function ExamLanguageSelector({
  showLabel = false,
}: LanguageSelectorProps) {
  //fetch the current news language form local state just update the lang on news store,
  // do not update the Global store data

  const { examCurrentLang, setExamLanguage } = useExamLanguage();

  const { lang } = useParams({ strict: false });

  const examPageLang = lang ?? "en";

  useEffect(() => {
    setExamLanguage(examPageLang);
  }, [examPageLang,setExamLanguage]);

  return (
    <div>
      {showLabel && (
        <Label className="px-1 mb-2 text-title-gradient-blue">
          Select Language
        </Label>
      )}
      <Select
        defaultValue={examCurrentLang}
        value={examCurrentLang}
        onValueChange={setExamLanguage}
      >
        <SelectTrigger className="border border-blue-300 text-gray-800 font-medium tracking-wide  text-xs sm:text-sm ">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            <SelectItem value="hi">Hindi</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
