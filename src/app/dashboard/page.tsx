import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/actions/auth.actions'
import { getUserFavoritesAction } from '@/actions/favorite.actions'  // Fixed import
import { getUserProgressAction } from '@/actions/progress.actions'  // Fixed import
import { getRecentViewsAction } from '@/actions/section.actions'
import StatsCards from '@/components/dashboard/stats-cards'
import RecentCourses from '@/components/dashboard/recent-courses'
import FavoritesList from '@/components/dashboard/favorites-list'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/sign-in?from=/dashboard')
  }

  const [favorites, progress, recentViews] = await Promise.all([
    getUserFavoritesAction(),
    getUserProgressAction(),
    getRecentViewsAction(),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name || 'Learner'}!
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey from where you left off.
        </p>
      </div>

      <StatsCards
        totalCourses={progress.length}
        completedCourses={progress.filter(p => p.percent === 100).length}
        inProgressCourses={progress.filter(p => p.percent > 0 && p.percent < 100).length}
        favoriteCount={favorites.length}
      />

      {recentViews.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/recent">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <RecentCourses courses={recentViews.slice(0, 3)} />
          </CardContent>
        </Card>
      )}

      {favorites.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Favorites</CardTitle>
                <CardDescription>Courses you've bookmarked</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/favorites">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <FavoritesList courses={favorites.slice(0, 3)} />
          </CardContent>
        </Card>
      )}

      {recentViews.length === 0 && favorites.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-lg font-semibold">Start Your Learning Journey</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore our courses and begin learning something new today
            </p>
            <Button className="mt-4" asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}