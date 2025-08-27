import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Save scroll position before navigation
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        `scrollPos-${pathname}`,
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      )
    }

    // Restore scroll position after navigation
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem(`scrollPos-${pathname}`)
      if (savedPosition) {
        const { x, y } = JSON.parse(savedPosition)
        window.scrollTo(x, y)
      }
    }

    // Save position on route change
    window.addEventListener('beforeunload', saveScrollPosition)
    
    // Restore position on mount
    restoreScrollPosition()

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition)
      saveScrollPosition()
    }
  }, [pathname])
}