'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { roadmapItemSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSectionsAction } from '@/actions/section.actions'
import { Loader2 } from 'lucide-react'
import type { RoadmapItem, Section } from '@/types'

interface RoadmapFormProps {
  roadmapItem?: RoadmapItem
  onSubmit: (data: any) => Promise<void>
  loading?: boolean
}

export default function RoadmapForm({ roadmapItem, onSubmit, loading }: RoadmapFormProps) {
  const [sections, setSections] = useState<Section[]>([])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(roadmapItemSchema),
    defaultValues: roadmapItem || {
      order: 0,
    },
  })

  useEffect(() => {
    getSectionsAction().then(setSections)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Roadmap Item Information</CardTitle>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Item description..."
              rows={3}
              disabled={loading}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="sectionId">Section</Label>
            <Select
              disabled={loading}
              onValueChange={(value) => setValue('sectionId', value)}
              defaultValue={roadmapItem?.sectionId}
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
            <Label htmlFor="order">Order</Label>
            <Input
              id="order"
              type="number"
              {...register('order', { valueAsNumber: true })}
              placeholder="0"
              disabled={loading}
            />
            {errors.order && (
              <p className="text-sm text-destructive mt-1">{errors.order.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="url">External URL (Optional)</Label>
            <Input
              id="url"
              {...register('url')}
              placeholder="https://example.com/resource"
              disabled={loading}
            />
            {errors.url && (
              <p className="text-sm text-destructive mt-1">{errors.url.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="content">Content (Optional)</Label>
            <Textarea
              id="content"
              {...register('content')}
              placeholder="Detailed content or notes..."
              rows={6}
              disabled={loading}
            />
            {errors.content && (
              <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
            )}
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
          roadmapItem ? 'Update Roadmap Item' : 'Create Roadmap Item'
        )}
      </Button>
    </form>
  )
}