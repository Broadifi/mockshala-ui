import { Skeleton } from "@/components/ui/skeleton";

function BuyNowSkeleton() {
  return (
    <div
      className="hidden lg:flex flex-col border border-white shadow-lg bg-buyNow-card
                 rounded-2xl p-2 space-y-5
                 w-full max-w-full box-border"
    >
      {/* Image */}
      <div className="w-full rounded-t-2xl h-56 p-2 relative overflow-hidden">
        <Skeleton className="h-full w-full rounded-t-lg" />
      </div>

      {/* Content */}
      <div className="px-2">
        {/* Original price + badge */}
        <div className="flex gap-2 justify-center mb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Discount price */}
        <div className="flex flex-col items-center mb-4 gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-36" />
        </div>

        {/* Buy now button */}
        <div className="mb-4">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* What you'll get */}
        <div className="border-t py-4 space-y-2">
          <Skeleton className="h-4 w-32" />

          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>

        {/* Share + favorite */}
        <div className="flex flex-col xl:flex-row items-center gap-4 xl:gap-8 pt-3 pb-5">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyNowSkeleton;
