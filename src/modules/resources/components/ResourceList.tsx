import { Skeleton } from "@/components/ui/skeleton";
import ResourceCard from "./ResourceCard";
import type { Daum } from "@/api/model/resource";
import illustration from "@/assets/fallback/NoResultFoundImg.jpg";

interface ResourceListProps {
  items: Daum[] | undefined;
  isFetching: boolean;
  isLoading: boolean; 
}

function ResourceList({ items, isFetching, isLoading }: ResourceListProps) {
  
 
  if (isLoading) {
    return (
      <div className="w-full mt-15 ">
        <Skeleton className="h-17 mb-4  bg-gray-200" />
        <Skeleton className="h-17 mb-4  bg-gray-200" />
        <Skeleton className="h-17 mb-4  bg-gray-200" />
        <Skeleton className="h-17 mb-4  bg-gray-200" />
        <Skeleton className="h-17 mb-4  bg-gray-200" />
      </div>
    );
  }

  
  if (!items || items.length === 0) {
    return (
      <div className={`flex justify-center items-center py-12 text-gray-500 text-lg font-medium transition-opacity duration-300 ${isFetching ? "opacity-50" : "opacity-100"}`}>
        {isFetching ? "Searching..." : (
          <div className="flex flex-col gap-5 justify-center items-center">
            <img src={illustration} alt="No results found" className="w-60 h-60 object-contain mt-20 " />
            <h2>No Data Found</h2>
          </div>
        )}
      </div>
    );
  }


  return (
    <div className={`lg:mt-10 space-y-3 min-h-[150px] transition-opacity duration-300 ${
      isFetching ? "opacity-50 pointer-events-none" : "opacity-100"
    }`}>
      {items.map((item) => (
        <ResourceCard key={item._id} item={item} />
      ))}
    </div>
  );
}

export default ResourceList;
