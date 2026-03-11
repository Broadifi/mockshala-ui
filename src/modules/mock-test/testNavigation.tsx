import i18n from "@/i18n";
import { useExamLanguage } from "@/stores/examLanguageStore";
import { ArrowLeft, ArrowRight, Eraser, Star } from "lucide-react";

function TestNavigation() {
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
    <div className="flex justify-between">
      {/* Previous */}
      <div className="flex items-center gap-2">
        <button
          className="previous-exam-button cursor-pointer flex items-center gap-1
      transition-all duration-200 ease-in-out
      hover:bg-gray-100 hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          <ArrowLeft className="h-4" />
          <span>{getLocalTranslation("examInstructions.previous")}</span>
        </button>
      </div>

      {/* Mark / Clear */}
      <div className="flex gap-4">
        <button
          className="save-exam-button bg-notAnswered cursor-pointer flex items-center gap-1
      transition-all duration-200 ease-in-out
      hover:brightness-95 hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          <Eraser className="h-4" />
          <span>{getLocalTranslation("examInstructions.clearResponse")}</span>
        </button>

        <button
          className="mark-review-button px-1 cursor-pointer flex items-center gap-1
      transition-all duration-200 ease-in-out
      hover:brightness-95 hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          <Star className="h-4" />
          <span>{getLocalTranslation("examInstructions.markReview")}</span>
        </button>
      </div>

      {/* Save and Next */}
      <button
        className="bg-answered save-exam-button cursor-pointer flex items-center gap-1
    transition-all duration-200 ease-in-out
    hover:brightness-95 hover:shadow-md hover:-translate-y-px active:translate-y-0"
      >
        <span>{getLocalTranslation("examInstructions.saveNext")}</span>
        <ArrowRight className="h-4" />
      </button>
    </div>
  );
}

export default TestNavigation;
