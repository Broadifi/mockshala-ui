import { Skeleton } from "@/components/ui/skeleton";
import ResourceCard from "./ResourceCard";
import type { Daum } from "@/api/model/resource";

interface ResourceListProps {
  items: Daum[] | undefined;
  isFetching: boolean;
  isLoading: boolean; 
}

function ResourceList({ items, isFetching, isLoading }: ResourceListProps) {
  
 
  if (isLoading) {
    return (
      <div className="w-full mt-10 border ">
        <Skeleton className="h-14 mb-4  bg-gray-200" />
        <Skeleton className="h-14 mb-4  bg-gray-200" />
        <Skeleton className="h-14 mb-4  bg-gray-200" />
        <Skeleton className="h-14 mb-4  bg-gray-200" />
        <Skeleton className="h-14 mb-4  bg-gray-200" />
      </div>
    );
  }

  
  if (!items || items.length === 0) {
    return (
      <div className={`flex justify-center items-center py-12 text-gray-500 text-lg font-medium transition-opacity duration-300 ${isFetching ? "opacity-50" : "opacity-100"}`}>
        {isFetching ? "Searching..." : "No Data Available "}
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
