import { testDescriptionKey } from "@/api";
import { testAPI } from "@/api/services/getTestDetails";
import { IMAGE_BASE_URL } from "@/api/url";
import { question, testCount, validityImg } from "@/assets";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { BookOpen, ChevronRight, FileText } from "lucide-react";
// import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import TestDescription from "./testDescription";
import { useEffect } from "react";
import ButtonCustom from "@/components/buttonCustom";
import { useTestDescriptionStore } from "@/stores/testStore";
import type { TestDetailsData } from "@/api/model/test-model";

interface StoreDataProps{
  testData: TestDetailsData | null;
    setTestData: (data: TestDetailsData) => void;
    clearTestData: () => void;
}
function DescriptionModule() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  const { examCategory, testSlug } = useParams({
    from: "/$lang/exams/$examCategory/$testSlug/",
  });

  //get the Setter function from zustand
  const {setTestData}: StoreDataProps = useTestDescriptionStore()

  const { data } = useQuery({
    queryKey: testDescriptionKey.testDetails(examCategory, testSlug),
    queryFn: () => testAPI.getTestDetails(testSlug),
    
  });

  // console.log("data is",data);
  
  useEffect(() => {
    if (data?.data) {
      setTestData(data.data);
    }
  }, [data, setTestData]);

  const fetchTestData = data?.data;

  // console.log(fetchTestData);

  const totalTests = fetchTestData?.tests.length;

  const totalQuestions = fetchTestData?.tests.reduce(
    (sum, test) => sum + test.totalQuestions,
    0,
  );

  // validity
  let time = 0;
  if (fetchTestData) {
    time = fetchTestData?.durationTime / 30;
  }

  const validity = Math.floor(time);

  // console.log(IMAGE_BASE_URL + fetchTestData?.image);

  return (
    <div className="w-full bg-linear-to-r from-gray-100 via-blue-100/70 to-indigo-100 h-full min-h-screen">
      <div className="w-full  h-1/2">
        <div className="w-full container px-4 py-5 mx-auto">
          {/* bread crumbs   */}
          <div className="flex gap-2 text-xs text-[#1B4965] items-center pb-8">
            <span>Home</span>
            <ChevronRight size={18} />

            <span>Exams</span>
            <ChevronRight size={18} />

            <span>MPPSC Mock Test</span>
          </div>

          {/* Header section */}
          <div className="  rounded-2xl
            bg-white/50
            backdrop-blur-2xl
            border border-white/60
            ring-1 ring-white/30
            shadow-lg px-6 py-8 mb-6">
            {/* Title Section */}
            <div  
            >
              {/* Heading */}
              <div className="pb-4">
                <h1 className="text-4xl text-[#002966] text-shadow-xs max-w-3xl font-medium">
                  {fetchTestData?.name}
                </h1>
              </div>

              {/* Small description */}
              <div className="pb-8">
                <p className="text-sm text-[#1e4064]  max-w-3xl">
                  CUET UG 2026 is a national-level entrance exam conducted by
                  the National Testing Agency (NTA) for admission to
                  undergraduate programs in 200+ top Indian universities such as
                  DU, BHU, JNU, and AMU. With increasing competition in 2026,
                  structured preparation through mock tests and practice papers
                  is essential.
                </p>
              </div>

              {/* Features */}
              <div className="flex gap-10 items-center text-[#002966] pb-6">
                <div className="flex items-center gap-2 text-sm">
                  <img
                    src={testCount}
                    alt="questions"
                    className="h-8 shadow-2xl"
                  />
                  <div>
                    {/* <p>Total tests</p> */}
                    <span>{totalTests} Total Tests</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <img
                    src={question}
                    alt="questions"
                    className="h-8 shadow-2xl"
                  />

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

          <div className="grid grid-cols-12 gap-7">
            {/* Description Section */}
            <div className="col-span-9">
              <TestDescription />
            </div>

            {/* Buy Now section */}
            <div className="col-span-3 -mt-64 mr-5 z-10">
              <div className=" shadow-lg bg-white/80 rounded-2xl p-2 space-y-5">
                {/* Image div */}
                <div className="w-full rounded-t-2xl h-56 p-2 relative overflow-hidden">
                  <img
                    src={IMAGE_BASE_URL + fetchTestData?.image}
                    alt={fetchTestData?.name || "Test series image"}
                    className="object-contain rounded-t-lg h-full w-full relative z-2"
                  />

                  <img
                    src={IMAGE_BASE_URL + fetchTestData?.image}
                    alt={fetchTestData?.name || "Test series image"}
                    className="object-cover absolute inset-0 h-full w-full z-1 blur-[3px]"
                  />

                  {/* <ImageWithFallback
                    src={IMAGE_BASE_URL + fetchTestData?.image}
                    alt={fetchTestData?.name || "Test series image"}
                    className=" aspect-auto object-fill rounded-t-lg"
                  /> */}
                </div>

                {/* test price section */}
                <div className="px-2">
                  {/* original price */}
                  <div className="flex gap-2 justify-center mb-2">
                    <p className="text-gray-500 line-through text-xl">
                      ₹{1000}
                    </p>
                    <Badge className="bg-green-600 text-white">30% off</Badge>
                  </div>

                  {/* discount price */}
                  <div className="flex flex-col items-center mb-4">
                    <p className="text-3xl font-bold text-button-blue">₹700</p>
                    <p className="text-gray-500">
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
                      <p> {totalTests} mock tests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionModule;
