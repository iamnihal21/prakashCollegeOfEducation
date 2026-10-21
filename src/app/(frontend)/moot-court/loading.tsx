import { Skeleton } from '@/app/(frontend)/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-8 pt-32 space-y-20">
      <div className="max-w-3xl mx-auto space-y-6 text-center flex flex-col items-center">
        <Skeleton className="h-8 w-52 rounded-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-16 w-2/3" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-40 rounded-[2.5rem]" />
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-80 rounded-[2.5rem]" />
        ))}
      </div>
    </div>
  )
}