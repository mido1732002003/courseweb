import { Skeleton } from '@/components/ui/skeleton'

export default function CourseLoading() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Skeleton className="h-10 w-3/4 mb-3" />
          <div className="flex gap-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            <Skeleton className="aspect-video w-full" />
          </div>
          <aside>
            <Skeleton className="h-96 w-full" />
          </aside>
        </div>
      </div>
    </div>
  )
}