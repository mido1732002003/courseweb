'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { analytics } from '@/lib/analytics'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    analytics.initialize()
  }, [])

  useEffect(() => {
    analytics.pageView(pathname)
  }, [pathname])

  return <>{children}</>
}