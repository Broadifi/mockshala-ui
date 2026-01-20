import { homeQueryKey } from '@/api'
import { QUERY_CONFIG } from '@/api/config'
import { homeAPI } from '@/api/services/getHomeData'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, ChevronRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IMAGE_BASE_URL } from '@/api/url'

function PopularExam() {
    const {data: popularTestData} = useQuery({
        queryKey: homeQueryKey.popularTests(),
        queryFn: homeAPI.getPopularTestData,

        ...QUERY_CONFIG.static
    })

    console.log(popularTestData);
    
  return (
    <div>
        <div className="w-full  px-4 py-2 max-w-7xl mx-auto mt-20 space-y-2">
            {/* header */}
            <div className='flex justify-between'>
                <div className='flex flex-col gap-3 text-left'>
                    <h1 className='text-3xl text-secondary-foreground font-bold'>
                        Popular Exams</h1>
                    
                    <h3 className='text-gray-600'>Choose your exam and start preparing today</h3>
                </div>

                <div className='flex items-center'>
                    <Button variant={'ghost'} className='text-blue-600 '>
                        View All
                        <ArrowRight />
                    </Button>
                </div>
            </div>

            {/* exams */}
            <div className='w-full'>
                <Carousel
                    opts={{
                        align: "center",
                    }}
                    className="w-full max-w-7xl p-5"
                    >
                    <CarouselContent 
                        className='p-1'
                    >
                        {popularTestData?.data.map((item) => (
                        <CarouselItem 
                            key={item._id} 
                            className="basis-1/2 sm:basis-1/3  lg:basis-1/4 xl:basis-1/5 p-4 sm:p-4">       
                                <div 
                                    className="group flex flex-col h-60  border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg overflow-auto transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103">
                                    <div className=' h-30 flex items-center justify-center border-b'>
                                        <img
                                            src={IMAGE_BASE_URL + item.image}
                                            alt={item.name}
                                            className="h-24 aspect-auto"
                                            />
                                    </div>
                                    <div className='flex flex-col gap-4 '>
                                        <div className='h-14 overflow-auto px-3 py-2'>
                                            <h1 className='leading-snug font-medium text-sm text-center text-gray-600  group-hover:text-blue-600'>{item.name}</h1>
                                        </div>
                                        <div className='pb-4 mx-auto'>
                                            <button 
                                            className='flex gap-1 items-center justify-center text-sm px-4 py-1 rounded-lg shadow-sm 
                                                bg-blue-100 group-hover:bg-blue-500 text-blue-600 group-hover:text-white transition-colors duration-300 group-hover:shadow-lg'>View Tests
                                                 <ChevronRight size={"15"}/>
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>                                     
                        </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>
        </div>
    </div>
  )
}

export default PopularExam