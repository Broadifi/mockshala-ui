import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCurrentAffairSingle() {
  return (
    <section className='w-full p-4 overflow-y-auto pb-10 max-w-5xl mx-auto'>
      {/* Back Button */}
      <div className='flex items-center gap-2 mb-4 w-fit'>
        <Skeleton className='w-8 h-8 rounded-md' />
        <Skeleton className='h-4 w-32 rounded-md' />
      </div>

      {/* Title */}
      <Skeleton className='h-6 w-3/4 rounded-md mb-2' />
      <Skeleton className='h-4 w-1/4 rounded-md mb-4' />

      {/* Image */}
      <Skeleton className='w-full h-64 rounded-lg mb-6' />

      {/* Paragraphs */}
      <div className='space-y-3'>
        <Skeleton className='h-4 w-full rounded-md' />
        <Skeleton className='h-4 w-5/6 rounded-md' />
        <Skeleton className='h-4 w-4/5 rounded-md' />
        <Skeleton className='h-4 w-3/4 rounded-md' />
        <Skeleton className='h-4 w-2/3 rounded-md' />
      </div>
    </section>
  );
}
