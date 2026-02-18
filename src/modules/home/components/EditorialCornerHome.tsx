import { queryKeys } from "@/api";
import { fetchEditorialCorners } from "@/api/services/editorial-corner.service";
import { IMAGE_BASE_URL } from "@/api/url";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatting/formatDate";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock4 } from "lucide-react";
import { useTranslation } from "react-i18next";

function EditorialCornerHome() {
    const { t } = useTranslation();

    const {data: fetchData} = useQuery({
      queryKey: queryKeys.editorialsCornerKeys.editorialsCornerDetails(1,7),
      queryFn: ()=> fetchEditorialCorners({page:1, limit:7})
    })

    console.log(fetchData);
    

  return (
    <div className="w-full container px-4 py-5 mx-auto lg:mt-20">
           {/* Heading */}
        <div className="text-center md:text-start space-y-1 lg:shrink-0 mb-12">
          <h3 className="inline-block py-1 text-xl sm:text-2xl xl:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
            {t("editorialCorner.title")}
          </h3>

          <p className="max-w-xl text-xs sm:text-sm xl:text-base text-gray-600 dark:text-gray-300">
            {t("editorialCorner.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 xl:gap-10">
          {fetchData?.data.map((item)=> (
            <div className=" transition-transform duration-300 ease-in-out group-hover:scale-[1.02] group-hover:-translate-y-2 bg-white rounded-xl shadow-md border border-sky-100/60 space-y-3">
                {/* image section */}
                <div className="overflow-hidden relative">
                  <img
                    src={IMAGE_BASE_URL + item?.image}
                    alt={item?.title || "Test series image"}
                    className="object-contain  h-full w-full rounded-t-xl"
                  />

                  <div className="absolute top-2 left-2 space-x-1">
                    
                       {item.tags.slice(0,2).map((tag) => (
                        <Badge key={tag} variant={"secondary"}>
                          {tag}
                        </Badge>
                      ))}       
                  </div>
                </div>

                {/* description section */}
                <div className="px-4 space-y-3 py-1">
                  {/* date and time */}
                  <div className="flex gap-5 font-medium">
                    <div className="flex items-center gap-1 text-xs  text-gray-500">
                      <CalendarDays size={14} />
                      <p>{formatDate(item.publishedDate)}</p>
                    </div>

                    <div className="flex items-center gap-1 text-xs  text-gray-500">
                      <Clock4 size={14} />
                      <p>5 mins read</p>
                    </div>
                  </div>

                  {/* title section */}
                  <div className="pb-4 xl:pb-5">
                    <h2 className="line-clamp-3 font-semibold text-title-darkblue">
                      {item.title}
                    </h2>
                  </div>
                  
                </div>
              </div>
          ))

          }
        </div>
    </div>
  )
}

export default EditorialCornerHome