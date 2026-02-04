

function MobileTestHeaderSkeleton() {
  return (
    <div
  className="flex flex-col gap-2 lg:hidden rounded-2xl bg-white/50 backdrop-blur-2xl
  border border-white/60 ring-1 ring-white/30 shadow-lg
  px-4 py-4 mb-6 animate-pulse"
>
  {/* Image + Header */}
  <div className="flex gap-4 mb-3 items-center">
    <div className="shrink-0">
      <div className="rounded-full h-16 sm:h-20 w-16 sm:w-20 bg-gray-200" />
    </div>

    <div className="flex-1">
      <div className="h-5 sm:h-6 w-3/4 bg-gray-200 rounded-md" />
    </div>
  </div>

  {/* Features */}
  <div className="flex gap-10 items-center pb-4">
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 bg-gray-200 rounded-md" />
      <div className="h-4 w-24 bg-gray-200 rounded-md" />
    </div>

    <div className="flex items-center gap-2">
      <div className="h-6 w-6 bg-gray-200 rounded-md" />
      <div className="h-4 w-32 bg-gray-200 rounded-md" />
    </div>

    <div className="hidden sm:flex items-center gap-2">
      <div className="h-5 w-5 bg-gray-200 rounded-md" />
      <div className="h-4 w-24 bg-gray-200 rounded-md" />
    </div>
  </div>

  {/* Price + validity */}
  <div className="mb-3 flex justify-between items-end">
    <div>
      <div className="h-6 w-20 bg-gray-200 rounded-md mb-2" />
      <div className="h-4 w-16 bg-gray-200 rounded-md" />
    </div>

    <div className="sm:hidden">
      <div className="h-4 w-20 bg-gray-200 rounded-md" />
    </div>
  </div>

  {/* Buy Now button */}
  <div className="mb-5">
    <div className="h-11 w-full rounded-lg bg-gray-200" />
  </div>

  {/* Footer actions */}
  <div className="flex justify-between items-center">
    <div className="h-4 w-40 bg-gray-200 rounded-md" />

    <div className="flex gap-4">
      <div className="h-5 w-5 bg-gray-200 rounded-full" />
      <div className="h-5 w-5 bg-gray-200 rounded-full" />
    </div>
  </div>
</div>

  )
}

export default MobileTestHeaderSkeleton