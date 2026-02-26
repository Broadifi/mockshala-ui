import React from "react";
import type { Daum as CategoryDaum } from "@/api/model/exam-categories";

interface ResourceFiltersProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  ExamCategory?: CategoryDaum[];
  isCategoryLoading: boolean;
  isFetching: boolean;
}

function ResourceFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  ExamCategory,
  isCategoryLoading,
}: ResourceFiltersProps) {
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 mb-6 lg:mt-9 w-full">
      
      
      <div className="col-span-1 md:col-span-12">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-blue-600">
          RESOURCES
        </h1>
      </div>

      <div className="col-span-1 md:col-span-6 lg:col-span-8 relative flex items-center border border-gray-200 rounded-4xl bg-white px-3 py-0.5 w-full">
        <input
          type="text"
          placeholder="Search here.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none py-2 w-full bg-transparent text-gray-700"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        )}
      </div>

      
      <div className="col-span-1 md:col-span-6 lg:col-span-4 relative w-full">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-200 rounded-3xl cursor-pointer px-4 py-2.5 pr-10 bg-white text-gray-600 w-full outline-none transition appearance-none"
        >
          <option value="">All Categories</option>
          {isCategoryLoading && <option disabled>Loading Categories...</option>}
          
          {ExamCategory?.map((item) => (
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
      
    </div>
  );
}

export default ResourceFilters;
