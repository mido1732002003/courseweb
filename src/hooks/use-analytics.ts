import { analytics } from '@/lib/analytics'

export function useAnalytics() {
  return {
    trackEvent: analytics.track.bind(analytics),
    trackPageView: analytics.pageView.bind(analytics),
    trackCourseView: analytics.courseView.bind(analytics),
    trackSearch: analytics.search.bind(analytics),
    trackFavoriteToggle: analytics.favoriteToggle.bind(analytics),
    trackProgressUpdate: analytics.progressUpdate.bind(analytics),
  }
}