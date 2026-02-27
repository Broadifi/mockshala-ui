import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { resourcesAPI } from "@/api/services/resources";
import { examCategoriesAPI } from "@/api/services/exam-categories";
import ResourceFilters from "./components/ResourceFilters";
import ResourceList from "./components/ResourceList"; 
// import { SmartPagination } from "./components/Pagination";
import { keepPreviousData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";


function ResourcesModule() {
  // const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const LIMIT = 7;

  useEffect (() => {
    const Timer = 
    setTimeout(()=> {
      setSearchTerm(searchInput);
      // setPage(1);
      console.log("Api Hit: ", searchInput)
    }, 500);
    

    return () => clearTimeout(Timer)

  
  },[searchInput, selectedCategory])
  




  const { data: categoryResponse, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["examCategories"],
    queryFn: () => examCategoriesAPI.examCategoriesData(),
  });


  
  const { data, isFetching, isLoading,fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["resources", searchTerm, selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      resourcesAPI.getResources(pageParam, LIMIT, searchTerm, selectedCategory),
      initialPageParam: 1,
       placeholderData: keepPreviousData,
       getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.length < LIMIT) {
          return undefined
        }
        return allPages.length + 1
      },
  });


  // const totalPages = data ? Math.ceil(data.totalCount / LIMIT) : 0;

  const allResources = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="gradient-soft-blue-current-affairs w-full">
      <div className="w-full container mx-auto px-4 sm:px-6 py-6">
        
        {/* 1. Header & Filters */}
        <ResourceFilters
          searchTerm={searchInput}
          setSearchTerm={setSearchInput}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          category={categoryResponse?.data}
          isCategoryLoading={isCategoryLoading}
          isFetching={isFetching}
          
        />        
        <ResourceList items={allResources}  isLoading={isLoading} fetchNextPage={fetchNextPage} 
          hasNextPage={hasNextPage} 
          isFetchingNextPage={isFetchingNextPage}/>

{/*       
       {data && (
        <div className="flex font-small   justify-center lg:justify-end mt-9 ">
         <SmartPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className='w-fit mx-0'
          />
        </div>
       )} */}

      </div>
    </div>
  );
}

export default ResourcesModule;
