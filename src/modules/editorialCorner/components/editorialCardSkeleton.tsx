const EditorialCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 rounded-3xl pb-5 shadow-sm bg-card h-full animate-pulse">
      
      {/* Image Skeleton */}
      <div className="rounded-t-3xl w-full h-52 bg-gray-300" />

      {/* Title Skeleton */}
      <div className="px-5 pt-2 space-y-2">
        <div className="h-5 md:h-6 lg:h-7 bg-gray-300 rounded w-3/4" />
        <div className="h-5 md:h-6 lg:h-7 bg-gray-300 rounded w-1/2" />
      </div>

      {/* Read Time Skeleton */}
      <div className="flex items-center gap-2 px-5 mt-1">
        <div className="h-4 w-4 bg-gray-300 rounded-full" />
        <div className="h-4 bg-gray-300 rounded w-20" />
      </div>

      {/* Description Skeleton */}
      <div className="px-5 space-y-2 mt-1">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>

      {/* Date Skeleton */}
      <div className="flex items-center mx-5 mt-2 gap-2">
        <div className="h-4 w-4 bg-gray-300 rounded-full" />
        <div className="h-4 bg-gray-300 rounded w-28" />
      </div>

    </div>
  );
};
export default EditorialCardSkeleton;