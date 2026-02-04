import { testDescriptionKey } from "@/api";
import { testAPI } from "@/api/services/getTestDetails";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  // BookOpen,
  ChevronRight,
  // FileText,
  // HeartPlus,
  // Share2,
} from "lucide-react";
// import { ImageWithFallback } from "../fallback/ImageWithFallback";


import { useEffect } from "react";

import { useTestDescriptionStore } from "@/stores/testStore";
import type { TestDetailsData } from "@/api/model/test-model";

import { TestHeaderSkeleton } from "./skeleton/testHeaderSkeleton";
import BuyNowSection from "./buyNowSection";
import TitleSection from "./titleSection";
import BuyNowSkeleton from "./skeleton/buyCardSkeleton";
// import TestDescriptionMobile from "./testDescriptionMobile";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import TestDescription from "./descriptionDetails/testDescription";
import TestDescriptionMobile from "./descriptionDetails/testDescriptionMobile";
import MobileTestHeaderSkeleton from "./skeleton/mobileTestHeaderSkeleton";


interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}
function DescriptionModule() {
  //Check the width to render test series conditionally
  const width = useBreakpoints("lg");
  // console.log("width",width);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  const { examCategory, testSlug } = useParams({
    from: "/$lang/exams/$examCategory/$testSlug/",
  });

  //get the Setter function from zustand
  const { setTestData }: StoreDataProps = useTestDescriptionStore();

  const { data, isLoading } = useQuery({
    queryKey: testDescriptionKey.testDetails(examCategory, testSlug),
    queryFn: () => testAPI.getTestDetails(testSlug),
  });

  // console.log("data is",data);
  // console.log("isLoading", isLoading);
  // console.log("is data", data);

  useEffect(() => {
    if (data?.data) {
      setTestData(data.data);
    }
  }, [data, setTestData]);

  // const fetchTestData = data?.data;

  // console.log(fetchTestData);

  // console.log(IMAGE_BASE_URL + fetchTestData?.image);

  
  return (
    <div className="w-full bg-soft-blue-gradient h-full min-h-screen">
      <div className="w-full  h-1/2">
        <div className="w-full container px-4 py-5 mx-auto">
          {/* bread crumbs   */}
          <div className="flex gap-2 text-xs text-[#1B4965] items-center pb-6 xl:pb-8">
            <span>Home</span>
            <ChevronRight size={18} />

            <span>Exams</span>
            <ChevronRight size={18} />

            <span className="text-button-blue">MPPSC Mock Test</span>
          </div>

          {/* Header section */}
         {isLoading && (width ? <TestHeaderSkeleton /> : <MobileTestHeaderSkeleton />)}

          {!isLoading && (
            <div>
              <TitleSection />
            </div>
          )}


          {/* Description section */}
          <div className="grid grid-rows-2 lg:grid-cols-12 gap-7">
            {/* Description Section */}
            <div className="col-span-9 overflow-x-auto">
              {width ? <TestDescription /> : <TestDescriptionMobile />}
            </div>

            {/* Buy Now section */}

            <div className=" col-span-3 lg:-mt-64 lg:mr-5 lg:z-10 ">
              {isLoading ? <BuyNowSkeleton /> : <BuyNowSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionModule;
