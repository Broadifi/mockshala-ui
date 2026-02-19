export  function EditorialCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden border border-sky-100/60 bg-white shadow-md">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200" />

      {/* Content */}
      <div className="px-4 py-4 space-y-3">
        {/* date row */}
        <div className="flex gap-5">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        {/* title lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}



export default function EditorialSkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 xl:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <EditorialCardSkeleton key={i} />
      ))}
    </div>
  );
}