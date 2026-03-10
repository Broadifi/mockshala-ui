import { useEffect } from "react";
import Instruction from "./instruction";
import InstructionFooter from "./InstructionFooter";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { mockShalaLogo } from "@/assets";
import { useAuthStore } from "@/stores/authStore";
import ProfileIconExam from "@/components/profileIconExam";

function TestInstruction() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const { userDetails } = useAuthStore((state) => state.auth);

  const candidateName = userDetails?.name;

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
              <ProfileIconExam/>
            </div>
          </div>
        </header>
      </div>
      <div className=" container px-4 py-2 mx-auto">
        <Instruction></Instruction>
      </div>
      <div className="container px-4 py-2 mx-auto sticky bottom-0 bg-white">
        <InstructionFooter></InstructionFooter>
      </div>
    </div>
  );
}

export default TestInstruction;
