import { Skeleton } from "@/components/ui/skeleton";

export function AllExamsCardsSkeleton() {
  return (
    <section className="py-8 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
          gap-3 sm:gap-5 md:gap-6 xl:gap-10"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-200 p-2 sm:p-3 gap-3
              rounded-lg shadow-xs"
            >
              {/* Image */}
              <div className="py-2">
                <Skeleton className="w-full h-16 sm:h-20 rounded-lg" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1"
                  >
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto pt-4">
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
