import i18n from "@/i18n";
import { useExamLanguage } from "@/stores/examLanguageStore";
import { BookOpen, Eye } from "lucide-react";

function SubmitSection() {
  const { examCurrentLang } = useExamLanguage();

  const getLocalTranslation = (key: string): string => {
    const bundle = i18n.getResourceBundle(
      examCurrentLang,
      "translation",
    ) as Record<string, unknown>;

    return (
      (key.split(".").reduce<unknown>((acc, k) => {
        if (typeof acc === "object" && acc !== null && k in acc) {
          return (acc as Record<string, unknown>)[k];
        }
        return undefined;
      }, bundle) as string) || key
    );
  };

  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="flex flex-row justify-between">
        {/* Question Paper */}
        <div className="flex  items-center gap-2">
          <button className="gap-1 cursor-pointer questions-exam-button text-button-blue font-semibold border border-button-blue">
            <BookOpen className="h-4" />
            <span>{getLocalTranslation("examInstructions.question")}</span>
          </button>
        </div>

        {/* Instruction */}
        <div className="flex  items-center gap-2">
          <button className="gap-1 cursor-pointer questions-exam-button text-button-blue font-semibold border border-button-blue">
            <Eye className="h-4" />
            <span>
              {getLocalTranslation("examInstructions.instructionButton")}
            </span>
          </button>
        </div>
      </div>

      <div>
        <button
          className="w-full px-6 py-1 rounded-lg bg-linear-to-r from-button-blue to-button-sky
                   text-base text-white font-semibold
                   hover:from-blue-600 hover:to-blue-600 hover:shadow-md
                   transition-colors duration-200
                   shadow-sm cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SubmitSection;
