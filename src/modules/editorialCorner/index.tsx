import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils/formatting/formatDate";
// import { SmartPagination } from "./pagination";
import FetchEdtiorialCornerByDate from "./editorialCornerDate";
import type {
  EditorialCornerData,
} from "@/api/model/editorial-corner";
import { fetchEditorialCorners } from "@/api/services/editorial-corner.service";
import DOMPurify from "dompurify";
import { IMAGE_BASE_URL } from "@/api/url";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

function EditorialCornerDashboard() {
  const page = 1;
  const limit = 8;
  const lang="en";
  // const [page,setPage]=useState(1);

  // useEffect(()=>{
  //   window.scrollTo(top:"0px",)
  // })
  // const [editorialCorner,setEditorialCorner]=useState<EditorialCornerData|null>(null);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["editorials",page,limit],
    queryFn: () => fetchEditorialCorners({page,limit}),
  });
  const fetchData=data?.data;
  console.log(fetchData);
  console.log(data?.data);
  console.log(import.meta.env);

  console.log(IMAGE_BASE_URL, import.meta.env.VITE_PUBLIC_IMAGE_BASE_URL);
  console.log(IMAGE_BASE_URL === import.meta.env.VITE_PUBLIC_IMAGE_BASE_URL);
  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  // const cleanHTML = DOMPurify.sanitize(decodeHTML(fetchData));
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / limit) : 1;
  return (
    <>
    <div className="w-full container mx-auto px-4 py-4 flex flex-col  flex-wrap gap-6  gradient-soft-blue-current-affairs ">
      {/* {data?.data.map((item: EditorialCornerData) => (
        <p key={item._id}>{item.title}</p>
      ))} */}
      <header className="flex flex-row justify-between">
        <header className="flex flex-col space-y-1 mt-4 ">
        <h2 className="inline-block text-2xl xl:text-4xl font-bold    bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
          Editorial Corner
        </h2>
        <p className="text-subtitle-gray pb-4">
          Expert insights, study tips, and guidance for your exam preparation
          journey
        </p>
      </header>
      <FetchEdtiorialCornerByDate/>
      </header>
      

      <div className="grid min-[1025px]:grid-cols-3 min-[1290px]:grid-cols-4 min-[765px]:grid-cols-2 grid-cols-1 gap-4 ">
        {data?.data.map((item: EditorialCornerData) => {
          return (
            <Link to={`/${lang}/editorials-corner/${item.slug}`}>
              <div
                key={item._id}
                className="flex flex-col  items-start gap-2 rounded-3xl  cursor-pointer min-[765px]:w-88  pb-5 shadow-sm hover:shadow-2xl w-full min-[1022px]:w-70  min-[1285px]:w-88 bg-card"
              >
                <div className="rounded-t-3xl    w-full overflow-hidden h-52">
                  <img
                    src={`${IMAGE_BASE_URL}${item.thumbnailImage}`}
                    alt={item.metaTitle}
                    className="hover:scale-105 transition-transform duration-300 w-full h-full"
                  />
                </div>

                <div className="text-xl font-bold line-clamp-2 px-5 hover:text-blue-800 max-[1022px]:text-lg max-[765px]:text-base text-title-darkblue pt-2">
                  {item.title}
                </div>
                <div
                  className="text-sm/1.7 text-justify text-gray-600 line-clamp-3 px-5  max-[1022px]:text-base max-[765px]:text-sm"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(decodeHTML(item.description)),
                  }}
                />
                <div className=" text-gray-600 flex flex-row justify-center items-center mx-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
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
                  <span className="px-2 text-sm max-[1022px]:text-lg max-[765px]:text-base text-title-gradient-blue">{formatDate(item.publishedDate)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* {editorialCorner && <EditorialCornerMain item={editorialCorner}/>} */}
      </div>
      {/* <div className="flex flex-row justify-center md:justify-end items-center py-3 gradient-soft-blue-current-affairs">
        <SmartPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className='w-fit mx-0 '
          />
       
      </div> */}
      {/* <FetchEdtiorialCornerByDate/> */}
      
      
    </>
    
    
  );
}
export default EditorialCornerDashboard;
