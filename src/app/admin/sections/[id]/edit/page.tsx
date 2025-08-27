'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import SectionForm from '@/components/admin/section-form'
import { updateSectionAction } from '@/actions/section.actions'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

export default function EditSectionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [section, setSection] = useState(null)
  const [fetchingSection, setFetchingSection] = useState(true)

  useEffect(() => {
    fetchSection()
  }, [params.id])

  const fetchSection = async () => {
    try {
      const response = await fetch(`/api/sections/${params.id}`)
      if (!response.ok) {
        notFound()
      }
      const data = await response.json()
      setSection(data)
    } catch (error) {
      console.error('Failed to fetch section:', error)
      notFound()
    } finally {
      setFetchingSection(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      const result = await updateSectionAction(params.id, data)
      if (result.success) {
        toast({
          title: 'Section updated',
          description: 'The section has been updated successfully.',
        })
        router.push('/admin/sections')
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
        description: 'Failed to update section',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetchingSection) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (!section) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Section</h2>
        <p className="text-muted-foreground">Update section information</p>
      </div>

      <SectionForm section={section} onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}