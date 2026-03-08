import { Badge } from "@/components/ui/badge";
import EditorialCornerAction from "./components/editorialCornerAction";
import { fetchEditorialCornerBySlug } from "@/api/services/editorial-corner.service";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatDate } from "@/utils/formatting/formatDate";
import EditorialCornerDetailsSkeleton from "./components/editorialCornerDetails";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import DOMPurify from "dompurify";
import Autoplay from "embla-carousel-autoplay";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IMAGE_BASE_URL } from "@/api/url";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { IoIosArrowForward } from "react-icons/io";
import { Copy } from "@/assets";
import type { EditorialCornerData } from "@/api/model/editorial-corner";

const EditorialCornerDetails = () => {
  const { slug, lang } = useParams({ from: "/$lang/editorials-corner/$slug/" });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["editorial-corner", { slug }],
    queryFn: () => fetchEditorialCornerBySlug(slug),
  });

  const fetchData = data?.data;

  const fetchBlog = data?.meta;
  console.log(fetchBlog?.otherEditorials);
  console.log(fetchData);
  if (isLoading) {
    return <EditorialCornerDetailsSkeleton />;
  }
  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;

    return txt.value;
  };

  function handleCopyButton() {
    const fullUrl = window.location.href;

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  }
  const cleanHTML = DOMPurify.sanitize(
    decodeHTML(fetchData?.description || ""),
  );
  return (
    <div className="w-full container mx-auto px-4 py-2 flex flex-col justify-start gap-7 gradient-soft-blue-current-affairs">
      <div className="flex flex-col justify-start gap-1.2 px-1">
        <div className="flex flex-row  items-center text-subtitle-gray px-0.5 my-2 gap-2 flex-wrap ">
          <span className="cursor-pointer hover:hover:text-blue-800 text-xs sm:text-xs md:text-sm">
            Home
          </span>{" "}
          <IoIosArrowForward />
          <span className="cursor-pointer hover:hover:text-blue-800 text-xs sm:text-xs md:text-sm ">
            <Link to="/$lang/editorials-corner" params={{ lang: lang }}>
              Editorial Corner{" "}
            </Link>
          </span>
          <IoIosArrowForward />
          <span className="cursor-pointer hover:hover:text-blue-800 text-xs sm:text-xs md:text-sm text-blue-800 ">
            {fetchData?.metaTitle}
          </span>
        </div>
        <div className="flex flex-row gap-1 md:hidden  justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/$lang/editorials-corner/$slug"
              params={{
                lang,
                slug: fetchBlog?.prevBlog ?? "",
              }}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 
    hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>

            <Link
              to="/$lang/editorials-corner/$slug"
              params={{
                lang,
                slug: fetchBlog?.nextBlog ?? "",
              }}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 
    hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
          <div className="flex gap-2 md:gap-4  md:hidden">
            <div className="hidden md:flex gap-2 items-center">
              <button
                className="cursor-pointer"
                onClick={() => handleCopyButton()}
              >
                <img
                  src={Copy}
                  alt="questions"
                  className="h-5 md:h-6 shadow-2xl"
                />
              </button>
            </div>

            <div className="flex md:hidden items-center">
              <EditorialCornerAction />
            </div>
          </div>
        </div>

        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-title-darkblue pb-2">
          {fetchData?.title}
        </h1>

        <div className="flex md:flex-row justify-between px-1 flex-col items-start">
          <div className="flex  justify-start items-start sm:gap-3 sm:flex-row flex-col gap-0">
            <div className="flex flex-row justify-center items-center gap-0.5">
              🕰️
              <span className="text-blue-800 text-xs lg:text-sm">
                {fetchData?.readTime.text}
              </span>
            </div>

            <div className="flex  3xs:gap-3 gap-1.5 flex-col sm:flex-row flex-wrap sm:pt-0 pt-2.5 ">
              {fetchData?.tags?.map((tagItem) => {
                return (
                  <Badge
                    key={tagItem}
                    variant="outline"
                    className="text-amber-50 bg-button-blue uppercase"
                  >
                    {tagItem}
                  </Badge>
                );
              })}{" "}
            </div>
          </div>
          <div className="hidden md:flex flex-row gap-4">
            <div className="flex items-center gap-3">
              <Link
                to="/$lang/editorials-corner/$slug"
                params={{
                  lang,
                  slug: fetchBlog?.prevBlog ?? "",
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 
    hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Link>

              <Link
                to="/$lang/editorials-corner/$slug"
                params={{
                  lang,
                  slug: fetchBlog?.nextBlog ?? "",
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 
    hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
            <div className="flex gap-2 md:gap-4">
              <div className="hidden md:flex gap-2 items-center">
                <button
                  className="cursor-pointer"
                  onClick={() => handleCopyButton()}
                >
                  <img
                    src={Copy}
                    alt="questions"
                    className="h-5 md:h-6 shadow-2xl"
                  />
                </button>
              </div>

              <div className="hidden md:flex items-center">
                <EditorialCornerAction />
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600 flex flex-row justify-start items-center gap-2 mx-1 pt-2.5 sm:pt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 26 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar-icon lucide-calendar text-gray-600 "
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          <h3 className="lg:text-base md:text-base text-xs  ">
            Published on<span className="px-1">:</span>
            {formatDate(fetchData?.publishedDate || "")}
          </h3>
        </div>
      </div>

      <div className="  flex-col sm:flex-none   items-center justify-center ">
        <div className="sm:h-[50%] sm:w-[50%]  flex flex-row justify-center items-center  rounded-2xl sm:float-left mb-2 sm:px-2 float-none h-full w-full  sm:mb-3.5 ">
          <ImageWithFallback
            src={`${IMAGE_BASE_URL}${fetchData?.image}`}
            alt={fetchData?.metaTitle}
            className=" mx-2    bg-contain overflow-hidden rounded-2xl  sm:mx-auto sm:mr-7"
          />
        </div>

        <div
          className="text-gray-600 min-[1028px]:text-lg md:text-base text-sm text-justify px-2     md:first-letter:float-left md:first-letter:text-5xl md:first-letter:font-bold md:first-letter:mr-2 md:first-letter:leading-none md:first-letter:uppercase"
          dangerouslySetInnerHTML={{
            __html: cleanHTML,
          }}
        />
        <div className="clear-both" />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-xl md:text-2xl 4xl:text-2xl 7xl:text-3xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent ">
          Other Picks For You
        </h1>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full mt-2 sm:mt-4"
        >
          <CarouselContent>
            {fetchBlog?.otherEditorials?.map(
              (metaItem: EditorialCornerData) => (
                <CarouselItem
                  key={metaItem._id}
                  className="basis-[85%] sm:basis-1/2 lg:basis-[25%] pb-5"
                >
                  <Link
                    to="/$lang/editorials-corner/$slug"
                    params={{
                      lang,
                      slug: metaItem.slug,
                    }}
                    className="block"
                  >
                    <div className="flex flex-col gap-1.5 rounded-3xl cursor-pointer pb-0.5 shadow-sm hover:shadow-xl transition-all duration-300 bg-card overflow-hidden h-88">
                      <div className="w-full h-52 overflow-hidden">
                        <ImageWithFallback
                          src={`${IMAGE_BASE_URL}${metaItem.thumbnailImage}`}
                          alt={metaItem.metaTitle}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="px-3 md:px-5 text-base md:text-md font-bold  text-title-darkblue line-clamp-2 lg:line-clamp-2 sm:h-13 h-13 hover:text-title-gradient-sky">
                        {metaItem.title}
                      </div>

                      <div className="flex  xs:gap-3 gap-1.5 flex-col  sm:flex-row items-start px-3 md:px-5 lg:px-5 flex-wrap">
                        {metaItem?.tags?.map((tagItem) => {
                          return (
                            <div
                              className="flex flex-row  justify-center items-center  rounded-2xl bg-blue-200 pl-1.5"
                              key={tagItem}
                            >
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
                                className="lucide lucide-tag-icon lucide-tag"
                              >
                                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                                <circle
                                  cx="7.5"
                                  cy="7.5"
                                  r=".5"
                                  fill="currentColor"
                                />
                              </svg>
                              <Badge
                                key={tagItem}
                                variant="link"
                                className="text-black  uppercase text-xs"
                              >
                                {tagItem}
                              </Badge>
                            </div>
                          );
                        })}{" "}
                      </div>
                      <div className="flex  sm:justify-start 3xs:items-center py-3 min-[280px]:flex-row flex-col justify-between items-start px-3 md:pl-5 lg:pl-5  gap-3 sm:gap-3 md:gap-5 lg:gap-8 ">
                        {" "}
                        <div className="flex flex-row justify-start items-center text-xs xs:gap-1 gap-0.5 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-clock-icon lucide-clock"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          <span className="text-xs text-title-gradient-blue">
                            {metaItem?.readTime.text}
                          </span>
                        </div>
                        <div className="text-gray-600 flex flex-row items-center justify-center min-[312px]:gap-1 gap-0.1">
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
                            className="lucide lucide-calendar-icon lucide-calendar"
                          >
                            <path d="M8 2v4" />
                            <path d="M16 2v4" />
                            <rect width="18" height="18" x="3" y="4" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                          <span className=" text-xs text-title-gradient-blue">
                            {formatDate(metaItem.publishedDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ),
            )}
          </CarouselContent>

          <CarouselPrevious className="left-4 text-subtitle-gray hover:text-title-gradient-blue" />
          <CarouselNext className="right-4 text-subtitle-gray hover:text-title-gradient-blue" />
        </Carousel>
      </div>
    </div>
  );
};

export default EditorialCornerDetails;
