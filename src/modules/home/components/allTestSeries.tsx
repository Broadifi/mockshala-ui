import { queryKeys } from '@/api'
import { QUERY_CONFIG } from '@/api/config'
import { homeAPI } from '@/api/services/getHomeData'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'


function AllTestSeries() {
    const {data} = useQuery({
        queryKey: queryKeys.home.allTestSeries(),
        queryFn: homeAPI.getDashboardPaidCategories,
        ...QUERY_CONFIG.static,
    })

    console.log(data?.data.featureCategories);

    const {t} = useTranslation()
    
    const [api, setApi] = useState<CarouselApi | null>(null);

  return (
     <div className=" w-full container px-4 py-2 mx-auto lg:mt-20">

        <div className='flex gap-40 justify-between'>
        {/* Heading */}
        <div className='text-center md:text-start mb-12 space-y-1'>
            <h3 className="py-1 text-2xl xl:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("allTestSeries.title")}
            </h3>
            
            <p className=" max-w-xl text-sm xl:text-base text-gray-600 dark:text-gray-300 ">
                {t("allTestSeries.subtitle")}
            </p>                   
        </div>

        {/* Categories List */}
        <div>
        {/* CAROUSEL WRAPPER */}
        <div className=" group xl:space-y-2">
            <div className="justify-end flex gap-2 px-4 mt-4 sm:mt-0">
                {/* LEFT BUTTON */}
                <button
                    onClick={() => api?.scrollPrev()}
                    className="
                        z-20
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
                        z-20
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
            dragFree: true,
            containScroll: "trimSnaps",
            }}
          
            >
            <CarouselContent className="mx-auto">
                {data?.data.featureCategories.map((item) => (
                <CarouselItem
                    key={item._id}
                    className="basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2"
                >
                   
                    <div className='rounded-xl p-2 text-center shadow-xs
                        bg-gray-200/60 font-medium text-gray-800'>
                        <p>{item.categoryName}</p>                                 
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            </Carousel>
        </div>
        </div>
        </div>
     </div>
  )
}

export default AllTestSeries