'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import RoadmapForm from '@/components/admin/roadmap-form'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

export default function EditRoadmapPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [roadmapItem, setRoadmapItem] = useState(null)
  const [fetchingRoadmap, setFetchingRoadmap] = useState(true)

  useEffect(() => {
    fetchRoadmapItem()
  }, [params.id])

  const fetchRoadmapItem = async () => {
    try {
      const response = await fetch(`/api/roadmap/${params.id}`)
      if (!response.ok) {
        notFound()
      }
      const data = await response.json()
      setRoadmapItem(data)
    } catch (error) {
      console.error('Failed to fetch roadmap item:', error)
      notFound()
    } finally {
      setFetchingRoadmap(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      // Update roadmap item API call
      const response = await fetch(`/api/roadmap/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: 'Roadmap item updated',
          description: 'The roadmap item has been updated successfully.',
        })
        router.push('/admin/roadmaps')
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update roadmap item',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update roadmap item',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetchingRoadmap) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (!roadmapItem) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Roadmap Item</h2>
        <p className="text-muted-foreground">Update roadmap item information</p>
      </div>

      <RoadmapForm roadmapItem={roadmapItem} onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}