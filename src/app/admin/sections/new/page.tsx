'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SectionForm from '@/components/admin/section-form'
import { createSectionAction } from '@/actions/section.actions'
import { useToast } from '@/hooks/use-toast'

export default function NewSectionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      const result = await createSectionAction(data)
      if (result.success) {
        toast({
          title: 'Section created',
          description: 'The section has been created successfully.',
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
        description: 'Failed to create section',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create New Section</h2>
        <p className="text-muted-foreground">Add a new learning section</p>
      </div>

      <SectionForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}