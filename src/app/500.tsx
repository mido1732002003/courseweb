'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ServerCrash } from 'lucide-react'

export default function Error500({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('500 Error:', error)
  }, [error])

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <ServerCrash className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-3xl font-bold">500 - Server Error</h1>
        <p className="mt-2 text-muted-foreground">
          Something went wrong on our end. Please try again later.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}