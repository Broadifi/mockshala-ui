import { Skeleton } from "@/components/ui/skeleton"

export function ExamModuleSkeleton() {
  return (
    <div className="grid grid-cols-12 w-212 h-106">

      {/* LEFT SIDEBAR SKELETON */}
      <div className="col-span-4 border-r exam-card-gradient overflow-y-auto rounded-md p-2 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>

      {/* RIGHT SIDE SKELETON */}
      <div className="col-span-8 p-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border rounded-lg p-4"
            >
              <Skeleton className="w-10 h-10 rounded" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}