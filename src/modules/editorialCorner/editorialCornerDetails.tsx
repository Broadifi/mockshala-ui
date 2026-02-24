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
    window.scrollTo({ top: 0, behavior: "instant" });
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
    <div className="w-full container mx-auto px-4 py-4 flex flex-col justify-start gap-7">
      <Link to={`/${lang}/editorials-corner/`}>
        <div className="flex flex-row justify-start items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-blue-700 font-bold"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span className="inline-block text-xl xl:text-2xl font-bold    bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent hover:to-title-gradient-blue">
            Back to Editorial Corner
          </span>
        </div>
      </Link>
      <div className=" w-full flex flex-row justify-center ">
        <img
          src={`${IMAGE_BASE_URL}${fetchData.image}`}
          alt=""
          className="rounded-2xl"
        />
      </div>
      <h3 className="text-black font-bold text-5xl">{fetchData.title}</h3>
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
        <h3 className="text-base">
          Published on:{formatDate(fetchData.publishedDate)}
        </h3>
      </div>
      <p
        className=" text-left text-gray-600  text-base/8 "
        dangerouslySetInnerHTML={{
          __html: cleanHTML,
        }}
      />

      <div className="flex flex-col justify-start text-sm text-gray-600">
        <span>Article ID:{fetchData._id}</span>
        <span>Slug:{`/${fetchData.slug}`}</span>
      </div>
    </div>
  );
};

export default EditorialCornerDetails;
