import React from "react";
import { Badge } from "@/components/ui/badge";
import ButtonCustom from "@/components/buttonCustom";

import { IMAGE_BASE_URL } from "@/api/url";
import { useTestDescriptionStore } from "@/stores/testStore";
import type { TestDetailsData } from "@/api/model/test-model";
import { BookOpen, FileText, HeartPlus, Share2 } from "lucide-react";

interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}

function BuyNowSection() {
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
    <div
      className="hidden lg:flex flex-col border border-white shadow-lg bg-buyNow-card 
                      rounded-2xl p-2 space-y-5 
                      w-full max-w-full box-border "
    >
      {/* Image div */}
      <div className="w-full rounded-t-2xl h-56 p-2 relative overflow-hidden">
        <img
          src={IMAGE_BASE_URL + fetchTestData?.image}
          alt={fetchTestData?.name || "Test series image"}
          className="object-contain rounded-t-lg h-full w-full relative z-2"
        />

        {/* <img
                    src={IMAGE_BASE_URL + fetchTestData?.image}
                    alt={fetchTestData?.name || "Test series image"}
                    className="object-cover absolute inset-0 h-full w-full z-1 blur-[3px]"
                  /> */}

        <img
          src={IMAGE_BASE_URL + fetchTestData?.image}
          alt={fetchTestData?.name || "Test series image"}
          className="object-cover absolute inset-0 h-full w-full z-1 blur-[3px]"
        />
      </div>

      {/* test price section */}
      <div className="px-2">
        {/* original price */}
        <div className="flex gap-2 justify-center mb-2">
          <p className="text-gray-500 line-through text-lg xl:text-xl">
            ₹{1000}
          </p>
          <Badge className="bg-green-600 text-white">30% off</Badge>
        </div>

        {/* discount price */}
        <div className="flex flex-col items-center mb-4">
          <p className="text-2xl xl:text-3xl font-bold text-button-blue">
            ₹700
          </p>
          <p className="text-sm xl:text-base text-gray-500">
            Validity for {validity} months{" "}
          </p>
        </div>

        {/* Buy now */}
        <div className="mb-4">
          <ButtonCustom title={"Buy Now"} />
        </div>

        {/* what you will get */}
        <div className="border-t py-4 space-y-2">
          <h3 className="font-medium text-sm text-gray-700 pb-1">
            What you'll get:
          </h3>
          <div className="text-gray-500 text-sm flex gap-2 items-center">
            <BookOpen size={18} className="text-button-blue" />
            <p>Access to {totalTests} mock tests</p>
          </div>

          <div className="text-gray-500 text-sm flex gap-2 items-center">
            <FileText size={18} className="text-button-blue" />
            <p> {totalQuestions} total questions</p>
          </div>
        </div>

        {/* Share and add to fav */}
        <div className="flex flex-col xl:flex-row items-center xl:justify-normal gap-4 xl:gap-8 pt-3 pb-5">
          <div className="flex gap-2 text-sm items-center hover:cursor-pointer">
            <Share2 size={18} className="text-gray-600" />
            <p className="text-[#1e4064] ">Share course</p>
          </div>

          <div className="flex gap-2 text-sm items-center hover:cursor-pointer">
            <HeartPlus size={18} className="text-gray-600" />
            <p className="text-[#1e4064] ">Add to favorites</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyNowSection;
