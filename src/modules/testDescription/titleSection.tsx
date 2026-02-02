import React from "react";
import { question, testCount, validityImg } from "@/assets";
import { useTestDescriptionStore } from "@/stores/testStore";
import type { TestDetailsData } from "@/api/model/test-model";

interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}

function TitleSection() {
  const { testData: fetchTestData }: StoreDataProps = useTestDescriptionStore();

  // Total test count
  const totalTests = fetchTestData?.tests.length;

  // total questions no
  const totalQuestions = fetchTestData?.tests.reduce(
    (sum, test) => sum + test.totalQuestions,
    0,
  );

  let time = 0;
  if (fetchTestData) {
    time = fetchTestData?.durationTime / 30;
  }

  //course validity
  const validity = Math.floor(time);

  return (
    <div>
      {/* Heading */}
      <div className="pb-4">
        <h1 className="text-4xl text-[#002966] text-shadow-xs max-w-3xl font-medium">
          {fetchTestData?.name}
        </h1>
      </div>

      {/* Small description */}
      <div className="pb-8">
        <p className="text-sm text-[#1e4064] max-w-2xl  xl:max-w-3xl">
          CUET UG 2026 is a national-level entrance exam conducted by the
          National Testing Agency (NTA) for admission to undergraduate programs
          in 200+ top Indian universities such as DU, BHU, JNU, and AMU. With
          increasing competition in 2026, structured preparation through mock
          tests and practice papers is essential.
        </p>
      </div>

      {/* Features */}
      <div className="flex gap-10 items-center text-[#002966] pb-2 xl:pb-6">
        <div className="flex items-center gap-2 text-sm">
          <img src={testCount} alt="questions" className="h-8 shadow-2xl" />
          <div>
            {/* <p>Total tests</p> */}
            <span>{totalTests} Total Tests</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <img src={question} alt="questions" className="h-8 shadow-2xl" />

          <span>{totalQuestions} Total Questions</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <img src={validityImg} alt="questions" className="h-6 shadow-2xl" />

          <span>{validity} months validity</span>
        </div>
      </div>
    </div>
  );
}

export default TitleSection;
