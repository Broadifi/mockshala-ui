import { homeQueryKey } from "@/api";
import { homeAPI } from "@/api/services/getHomeData";
import { IMAGE_BASE_URL } from "@/api/url";
import { ImageWithFallback } from "@/modules/fallback/ImageWithFallback";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { BadgeQuestionMark, BookOpen, Clock } from "lucide-react";
import { AllExamsCardsSkeleton } from "./skeleton/allExamsCardsSkeleton";
// import { formatToK } from "@/utils/formatting/formatNumber";
import ViewAllButton from "@/components/customButtons/viewAllButton";
import { useTranslation } from "react-i18next";

interface PropsType {
  slug: string;
}
export function AllExamsCards({ slug }: PropsType) {
  const { lang } = useParams({ from: "/$lang" });
  // console.log("current slug is:",slug);
  const { t } = useTranslation();

  const {
    data: allExamData,
    isLoading,
    error,
  } = useQuery({
    queryKey: homeQueryKey.allTestSeries(slug),
    queryFn: () => homeAPI.getAllExamByCategory(slug),
    enabled: !!slug,
  });

  //  console.log(allExamData);

  const dataCount = allExamData?.totalCount || 0;
  const displayLimit = 7; // Show only 7 exam cards
  const displayData = allExamData?.data?.slice(0, displayLimit) || [];
  const remainingCount = dataCount - displayLimit;

  const formatName = (name?: string): string => {
    if (!name) return "";
    return String(name)
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase(),
      )
      .join(" ");
  };

  return (
    <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto ">
        {isLoading && <AllExamsCardsSkeleton />}

        {error && <p>Error: {error.message}</p>}

        {/* Test Series Grid - 2 rows with 4 columns */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 xl:gap-10 
        "
        >
          {/* Display 7 exam cards */}
          {displayData.map((series) => (
            <div
              key={series._id}
              className="flex flex-col border border-gray-200 p-2 sm:p-3 gap-3
              rounded-lg group shadow-xs hover:shadow-sm transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="sm:py-2 ">
                <div>
                  <ImageWithFallback
                    src={IMAGE_BASE_URL + series.image}
                    alt={series.name || "Test series image"}
                    className="w-full h-16 sm:h-20 object-contain rounded-lg"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="text-sm lg:text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {formatName(series.name)}
                </div>
              </div>

              <div className="space-y-4 flex-1">
                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-1 sm:gap-2 text-center">
                  <div className="flex sm:flex-col items-center gap-2 sm:gap-1">
                    <BookOpen className="h-4 w-4 text-blue-600 " />
                    <span className="text-xs text-gray-500">
                      {/* {series.tests.length} Tests */}
                      33 Tests 
                    </span>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2 sm:gap-1">
                    <BadgeQuestionMark className="h-4 w-4 text-green-600 " />
                    <span className="text-xs text-gray-500">
                      {/* {formatToK(series.totalQuestions)} Questions */}
                      2k Questions
                    </span>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2 sm:gap-1">
                    <Clock className="h-4 w-4 text-purple-600 " />
                    <span className="text-xs text-gray-500">3 months</span>
                  </div>
                </div>

                {/* Features
                <div className='space-y-1 h-15 overflow-auto pt-2 border-t'>
                  <div className='flex flex-wrap gap-1'>
                    {Object.entries(series.countByTestType).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className='flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300'
                        >
                          <Target className='h-3 w-3 mr-2 text-green-600' />
                          <span className='font-semibold'>{value}</span>
                          <span> {key.replace(/_/g, ' ')}</span>
                        </div>
                      )
                    )}
                  </div>
                </div> */}

                {/* Start */}
                <div>
                  <Link
                    to={"/$lang/exams/$examCategory/$testSlug"}
                    params={{
                      lang: lang,
                      examCategory: series.examCategory.slug,
                      testSlug: series.slug,
                    }}
                    className="text-sm lg:text-base w-full flex justify-center items-center border sm:border-2 mt-2 sm:mt-6 mb-1
                     border-blue-500 text-blue-600 hover:bg-blue-700 hover:text-white px-2 sm:px-4 py-1 sm:py-1.5 font-semibold rounded-md"
                  >
                    Start Test Series
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* View More Card - 8th position (last card in 2nd row) */}
          {remainingCount > 0 && (
            <Link
              to="/$lang/all-exams"
              params={{ lang }}
              preload="intent"
              aria-label="View all exams"
              className="
              group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]
              flex flex-col justify-center items-center gap-4 p-6
              bg-soft-blue-gradient rounded-lg border border-gray-200
            "
            >
              <span className="text-lg sm:text-xl lg:text-2xl text-button-blue font-bold text-center">
                +{remainingCount} {t("moreTest.title")}
              </span>

              <ViewAllButton>
                <span>{t("viewAll")}</span>
              </ViewAllButton>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
