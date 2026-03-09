import { Skeleton } from "@/components/ui/skeleton";

export default function ExamInstructionsSkeleton() {
  return (
    <div className="space-y-4 md:space-y-5 xl:space-y-6">

      {/* Header */}
      <div className="bg-blue-500/20 w-full rounded-lg px-3 lg:px-4 py-3 lg:py-4 
      flex flex-col lg:flex-row justify-between lg:items-center gap-5">

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-7 xl:h-8 w-56 bg-white/40" />
          <Skeleton className="h-4 xl:h-5 w-36 bg-white/40" />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 2xl:gap-6">

          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-md bg-white/40" />

              <div className="space-y-1">
                <Skeleton className="h-3 w-20 bg-white/40" />
                <Skeleton className="h-4 w-24 bg-white/40" />
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-100/40 p-4 border border-gray-200 rounded-lg space-y-4">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-3">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-1.5 h-6 rounded-xl" />
            <Skeleton className="h-5 w-40" />
          </div>

          <Skeleton className="h-4 w-64" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-2xl">
          <table className="min-w-full">
            <thead>
              <tr>
                {[...Array(6)].map((_, i) => (
                  <th key={i} className="px-4 py-3">
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[...Array(3)].map((_, row) => (
                <tr key={row}>
                  {[...Array(6)].map((_, col) => (
                    <td key={col} className="px-4 py-3 text-center">
                      <Skeleton className="h-4 w-10 mx-auto" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Palette */}
        <div className="space-y-4">

          <Skeleton className="h-4 w-64" />

          <div className="flex flex-wrap gap-4 lg:gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-32 rounded-md" />
                <Skeleton className="h-4 w-52" />
              </div>
            ))}

          </div>

        </div>

        {/* Instruction HTML */}
        <div className="pt-4 mt-5 border-t space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>

      </div>

    </div>
  );
}