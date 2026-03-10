<<<<<<< HEAD



import ComingSoon from "../comingSoon"

function ResourcesModule() {
  return (
    <div>
      <ComingSoon/>
    </div>
  )
}

export default ResourcesModule
=======
import { useEffect, useState, useMemo } from "react";
import {
  useInfiniteQuery,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { resourcesAPI } from "@/api/services/resources";
import { examCategoriesAPI } from "@/api/services/exam-categories";
import ResourceFilters from "./components/ResourceFilters";
import ResourceList from "./components/ResourceList";

export default function ResourcesModule() {
  const navigate = useNavigate({ from: "/$lang/resources" });
  const search = useSearch({ from: "/$lang/resources/" });

  const initialCategory = search.category || "";

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const LIMIT = 7;

  useEffect(() => {
    navigate({
      search: {
        ...search,
        category: selectedCategory ? selectedCategory : undefined,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedCategory(search.category ?? "");
  }, [search.category]);

  useEffect(() => {
    const Timer = setTimeout(() => {
      setSearchTerm(searchInput);
      console.log("Api Hit: ", searchInput);
    }, 500);

    return () => clearTimeout(Timer);
  }, [searchInput]);

  const { data: categoryResponse, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["examCategories"],
    queryFn: () => examCategoriesAPI.examCategoriesData(),
  });



  const activeCategoryId = useMemo(() => {
    if (!selectedCategory || !categoryResponse?.data) return "";

    const matchedCategory = categoryResponse.data.find(
      (add) =>
        add.slug === selectedCategory || add.categoryName === selectedCategory,
    );

    return matchedCategory ? matchedCategory._id : selectedCategory;
  }, [selectedCategory, categoryResponse?.data]);


  const {
    data,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["resources", searchTerm, activeCategoryId],
    queryFn: ({ pageParam = 1 }) =>
      resourcesAPI.getResources(pageParam, LIMIT, searchTerm, activeCategoryId),
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < LIMIT) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const allResources = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="gradient-soft-blue-current-affairs w-full">
      <div className="w-full container mx-auto px-4 sm:px-6 py-6">
        <ResourceFilters
          searchTerm={searchInput}
          setSearchTerm={setSearchInput}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          category={categoryResponse?.data}
          isCategoryLoading={isCategoryLoading}
          isFetching={isFetching}
        />
        <ResourceList
          items={allResources}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
>>>>>>> ea303635d1841d36949a38d917108359a2cc8267
