import { currentAffairsKeys } from "@/api"
import { QUERY_CONFIG } from "@/api/config";
import { fetchSimilarNews } from "@/api/services/current-affairs.services";
import { IMAGE_BASE_URL } from "@/api/url";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { formatDate } from "@/utils/formatting/formatDate";
import { useQuery } from "@tanstack/react-query"
import { Calendar, Clock4 } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";
import { useGlobalLanguage } from "@/stores/globalLanguageStore";

interface IdProps{
    id: string | undefined
}
function SimilarCurrentAffairs({id}:IdProps) {

    // const { currentLang } = useGlobalLanguage();
    
    //for translation
    const { t } = useTranslation();

    //fetch current select language from the previous current affair dashboard
    const { currentLang} = useGlobalLanguage();
    

    //fetch similar news
    const {data}= useQuery({
        queryKey: currentAffairsKeys.similarNews(id),
        queryFn: ()=> fetchSimilarNews(id ?? ''),
        enabled: !!id,
        ...QUERY_CONFIG.static,
    })

    // console.log(data);
    
    // const fetchData = data?.data
    
  return (
    <div className="border-t pt-5 mt-5">
         <div className="text-center md:text-start xl:space-y-2">
        <h1
          className="inline-block py-1 text-2xl xl:text-4xl font-bold 
          bg-linear-to-r from-title-gradient-blue to-title-gradient-sky 
          bg-clip-text text-transparent"
        >
          {t("similarCurrentAffairs.title")}
        </h1>
        
      </div>

      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full mt-2 sm:mt-4 "
      >
        <CarouselContent>
          {data?.data.map((item) => (
            <CarouselItem
              key={item._id}
              className=" basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 sm:p-4 group"
            >
              <div className="transition-transform duration-300 ease-in-out 
              group-hover:scale-102 group-hover:-translate-y-2 bg-white rounded-xl shadow-md border border-sky-100/60 space-y-3">
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

                  {/* tag section */}
                  {
                    item.tags.length>1 &&  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tags.slice(1).map((tag) => (
                      <Badge variant="outline" >{tag}</Badge>
                    ))}
                  </div>
                  }
                 

                  {/* title section */}
                  <div className="pb-4 xl:pb-5">
                    <h2 className="line-clamp-2 font-semibold text-title-darkblue">
                      {currentLang === "en"
                    ? item.title
                    : item.titleInHindi }
                    </h2>
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
  )
}

export default SimilarCurrentAffairs