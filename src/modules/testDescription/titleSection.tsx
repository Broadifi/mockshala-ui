import React from "react";
import { question, testCount, validityImg } from "@/assets";
import { useTestDescriptionStore } from "@/stores/testStore";
import type { TestDetailsData } from "@/api/model/test-model";
import { IMAGE_BASE_URL } from "@/api/url";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

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
      {/* Mobile View */}
      <div
        className="flex  flex-col gap-2 lg:hidden  rounded-2xl  bg-white/50backdrop-blur-2xl
            border border-white/60  ring-1 ring-white/30 shadow-lg 
            px-4 py-4 mb-6"
      >
        {/* Image and Header */}
        <div className="flex gap-4 mb-3 items-center">
          <div className="">
            <div className=" w-full rounded-full  h-16 sm:h-20 p-2 relative overflow-hidden">
              <img
                src={IMAGE_BASE_URL + fetchTestData?.image}
                alt={fetchTestData?.name || "Test series image"}
                className="object-contain rounded-full h-full w-full relative z-20"
              />

              <img
                src={IMAGE_BASE_URL + fetchTestData?.image}
                alt={fetchTestData?.name || "Test series image"}
                className="object-cover rounded-full absolute inset-0 h-full w-full z-10 blur-[3px]"
              />
            </div>
          </div>

          <div >
            <h1 className="text-xl sm:text-2xl text-[#002966] text-shadow-xs  font-medium">
              {fetchTestData?.name}
            </h1>
          </div>
        </div>

        {/* Features */}
        <div className="flex gap-10 items-center text-[#002966] pb-4">
          <div className="flex items-center gap-2 text-sm">
            <img src={testCount} alt="questions" className="h-6 shadow-2xl" />
            <div>
              {/* <p>Total tests</p> */}
              <span>{totalTests} Total Tests</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <img src={question} alt="questions" className="h-6 shadow-2xl" />

            <span>{totalQuestions} Total Questions</span>
          </div>

           <div className="hidden sm:flex items-center gap-2 text-sm">
              <img
                src={validityImg}
                alt="questions"
                className="h-5 shadow-2xl"
              />

              <span>{validity} months validity</span>
            </div>
        </div>

        {/* Price and buy now */}  
          <div className=" mb-3 flex justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-button-blue">₹700</p>
                <p className="text-gray-500 line-through text-base ">
                  ₹{1000}
                </p>
              </div>

              <div className="flex ">   
                <Badge className="bg-green-600 text-white">30% off</Badge>
              </div>
            </div>

            <div className="flex sm:hidden items-end">
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Clock size={14} />
                <p>{validity} months{" "}</p>
              </div>
            </div>

          </div>
      

        <div className="mb-2">
          {/* Buy Now */}
         
            <Button
              className="w-full bg-gradient-to-r from-button-sky text-lg
                  to-button-blue 
                  hover:from-blue-600 hover:to-blue-600 hover:shadow-md
                  text-white font-semibold
                  transition-colors duration-200 hover:cursor-pointer"
            >
              Buy Now
            </Button>      
          
        </div>

      </div>

      {/* Above large screen */}
      <div className="hidden lg:flex flex-col">
        <div
          className="  rounded-2xl
            bg-white/50
            backdrop-blur-2xl
            border border-white/60
            ring-1 ring-white/30
            shadow-lg px-6 py-8 mb-6"
        >
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
              National Testing Agency (NTA) for admission to undergraduate
              programs in 200+ top Indian universities such as DU, BHU, JNU, and
              AMU. With increasing competition in 2026, structured preparation
              through mock tests and practice papers is essential.
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
              <img
                src={validityImg}
                alt="questions"
                className="h-6 shadow-2xl"
              />

              <span>{validity} months validity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitleSection;
