'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import FavoriteButton from '@/components/course/favorite-button'
import { Clock, Users, PlayCircle } from 'lucide-react'
import { formatDuration } from '@/lib/utils'
import type { Course } from '@/types'

interface CourseCardProps {
  course: Course & {
    section?: { title: string; slug: string }
    _count?: { favorites: number }
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  const levelColor = {
    BEGINNER: 'bg-green-500',
    INTERMEDIATE: 'bg-yellow-500',
    ADVANCED: 'bg-red-500',
  }

  return (
    <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
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
              <PlayCircle className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          {course.level && (
            <Badge
              className={`absolute right-2 top-2 ${levelColor[course.level]} text-white`}
            >
              {course.level}
            </Badge>
          )}
        </div>
      </Link>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Link href={`/courses/${course.slug}`} className="flex-1">
            <h3 className="line-clamp-2 text-lg font-semibold transition-colors hover:text-primary">
              {course.title}
            </h3>
          </Link>
          <FavoriteButton courseId={course.id} />
        </div>
        {course.section && (
          <Link href={`/sections/${course.section.slug}`}>
            <Badge variant="secondary" className="mt-2">
              {course.section.title}
            </Badge>
          </Link>
        )}
      </CardHeader>
      <CardContent className="pb-3">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDuration(course.duration)}
            </div>
          )}
          {course._count?.favorites !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {course._count.favorites}
            </div>
          )}
        </div>
        <Button size="sm" variant="ghost" asChild>
          <Link href={`/courses/${course.slug}`}>
            View Course
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}