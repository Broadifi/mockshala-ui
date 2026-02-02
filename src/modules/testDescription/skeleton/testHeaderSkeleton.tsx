import { Skeleton } from "@/components/ui/skeleton";

export function TestHeaderSkeleton() {
  return (
    <div
      className="
        rounded-2xl
        bg-white/50
        backdrop-blur-2xl
        border border-white/60
        ring-1 ring-white/30
        shadow-lg
        px-6 py-8 mb-6
      "
    >
      {/* Title */}
      <div className="pb-4">
        <Skeleton className="h-10 w-[70%]" />
      </div>

      {/* Description */}
      <div className="pb-8 space-y-2 max-w-3xl">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>

      {/* Features */}
      <div className="flex gap-10 items-center pb-6">
        {/* Total Tests */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Total Questions */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Validity */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
}
