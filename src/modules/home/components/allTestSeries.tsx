import { queryKeys } from "@/api";
import { QUERY_CONFIG } from "@/api/config";
import { homeAPI } from "@/api/services/getHomeData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AllExamsCards } from "./allExamsCards";

function AllTestSeries() {
  const [slug, setSlug] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.home.paidTestCategories(),
    queryFn: homeAPI.getDashboardPaidCategories,
    ...QUERY_CONFIG.static,
  });

  const fetchFirstData = data?.data.featureCategories[0].slug;

  // Derive activeId from slug or use first category
  const activeId =
    data?.data.featureCategories.find((item) => item.slug === slug)?._id ??
    data?.data.featureCategories[0]._id ??
    null;

    // console.log(fetchFirstData);

  const { t } = useTranslation();

  const [api, setApi] = useState<CarouselApi | null>(null);

  const handleClick = (slug: string) => {
    setSlug(() => slug);
  };

  return (
    <div className="w-full container px-4 py-5 mx-auto lg:mt-20">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-40 lg:justify-between lg:items-start">
        {/* Heading */}
        <div className="text-center md:text-start space-y-1 lg:shrink-0">
          <h3 className="py-1 text-xl sm:text-2xl xl:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
            {t("allTestSeries.title")}
          </h3>

          <p className="max-w-xl text-xs sm:text-sm xl:text-base text-gray-600 dark:text-gray-300">
            {t("allTestSeries.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div>Loading</div>
        ) : (
          <div className="w-full lg:flex-1 overflow-hidden">
            {/* CAROUSEL WRAPPER */}
            <div className="group space-y-2 xl:space-y-2">
              <div className="justify-end flex gap-2 px-2 sm:px-4 py-2">
                {/* LEFT BUTTON */}
                <button
                  onClick={() => api?.scrollPrev()}
                  className="
                            z-20
                            h-7 w-7 sm:h-8 sm:w-8 xl:h-9 xl:w-9 rounded-full
                            bg-white/70 backdrop-blur-md
                            shadow-lg border border-white/40
                            flex items-center justify-center
                            text-gray-700
                            transition-all duration-300
                            hover:bg-blue-600 hover:text-white
                            hover:scale-110
                            active:scale-95
                        "
                >
                  <ChevronLeft
                    strokeWidth={1.5}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </button>

                {/* RIGHT BUTTON */}
                <button
                  onClick={() => api?.scrollNext()}
                  className="
                            z-20
                            h-7 w-7 sm:h-8 sm:w-8 xl:h-9 xl:w-9 rounded-full
                            bg-white/70 backdrop-blur-md
                            shadow-lg border border-white/40
                            flex items-center justify-center
                            text-gray-700
                            transition-all duration-300
                            hover:bg-blue-600 hover:text-white
                            hover:scale-110
                            active:scale-95
                        "
                >
                  <ChevronRight
                    strokeWidth={1.5}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </button>
              </div>
              {/* CAROUSEL */}
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  dragFree: true,
                  containScroll: "trimSnaps",
                }}
              >
                <CarouselContent className="-ml-2">
                  {data?.data.featureCategories.map((item) => (
                    <CarouselItem key={item._id} className="pl-2 basis-auto">
                      <button onClick={() => handleClick(item.slug)}>
                        <div
                          className={`${
                            activeId === item._id
                              ? "bg-blue-500 text-white"
                              : "text-gray-700 bg-gray-100"
                          } rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-center shadow-xs font-medium whitespace-nowrap text-xs sm:text-sm`}
                        >
                          <p>{item.categoryName}</p>
                        </div>
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        )}
      </div>

      {/* Cards */}
      {fetchFirstData && <AllExamsCards slug={slug ?? fetchFirstData} />}
    </div>
  );
}

export default AllTestSeries;
