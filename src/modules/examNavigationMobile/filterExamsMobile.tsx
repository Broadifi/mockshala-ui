import { homeQueryKey } from "@/api";
import { homeAPI } from "@/api/services/getHomeData";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { formatName } from "@/utils/formatting/formatName";
import { ExamCardsSkeleton } from "../exams/skeleton/ExamCardsSkeleton";

interface PropsType {
  slug: string;
  onTestClick?: () => void;
}

function FilterExamsMobile({ slug, onTestClick }: PropsType) {
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
        <div className="flex flex-col gap-4">
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
              className="flex items-center justify-between gap-3 border border-sky-200
               rounded-lg px-2 py-3"
            >
              <div className="text-sm text-title-darkblue font-medium">
                {formatName(test.name)}
              </div>

              <ChevronRight className="text-gray-400 shrink-0" size={20} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterExamsMobile;
