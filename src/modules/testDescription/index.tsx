import { testDescriptionKey } from "@/api";
import { testAPI } from "@/api/services/getTestDetails";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

// import { ImageWithFallback } from "../fallback/ImageWithFallback";

import { useEffect } from "react";

import { useTestDescriptionStore } from "@/stores/testStore";

import { TestHeaderSkeleton } from "./skeleton/testHeaderSkeleton";
import BuyNowSection from "./buyNowSection";
import TitleSection from "./titleSection";
import BuyNowSkeleton from "./skeleton/buyCardSkeleton";
// import TestDescriptionMobile from "./testDescriptionMobile";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import TestDescription from "./descriptionDetails/testDescription";
import TestDescriptionMobile from "./descriptionDetails/testDescriptionMobile";
import MobileTestHeaderSkeleton from "./skeleton/mobileTestHeaderSkeleton";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function DescriptionModule() {
  //Check the width to render test series conditionally
  const width = useBreakpoints("lg");
  // console.log("width",width);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // });

  // const [showStickyHeader, setShowStickyHeader] = useState(false);

  //Fetch params
  const { examCategory, testSlug, lang } = useParams({
    from: "/$lang/exams/$examCategory/$testSlug/",
  });

  //get the Setter function from zustand
  const { setTests } = useTestDescriptionStore();

  const { data, isLoading } = useQuery({
    queryKey: testDescriptionKey.testDetails(examCategory, testSlug),
    queryFn: () => testAPI.getTestDetails(testSlug),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (data?.data?.tests) {
      setTests(data.data.tests);
    }
  }, [data, setTests]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 20) {
  //       console.log("testimggh");

  //       setShowStickyHeader(true);
  //     } else {
  //       setShowStickyHeader(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // run once on mount (important if page loads already scrolled)
  //   handleScroll();

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      {/* sticky header */}
      {/* {
        <div
          className={`bg-amber-300 p-5 z-50 shadow-2xl ${showStickyHeader ? "sticky top-13 md:top-15 lg:top-16 flex" : "hidden"}`}
        >
          Sticky Header
        </div>
      } */}

      <div className="w-full bg-soft-blue-gradient h-full min-h-screen pb-6 lg:pb-10 xl:pb-12">
        <div className="w-full  h-1/2">
          <div className="w-full container px-4 py-5 mx-auto ">
            {/* bread crumbs   */}

            <Breadcrumb>
              <BreadcrumbList className="text-xs md:text-sm text-[#1B4965] items-center pb-6 xl:pb-8">
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${lang}/`}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${lang}/exams`}>Exams</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-button-blue">
                    {data?.data.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Header section */}
            {isLoading &&
              (width ? <TestHeaderSkeleton /> : <MobileTestHeaderSkeleton />)}

            {/* Main Header */}
            {!isLoading && <TitleSection testData={data?.data} />}

            {/* Description section */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
              {/* Description Section */}
              <div className="col-span-9 overflow-x-auto">
                {width ? <TestDescription /> : <TestDescriptionMobile />}
              </div>

              {/* Buy Now section */}

              <div className=" col-span-3 lg:-mt-64 lg:mr-5 lg:z-10 ">
                {isLoading ? (
                  <BuyNowSkeleton />
                ) : (
                  <BuyNowSection testData={data?.data} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DescriptionModule;
