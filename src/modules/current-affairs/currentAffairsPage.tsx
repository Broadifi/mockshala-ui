import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearch } from "@tanstack/react-router";
import { Calendar, ListFilter, Tag } from "lucide-react";
import { useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";

import FilterCurrentAffairs from "./components/filterCurrentAffairs";
import FilterCurrentAffairSheet from "./components/filterCurrentAffairSheet";
import { LanguageSelector } from "./components/languageSelector";
import NoResultFound from "./components/no-result-found";
import { IMAGE_BASE_URL } from "@/api/url";
import SkeletonCurrentAffairsGrid from "./components/current-affair-skeleton";
import { formatDate, formatDateToISO } from "@/utils/formatting/formatDate";
import {
  fetchCurrentAffairAllTags,
  fetchCurrentAffairs,
} from "@/api/services/current-affairs.services";

import { currentAffairsKeys } from "@/api";

export default function CurrentAffairsPage() {
  const { lang } = useParams({ strict: false });

  const homepageLink = lang ?? "en";

  const { date, tags } = useSearch({ from: "/$lang/current-affairs/" });

  const saveScrollPosition = () => {
    sessionStorage.setItem(
      "currentAffairsScrollPosition",
      window.scrollY.toString(),
    );
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["currentAffairs", { date, tags }],
    queryFn: ({ pageParam = 1 }) =>
      fetchCurrentAffairs({
        page: pageParam,
        limit: 6,
        date: formatDateToISO(date),
        tags,
      }),
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more items to load
      if (lastPage && lastPage.hasNext) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    // Keep data in cache even when component unmounts
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  //   console.log("affairs data", data);

  const allItems = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data?.pages]);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(
      "currentAffairsScrollPosition",
    );
    if (savedPosition && allItems.length > 0) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition),
          behavior: "instant",
        });
        sessionStorage.removeItem("currentAffairsScrollPosition");
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [allItems]);

  useEffect(() => {
    refetch();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [date, tags, refetch]);

  //   Fetch unique tag filters from full API

  const { data: allTags } = useQuery({
    queryKey: currentAffairsKeys.newsFlags(),
    queryFn: () => fetchCurrentAffairAllTags(),
  });

  // console.log("all tags",allTags);

  const filters = Array.isArray(allTags?.data) ? allTags.data : [];

  // console.log(filters);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-r from-gray-100/50 via-blue-100/30 to-indigo-100/60">
      {/* for mobile view */}
      <div className="fixed lg:hidden top-16 left-0 right-0 z-50 bg-white">
        <div className="container mx-auto px-4 py-1 flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-gray-700">
                <ListFilter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-fit">
              <FilterCurrentAffairSheet filters={filters} />
            </SheetContent>
          </Sheet>
          <LanguageSelector />
        </div>
      </div>

      <div className="flex gap-8 px-4 pt-10 lg:pt-8 container mx-auto pb-8">
        <div className="hidden lg:block">
          <FilterCurrentAffairs filters={filters} />
        </div>

        <section className="w-full">
          <h2 className="text-3xl font-semibold">Latest Articles</h2>
          <p className="text-zinc-400 mb-4">
            Stay informed with the latest news and insights
          </p>

          {/* Loading Skeleton */}
          {isLoading && allItems.length === 0 && (
            <SkeletonCurrentAffairsGrid count={6} />
          )}

          {/* Infinite Scroll Content */}
          {allItems.length > 0 && (
            <InfiniteScroll
              dataLength={allItems.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={
                <div className="mt-6">
                  <SkeletonCurrentAffairsGrid count={3} />
                </div>
              }
              endMessage={
                <div className="mt-8 text-center text-gray-500">
                  🎉 You've seen all articles!
                </div>
              }
              style={{ overflow: "visible" }}
              scrollThreshold={0.3}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {allItems.map((item) => (
                  <Link
                    to={"/$lang/current-affairs/$slug"}
                    params={{ lang: homepageLink, slug: item.slug }}
                    key={item._id}
                    onClick={saveScrollPosition}
                  >
                    <Card className="p-0 h-[25rem] overflow-hidden group hover:shadow-lg cursor-pointer transition-shadow duration-300">
                      <div className="w-full h-40 overflow-hidden">
                        <img
                          src={IMAGE_BASE_URL + item.image}
                          alt={item.slug}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="px-4 space-y-5">
                        <h2 className="text-xl font-semibold group-hover:text-blue-500 line-clamp-2">
                          {lang === "en" ? item.title : item.titleInHindi}
                        </h2>
                        <p
                          className="text-zinc-600 text-sm line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html:
                              lang === "en"
                                ? item.description.replace(
                                    /<p>\s*<br\s*\/?>\s*<\/p>/g,
                                    "",
                                  )
                                : item.descriptionInHindi.replace(
                                    /<p>\s*<br\s*\/?>\s*<\/p>/g,
                                    "",
                                  ),
                          }}
                        ></p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-zinc-500 text-sm">
                            <Calendar size={14} />
                            <p>{formatDate(item.publishedDate)}</p>
                          </div>
                          <div className="flex gap-2 flex-wrap py-1">
                            {item.tags.slice(0, 3).map((tag, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1 uppercase bg-zinc-100 rounded-full px-2 py-1 text-xs font-medium text-zinc-600"
                              >
                                <Tag size={10} />
                                <span>{tag}</span>
                              </div>
                            ))}
                            {item.tags.length > 3 && (
                              <div className="text-xs text-zinc-500 px-2 py-1">
                                +{item.tags.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </InfiniteScroll>
          )}

          {/* Loading Next Page */}
          {isFetchingNextPage && (
            <div className="mt-6">
              <SkeletonCurrentAffairsGrid count={3} />
            </div>
          )}

          {/* No Results */}
          {allItems.length === 0 && !isLoading && (
            <div className="mt-20 mx-auto w-fit">
              <NoResultFound />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
