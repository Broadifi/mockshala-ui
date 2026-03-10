import { Skeleton } from "@/components/ui/skeleton";

const EditorialCornerDetailsSkeleton = () => {
  return (
    <div className="w-full container mx-auto px-4 py-2 flex flex-col gap-7">
      
      {/* Breadcrumb */}
      <div className="flex gap-2 items-center">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Title */}
      <Skeleton className="h-8 w-[80%]" />

      {/* Readtime + tags */}
      <div className="flex flex-wrap gap-3 items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Published date */}
      <Skeleton className="h-4 w-40" />

      {/* Image + content */}
      <div className="flex flex-col sm:flex-row gap-6">
        
        {/* Image */}
        <Skeleton className="w-full sm:w-[50%] h-62.5 rounded-2xl" />

        {/* Paragraph */}
        <div className="flex flex-col gap-3 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>
      </div>

      {/* Other Picks */}
      <div className="flex flex-col gap-5">
        <Skeleton className="h-7 w-48 mx-auto" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3 p-3 rounded-3xl shadow-sm">
              
              {/* Thumbnail */}
              <Skeleton className="w-full h-48 rounded-xl" />

              {/* Title */}
              <Skeleton className="h-5 w-[90%]" />
              <Skeleton className="h-5 w-[70%]" />

              {/* Tags */}
              <div className="flex gap-2">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>

              {/* Date + Readtime */}
              <div className="flex gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default EditorialCornerDetailsSkeleton;