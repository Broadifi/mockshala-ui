import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { QUERY_CONFIG } from "@/api/config";
import { homeAPI } from "@/api/services/getHomeData";
import { queryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { IMAGE_BASE_URL } from "@/api/url";
import FilterExamByCategory from "./filterExamByCategory";
import { ExamModuleSkeleton } from "./skeleton/ExamModuleSkeleton";

export  function ExamModule() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.home.paidTestCategories(),
    queryFn: homeAPI.getDashboardPaidCategories,
    ...QUERY_CONFIG.static,
  });

  const categories = data?.data?.featureCategories ?? [];

  const [activeIndex, setActiveIndex] = React.useState<string | null>(null);
  const [menuOpen, setMenuOpen] = React.useState<string>("");

  const fetchFirstData = data?.data?.featureCategories?.[0]?.slug;
  return (
    <NavigationMenu value={menuOpen} onValueChange={setMenuOpen}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Exams</NavigationMenuTrigger>
          <NavigationMenuContent>
            {isLoading ? (
              <ExamModuleSkeleton />
            ) : (
              <div className="grid grid-cols-12 w-150 xl:w-212 h-120 xl:h-106">
                {/* LEFT SIDEBAR */}
                <div className="col-span-5 xl:col-span-4 border-r exam-card-gradient overflow-y-auto rounded-md">
                  {categories.map((cat) => (
                    <div
                      key={cat._id}
                      onMouseEnter={() => setActiveIndex(cat.slug)}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm
                      border-l-4 transition
                      ${
                        activeIndex === cat.slug
                          ? "bg-white border-button-blue font-medium"
                          : "border-transparent hover:bg-white"
                      }
                    `}
                    >
                      {/* icon */}
                      <ImageWithFallback
                        src={IMAGE_BASE_URL + cat.image}
                        alt={cat.categoryName || "Test series image"}
                        className="w-6 h-6 rounded"
                      />
                      <p className="text-title-darkblue font-medium">
                        {cat.categoryName}
                      </p>
                    </div>
                  ))}
                </div>

                {/* RIGHT SIDE CARDS */}
                <div className="col-span-7 xl:col-span-8 p-4 xl:p-6 overflow-y-auto">
                  {fetchFirstData && (
                    <FilterExamByCategory
                      slug={activeIndex ?? fetchFirstData}
                      onTestClick={() => setMenuOpen("")}
                    />
                  )}
                </div>
              </div>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
