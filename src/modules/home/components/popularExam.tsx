import { homeQueryKey } from '@/api'
import { QUERY_CONFIG } from '@/api/config'
import { homeAPI } from '@/api/services/getHomeData'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { IMAGE_BASE_URL } from '@/api/url'
import * as React from "react"

function PopularExam() {
  const { data: popularTestData } = useQuery({
    queryKey: homeQueryKey.popularTests(),
    queryFn: homeAPI.getPopularTestData,
    ...QUERY_CONFIG.static,
  })

  const [api, setApi] = React.useState<CarouselApi | null>(null)

  return (
    <div className="w-full px-4 py-2 max-w-7xl mx-auto mt-20 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2 text-start">
          <h1 className="text-3xl font-bold text-secondary-foreground">
            Popular Exams
          </h1>
          <p className="text-gray-600">
            Choose your exam and start preparing today
          </p>
        </div>
      </div>

      {/* CAROUSEL WRAPPER */}
      <div className="relative group">
        {/* LEFT BUTTON */}
        <button
          onClick={() => api?.scrollPrev()}
          className="
            absolute -left-2.5 top-1/2 -translate-y-1/2 z-20
            h-10 w-10 rounded-full bg-white shadow-md border
            flex items-center justify-center
            transition-all duration-300
            hover:bg-blue-600 hover:text-white
          "
        >
          <ChevronLeft />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => api?.scrollNext()}
          className="
            absolute -right-2.5 top-1/2 -translate-y-1/2 z-20
            h-10 w-10 rounded-full bg-white shadow-md border
            flex items-center justify-center
            transition-all duration-300
            hover:bg-blue-600 hover:text-white
          "
        >
          <ChevronRight />
        </button>

        {/* CAROUSEL */}
        <Carousel
          setApi={setApi}
            opts={{
                align: "start",        // 🔥 IMPORTANT
                loop: true,
                slidesToScroll: 1,     // 🔥 Move exactly ONE card
                containScroll: "trimSnaps", // 🔥 Prevent half snapping
            }}
                    className="w-full px-10"
        >
          <CarouselContent className='mx-auto'>
            {popularTestData?.data.map((item) => (
              <CarouselItem
                key={item._id}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/4 p-4"
              >
                <div className="
                  group/card flex flex-col h-60
                  border border-sky-200 rounded-2xl
                  shadow-sm hover:shadow-lg
                  transition-all duration-300
                  hover:-translate-y-1
                ">
                  {/* IMAGE */}
                  <div className="h-32 flex items-center justify-center border-b">
                    <img
                      src={IMAGE_BASE_URL + item.image}
                      alt={item.name}
                      className="h-24"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-1 justify-between p-3">
                    <h1 className="
                      text-sm text-center font-medium text-gray-600
                      group-hover/card:text-blue-600
                    ">
                      {item.name}
                    </h1>

                    <button
                      className="
                        mt-3 mx-auto flex items-center gap-1
                        px-4 py-1 text-sm rounded-lg
                        bg-blue-100 text-blue-600
                        transition-all duration-300
                        group-hover/card:bg-blue-600
                        group-hover/card:text-white
                      "
                    >
                      View Tests
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* VIEW ALL */}
      <div className="flex justify-center pt-4">
        <Button
          variant="ghost"
          className="
            border border-blue-200 bg-blue-100 text-blue-600
            transition-all duration-300
            hover:bg-blue-600 hover:text-white
          "
        >
          View All Exams
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default PopularExam
