import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { resourcesAPI } from "@/api/services/resources";
import { examCategoriesAPI } from "@/api/services/exam-categories";
import ResourceFilters from "./components/ResourceFilters";
import ResourceList from "./components/ResourceList"; 
import { SmartPagination } from "./components/Pagination";
import { keepPreviousData } from "@tanstack/react-query";


function ResourcesModule() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const LIMIT = 5;

  useEffect (() => {
    const Timer = 
    setTimeout(()=> {
      setSearchTerm(searchInput);
      setPage(1);
      console.log("Api Hit: ", searchInput)
    }, 500);
    

    return () => clearTimeout(Timer)

  
  },[searchInput, selectedCategory])
  




  const { data: categoryResponse, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["examCategories"],
    queryFn: () => examCategoriesAPI.examCategoriesData(),
  });



  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["resources", page, searchTerm, selectedCategory],
    queryFn: () =>
      resourcesAPI.getResources(page, LIMIT, searchTerm, selectedCategory),
       placeholderData: keepPreviousData,
  });


  const totalPages = data ? Math.ceil(data.totalCount / LIMIT) : 0;
  return (
    <div className="gradient-soft-blue-current-affairs w-full min-h-screen">
      <div className="w-full container mx-auto px-4 sm:px-6 py-6">
        
        {/* 1. Header & Filters */}
        <ResourceFilters
          searchTerm={searchInput}
          setSearchTerm={setSearchInput}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categoryResponse?.data}
          isCategoryLoading={isCategoryLoading}
          isFetching={isFetching}
          
        />        
        <ResourceList items={data?.data} isFetching={isFetching} isLoading={isLoading}/>

      
       {data && (
        <div className="flex justify-end mt-6 ">
         <SmartPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className='w-fit mx-0'
          />
        </div>
       )}

      </div>
    </div>
  );
}

export default ResourcesModule;
