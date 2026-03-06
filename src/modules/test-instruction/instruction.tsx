import { examKeys } from "@/api";
import { QUERY_CONFIG } from "@/api/config";
import { examApi } from "@/api/services/exam-services";
import HtmlSetter from "@/components/htmlSetter";
import { formatName } from "@/utils/formatting/formatName";
import { normalizeDuration } from "@/utils/formatting/normalizeDuration";
import { normalizeTestTypeText } from "@/utils/formatting/normalizeTestTypeText";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  BookOpenCheck,
  ChartNoAxesCombined,
  CircleGauge,
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

      <div className="bg-linear-to-r from-sky-100/30 to-blue-100/30 p-4 mb-4 border border-gray-400 rounded-lg space-y-4">
        <div className="md:py-1 flex flex-col lg:flex-row justify-between">
          <div className="flex gap-1">
            <div className="w-1.5 rounded-2xl bg-blue-400 hidden lg:flex"></div>
            <h2 className="text-gray-800 font-bold text-lg">
              General Instructions
            </h2>
          </div>
          <h4 className="text-gray-400 text-sm lg:text-base">
            Please read carefully before proceeding
          </h4>
        </div>

        <div className="overflow-x-auto overflow-y-auto border border-gray-200 shadow-sm rounded-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className=" sticky top-0 z-20 bg-blue-500">
              <tr>
                <th className="px-4 py-3 text-center font-medium text-white">
                  Section Number
                </th>
                <th className="px-4 py-3 text-center font-medium text-white">
                  Section Name
                </th>
                <th className="px-4 py-3 text-center font-medium text-white">
                  Total Number of Questions
                </th>
                <th className="px-4 py-3 text-center font-medium text-white">
                  Max Score
                </th>
                <th className="px-4 py-3 text-center font-medium text-white">
                  Marks for Correct Answer
                </th>
                <th className="px-4 py-3 text-center font-medium text-white">
                  Negative Marking for Wrong Answer
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 border-b border-gray-100">
                <td className="px-4 py-3 text-center text-gray-800">1</td>
                <td className="px-4 py-3 text-center text-gray-800">
                  Section 1
                </td>
                <td className="px-4 py-3 text-center text-gray-800">6</td>
                <td className="px-4 py-3 text-center text-gray-800">19.2</td>
                <td className="px-4 py-3 text-center text-gray-800">3.2</td>
                <td className="px-4 py-3 text-center text-gray-800">0</td>
              </tr>

              <tr className="hover:bg-gray-50 border-b border-gray-100">
                <td className="px-4 py-3 text-center text-gray-800">2</td>
                <td className="px-4 py-3 text-center text-gray-800">
                  Section 2
                </td>
                <td className="px-4 py-3 text-center text-gray-800">5</td>
                <td className="px-4 py-3 text-center text-gray-800">30.2</td>
                <td className="px-4 py-3 text-center text-gray-800">5.4</td>
                <td className="px-4 py-3 text-center text-gray-800">0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-x-5 py-2 px-1">
          <div className="inline-block">
            <div className="flex gap-1 items-center">
              <div className="h-4 w-4 bg-green-700 rounded-xs"></div>
              <span>answered</span>
            </div>
          </div>
          <div className="inline-block">
            <div className="flex gap-1 items-center">
              <div className="h-4 w-4 bg-red-700 rounded-xs"></div>
              <span>answered</span>
            </div>
          </div>
          <div className="inline-block">
            <div className="flex gap-1 items-center">
              <div className="h-4 w-4 bg-purple-700 rounded-xs"></div>
              <span>answered</span>
            </div>
          </div>
          <div className="inline-block">
            <div className="flex gap-1 items-center">
              <div className="h-4 w-4 bg-white border border-gray-500 rounded-xs"></div>
              <span>answered</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mt-10">
          <div className="flex  items-center gap-2">
            <span className="bg-red-400 min-h-10 min-w-38 py-2 text-center rounded-md text-white font-semibold">
              Clear Response
            </span>
            <span>Clear the selected answer.</span>
          </div>

          <div className="flex  items-center gap-2">
            <span className="bg-blue-100 min-h-10 min-w-38 py-2 text-center rounded-md text-blue-700 font-semibold">
              Mark for Review
            </span>
            <span>Mark this question for review later.</span>
          </div>

          <div className="flex  items-center gap-2">
            <span className="bg-emerald-500 min-h-10 min-w-[9.5rem] py-2 text-center rounded-md text-white font-semibold">
              Save and Next
            </span>
            <span>Save the answer and move to the next question.</span>
          </div>

          <div className="flex  items-center gap-2">
            <span className="bg-purple-300  min-h-10 min-w-38 py-2 text-center rounded-md text-white font-semibold">
              Previous Question
            </span>
            <span>Go back to the previous question.</span>
          </div>

          <div className="flex  items-center gap-2">
            <span className="bg-white min-h-10 min-w-38 py-2 text-center rounded-md text-blue-600 font-semibold border border-blue-500">
              Question
            </span>
            <span>Display all questions .</span>
          </div>

          <div className="flex  items-center gap-2">
            <span className="bg-blue-400 min-h-10 min-w-38 py-2 text-center rounded-md text-white font-semibold">
              Instruction
            </span>
            <span>View the instructions for the exam.</span>
          </div>
        </div>

        {/* Instruction form API */}
        <div>
          <HtmlSetter html={sectionData?.instruction} />
        </div>
      </div>
    </div>
  );
}

export default Instruction;
