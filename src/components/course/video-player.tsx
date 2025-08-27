'use client'

import { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import { updateProgressAction } from '@/actions/progress.actions'
import { useAuth } from '@/hooks/use-auth'

interface VideoPlayerProps {
  url: string
  courseId: string
}

export default function VideoPlayer({ url, courseId }: VideoPlayerProps) {
  const { user } = useAuth()
  const playerRef = useRef<ReactPlayer>(null)
  const progressUpdateRef = useRef<NodeJS.Timeout>()

  const handleProgress = (state: { played: number }) => {
    if (user && state.played > 0) {
      // Clear previous timeout
      if (progressUpdateRef.current) {
        clearTimeout(progressUpdateRef.current)
      }

      // Debounce progress updates
      progressUpdateRef.current = setTimeout(() => {
        const percent = Math.round(state.played * 100)
        updateProgressAction(courseId, percent)
      }, 5000) // Update every 5 seconds
    }
  }

  useEffect(() => {
    return () => {
      if (progressUpdateRef.current) {
        clearTimeout(progressUpdateRef.current)
      }
    }
  }, [])

  return (
    <div className="relative aspect-video bg-black">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        controls
        onProgress={handleProgress}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
            },
          },
        }}
      />
    </div>
  )
}