import i18n from "@/i18n";
import { useExamLanguage } from "@/stores/examLanguageStore";
import { useQuestionStore, useCurrentQuestion } from "@/stores/questionStore";
import { ArrowLeft, ArrowRight, Eraser, Star } from "lucide-react";

function TestNavigation() {
  const { examCurrentLang } = useExamLanguage();
  const currentQuestion = useCurrentQuestion();

  const questions = useQuestionStore((s) => s.questions);
  const currentQuestionId = useQuestionStore((s) => s.currentQuestionId);
  const pendingAnswerId = useQuestionStore((s) => s.pendingAnswerId);
  const setCurrentQuestionId = useQuestionStore((s) => s.setCurrentQuestionId);
  const saveAnswer = useQuestionStore((s) => s.saveAnswer);
  const toggleMarkForReview = useQuestionStore((s) => s.toggleMarkForReview);
  const markVisited = useQuestionStore((s) => s.markVisited);
  const setPendingAnswer = useQuestionStore((s) => s.setPendingAnswer);

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

  // Navigate to adjacent question by index
  const goToIndex = (newIndex: number) => {
    const target = questions[newIndex];
    if (target) {
      markVisited(questions[questions.findIndex((q) => q._id === currentQuestionId)]?._id ?? "");
      setCurrentQuestionId(target._id);
    }
  };

  const currentIndex = questions.findIndex((q) => q._id === currentQuestionId);

  const handlePrevious = () => {
    if (currentIndex > 0) goToIndex(currentIndex - 1);
  };

  const handleSaveAndNext = () => {
    if (!currentQuestion) return;

    if (pendingAnswerId) {
      const selectedOption = currentQuestion.options.find(
        (o) => o._id === pendingAnswerId,
      );
      saveAnswer(currentQuestion._id, {
        optionId: pendingAnswerId,
        optionText: selectedOption?.optionText ?? "",
      });
    } else {
      markVisited(currentQuestion._id);
    }

    if (currentIndex < questions.length - 1) {
      goToIndex(currentIndex + 1);
    }
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    // Clear saved answer and any pending selection
    setPendingAnswer(null);
    saveAnswer(currentQuestion._id, { optionId: "", optionText: "" });
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
