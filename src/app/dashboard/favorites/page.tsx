import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/actions/auth.actions'
import { getUserFavoritesAction } from '@/actions/favorite.actions'
import CourseCard from '@/components/course/course-card'
import EmptyState from '@/components/shared/empty-state'
import { Heart } from 'lucide-react'

export default async function FavoritesPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/sign-in?from=/dashboard/favorites')
  }

  const favorites = await getUserFavoritesAction()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Favorites</h1>
        <p className="text-muted-foreground">
          All your bookmarked courses in one place
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Heart className="h-12 w-12" />}
          title="No favorites yet"
          description="Start bookmarking courses you want to take later"
          action={{
            label: 'Browse Courses',
            href: '/courses',
          }}
        />
      )}
    </div>
  )
}