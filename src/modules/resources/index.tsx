import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { resourcesAPI } from "@/api/services/resources";
import { examCategoriesAPI } from "@/api/services/exam-categories";

import Pagination from "./components/Pagination";
import ResourceFilters from "./components/ResourceFilters";
import ResourceList from "./components/ResourceList"; 


function ResourcesModule() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect (() => {
    const Timer = 
    setTimeout(()=> {
      setSearchTerm(searchInput);
      setPage(1);
      console.log("Api Hit: ", searchInput)
    }, 500);
    

    return () => clearTimeout(Timer)

  
  },[searchInput])
  



  const { data: categoryResponse, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["examCategories"],
    queryFn: () => examCategoriesAPI.examCategoriesData(),
  });

  const { data, isFetching } = useQuery({
    queryKey: ["resources", page, searchTerm, selectedCategory],
    queryFn: () =>
      resourcesAPI.getResources(page, 3, searchTerm, selectedCategory),
  });

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
        <ResourceList items={data?.data} isCategoryLoading={isCategoryLoading}/>
       {isCategoryLoading&& <Pagination 
           page={page} 
           setPage={setPage} 
           hasNext={data?.hasNext} 
        />}

      </div>
    </div>
  );
}

export default ResourcesModule;
