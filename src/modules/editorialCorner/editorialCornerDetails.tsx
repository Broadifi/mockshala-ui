import { Badge } from "@/components/ui/badge";
import EditorialCornerAction from "./components/editorialCornerAction";
import { fetchEditorialCornerBySlug } from "@/api/services/editorial-corner.service";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatDate } from "@/utils/formatting/formatDate";
import EditorialCornerDetailsSkeleton from "./components/editorialCornerDetails";
import EditorialTagsLength from "./components/editorialTagsLength";
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
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Tag,
} from "lucide-react";

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
        <div className="flex flex-row justify-between items-center xl:pt-6 pt-2 pb-1 2xl:pt-2">
          <div className="flex flex-row  items-center text-subtitle-gray px-0.5 my-2 gap-2 flex-wrap ">
            <span className="cursor-pointer hover:hover:text-blue-800 text-xs sm:text-xs md:text-sm">
              Home
            </span>
            <IoIosArrowForward size={12} />
            <span className="cursor-pointer hover:hover:text-blue-800 text-xs sm:text-xs md:text-sm ">
              <Link to="/$lang/editorials-corner" params={{ lang: lang }}>
                Editorial Corner{" "}
              </Link>
            </span>
            <IoIosArrowForward size={12} />
            <span className="cursor-pointer hover:hover:text-blue-800 text-xs sm:text-xs md:text-sm text-blue-800 ">
              {fetchData?.metaTitle}
            </span>
          </div>
          <div className="hidden md:flex flex-row gap-4">
            <div className="flex items-center gap-5">
              <Link
                to="/$lang/editorials-corner/$slug"
                params={{
                  lang,
                  slug: fetchBlog?.prevBlog ?? "",
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 
    hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-200"
              >
                <ChevronLeft size={18} />
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
                <ChevronRight size={18} />
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

        <div className="flex flex-row gap-1 md:hidden  justify-between py-0.5">
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
              <ChevronLeft size={18} />
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
              <ChevronRight size={18} />
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

        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-title-darkblue pb-1 md:pt-0 pt-1.5">
          {fetchData?.title}
        </h1>

        <div className="flex md:flex-row justify-between  flex-col items-start">
          <div className="flex  justify-between items-center sm:gap-8 flex-row  gap-3 ">
            
            <div className="text-sm text-gray-600 flex flex-row justify-start items-center gap-2 mx-1">
              <CalendarDays size={15} />
              <h3 className="lg:text-base md:text-base text-xs  ">
                Published on<span className="px-1">:</span>
                {formatDate(fetchData?.publishedDate || "")}
              </h3>
            </div>
            <div className="flex flex-row justify-center items-center gap-0.5">
              🕰️
              <span className="text-gray-600 text-xs lg:text-base md:text-base">
                {fetchData?.readTime.text}
              </span>
            </div>

          </div>
    
        </div>
        <div className="flex  3xs:gap-3 gap-1.5 flex-row   w-[95%] flex-wrap pt-4 ">
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

      <div className="  flex-col sm:flex-none   items-center justify-center ">
        <div className="sm:h-[50%] sm:w-[50%]  flex flex-row justify-center items-center  rounded-2xl sm:float-left mb-2 sm:px-2 float-none h-full w-full  sm:mb-3.5 ">
          <img
            src={`${IMAGE_BASE_URL}${fetchData?.image}`}
            alt={fetchData?.metaTitle}
            className=" mx-2    bg-contain overflow-hidden rounded-2xl  sm:mx-auto sm:mr-7"
          />
        </div>

        <div
          className="text-gray-600 min-[1028px]:text-lg md:text-base text-sm text-justify px-2     "
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
                    <div className="group flex flex-col gap-1.5 rounded-3xl cursor-pointer  shadow-sm hover:shadow-lg transition-all duration-300 bg-card overflow-hidden h-88">
                      <div className="relative w-full h-52 overflow-hidden">
                        <ImageWithFallback
                          src={`${IMAGE_BASE_URL}${metaItem.thumbnailImage}`}
                          alt={metaItem.metaTitle}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex flex-wrap gap-2 px-4 pt-3 lg:h-7 h-5 absolute top-0.5 left-0.5">
                                            {metaItem?.tags?.slice(0, 1).map((tagItem) => (
                                              <div
                                                key={tagItem}
                                                className="flex items-center gap p-0 rounded-full  text-xs font-medium hover:scale-105 transition-transform  pl-1.5"
                                              >
                                                
                                               <Badge className="bg-button-blue/90 backdrop-blur-sm text-white shadow-md border-none text-[10px] lg:text-xs font-medium px-2.5 py-0.5 rounded-full  uppercase">
                                                  {tagItem}
                                                </Badge>
                                              </div>
                                            ))}
                                          </div>
                      </div>

                      <div className="px-3 md:px-5 text-base md:text-md font-bold  text-title-darkblue line-clamp-2 lg:line-clamp-2 sm:h-13 h-12 leading-snug group-hover:text-title-gradient-sky">
                        {metaItem.title}
                      </div>

                      <div className="flex  xs:gap-3 gap-1.5 flex-row items-start px-3 md:px-5 lg:px-5 flex-wrap lg:h-7 h-5 sm:pb-0 pb-2 ">
                        {metaItem?.tags?.slice(1, 2).map((tagItem) => {
                          return (
                            <div
                              className="flex flex-row  justify-center items-center  rounded-2xl bg-blue-200 pl-1.5"
                              key={tagItem}
                            >
                              <Tag size={15} />
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
                        <div>
                          {metaItem?.tags?.length > 2 && (
                            <EditorialTagsLength
                              length={metaItem?.tags?.length}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex  sm:justify-start 3xs:items-center md:py-3 lg:py-2 sm:pt-4 pt-4 md:pt-0  min-[280px]:flex-row flex-col justify-between items-start px-3 md:pl-5 lg:pl-5  gap-3 sm:gap-3 md:gap-5 lg:gap-8 ">
                        {" "}
                        <div className="flex flex-row justify-start items-center text-xs xs:gap-1 gap-0.5 ">
                          <Clock size={15} />
                          <span className="text-xs text-title-gradient-blue">
                            {metaItem?.readTime.text}
                          </span>
                        </div>
                        <div className="text-gray-600 flex flex-row items-center justify-center min-[312px]:gap-1 gap-0.1">
                          <CalendarDays size={15} />
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
