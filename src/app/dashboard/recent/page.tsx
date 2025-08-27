import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/actions/auth.actions'
import { getRecentViewsAction } from '@/actions/section.actions'
import CourseCard from '@/components/course/course-card'
import EmptyState from '@/components/shared/empty-state'
import { Clock } from 'lucide-react'

export default async function RecentPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/sign-in?from=/dashboard/recent')
  }

  const recentViews = await getRecentViewsAction()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recently Viewed</h1>
        <p className="text-muted-foreground">
          Courses you've recently visited
        </p>
      </div>

      {recentViews.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentViews.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Clock className="h-12 w-12" />}
          title="No recent courses"
          description="Start exploring courses to see them here"
          action={{
            label: 'Browse Courses',
            href: '/courses',
          }}
        />
      )}
    </div>
  )
}