import { queryKeys } from "@/api";
import { fetchEditorialCorners } from "@/api/services/editorial-corner.service";
import { IMAGE_BASE_URL } from "@/api/url";
import ViewAllButton from "@/components/customButtons/viewAllButton";
import { Badge } from "@/components/ui/badge";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { formatDate } from "@/utils/formatting/formatDate";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { CalendarDays, Clock4 } from "lucide-react";
import { useTranslation } from "react-i18next";

function EditorialCornerHome() {
  const { lang } = useParams({ from: "/$lang" });

  const { t } = useTranslation();

  const width = useBreakpoints("xl");

  const displayLimit = width ? 7 : 5;

  const { data: fetchData } = useQuery({
    queryKey: queryKeys.editorialsCornerKeys.editorialsCornerDetails(
      1,
      displayLimit,
    ),
    queryFn: () => fetchEditorialCorners({ page: 1, limit: displayLimit }),
    enabled: !!displayLimit,
  });

  const dataCount = fetchData?.totalCount || 0;
  const remainingCount = dataCount - displayLimit;

  return (
    <div className="w-full container px-4 py-5 mx-auto lg:mt-20">
      {/* Heading */}
      <div className="text-center md:text-start space-y-1 mb-12">
        <h3 className="inline-block py-1 text-xl sm:text-2xl xl:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
          {t("editorialCorner.title")}
        </h3>

        <p className="max-w-xl text-xs sm:text-sm xl:text-base text-gray-600 dark:text-gray-300">
          {t("editorialCorner.subtitle")}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 xl:gap-8">
        {fetchData?.data.map((item) => (
          <Link
            key={item._id}
            to="/$lang/editorials-corner/$slug"
            params={{
              lang,
              slug: item.slug, // 👈 make sure API returns slug
            }}
            preload="intent"
            className="block"
          >
            <div
              className="
              group relative overflow-hidden rounded-xl
              bg-white border border-sky-100/60 shadow-md
              transition-all duration-300 ease-in-out
              hover:-translate-y-1 hover:shadow-xl
              hover:border-sky-300
            "
            >
              {/* image section */}
              <div className="overflow-hidden relative">
                <img
                  src={IMAGE_BASE_URL + item?.image}
                  alt={item?.title || "Editorial image"}
                  className="
                    w-full h-48 object-cover
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                />

                {/* Tags */}
                <div className="absolute top-2 left-2 space-x-1">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant={"secondary"}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* description section */}
              <div className="px-4 space-y-3 py-4">
                {/* date and time */}
                <div className="flex gap-5 font-medium">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CalendarDays size={14} />
                    <p>{formatDate(item.publishedDate)}</p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock4 size={14} />
                    <p>5 mins read</p>
                  </div>
                </div>

                {/* title */}
                <div>
                  <h2
                    className="
                    line-clamp-3 font-semibold text-title-darkblue
                    transition-colors duration-300
                    group-hover:text-button-blue
                  "
                  >
                    {item.metaTitle}
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {/* View More Card */}
        {remainingCount > 0 && (
          <Link
            to="/$lang/editorials-corner"
            params={{ lang }}
            preload="intent"
            aria-label="View all editorials"
            className="
              group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]
              flex flex-col justify-center items-center gap-4 p-6
              bg-soft-blue-gradient rounded-lg border border-gray-200
            "
          >
            <span className="text-lg sm:text-xl lg:text-2xl text-button-blue font-bold text-center">
              +{remainingCount} {t("moreEditorials.title")}
            </span>

            <ViewAllButton>
              <span>{t("viewAll")}</span>
            </ViewAllButton>
          </Link>
        )}
      </div>
    </div>
  );
}

export default EditorialCornerHome;
