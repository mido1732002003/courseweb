'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CourseForm from '@/components/admin/course-form'
import { createCourseAction } from '@/actions/course.actions'
import { useToast } from '@/hooks/use-toast'

export default function NewCoursePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      const result = await createCourseAction(data)
      if (result.success) {
        toast({
          title: 'Course created',
          description: 'The course has been created successfully.',
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
        description: 'Failed to create course',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create New Course</h2>
        <p className="text-muted-foreground">Add a new course to the platform</p>
      </div>

      <CourseForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}