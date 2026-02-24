import { Skeleton } from "@/components/ui/skeleton";
import ResourceCard from "./ResourceCard";
import type { Daum } from "@/api/model/resource";

interface ResourceListProps {
  items: Daum[] | undefined;
  isCategoryLoading: boolean;
}

function ResourceList({ items, isCategoryLoading }: ResourceListProps) {
  return (
    <div className="lg:mt-10  space-y-3 min-h-[150px]">
      {isCategoryLoading ? (
        <div className="w-full mt-4">
          <Skeleton className="h-14  mb-2 rounded-lg bg-gray-200" />
          <Skeleton className="h-14   mb-2 rounded-lg bg-gray-200" />
          <Skeleton className="h-14  mb-2 rounded-lg bg-gray-200" />
        </div>
      ) : !items || items.length === 0 ? (
        <div className="flex justify-center items-center py-12 text-gray-500 text-lg font-medium">
          No Data Found
        </div>
      ) : (
        items.map((item) => <ResourceCard key={item._id} item={item} />)
      )}
    </div>
  );
}

export default ResourceList;
