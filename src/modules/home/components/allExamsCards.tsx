import { homeQueryKey } from "@/api";
import { homeAPI } from "@/api/services/getHomeData";
import { IMAGE_BASE_URL } from "@/api/url";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageWithFallback } from "@/modules/fallback/ImageWithFallback";
import { useQuery } from "@tanstack/react-query";
import {  BookOpen, Clock, Languages, MoveRight, Target } from "lucide-react";


export function AllExamsCards() 
{
  const {data: allExamData, isLoading, error} = useQuery({
        queryKey:homeQueryKey.allTestSeries(),
        queryFn: ()=> homeAPI.getAllExamByCategory("utta-prad-exam")
    })

    console.log(allExamData);

    const dataCount = allExamData?.totalCount || 0;
    const gridCount = 8;

    const formatName = (name?: string): string => {
    if (!name) return ''; // handle undefined / null / empty
    return String(name) // coerce non-strings safely
      .trim() // remove leading/trailing spaces
      .split(/\s+/) // split on one or more whitespace chars
      .filter(Boolean) // remove any empty tokens
      .map(
        token => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase()
      )
      .join(' ');
  };

  return (
   <section className='py-8 md:py-16 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

       
       
        {/* Test Series Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 xl:gap-10 mb-12'>
          {allExamData?.data?.map(series => (
            <div
              key={series._id}
              className='flex flex-col border border-gray-200 p-3 gap-3
              rounded-lg group shadow-xs hover:shadow-sm transition-all duration-300 hover:scale-[1.02] '
            >
              <div className="py-2 flex justify-items-start">
                <div>
                <ImageWithFallback
                  src={IMAGE_BASE_URL + series.image}
                  alt={series.name || 'Test series image'}
                  className='w-full h-20 object-contain rounded-lg'
                />
                </div>
              </div>

              <div className='flex-1 overflow-y-auto'>
                <div className='text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2'>
                  {formatName(series.name)}
                </div>
              </div>

              <div className='space-y-4 flex-1'>
                {/* Stats */}
                <div className='grid grid-cols-3 gap-2 text-center'>
                  <div className='flex flex-col items-center'>
                    <BookOpen className='h-4 w-4 text-blue-600 mb-1' />
                    <span className='text-xs text-gray-500'>
                      {series.tests.length} Tests
                    </span>
                  </div>

                  <div className='flex flex-col items-center'>
                    <Languages className='h-4 w-4 text-green-600 mb-1' />
                    <span className='text-xs text-gray-500'>
                      Hindi, English
                    </span>
                  </div>

                  <div className='flex flex-col items-center'>
                    <Clock className='h-4 w-4 text-purple-600 mb-1' />
                    <span className='text-xs text-gray-500'>3 months</span>
                  </div>
                </div>

                {/* Features */}
                <div className='space-y-1 h-15 overflow-auto pt-2 border-t'>
                  <div className='flex flex-wrap gap-1'>
                    {Object.entries(series.countByTestType).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className='flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 '
                        >
                          <Target className='h-3 w-3 mr-2 text-green-600' />
                          <span className='font-semibold '>{value}</span>
                          <span > {key.replace(/_/g, ' ')}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Pricing */}

                {/* CTA */}
                <div>
                  <button
                    // to={'/dashboard/$examCategory/$testSlug'}
                    // params={{
                    //   examCategory: series.examCategory.slug,
                    //   testSlug: series.slug,
                    // }}
                    className='w-full flex justify-center items-center border-2 border-blue-600 text-blue-600 hover:bg-blue-700  hover:text-white px-4 py-1.5 font-semibold rounded-md'
                  >
                    Start Test Series
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div
            className='group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-center 
          flex justify-center items-center bg-gradient-to-br from-blue-100 via-violet-100 to-indigo-100'
          >
            <span className='text-xl text-blue-600 font-bold'>
              {dataCount - gridCount} More Tests
            </span>
            <div
              className='bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 
                flex gap-2 justify-center items-center rounded-md text-white text-lg font-semibold border border-gray-100'
            >
              <button>View All</button>
              <MoveRight />
            </div>
          </div>
        </div>

    
      </div>
   </section>


  )
}
