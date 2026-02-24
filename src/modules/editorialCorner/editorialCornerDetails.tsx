import type {
  EditorialCornerData,
  EditorialCornerResponse,
} from "@/api/model/editorial-corner";
import { fetchEdtiorialCornerBySlug } from "@/api/services/editorial-corner.service";
import { formatDate } from "@/utils/formatting/formatDate";
import DOMPurify from "dompurify";
import React from "react";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IMAGE_BASE_URL } from "@/api/url";
import { Link } from "@tanstack/react-router";
const EditorialCornerDetails = () => {
  const { slug } = useParams({ from: "/$lang/editorials-corner/$slug/" });
  const lang = "en";
  const { data, isLoading } = useQuery({
    queryKey: ["editorial-corner", { slug }],
    queryFn: () => fetchEdtiorialCornerBySlug(slug),
  });

  const fetchData = data?.data;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  console.log(fetchData);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    
    return txt.value;
  };
  const cleanHTML = DOMPurify.sanitize(decodeHTML(fetchData.description));
  return (
    <div className="w-full container mx-auto px-4 py-4 flex flex-col justify-start gap-7 gradient-soft-blue-current-affairs">
      <Link to={`/${lang}/editorials-corner/`}>
        <div className="flex flex-row justify-start items-center gap-2 bg-card gradient-soft-blue-current-affairs">
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
            className="text-title-gradient-blue font-bold hover:text-title-darkblue"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <p className="inline-block text-sm min-[785px]:text-xl min-[880px]:text-2xl min-[1285px]:text-3xl min-[785px]:font-bold  font-bold hover:text-title-darkblue text-title-gradient-blue ">
            Back to Editorial Corner
          </p>
        </div>
      </Link>
      <div className=" w-full flex flex-row justify-center ">
        <img
          src={`${IMAGE_BASE_URL}${fetchData.image}`}
          alt=""
          className="rounded-2xl"
        />
      </div>
      <h3 className="text-xl min-[785px]:text-2xl min-[880px]:text-3xl min-[1285px]:text-4xl font-bold text-title-darkblue ">{fetchData.title}</h3>
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
          className="lucide lucide-calendar-icon lucide-calendar text-gray-600"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
        <h3 className="lg:text-lg md:text-base text-sm">
          Published on:{formatDate(fetchData.publishedDate)}
        </h3>
      </div>
      <p
        className=" text-left text-gray-600  text-base/8 "
        dangerouslySetInnerHTML={{
          __html: cleanHTML,
        }}
      />

      <div className="flex flex-col justify-start  text-gray-600  ">
        <span className="lg:text-base md:text-sm text-xs text-justify">Article ID:{fetchData._id}</span>
        <span className="lg:text-base md:text-sm text-xs text-justify">Slug:{`/${fetchData.slug}`}</span>
      </div>
    </div>
  );
};

export default EditorialCornerDetails;
