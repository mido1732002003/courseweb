import { Skeleton } from '@/components/ui/skeleton'

interface LoadingSkeletonProps {
  count?: number
  className?: string
}

export function LoadingSkeleton({ count = 1, className }: LoadingSkeletonProps) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} className={className} />
      ))}
    </>
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
    </div>
  )
}

export function SectionCardSkeleton() {
  return (
    <div className="space-y-3 p-6">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}