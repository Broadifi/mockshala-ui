import { Card, CardContent } from '@/components/ui/card'

function MobileAllTestCardSkeleton() {
  return (
<div className="max-w-6xl w-full">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <Card key={i} className="overflow-hidden animate-pulse">
        <CardContent className="px-4">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-20 rounded-md bg-gray-200" />
            <div className="h-5 w-24 rounded-md bg-gray-200" />
          </div>

          {/* Test Name + Lock */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1">
              <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
              <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
            </div>
            <div className="h-9 w-9 bg-gray-200 rounded-lg" />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-4 w-16 bg-gray-200 rounded-md" />
            {/* <div className="h-4 w-20 bg-gray-200 rounded-md" />
            <div className="h-4 w-24 bg-gray-200 rounded-md" /> */}
          </div>

          {/* Button */}
          <div className="h-10 w-full bg-gray-200 rounded-lg" />
        </CardContent>
      </Card>
    ))}
  </div>
</div>

  )
}

export default MobileAllTestCardSkeleton