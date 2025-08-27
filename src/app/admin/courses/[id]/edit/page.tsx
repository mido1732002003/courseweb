'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import CourseForm from '@/components/admin/course-form'
import { updateCourseAction } from '@/actions/course.actions'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState(null)
  const [fetchingCourse, setFetchingCourse] = useState(true)

  useEffect(() => {
    fetchCourse()
  }, [params.id])

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${params.id}`)
      if (!response.ok) {
        notFound()
      }
      const data = await response.json()
      setCourse(data)
    } catch (error) {
      console.error('Failed to fetch course:', error)
      notFound()
    } finally {
      setFetchingCourse(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      const result = await updateCourseAction(params.id, data)
      if (result.success) {
        toast({
          title: 'Course updated',
          description: 'The course has been updated successfully.',
        })
        router.push('/admin/courses')
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update course',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetchingCourse) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (!course) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Course</h2>
        <p className="text-muted-foreground">Update course information</p>
      </div>

      <CourseForm course={course} onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}