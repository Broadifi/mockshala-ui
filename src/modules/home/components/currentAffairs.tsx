import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar, Clock4, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { homeQueryKey } from "@/api";
import { homeAPI } from "@/api/services/getHomeData";
import { QUERY_CONFIG } from "@/api/config";
import { IMAGE_BASE_URL } from "@/api/url";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { Link, useParams } from "@tanstack/react-router";
import { formatDate } from "@/utils/formatting/formatDate";

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
    <div className=" w-full container px-4 py-2 mx-auto lg:mt-20">
      <div className="flex justify-between">
        {/* HEADER */}
        <div className="text-center md:text-start xl:space-y-2">
          <h3
            className="py-1 text-2xl xl:text-4xl font-bold 
          bg-linear-to-r from-title-gradient-blue to-title-gradient-sky 
          bg-clip-text text-transparent"
          >
            {t("currentAffairs.title")}
          </h3>
          <p className="text-sm xl:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            {t("currentAffairs.subtitle")}
          </p>
        </div>

        {/* testing */}
        <div className="flex items-center">
          <Link
            to="/$lang/current-affairs"
            params={{ lang: baseLanguage }}
            search={{}}
          >
            <button
              className="text-button-blue flex items-center gap-1 font-medium 
              cursor-pointer hover:bg-gray-100 p-2 rounded-lg hover:shadow-md hover:-translate-y-1
              transition-all duration-300"
            >
              View All
              <ArrowRight size={17} />
            </button>
          </Link>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full mt-6 sm:mt-8 "
      >
        <CarouselContent>
          {currentAffairsData?.data.map((item) => (
            <CarouselItem
              key={item._id}
              className="basis-1/1 sm:basis-1/2 lg:basis-1/4 p-4 group"
            >
              <div className=" transition-transform duration-300 ease-in-out group-hover:scale-102 group-hover:-translate-y-2 bg-white rounded-xl shadow-md border border-sky-100/60 space-y-3">
                {/* image section */}
                <div className="overflow-hidden relative">
                  <img
                    src={IMAGE_BASE_URL + item?.image}
                    alt={item?.title || "Test series image"}
                    className="object-contain  h-full w-full rounded-t-xl"
                  />

                  <div className="absolute top-2 left-2">
                    <Badge className="bg-button-blue">{item.tags[0]}</Badge>
                  </div>
                </div>

                {/* description section */}
                <div className="px-4 space-y-3 py-1">
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

                  {/* title section */}
                  <div>
                    <h2 className="line-clamp-2 font-semibold text-title-darkblue">
                      {item.title}
                    </h2>
                  </div>

                  {/* tag section */}
                  <div className="flex gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <Badge variant="outline">{tag}</Badge>
                    ))}
                  </div>

                  {/* read more section */}

                  <div className="flex justify-center my-5 px-3 py-2 group-hover:bg-gray-100  rounded-lg cursor-pointer">
                    <button className="text-sm text-button-blue flex gap-2 cursor-pointer group-hover:text-gray-700">
                      Read Full Article
                      <ExternalLink
                        size={16}
                        className="cursor-pointer group-hover:text-gray-600"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}

export default CurrentAffairs;
