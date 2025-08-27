'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CourseCard from '@/components/course/course-card'
import CourseFilters from '@/components/course/course-filters'
import InfiniteScroller from '@/components/shared/infinite-scroller'
import EmptyState from '@/components/shared/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import type { Course } from '@/types'

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  const search = searchParams.get('search') || ''
  const sectionId = searchParams.get('section') || ''
  const level = searchParams.get('level') || ''

  const loadCourses = async (reset = false) => {
    if (loading && !reset) return

    setLoading(true)
    const currentPage = reset ? 1 : page

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...(search && { search }),
        ...(sectionId && { sectionId }),
        ...(level && { level }),
      })

      const response = await fetch(`/api/courses?${params}`)
      const data = await response.json()

      if (data.items) {
        if (reset) {
          setCourses(data.items)
          setPage(2)
        } else {
          setCourses(prev => [...prev, ...data.items])
          setPage(prev => prev + 1)
        }
        setHasMore(data.hasMore)
      }
    } catch (error) {
      console.error('Failed to load courses:', error)
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  }

  useEffect(() => {
    setCourses([])
    setPage(1)
    setHasMore(true)
    loadCourses(true)
  }, [search, sectionId, level]) // eslint-disable-line react-hooks/exhaustive-deps

  if (initialLoad) {
    return <CoursesPageSkeleton />
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">All Courses</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {search 
            ? `Search results for "${search}"`
            : 'Browse our complete collection of courses'}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside>
          <CourseFilters />
        </aside>

        <main>
          {courses.length > 0 ? (
            <InfiniteScroller
              onLoadMore={() => loadCourses()}
              hasMore={hasMore}
              loading={loading}
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </InfiniteScroller>
          ) : (
            <EmptyState
              title={search ? 'No courses found' : 'No courses available'}
              description={
                search
                  ? 'Try adjusting your search terms or filters'
                  : 'Check back later for new courses'
              }
              action={
                search
                  ? {
                      label: 'Clear search',
                      href: '/courses',
                    }
                  : undefined
              }
            />
          )}
        </main>
      </div>
    </div>
  )
}

function CoursesPageSkeleton() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Skeleton className="h-12 w-48 mb-3" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside>
          <Skeleton className="h-96 w-full" />
        </aside>
        <main>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}