import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import ResourceCard from "./ResourceCard";
import type { Daum } from "@/api/model/resource";
import illustration from "@/assets/fallback/NoResultFoundImg.jpg";

interface ResourceListProps {
  items: Daum[] | undefined;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

function ResourceList({
  items,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ResourceListProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className=" grid grid-cols-4  mt-10">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-45 mb-2 w-75 rounded-lg bg-gray-200" />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex  flex-col justify-center items-center py-12 text-gray-500 text-lg font-medium">
        <img
          src={illustration}
          alt="No Data Found"
          className="w-70 h-70 mr-2 mix-blend-multiply"
        />
        No Data Found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
      {items.map((item) => (
        <ResourceCard key={item._id} item={item} />
      ))}

      <div ref={ref} className="w-full flex justify-center py-6">
        {isFetchingNextPage && (
          <div className="text-blue-600 font-medium animate-pulse">
            Loading more resources...
          </div>
        )}
        {/* {!hasNextPage && items.length > 0 && (
          <div className="text-gray-400 text-sm">
            You have reached the end of the list.
          </div>
        )} */}
      </div>
    </div>
  );
}

export default ResourceList;
