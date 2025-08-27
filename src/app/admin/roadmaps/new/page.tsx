'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RoadmapForm from '@/components/admin/roadmap-form'
import { createRoadmapItemAction } from '@/actions/section.actions'
import { useToast } from '@/hooks/use-toast'

export default function NewRoadmapPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      const result = await createRoadmapItemAction(data)
      if (result.success) {
        toast({
          title: 'Roadmap item created',
          description: 'The roadmap item has been created successfully.',
        })
        router.push('/admin/roadmaps')
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
        description: 'Failed to create roadmap item',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create New Roadmap Item</h2>
        <p className="text-muted-foreground">Add a new item to a learning roadmap</p>
      </div>

      <RoadmapForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}