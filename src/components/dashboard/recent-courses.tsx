import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { PlayCircle } from 'lucide-react'
import type { Course } from '@/types'

interface RecentCoursesProps {
  courses: Course[]
}

export default function RecentCourses({ courses }: RecentCoursesProps) {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <div className="relative h-16 w-24 overflow-hidden rounded bg-muted">
            {course.thumbnailUrl ? (
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <PlayCircle className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <Link href={`/courses/${course.slug}`}>
              <h4 className="font-medium hover:text-primary">
                {course.title}
              </h4>
            </Link>
            <p className="text-sm text-muted-foreground">
              {course.section?.title}
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href={`/courses/${course.slug}`}>
              Continue
            </Link>
          </Button>
        </div>
      ))}
    </div>
  )
}