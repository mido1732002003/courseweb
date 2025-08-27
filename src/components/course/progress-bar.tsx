'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { updateProgressAction } from '@/actions/progress.actions'
import { useAuth } from '@/hooks/use-auth'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  courseId: string
  initialProgress?: number
  onUpdate?: (percent: number) => void
}

export default function ProgressBar({ 
  courseId, 
  initialProgress = 0,
  onUpdate 
}: ProgressBarProps) {
  const [progress, setProgress] = useState(initialProgress)
  const { user } = useAuth()

  const updateProgress = async (newProgress: number) => {
    if (!user) return
    
    setProgress(newProgress)
    if (onUpdate) {
      onUpdate(newProgress)
    }

    try {
      await updateProgressAction(courseId, newProgress)
    } catch (error) {
      console.error('Failed to update progress:', error)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Your Progress
        </span>
        <span className={cn(
          "font-medium",
          progress === 100 && "text-green-500"
        )}>
          {progress === 100 ? (
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Completed
            </span>
          ) : (
            `${progress}%`
          )}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}