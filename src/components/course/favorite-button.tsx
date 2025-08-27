'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { toggleFavoriteAction, checkFavoriteAction } from '@/actions/favorite.actions'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  courseId: string
  className?: string
}

export default function FavoriteButton({ courseId, className }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      checkFavoriteAction(courseId).then(setIsFavorite)
    }
  }, [courseId, user])

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save favorites',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const result = await toggleFavoriteAction(courseId)
      if (result.success) {
        setIsFavorite(result.action === 'added')
        toast({
          title: result.action === 'added' ? 'Added to favorites' : 'Removed from favorites',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update favorite',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn('h-8 w-8', className)}
      onClick={handleToggle}
      disabled={loading}
    >
      <Heart
        className={cn(
          'h-4 w-4',
          isFavorite && 'fill-red-500 text-red-500'
        )}
      />
      <span className="sr-only">
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </span>
    </Button>
  )
}