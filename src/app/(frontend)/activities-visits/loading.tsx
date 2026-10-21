import { Skeleton } from '@/app/(frontend)/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-8 pt-32 space-y-16">
      <div className="max-w-3xl mx-auto space-y-4 text-center flex flex-col items-center">
        <Skeleton className="h-8 w-56 rounded-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-16 w-2/3" />
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-80 rounded-[2.5rem]" />
        ))}
      </div>
    </div>
  )
}