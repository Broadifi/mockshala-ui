import { Skeleton } from "@/components/ui/skeleton"

export function ExamCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border rounded-lg p-2"
        >
          {/* Image skeleton */}
          <Skeleton className="w-10 h-10 rounded-lg shrink-0" />

          {/* Text skeleton */}
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-3 w-[50%]" />
          </div>

          {/* Arrow skeleton */}
          <Skeleton className="w-5 h-5 rounded shrink-0" />
        </div>
      ))}
    </div>
  )
}