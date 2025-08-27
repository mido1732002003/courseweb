interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

class Analytics {
  private queue: AnalyticsEvent[] = []
  private isInitialized = false

  initialize() {
    if (this.isInitialized) return
    this.isInitialized = true

    // Flush queued events
    this.queue.forEach(event => this.track(event.name, event.properties))
    this.queue = []
  }

  track(eventName: string, properties?: Record<string, any>) {
    if (!this.isInitialized) {
      this.queue.push({ name: eventName, properties })
      return
    }

    // Send to your analytics service
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ANALYTICS_ID) {
      console.log('Analytics Event:', eventName, properties)
      
      // Example: Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', eventName, properties)
      }
    }

    // Also send to our API
    if (typeof window !== 'undefined') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventName, properties }),
      }).catch(console.error)
    }
  }

  pageView(url: string) {
    this.track('page_view', { url })
  }

  courseView(courseId: string, courseTitle: string) {
    this.track('course_view', { courseId, courseTitle })
  }

  search(query: string, resultCount: number) {
    this.track('search', { query, resultCount })
  }

  favoriteToggle(courseId: string, action: 'add' | 'remove') {
    this.track('favorite_toggle', { courseId, action })
  }

  progressUpdate(courseId: string, percent: number) {
    this.track('progress_update', { courseId, percent })
  }

  signUp(method: string = 'email') {
    this.track('sign_up', { method })
  }

  signIn(method: string = 'email') {
    this.track('sign_in', { method })
  }
}

export const analytics = new Analytics()