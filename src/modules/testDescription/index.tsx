import { testDescriptionKey } from "@/api";
import { testAPI } from "@/api/services/getTestDetails";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

// import { ImageWithFallback } from "../fallback/ImageWithFallback";

import { useEffect, useRef, useState } from "react";

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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { StickyTestHeader } from "./stickyTestHeader";

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

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyHeader(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-64px 0px 0px 0px", // offset for header height
      },
    );

    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  //Fetch params
  const { examCategory, testSlug, lang } = useParams({
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

  return (
    <div className="w-full bg-soft-blue-gradient h-full min-h-screen">
      <div className="w-full  h-1/2">
        <div className="w-full container px-4 py-5 mx-auto">
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

          {/* <div className="flex gap-2 text-xs text-[#1B4965] items-center pb-6 xl:pb-8">
            <span>Home</span>
            <ChevronRight size={18} />

            <span>Exams</span>
            <ChevronRight size={18} />

            <span className="text-button-blue">MPPSC Mock Test</span>
          </div> */}

          {/* Header section */}
          {isLoading &&
            (width ? <TestHeaderSkeleton /> : <MobileTestHeaderSkeleton />)}

          {/* Sticky header */}
          {/* <div
            className={`
            fixed top-0 left-0 right-0 z-50
            transition-transform duration-300
            ${showStickyHeader ? "translate-y-0" : "-translate-y-full"}
          `}
          >
            <StickyTestHeader title={data?.data.name ?? ""} />
          </div> */}

          {/* Spacer to avoid content jump */}
          {/* <div className={showStickyHeader ? "pt-12" : ""} /> */}

          {/* OBSERVER SENTINEL */}
          <div ref={headerRef} />

          {/* Main Header */}
          {!isLoading && <TitleSection />}

          {/* Description section */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
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
