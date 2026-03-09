import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CurrentAffairSkeleton() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full mt-6 sm:mt-8"
    >
      <CarouselContent>
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 md:p-4"
          >
            <div className="bg-white rounded-xl shadow-md border border-sky-100/60 space-y-3 overflow-hidden">
              {/* Image Skeleton */}
              <Skeleton className="h-[200px] w-full rounded-b-none" />

              {/* Description Section */}
              <div className="px-4 space-y-4 py-3">
                {/* Date and Time Skeleton */}
                <div className="flex gap-5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Tags Skeleton */}
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                {/* Title Skeleton */}
                <div className="space-y-2 pb-4 xl:pb-5">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious className="left-4 cursor-pointer" />
        <CarouselNext className="right-4 cursor-pointer" />
      </div>
    </Carousel>
  );
}

export default CurrentAffairSkeleton;
