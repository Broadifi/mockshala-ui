import { Skeleton } from "@/components/ui/skeleton";

export function BuyCardSkeleton() {
  return (
    <div className="col-span-3 -mt-64 mr-5 z-10">
      <div className="shadow-lg bg-white/80 rounded-2xl p-2 space-y-5">
        {/* Image skeleton */}
        <div className="w-full rounded-t-2xl h-56 p-2 relative overflow-hidden">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>

        {/* Price section */}
        <div className="px-2">
          {/* Original price + badge */}
          <div className="flex gap-2 justify-center mb-2 items-center">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Discount price */}
          <div className="flex flex-col items-center mb-4 gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* Buy button */}
          <div className="mb-4">
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* What you'll get */}
          <div className="border-t py-4 space-y-3">
            <Skeleton className="h-4 w-32" />

            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-48" />
            </div>

            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-44" />
            </div>
          </div>

          {/* Share & Favorite */}
          <div className="flex gap-8 pt-3 pb-5">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
