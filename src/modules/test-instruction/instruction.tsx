import { examKeys } from "@/api";
import { QUERY_CONFIG } from "@/api/config";
import { examApi } from "@/api/services/exam-services";
import HtmlSetterExam from "@/components/htmlsetterforExam";
import { useExamLanguage } from "@/stores/examLanguageStore";
import { formatName } from "@/utils/formatting/formatName";
import { normalizeDuration } from "@/utils/formatting/normalizeDuration";
import { normalizeTestTypeText } from "@/utils/formatting/normalizeTestTypeText";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  ChartNoAxesCombined,
  CircleAlert,
  CircleGauge,
  Eraser,
  Eye,
  Star,
  Timer,
} from "lucide-react";

function Instruction() {
  const { examId } = useParams({
    from: "/$lang/instructions/$testSlug/$examId/",
  });

  console.log(examId);

  const { data: sectionData } = useQuery({
    queryKey: examKeys.examInstruction(examId),
    queryFn: () => examApi.testInstruction(examId),
    ...QUERY_CONFIG.default,
    enabled: !!examId,
  });

  const totalQuestions = sectionData?.section?.reduce(
    (sum, item) => sum + item.totalQuestion,
    0,
  );

  const { examCurrentLang } = useExamLanguage();

  // console.log(data);

  return (
    <div className="space-y-4 md:space-y-5 xl:space-y-6">
      <div
        className="bg-blue-500 w-full rounded-lg px-3 lg:px-4 py-3 lg:py-4 
        flex flex-col lg:flex-row justify-between lg:items-center gap-5"
      >
        <div className="xl:space-y-1">
          <h1 className="text-2xl xl:text-3xl  text-white font-semibold">
            {formatName(sectionData?.name)}
          </h1>
          <p className="text-gray-200 xl:text-lg font-medium">
            {normalizeTestTypeText(sectionData?.testType)}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 2xl:gap-6">
          {/* Exam Type */}
          <div className="flex items-center gap-1">
            <div className="text-white bg-blue-400 py-2 px-1 rounded-md">
              <BookOpenCheck className="h-4 xl:h-5" />
            </div>
            <div>
              <p className="text-gray-100 text-[11px] md:text-xs uppercase">
                Exam Type
              </p>
              <p className="text-white font-semibold text-sm xl:text-base">
                {formatName(sectionData?.examType)}
              </p>
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-1">
            <div className="text-white bg-blue-400 py-2 px-1 rounded-md">
              <CircleGauge className="h-4 xl:h-5" />
            </div>
            <div>
              <p className="text-gray-100 text-[11px] md:text-xs uppercase">
                Difficulty
              </p>
              <p className="text-white font-semibold text-sm xl:text-base">
                {formatName(sectionData?.difficultyLevel)}
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1">
            <div className="text-white bg-blue-400 py-2 px-1 rounded-md">
              <Timer className="h-4 lg:h-5" />
            </div>
            <div>
              <p className="text-gray-100 text-[11px] xl:text-xs uppercase">
                Duration
              </p>
              <p className="text-white font-semibold text-sm xl:text-base">
                {normalizeDuration(sectionData?.time ?? 0)}
              </p>
            </div>
          </div>

          {/* Total Questions */}
          <div className="flex items-center gap-1">
            <div className="text-white bg-blue-400 py-2 px-1 rounded-md">
              <ChartNoAxesCombined className="h-4 lg:h-5" />
            </div>
            <div>
              <p className="text-gray-100 text-[11px] xl:text-xs uppercase">
                Total Questions
              </p>
              <p className="text-white font-semibold text-sm xl:text-base">
                {totalQuestions}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-linear-to-r from-sky-100/30 to-blue-100/30 p-4 mb-4 border border-gray-200 rounded-lg space-y-4">
        <div className="md:py-1 flex flex-col lg:flex-row justify-between">
          <div className="flex gap-1">
            <div className="w-1.5 rounded-2xl bg-blue-400 hidden lg:flex"></div>
            <h2 className="text-gray-800 font-bold text-lg">Instructions</h2>
          </div>
          <h4 className="text-gray-500 text-sm lg:text-base">
            Please read carefully before proceeding
          </h4>
        </div>

        <div className="overflow-x-auto overflow-y-auto border border-gray-200 shadow-sm rounded-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className=" sticky top-0 z-20 bg-blue-200">
              <tr>
                <th className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center font-medium text-title-darkblue">
                  Section Number
                </th>
                <th className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center font-medium text-title-darkblue">
                  Section Name
                </th>
                <th className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center font-medium text-title-darkblue">
                  Total Questions
                </th>
                <th className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center font-medium text-title-darkblue">
                  Max Marks
                </th>
                <th className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center font-medium text-title-darkblue">
                  Positive Marks
                </th>
                <th className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center font-medium text-title-darkblue">
                  Negative Marks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sectionData?.section.map((item, index) => (
                <tr className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center text-gray-800">
                    {index}
                  </td>
                  <td className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center text-gray-800">
                    {item.sectionName}
                  </td>
                  <td className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center text-gray-800">
                    {item.totalQuestion}
                  </td>
                  <td className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center text-gray-800">
                    {item.totalScore}
                  </td>
                  <td className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center text-green-800">
                    + {item.marks}
                  </td>
                  <td className="text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center text-red-600">
                    - {item.negativeMarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="py-3 space-y-3">
          <div className="flex gap-1 items-center">
            <CircleAlert className="h-4 sm:h-5 text-blue-500" />
            <p className="text-title-darkblue font-medium ">
              Questions Palette Legend & Navigation
            </p>
          </div>

          <div className="space-y-6">
            {/* Color Palette */}
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <div>
                <div className="flex gap-1 items-center">
                  <div className="h-4 w-4 bg-answered rounded-sm"></div>
                  <span className="text-responsive-muted">Answered</span>
                </div>
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <div className="h-4 w-4 bg-notAnswered rounded-sm"></div>
                  <span className="text-responsive-muted">Not Answered</span>
                </div>
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <div className="h-4 w-4 bg-marked rounded-sm"></div>
                  <span className="text-responsive-muted">Marked</span>
                </div>
              </div>

              <div>
                <div className="flex gap-1 items-center">
                  <div className="h-4 w-4 bg-markedAnswered rounded-sm"></div>
                  <span className="text-responsive-muted">
                    Marked & Answered
                  </span>
                </div>
              </div>

              <div>
                <div className="flex gap-1 items-center">
                  <div className="h-4 w-4 bg-notVisited border border-gray-300 rounded-sm"></div>
                  <span className="text-responsive-muted">Not Visited</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex  items-center gap-2 ">
                <div className="bg-answered save-exam-button">
                  <span>Save & Next</span>
                  <ArrowRight className="h-4 lg:h-5" />
                </div>
                <span className="text-responsive-muted">
                  Save the answer and move to the next question.
                </span>
              </div>

              <div className="flex  items-center gap-2 ">
                <div className="previous-exam-button">
                  <ArrowLeft className="h-4 lg:h-5" />
                  <span>Previous</span>
                </div>
                <span className="text-responsive-muted">
                  Go back to the previous question.
                </span>
              </div>

              <div className="flex  items-center gap-2">
                <div className="mark-review-button">
                  <Star className="h-4 lg:h-5" />
                  <span> Mark for Review</span>
                </div>

                <span className="text-responsive-muted">
                  Mark this question for review later
                </span>
              </div>

              <div className="flex  items-center gap-2">
                <div className="save-exam-button bg-notAnswered">
                  <Eraser className="h-4 lg:h-5" />

                  <span>Clear Response</span>
                </div>
                <span className="text-responsive-muted">
                  Clear the selected answer
                </span>
              </div>

              <div className="flex  items-center gap-2">
                <div className="gap-1 questions-exam-button text-button-blue font-semibold border border-button-blue">
                  <BookOpen className="h-4 lg:h-5" />
                  <span>Question</span>
                </div>
                <span className="text-responsive-muted">
                  Display all questions .
                </span>
              </div>

              <div className="flex  items-center gap-2">
                <div className="gap-1 questions-exam-button text-button-blue font-semibold border border-button-blue">
                  <Eye className="h-4 lg:h-5" />
                  <span>Instruction</span>
                </div>
                <span className="text-responsive-muted">
                  View the instructions for the exam.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Instruction form API */}
        <div className="pt-4 mt-5 lg:mt-8 border-t">
          <HtmlSetterExam
            html={
              examCurrentLang === "en"
                ? sectionData?.instruction
                : sectionData?.instructionInHindi
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Instruction;
