import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, CheckCircle, Clock, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'  // Add this import

interface StatsCardsProps {
  totalCourses: number
  completedCourses: number
  inProgressCourses: number
  favoriteCount: number
}

export default function StatsCards({
  totalCourses,
  completedCourses,
  inProgressCourses,
  favoriteCount,
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      color: 'text-blue-500',
    },
    {
      title: 'Completed',
      value: completedCourses,
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'In Progress',
      value: inProgressCourses,
      icon: Clock,
      color: 'text-yellow-500',
    },
    {
      title: 'Favorites',
      value: favoriteCount,
      icon: Heart,
      color: 'text-red-500',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={cn('h-4 w-4', stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}