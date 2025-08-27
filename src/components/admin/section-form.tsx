'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sectionSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import type { Section } from '@/types'
import { slugify } from '@/lib/utils'

interface SectionFormProps {
  section?: Section
  onSubmit: (data: any) => Promise<void>
  loading?: boolean
}

export default function SectionForm({ section, onSubmit, loading }: SectionFormProps) {
  const [autoSlug, setAutoSlug] = useState(true)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: section || {
      order: 0,
    },
  })

  const title = watch('title')

  useEffect(() => {
    if (autoSlug && title && !section) {
      setValue('slug', slugify(title))
    }
  }, [title, autoSlug, setValue, section])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Section Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Artificial Intelligence"
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
              placeholder="artificial-intelligence"
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
              placeholder="Section description..."
              rows={3}
              disabled={loading}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="icon">Icon (Emoji)</Label>
              <Input
                id="icon"
                {...register('icon')}
                placeholder="🤖"
                disabled={loading}
              />
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
          section ? 'Update Section' : 'Create Section'
        )}
      </Button>
    </form>
  )
}