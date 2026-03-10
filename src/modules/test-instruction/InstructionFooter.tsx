import { useState } from "react";

import { ExamLanguageSelector } from "./examInsLangSelector";
import { useExamLanguage } from "@/stores/examLanguageStore";
import i18n from "@/i18n";
import { useMutation } from "@tanstack/react-query";
import { examApi, type ExamProps } from "@/api/services/exam-services";
import { toast } from "sonner";

interface InstructionFooterProps {
  testSeriesId?: string;
  testId?: string;
}

function InstructionFooter({ testSeriesId, testId }: InstructionFooterProps) {
  const [checked, setChecked] = useState(false);

  const { examCurrentLang } = useExamLanguage();

  const url = `/${examCurrentLang}/mock-test/${testSeriesId}/${testId}`;

  const width = screen.width;
  const height = screen.height;

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

  const startExamMutation = useMutation({
    mutationFn: examApi.startExam,
    onSuccess: (response) => {
      if (response.status) {
        console.log("Exam started successfully");
        console.log(response.data);
        
        toast.success("Exam started successfully", { duration: 5000 });

        window.open(
          url,
          "startExamWindow",
          `width=${width},height=${height},toolbar=no,menubar=no,noopener,noreferrer`,
        );
      }
    },
    onError: (error) => {
      console.error("Error starting exam:", error);
      toast.error("Error starting exam", { duration: 5000 });
    },
  });

  const handleSubmit = () => {
    console.log("testSeriesId:", testSeriesId);
    console.log("testId:", testId);

    if (!testSeriesId || !testId) {
      toast.error("Missing test information", { duration: 5000 });
      return;
    }

    const data: ExamProps = {
      testSeries: testSeriesId,
      test: testId,
    };
    startExamMutation.mutate(data);
  };

  return (
    <div className="w-full mx-auto space-y-4 text-xs sm:text-sm xl:text-base">
      <div className="flex items-center gap-2 md:gap-4 justify-end">
        <h4 className="text-blue-900">
          {" "}
          {getLocalTranslation("examInstructions.chooseLanguage")}
        </h4>

        <ExamLanguageSelector />
      </div>

      <div className="flex gap-2 lg:gap-4 justify-center items-center">
        <input
          type="checkbox"
          id="instructions"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="min-w-4 min-h-4 accent-blue-500 cursor-pointer border hover:border-blue-500"
        />

        <label htmlFor="instructions" className="text-gray-600">
          {getLocalTranslation("examInstructions.confirmInstructions")}
        </label>
      </div>

      <div className="flex justify-center items-center pb-6">
        <div className="flex flex-row gap-4 ">
          <button
            onClick={() => window.close()}
            className=" border rounded-md py-1 px-3 sm:px-5 hover:text-red-600 hover:border-red-600 cursor-pointer text-gray-800"
          >
            {getLocalTranslation("examInstructions.cancel")}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!checked}
            className={` ${checked ? "cursor-pointer bg-linear-to-r from-button-sky to-button-blue text-white" : "cursor-not-allowed bg-gray-200 text-gray-600"} border rounded-md py-1 px-4`}
          >
            {getLocalTranslation("examInstructions.readyToBegin")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionFooter;
