'use client'

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { Loader2 } from 'lucide-react'

interface InfiniteScrollerProps {
  children: React.ReactNode
  onLoadMore: () => void
  hasMore: boolean
  loading: boolean
}

export default function InfiniteScroller({
  children,
  onLoadMore,
  hasMore,
  loading,
}: InfiniteScrollerProps) {
  const loadMoreRef = useInfiniteScroll({
    onLoadMore,
    hasMore,
    loading,
  })

  return (
    <>
      {children}
      {hasMore && (
        <div
          ref={loadMoreRef}
          className="mt-8 flex justify-center py-4"
        >
          {loading && (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          )}
        </div>
      )}
    </>
  )
}