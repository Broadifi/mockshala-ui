import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar, Clock4 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { homeQueryKey } from "@/api";
import { homeAPI } from "@/api/services/getHomeData";
import { QUERY_CONFIG } from "@/api/config";
import { IMAGE_BASE_URL } from "@/api/url";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { Link, useParams } from "@tanstack/react-router";
import { formatDate } from "@/utils/formatting/formatDate";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/modules/fallback/ImageWithFallback";

export function CurrentAffairs() {
  //for translation
  const { t } = useTranslation();

  //Fetch the language params
  const { lang } = useParams({ strict: false });

  const baseLanguage = lang ?? "en";

  const { data: currentAffairsData } = useQuery({
    queryKey: homeQueryKey.currentAffairs(),
    queryFn: homeAPI.getCurrentAffairsData,
    ...QUERY_CONFIG.static,
  });

  //   console.log("Affairs data", currentAffairsData);

  return (
    <div className=" w-full container  px-4 py-2 mx-auto lg:mt-20">
      {/* HEADER */}
      <div className="text-center md:text-start xl:space-y-2">
        <h3
          className="inline-block py-1 text-2xl xl:text-4xl font-bold 
          bg-linear-to-r from-title-gradient-blue to-title-gradient-sky 
          bg-clip-text text-transparent"
        >
          {t("currentAffairs.title")}
        </h3>
        <p className="text-sm xl:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
          {t("currentAffairs.subtitle")}
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full mt-6 sm:mt-8 "
      >
        <CarouselContent>
          {currentAffairsData?.data.map((item) => (
            <CarouselItem
              key={item._id}
              className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 md:p-4 group h-full"
            >
              <Link
                to={"/$lang/current-affairs/$slug"}
                params={{ lang: baseLanguage, slug: item.slug }}
                key={item._id}
                className="h-full block"
              >
              <div className="h-full flex flex-col transition-transform duration-300 ease-in-out group-hover:scale-[1.02] group-hover:-translate-y-2 bg-white rounded-xl shadow-md border border-sky-100/60 space-y-3">
                {/* image section */}
                <div className="overflow-hidden relative h-48 w-full bg-slate-50 rounded-t-xl shrink-0">
                  <ImageWithFallback
                    src={IMAGE_BASE_URL + item?.image}
                    alt={item?.title || "Test series image"}
                    className="object-cover h-full w-full"
                  />

                  <div className="absolute top-2 left-2">
                  {item.tags.length >0 && <Badge className="bg-button-blue/90 backdrop-blur-sm text-white shadow-md border-none text-[10px] lg:text-xs font-medium px-2.5 py-0.5 rounded-full">{item.tags[0]}</Badge>}
                  </div>
                </div>

                {/* description section */}
                <div className="px-4 space-y-3 lg:py-1 flex flex-col flex-1 h-full">
                  {/* date and time */}
                  <div className="flex gap-5 font-medium">
                    <div className="flex items-center gap-1 text-xs  text-gray-500">
                      <Calendar size={14} />
                      <p>{formatDate(item.publishedDate)}</p>
                    </div>

                    <div className="flex items-center gap-1 text-xs  text-gray-500">
                      <Clock4 size={14} />
                      <p>5 mins read</p>
                    </div>
                  </div>

                  <div className="min-h-[20px] lg:min-h-[28px] flex items-center">
                    {/* tag section */}
                    {item.tags.length > 1 && (
                      <div className="flex flex-wrap gap-2 items-center">
                        {item.tags.slice(1).map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 border-transparent text-[10px] lg:text-xs font-medium px-2.5 py-0.5 rounded-md"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* title section */}
                  <div className="pb-3 lg:pb-4 xl:pb-5 flex-1">
                    <h2 className="line-clamp-2 font-semibold text-title-darkblue text-sm lg:text-base">
                      {item.title}
                    </h2>
                  </div>
                </div>
              </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 cursor-pointer" />
        <CarouselNext className="right-4 cursor-pointer" />
      </Carousel>

      {/* View All */}
      <div className=" flex justify-center pt-6">
        <Link
          to="/$lang/current-affairs"
          params={{ lang: baseLanguage }}
          search={{}}
        >
          <Button
            variant="ghost"
            className="px-6 py-2 rounded-full cursor-pointer
            border border-blue-200
            bg-blue-100/70 backdrop-blur
            text-blue-700 font-medium
            transition-all duration-300
            hover:bg-blue-600 hover:text-white
            hover:shadow-lg hover:-translate-y-1
            "
          >
            {t("currentAffairs.viewAllButton")}
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CurrentAffairs;
