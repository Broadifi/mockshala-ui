import React from "react";

import type { Daum as CategoryDaum } from "@/api/model/exam-categories";

interface ResourceFiltersProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;

  categories?: CategoryDaum[];

  isCategoryLoading: boolean;
  isFetching: boolean;
}

function ResourceFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  isCategoryLoading,
}: ResourceFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-3 lg:mt-9">
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-blue-600">
          RESOURCES
        </h1>
        <div className="w-14 h-1.5 sm:w-16 sm:h-1.5 bg-yellow-400 rounded-full mt-1.5 "></div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">

        {/* Wrapper must be relative */}
        <div className="relative w-full sm:min-w-[280px] ">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={"border cursor-pointer px-6 py-2 pr-10 bg-white text-gray-600 w-full  outline-none transition appearance-none"
              
            }
          >
            <option value="">All Categories </option>
            {isCategoryLoading && (
              <option disabled>Loading Categories...</option>
            )}
            {categories?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.categoryName}
              </option>
            ))}
          </select>

          {!selectedCategory && (
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          )}

          
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          )}
        </div>

        <div className=" relative flex items-center border bg-white px-3 w-full sm:min-w-[280px] ">
          <input
            type="text"
            placeholder="Search here.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none py-2 w-full"
          />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default ResourceFilters;
