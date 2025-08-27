import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlayCircle } from 'lucide-react'
import type { Course } from '@/types'

interface FavoritesListProps {
  courses: Course[]
}

export default function FavoritesList({ courses }: FavoritesListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group overflow-hidden rounded-lg border transition-all hover:shadow-md"
        >
          <Link href={`/courses/${course.slug}`}>
            <div className="relative aspect-video overflow-hidden bg-muted">
              {course.thumbnailUrl ? (
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <PlayCircle className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/courses/${course.slug}`}>
              <h4 className="line-clamp-1 font-medium hover:text-primary">
                {course.title}
              </h4>
            </Link>
            {course.section && (
              <Badge variant="secondary" className="mt-2">
                {course.section.title}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}