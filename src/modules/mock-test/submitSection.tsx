import i18n from "@/i18n";
import { useExamLanguage } from "@/stores/examLanguageStore";
import { BookOpen, Eye } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getSubmitPayload, useQuestionStore } from "@/stores/questionStore";
import { useExamStore } from "@/stores/examStore";
import { useMutation } from "@tanstack/react-query";
import type { SubmitExamPayload } from "@/api/model/submitExam-model";
import { examApi } from "@/api/services/exam-services";
import { toast } from "sonner";

function SubmitSection() {
  const { examCurrentLang } = useExamLanguage();
  const clearQuestions = useQuestionStore((state) => state.clearQuestions);
  const clearExamLanguage = useExamLanguage((state) => state.clearExamLanguage);
  const clearExamData = useExamStore((state) => state.clearExamData);
  //fetch the stored exam data form Exam store
  const examData = useExamStore((state) => state.examData);

  const navigate = useNavigate();
  //Get the Params
  const { lang, testSeries, test } = useParams({
    from: "/$lang/mock-test/$testSeries/$test/",
  });

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

  const SubmitExamMutation = useMutation({
    mutationFn: examApi.submitExam,
    onSuccess: (response) => {
      if (response.status) {
        console.log("Exam Submitted Successfully", response);

        toast.success("Exam Submitted Successfully");

        const ddd = response.data.test;

        toast.success(ddd);

        clearQuestions();
        clearExamLanguage();
        clearExamData();

        navigate({
          to: "/$lang/mock-test/$testSeries/$test/result",
          params: {
            lang: lang,
            testSeries: testSeries,
            test: test,
          },
        });
      }
    },
  });

  const handleSubmit = () => {
    if (examData) {
      const payload: SubmitExamPayload = getSubmitPayload(examData);
      SubmitExamMutation.mutate(payload);
    }
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
          onClick={handleSubmit}
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
