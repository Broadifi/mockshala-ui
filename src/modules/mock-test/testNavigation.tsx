import i18n from "@/i18n";
import { useExamLanguage } from "@/stores/examLanguageStore";
import { useQuestionStore, useCurrentQuestion } from "@/stores/questionStore";
import { ArrowLeft, ArrowRight, Eraser, Star } from "lucide-react";

function TestNavigation() {
  const { examCurrentLang } = useExamLanguage();
  const currentQuestion = useCurrentQuestion();

  const goToPreviousQuestion = useQuestionStore((s) => s.goToPreviousQuestion);
  const saveAndNextAction = useQuestionStore((s) => s.saveAndNext);
  const clearResponseAction = useQuestionStore((s) => s.clearResponse);
  
  const pendingAnswerId = useQuestionStore((s) => s.pendingAnswerId);
  const pendingAnswerText = useQuestionStore((s) => s.pendingAnswerText);
  
  const toggleMarkForReview = useQuestionStore((s) => s.toggleMarkForReview);

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

  const handlePrevious = () => {
    goToPreviousQuestion();
  };

  const handleSaveAndNext = () => {
    if (!currentQuestion) return;
    saveAndNextAction(
      currentQuestion._id,
      pendingAnswerId ?? "",
      pendingAnswerText ?? ""
    );
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    clearResponseAction(currentQuestion._id);
  };

  const handleMarkForReview = () => {
    if (!currentQuestion) return;
    toggleMarkForReview(currentQuestion._id);
  };

  return (
    <div>
      <div className="hidden md:flex flex-row gap-4 justify-between ">
        {/* Previous */}
        <button
          onClick={handlePrevious}
          className="previous-exam-button cursor-pointer flex items-center gap-1
      transition-all duration-200 ease-in-out
      hover:bg-gray-100 hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          <ArrowLeft className="h-4" />
          <span>{getLocalTranslation("examInstructions.previous")}</span>
        </button>

        {/* Mark / Clear */}
        <div className="flex gap-4">
          <button
            onClick={handleClearResponse}
            className="save-exam-button bg-notAnswered cursor-pointer flex items-center gap-1
      transition-all duration-200 ease-in-out
      hover:brightness-95 hover:shadow-md hover:-translate-y-px active:translate-y-0"
          >
            <Eraser className="h-4" />
            <span>{getLocalTranslation("examInstructions.clearResponse")}</span>
          </button>

          <button
            onClick={handleMarkForReview}
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
          onClick={handleSaveAndNext}
          className="bg-answered save-exam-button cursor-pointer flex items-center gap-1
    transition-all duration-200 ease-in-out
    hover:brightness-95 hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          <span>{getLocalTranslation("examInstructions.saveNext")}</span>
          <ArrowRight className="h-4" />
        </button>
      </div>

      <div className="md:hidden grid grid-cols-2 gap-2 min-[345px]:gap-4 justify-between ">
        {/* Mark / Clear */}
        <button
          onClick={handleClearResponse}
          className="save-exam-button bg-notAnswered cursor-pointer flex items-center gap-1
      transition-all duration-200 ease-in-out
      hover:brightness-95 hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          <Eraser className="h-4 hidden min-[345px]:block" />
          <span>{getLocalTranslation("examInstructions.clearResponse")}</span>
        </button>

        <button
          onClick={handleMarkForReview}
          className="mark-review-button px-1 cursor-pointer flex items-center gap-1
      transition-all duration-200 ease-in-out
      hover:brightness-95 hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          <Star className="h-4 hidden min-[345px]:block" />
          <span>{getLocalTranslation("examInstructions.markReview")}</span>
        </button>

        {/* Previous */}
        <button
          onClick={handlePrevious}
          className="previous-exam-button cursor-pointer flex items-center gap-1
          transition-all duration-200 ease-in-out
        hover:bg-gray-100 hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          <ArrowLeft className="h-4 hidden min-[345px]:block" />
          <span>{getLocalTranslation("examInstructions.previous")}</span>
        </button>

        {/* Save and Next */}
        <button
          onClick={handleSaveAndNext}
          className="bg-answered save-exam-button cursor-pointer flex items-center gap-1
    transition-all duration-200 ease-in-out
    hover:brightness-95 hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          <span>{getLocalTranslation("examInstructions.saveNext")}</span>
          <ArrowRight className="h-4 hidden min-[345px]:block" />
        </button>
      </div>
    </div>
  );
}

export default TestNavigation;
