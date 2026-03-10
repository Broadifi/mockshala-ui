import { useEffect } from "react";
import Instruction from "./instruction";
import InstructionFooter from "./InstructionFooter";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { mockShalaLogo } from "@/assets";
import { useAuthStore } from "@/stores/authStore";
import ProfileIconExam from "@/components/profileIconExam";
import { useQuery } from "@tanstack/react-query";
import { examKeys } from "@/api";
import { QUERY_CONFIG } from "@/api/config";
import { examApi } from "@/api/services/exam-services";
import { useParams } from "@tanstack/react-router";

function TestInstruction() {
  const { examId } = useParams({
    from: "/$lang/instructions/$testSlug/$examId/",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const { userDetails } = useAuthStore((state) => state.auth);
  const candidateName = userDetails?.name;

  const { data: sectionData, isLoading } = useQuery({
    queryKey: examKeys.examInstruction(examId),
    queryFn: () => examApi.testInstruction(examId),
    ...QUERY_CONFIG.default,
    enabled: !!examId,
  });

  return (
    <div className="w-full  flex flex-col gap-3 lg:gap-6">
      <div className="w-full bg-white shadow-md sticky top-0 z-50">
        <header className=" container px-4 py-2 mx-auto flex justify-between items-center">
          <div>
            <ImageWithFallback
              src={mockShalaLogo}
              alt="mockShalaLogo"
              className="h-6 md:h-7 xl:h-8 w-auto"
            />
          </div>

          {/* Profile */}
          <div className="flex gap-2">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Candidate</p>
              <p className="text-sm sm:text-base font-medium sm:font-semibold text-title-darkblue">
                {candidateName}
              </p>
            </div>

            <div>
              <ProfileIconExam />
            </div>
          </div>
        </header>
      </div>
      <div className=" container px-4 py-2 mx-auto">
        <Instruction sectionData={sectionData} isLoading={isLoading} />
      </div>
      <div className="container px-4 py-2 mx-auto sticky bottom-0 bg-white">
        <InstructionFooter
          testSeriesId={sectionData?.testSeriesId}
          testId={sectionData?._id}
        />
      </div>
    </div>
  );
}

export default TestInstruction;
