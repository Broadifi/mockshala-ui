"use client";

import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEditorialCorners } from "@/api/services/editorial-corner.service";
import type { EditorialCornerData } from "@/api/model/editorial-corner";
import { IMAGE_BASE_URL } from "@/api/url";
import { Link } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import { formatDate } from "@/utils/formatting/formatDate";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
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
  console.log(data);
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="w-full container mx-auto px-4 py-4 flex flex-col gap-6 gradient-soft-blue-current-affairs">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
        <div>
          <h2 className="text-lg md:text-2xl lg:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
            Editorial Corner
          </h2>
          <p className="text-subtitle-gray pb-2 md:text-base sm:text-sm text-xs">
            Expert insights, study tips, and guidance for your exam preparation
            journey
          </p>
        </div>
        <div
          className="flex flex-col min-[425px]:flex-row justify-center min-[298px]:items-center items-start gap-1 min-[425px]:px-8
        "
        >
          {" "}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full min-[298px]:w-[95%] min-[338px]:w-[80%] min-[425px]:w-[60%] min-[493px]:w-[50%] min-[576px]:w-[40%] min-[768px]:w-[60%] justify-start text-left text-gray-400 hover:border-blue-700 hover:text-subtitle-gray hover:bg-white"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {startSelectedDate
                  ? format(startSelectedDate, "PPP")
                  : "Select Start Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startSelectedDate}
                onSelect={setStartSelectedDate}
                // initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full min-[298px]:w-[95%] min-[338px]:w-[80%] min-[425px]:w-[60%] min-[493px]:w-[50%] min-[576px]:w-[40%] min-[768px]:w-[60%] justify-start text-left  text-gray-400 hover:border-blue-700 hover:text-subtitle-gray hover:bg-white "
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {endSelectedDate
                  ? format(endSelectedDate, "PPP")
                  : "Select End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endSelectedDate}
                onSelect={setEndSelectedDate}
                // initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </header>

      <div className="grid min-[1025px]:grid-cols-3 min-[1290px]:grid-cols-4 min-[765px]:grid-cols-2 grid-cols-1 gap-4">
        {data?.pages.map((page) =>
          page.data.map((item: EditorialCornerData) => (
            <Link key={item._id} to={`/${lang}/editorials-corner/${item.slug}`}>
              <div className="flex flex-col gap-2 rounded-3xl cursor-pointer pb-5 shadow-sm hover:shadow-2xl bg-card">
                <div className="rounded-t-3xl w-full overflow-hidden h-52">
                  <img
                    src={`${IMAGE_BASE_URL}${item.thumbnailImage}`}
                    alt={item.metaTitle}
                    className="hover:scale-105 transition-transform duration-300 w-full h-full object-cover"
                  />
                </div>

                <div className="text-base md:text-lg lg:text-xl font-bold line-clamp-2 px-5 pt-2 text-title-darkblue">
                  {item.title}
                </div >
                <div className="flex flex-row justify-start items-center text-xs  gap-1 px-5">               
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span className="text-title-gradient-blue">{item?.readTime.text}</span></div>
                <div
                  className="text-sm text-gray-600 line-clamp-3 px-5"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(decodeHTML(item.description)),
                  }}
                />

                <div className="text-gray-600 flex items-center mx-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-calendar-icon lucide-calendar"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  <span className="px-2 text-sm text-title-gradient-blue">
                    {formatDate(item.publishedDate)}
                  </span>
                </div>
              </div>
            </Link>
          )),
        )}
      </div>

      <div ref={observerRef} className="h-10" />

      {isFetchingNextPage && (
        <p className="text-center py-4">Loading more editorials...</p>
      )}
    </div>
  );
}

export default EditorialCornerDashboard;
