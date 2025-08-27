'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { courseSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSectionsAction } from '@/actions/section.actions'
import { Loader2 } from 'lucide-react'
import type { Course, Section } from '@/types'
import { slugify } from '@/lib/utils'

interface CourseFormProps {
  course?: Course
  onSubmit: (data: any) => Promise<void>
  loading?: boolean
}

export default function CourseForm({ course, onSubmit, loading }: CourseFormProps) {
  const [sections, setSections] = useState<Section[]>([])
  const [autoSlug, setAutoSlug] = useState(true)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: course || {
      isPublished: false,
    },
  })

  const title = watch('title')

  useEffect(() => {
    getSectionsAction().then(setSections)
  }, [])

  useEffect(() => {
    if (autoSlug && title && !course) {
      setValue('slug', slugify(title))
    }
  }, [title, autoSlug, setValue, course])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Introduction to Machine Learning"
              disabled={loading}
            />
            {errors.title && (
              <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register('slug')}
              placeholder="introduction-to-machine-learning"
              disabled={loading}
              onFocus={() => setAutoSlug(false)}
            />
            {errors.slug && (
              <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Course description..."
              rows={4}
              disabled={loading}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="sectionId">Section</Label>
              <Select
                disabled={loading}
                onValueChange={(value) => setValue('sectionId', value)}
                defaultValue={course?.sectionId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section.id} value={section.id}>
                      {section.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.sectionId && (
                <p className="text-sm text-destructive mt-1">{errors.sectionId.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="level">Level</Label>
              <Select
                disabled={loading}
                onValueChange={(value) => setValue('level', value as any)}
                defaultValue={course?.level || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                  <SelectItem value="ADVANCED">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              {...register('duration', { valueAsNumber: true })}
              placeholder="120"
              disabled={loading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
            <Input
              id="thumbnailUrl"
              {...register('thumbnailUrl')}
              placeholder="https://example.com/thumbnail.jpg"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              {...register('videoUrl')}
              placeholder="https://youtube.com/watch?v=..."
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input
              id="pdfUrl"
              {...register('pdfUrl')}
              placeholder="https://example.com/material.pdf"
              disabled={loading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publishing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              id="isPublished"
              type="checkbox"
              {...register('isPublished')}
              disabled={loading}
              className="h-4 w-4"
            />
            <Label htmlFor="isPublished">Publish this course</Label>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          course ? 'Update Course' : 'Create Course'
        )}
      </Button>
    </form>
  )
}