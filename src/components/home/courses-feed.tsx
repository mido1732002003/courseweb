'use client'

import { useState, useEffect, useCallback } from 'react'
import CourseCard from '@/components/course/course-card'
import InfiniteScroller from '@/components/shared/infinite-scroller'
import { Skeleton } from '@/components/ui/skeleton'
import type { Course } from '@/types'

export default function CoursesFeed() {
  const [courses, setCourses] = useState<Course[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadCourses = useCallback(async () => {
    if (loading) return

    setLoading(true)
    try {
      const response = await fetch(`/api/courses?page=${page}&limit=6`)
      const data = await response.json()
      
      if (data.items) {
        setCourses(prev => [...prev, ...data.items])
        setHasMore(data.hasMore)
        setPage(prev => prev + 1)
      }
    } catch (error) {
      console.error('Failed to load courses:', error)
    } finally {
      setLoading(false)
    }
  }, [page, loading])

  useEffect(() => {
    loadCourses()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <InfiniteScroller
      onLoadMore={loadCourses}
      hasMore={hasMore}
      loading={loading}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {loading && (
          <>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={`skeleton-${i}`} className="h-64 w-full rounded-lg" />
            ))}
          </>
        )}
      </div>
    </InfiniteScroller>
  )
}