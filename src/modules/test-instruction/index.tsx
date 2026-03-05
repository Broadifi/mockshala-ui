import { useEffect } from "react";
import Instruction from "./instruction";
import InstructionFooter from "./InstructionFooter";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { mockShalaLogo } from "@/assets";


function TestInstruction() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

 
  return (
    <div className="w-full  flex flex-col gap-6">
      <div className="w-full bg-white shadow-md sticky top-0 z-50">
        <header className=" container px-4 py-3 mx-auto">
          <ImageWithFallback
            src={mockShalaLogo}
            alt="mockShalaLogo"
            className="h-7 xl:h-8 w-auto"
          />
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
