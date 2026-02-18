import { homeQueryKey } from "@/api";
import { QUERY_CONFIG } from "@/api/config";
import { homeAPI } from "@/api/services/getHomeData";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { IMAGE_BASE_URL } from "@/api/url";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "@tanstack/react-router";

function PopularExam() {
  //for translation
  const { t } = useTranslation();

   const { lang } = useParams({ from:'/$lang' })

  const { data: popularTestData } = useQuery({
    queryKey: homeQueryKey.popularTests(),
    queryFn: homeAPI.getPopularTestData,
    ...QUERY_CONFIG.static,
  });


  const [api, setApi] = React.useState<CarouselApi | null>(null);

  return (
    <div className=" w-full container px-4 py-2 mx-auto lg:mt-20">
      {/* HEADER */}
      <div className="text-center md:text-start xl:space-y-2">
        <h3
          className="inline-block py-1 text-2xl xl:text-4xl font-bold 
          bg-linear-to-r from-title-gradient-blue to-title-gradient-sky
         bg-clip-text text-transparent"
        >
          {t("popularTests.title")}
        </h3>
        <p className="text-sm xl:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
          {t("popularTests.subtitle")}
        </p>
      </div>

      {/* CAROUSEL WRAPPER */}
      <div className=" group xl:space-y-2">
        <div className="justify-end flex gap-2 px-4 mt-4 sm:mt-0">
          {/* LEFT BUTTON */}
          <button
            onClick={() => api?.scrollPrev()}
            className="
                 z-20 cursor-pointer
                h-8 xl:h-9 w-8 xl:w-9 rounded-full
                bg-white/70 backdrop-blur-md
                shadow-lg border border-white/40
                flex items-center justify-center
                text-gray-700
                transition-all duration-300
                hover:bg-blue-600 hover:text-white
                hover:scale-110
            "
          >
            <ChevronLeft strokeWidth={1.5} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => api?.scrollNext()}
            className="
                 z-20 cursor-pointer
                h-8 xl:h-9 w-8 xl:w-9 rounded-full
                bg-white/70 backdrop-blur-md
                shadow-lg border border-white/40
                flex items-center justify-center
                text-gray-700
                transition-all duration-300
                hover:bg-blue-600 hover:text-white
                hover:scale-110
            "
          >
            <ChevronRight strokeWidth={1.5} />
          </button>
        </div>
        {/* CAROUSEL */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
            containScroll: "trimSnaps",
          }}
          className="w-full "
        >
          <CarouselContent className="">
            {popularTestData?.data.map((item) => (
              <CarouselItem
                key={item._id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-4"
              >
                {/* GLASS CARD */}
                <div
                  className="
                    relative group/card h-49 md:h-60 xl:h-64 pt-2 ml-1
                    rounded-3xl
                    bg-white/60 backdrop-blur-xl
                    border border-white/60
                    shadow-sm
                    transition-all duration-500
                    hover:-translate-y-2 hover:shadow-lg
                  "
                >
                  {/* GRADIENT GLOW */}
                  <div
                    className="
                      absolute inset-0 rounded-3xl
                      bg-linear-to-br from-blue-100/40 to-sky-200/20
                      opacity-0 group-hover/card:opacity-100
                      transition-opacity duration-500
                      pointer-events-none
                    "
                  />

                  {/* IMAGE */}
                  <div className="relative h-18 md:h-26 flex items-center justify-center border-b border-white/30">
                    <img
                      src={IMAGE_BASE_URL + item.image}
                      alt={item.name}
                      className="h-16 md:h-24 object-contain transition-transform duration-300 group-hover/card:scale-105"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className=" relative flex flex-col justify-between h-[calc(100%-5rem)] md:h-[calc(100%-7rem)]
                   p-2 mt-1 md:p-3  lg:p-4 overflow-y-auto ">
                    <h1
                      className="
                      text-xs md:text-sm font-semibold text-center
                      text-gray-500
                      group-hover/card:text-blue-700
                      transition-colors
                    "
                    >
                      {item.name}
                    </h1>

                    <Link
                         to={'/$lang/exams/$examCategory/$testSlug'}
                     params={
                      {
                        lang: lang ,
                        examCategory: item.examCategory.slug,
                        testSlug: item.slug
                      }
                     }

                      className="
                        mx-auto md:mt-3 flex items-center gap-1 cursor-pointer
                        px-5 py-1.5 text-xs md:text-sm font-medium
                        rounded-full
                        bg-blue-500/10 text-blue-600
                        backdrop-blur
                        transition-all duration-300
                        group-hover/card:bg-blue-600
                        group-hover/card:text-white
                        group-hover/card:shadow-md
                      "
                    >
                      {t("popularTests.viewTests")}
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* VIEW ALL */}
      <div className="flex justify-center pt-6">
        <Button
          variant="ghost"
          className="
            px-6 py-2 rounded-full cursor-pointer
            border border-blue-200
            bg-blue-100/70 backdrop-blur
            text-blue-700 font-medium
            transition-all duration-300
            hover:bg-blue-600 hover:text-white
            hover:shadow-lg hover:-translate-y-1
          "
        >
          {t("popularTests.viewAllTests")}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default PopularExam;
