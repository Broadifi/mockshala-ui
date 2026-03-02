import type {
  EditorialCornerData,
  EditorialCornerResponse,
} from "@/api/model/editorial-corner";
import EditorialCornerAction from "./components/editorialCornerAction";
import { fetchEdtiorialCornerBySlug } from "@/api/services/editorial-corner.service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatDate } from "@/utils/formatting/formatDate";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DOMPurify from "dompurify";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IMAGE_BASE_URL } from "@/api/url";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { IoIosArrowForward } from "react-icons/io";
import { Copy } from "@/assets";
import { id } from "date-fns/locale";

const EditorialCornerDetails = () => {
  const { slug } = useParams({ from: "/$lang/editorials-corner/$slug/" });
  const lang = "en";
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["editorial-corner", { slug }],
    queryFn: () => fetchEdtiorialCornerBySlug(slug),
  });

  const fetchData = data?.data;
  console.log(fetchData);
  const fetchBlog = data?.meta;

  console.log(fetchData);
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);
  console.log(fetchData?.tags);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;

    return txt.value;
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  function handleCopyButton() {
    const fullUrl = window.location.href;

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        // console.log("Copied:", fullUrl);
        // optional toast
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  }
  const cleanHTML = DOMPurify.sanitize(decodeHTML(fetchData?.description));
  return (
    <div className="w-full container mx-auto px-4 py-4 flex flex-col justify-start gap-7 gradient-soft-blue-current-affairs">
      {/* <Link to={`/${lang}/editorials-corner/`}>
        <div className="flex flex-row justify-start items-center gap-2 bg-card gradient-soft-blue-current-affairs group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-title-gradient-blue font-bold hover:text-title-darkblue "
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <p className="inline-block text-sm min-[785px]:text-base min-[880px]:text-lg min-[1285px]:text-xl  hover:text-title-darkblue text-title-gradient-blue ">
            Back to Editorial Corner
          </p>
        </div>
      </Link> */}
      <div className="flex flex-col justify-start gap-2 px-1">
       
        <div className="flex md:hidden flex-row justify-end">
          <EditorialCornerAction />
        </div>
        
        <div className="flex flex-row  items-center text-subtitle-gray px-0.5 ">
          <span className="cursor-pointer hover:hover:text-blue-800 text-xs sm:text-sm md:text-base">
            Home
          </span>{" "}
          <IoIosArrowForward />
          <span className="cursor-pointer hover:hover:text-blue-800 text-xs sm:text-sm md:text-base line-clamp-1">
            <Link to={`/${lang}/editorials-corner/`}>Editorial Corner </Link>
          </span>
          <IoIosArrowForward />
          <span className="cursor-pointer hover:hover:text-blue-800 text-xs sm:text-sm md:text-base text-blue-800 line-clamp-1">
            {fetchData.metaTitle}
          </span>
        </div>
        <div className="flex  gap-3 min-[270px]:flex-row flex-col ">
          {fetchData?.tags.map((tagItem)=>{
            return <p key={tagItem} className="text-amber-50 bg-button-blue text-xs rounded-2xl p-1 uppercase px-2 ">{tagItem}</p>
          })}
        </div>
        <h3 className="text-xl min-[785px]:text-2xl min-[880px]:text-3xl min-[1285px]:text-4xl font-bold text-title-darkblue ">
          {fetchData?.title}
        </h3>

        <div className="flex flex-row justify-between px-1">
          <div className="flex min-[292px]:flex-row justify-start items-center min-[292px]:gap-3 flex-col gap-0">
            <div className="flex flex-row justify-center items-center gap-0.5">
              🕰️
              <span className="text-blue-800 text-xs lg:text-sm">
                {fetchData.readTime.text}
              </span>
            </div>
            {/* <div className="flex flex-row justify-center items-center gap-0.5">
            📜
            <span className="text-blue-800 text-xs lg:text-sm">
              Words : {fetchData.readTime.words}
            </span>
          </div> */}
          </div>
          <div className="flex gap-2 md:gap-4">
            {/* Copy */}
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
        <div className="text-sm text-gray-600 flex flex-row justify-start items-center gap-2 mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 26 26"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-calendar-icon lucide-calendar text-gray-600 "
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          <h3 className="lg:text-base md:text-base text-xs">
            Published on<span className="px-1">:</span>
            {formatDate(fetchData?.publishedDate)}
          </h3>
        </div>
      </div>

      <div className="  flex-col sm:flex-none   items-center justify-center ">
        <div className="sm:h-[50%] sm:w-[50%]  flex flex-row justify-center items-center  rounded-2xl sm:float-left mb-2 sm:px-2 float-none h-full w-full  sm:mb-3.5 ">
          <img
            src={`${IMAGE_BASE_URL}${fetchData.image}`}
            alt={fetchData.metaTitle}
            className=" mx-2    bg-contain overflow-hidden rounded-2xl  sm:mx-auto sm:mr-7"
          />
        </div>

        <p
          className="  text-gray-600  min-[1028px]:text-lg md:text-base text-sm text-justify  px-2"
          dangerouslySetInnerHTML={{
            __html: cleanHTML,
          }}
        />
        <div className="clear-both" />
      </div>

      {/* <div className="flex flex-col justify-start  text-gray-600  ">
        <span className="lg:text-base md:text-sm text-xs text-justify">
          Article ID:{fetchData._id}
        </span>
        <span className="lg:text-base md:text-sm text-xs text-justify">
          Slug:{`/${fetchData.slug}`}
        </span>
      </div> */}
      <div className="flex flex-row justify-center items-center gap-3">
        <Link to={`/${lang}/editorials-corner/${fetchBlog?.prevBlog}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5a5858"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-left-icon lucide-chevron-left"
            className="hover:bg-title-darkblue rounded-full"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <Link to={`/${lang}/editorials-corner/${fetchBlog?.nextBlog}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5a5858"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-right-icon lucide-chevron-right"
            className="hover:bg-title-darkblue rounded-full hover:text-white"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-xl min-[785px]:text-2xl min-[880px]:text-3xl min-[1285px]:text-4xl font-bold text-title-darkblue ">
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
            {fetchBlog?.otherEditorials?.map((metaItem) => (
              <CarouselItem
                key={metaItem._id}
                className="basis-[85%] sm:basis-1/2 lg:basis-[25%]"
              >
                <Link
                  to={`/${lang}/editorials-corner/${metaItem.slug}`}
                  className="block"
                >
                  <div className="flex flex-col gap-2 rounded-3xl cursor-pointer pb-5 shadow-sm hover:shadow-xl transition-all duration-300 bg-card overflow-hidden">
                    {/* Image */}
                    <div className="w-full h-40 sm:h-48 overflow-hidden">
                      <img
                        src={`${IMAGE_BASE_URL}${metaItem.thumbnailImage}`}
                        alt={metaItem.metaTitle}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Date */}
                    <div className="flex items-center px-3 text-sm text-title-gradient-blue">
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
                        className="mr-1"
                      >
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                      </svg>

                      <span>{formatDate(metaItem.publishedDate)}</span>
                    </div>

                    {/* Title */}
                    <div className="px-3 text-base md:text-lg font-bold  text-title-darkblue line-clamp-1">
                      {metaItem.title}
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 text-subtitle-gray hover:text-title-gradient-blue" />
          <CarouselNext className="right-4 text-subtitle-gray hover:text-title-gradient-blue" />
        </Carousel>
      </div>
    </div>
  );
};

export default EditorialCornerDetails;
