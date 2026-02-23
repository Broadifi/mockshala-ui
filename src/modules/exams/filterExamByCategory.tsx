import { homeQueryKey } from "@/api";
import { homeAPI } from "@/api/services/getHomeData";
import { useQuery } from "@tanstack/react-query";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { IMAGE_BASE_URL } from "@/api/url";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { formatName } from "@/utils/formatting/formatName";
import { ExamCardsSkeleton } from "./skeleton/ExamCardsSkeleton";

interface PropsType {
  slug: string;
  onTestClick?: () => void;
}

function FilterExamByCategory({ slug, onTestClick }: PropsType) {
  const { data: allExamData, isLoading } = useQuery({
    queryKey: homeQueryKey.allTestSeries(slug),
    queryFn: () => homeAPI.getAllExamByCategory(slug),
    enabled: !!slug,
  });

  const { lang } = useParams({ from: "/$lang" });

  return (
    <div>
      {isLoading ? (
        <ExamCardsSkeleton />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {allExamData?.data.map((test) => (
            <Link
            key={test._id}
              to={"/$lang/exams/$examCategory/$testSlug"}
              params={{
                lang: lang,
                examCategory: test.examCategory.slug,
                testSlug: test.slug,
              }}
              onClick={onTestClick}
              className="flex items-center gap-3 border rounded-lg p-2 hover:shadow-sm transition"
            >
              <ImageWithFallback
                src={IMAGE_BASE_URL + test.image}
                alt={test.name || "Test series image"}
                className=" w-10 h-auto object-contain rounded-lg"
              />

              <div className="w-full">
                <div className="text-sm text-title-darkblue">
                  {formatName(test.name)}
                </div>
              </div>

              <ChevronRight className="text-gray-400 shrink-0" size={20} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterExamByCategory;
