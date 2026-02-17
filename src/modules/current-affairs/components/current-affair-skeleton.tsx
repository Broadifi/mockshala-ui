import { Calendar } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCurrentAffairCard() {
  return (
    <div className='p-0 h-[27rem] overflow-hidden border rounded-lg animate-pulse'>
      {/* Image */}
      <div className='w-full h-40 bg-zinc-200' />

      <div className='px-4 py-4 space-y-4'>
        {/* Title */}
        <Skeleton className='h-6 w-3/4 rounded-lg' />
        {/* Description */}
        <Skeleton className='h-4 w-full rounded-lg' />
        <Skeleton className='h-4 w-5/6 rounded-lg' />
        {/* Date */}
        <div className='flex items-center gap-2 text-zinc-500'>
          <Calendar size={15} className='text-zinc-300' />
          <Skeleton className='h-3 w-20 rounded-lg' />
        </div>
        {/* Tags */}
        <div className='flex gap-2 flex-wrap'>
          <div className='flex items-center gap-1 bg-zinc-200 rounded-full px-2 py-1 w-16 h-6' />
          <div className='flex items-center gap-1 bg-zinc-200 rounded-full px-2 py-1 w-20 h-6' />
          <div className='flex items-center gap-1 bg-zinc-200 rounded-full px-2 py-1 w-14 h-6' />
        </div>
      </div>
    </div>
  );
}

export default function SkeletonCurrentAffairsGrid({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6'>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCurrentAffairCard key={i} />
      ))}
    </div>
  );
}
