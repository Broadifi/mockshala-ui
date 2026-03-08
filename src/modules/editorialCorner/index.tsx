
"use client";

import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEditorialCorners } from "@/api/services/editorial-corner.service";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import type {
  EditorialCornerData,
  EditorialCornerResponse,
} from "@/api/model/editorial-corner";
import { IMAGE_BASE_URL } from "@/api/url";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { formatDate } from "@/utils/formatting/formatDate";
import { EditorialCardSkeleton } from "../home/components/skeleton/EditorialCardSkeleton";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import NoResultFound from "./components/no-result-found";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

function EditorialCornerDashboard() {
  const limit = 8;
  const lang = "en";

  const [startSelectedDate, setStartSelectedDate] = React.useState<
    Date | undefined
  >();

  const [endSelectedDate, setEndSelectedDate] = React.useState<
    Date | undefined
  >();

  const observerRef = React.useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["editorials", startSelectedDate, endSelectedDate],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      fetchEditorialCorners({
        page: pageParam,
        limit,
        startDate: startSelectedDate
          ? format(startSelectedDate, "yyyy-MM-dd")
          : undefined,
        endDate: endSelectedDate
          ? format(endSelectedDate, "yyyy-MM-dd")
          : undefined,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    const current = observerRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-6 flex flex-col gap-6 gradient-soft-blue-current-affairs">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-lg md:text-2xl lg:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              Editorial Corner
            </h2>
            <p className="text-subtitle-gray text-sm">
              Expert insights, study tips, and guidance for exam preparation
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-7">
          {Array.from({ length: limit }).map((_, i) => (
            <EditorialCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col gap-6 gradient-soft-blue-current-affairs">
   

      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4  pb-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
            Editorial Corner
          </h2>

          <p className="text-subtitle-gray text-sm">
            Expert insights, study tips, and guidance for your exam preparation
          </p>
        </div>


        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left text-gray-400 hover:border-blue-700"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {startSelectedDate
                  ? format(startSelectedDate, "PPP")
                  : "Start Date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startSelectedDate}
                onSelect={setStartSelectedDate}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left text-gray-400 hover:border-blue-700"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {endSelectedDate
                  ? format(endSelectedDate, "PPP")
                  : "End Date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endSelectedDate}
                onSelect={setEndSelectedDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </header>



      {data?.pages?.[0]?.data?.length === 0 &&
        !hasNextPage &&
        startSelectedDate &&
        endSelectedDate && (
          <NoResultFound
            setStartSelectedDate={setStartSelectedDate}
            setEndSelectedDate={setEndSelectedDate}
          />
        )}



      <div className="grid min-[560px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {data?.pages?.map((page: EditorialCornerResponse) =>
          page.data.map((item: EditorialCornerData) => (
            <Link
              key={item._id}
              to="/$lang/editorials-corner/$slug"
              params={{
                lang,
                slug: item.slug,
              }}
            >
        

              <div className="group flex flex-col rounded-3xl cursor-pointer shadow-sm hover:shadow-2xl bg-card overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full pb-3">

      

                <div className="relative w-full h-52 overflow-hidden">
                  <ImageWithFallback
                    src={`${IMAGE_BASE_URL}${item.thumbnailImage}`}
                    alt={item.metaTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

              

                <div className="px-4 pt-3 text-base md:text-lg font-semibold text-title-darkblue line-clamp-2 leading-snug group-hover:text-title-gradient-sky sm:h-15 h-auto ">
                  {item.title}
                </div>

 

                <div className="flex flex-wrap gap-2 px-4 pt-2">
                  {item?.tags?.map((tagItem) => (
                    <div
                      key={tagItem}
                      className="flex items-center gap p-0 rounded-full  text-xs font-medium hover:scale-105 transition-transform bg-blue-200 pl-1.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag-icon lucide-tag"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                      <Badge variant="link" className="text-black  uppercase text-xs">
                        {tagItem}
                      </Badge>
                    </div>
                  ))}
                </div>

              

                <div className="flex justify-between items-center px-4 py-3 text-xs text-gray-600">

                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>

                    <span className="text-title-gradient-blue">
                      {item?.readTime.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>

                    <span className="text-title-gradient-blue">
                      {formatDate(item.publishedDate)}
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          ))
        )}
      </div>

  

      {data?.pages?.[0]?.data?.length !== 0 &&
        !hasNextPage &&
        !startSelectedDate &&
        !endSelectedDate && (
          <p className="text-center text-subtitle-gray">
            🎉 You've seen all articles!
          </p>
        )}

  

      <div ref={observerRef} className="h-10" />

      {isFetchingNextPage && (
        <p className="text-center py-4">Loading more editorials...</p>
      )}
    </div>
  );
}

export default EditorialCornerDashboard;