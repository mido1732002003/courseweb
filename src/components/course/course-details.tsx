import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { Course } from '@/types'
import { formatDate } from '@/lib/utils'

interface CourseDetailsProps {
  course: Course
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-3">About This Course</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {course.description ? (
            <p className="whitespace-pre-wrap">{course.description}</p>
          ) : (
            <p className="text-muted-foreground italic">
              No description available for this course.
            </p>
          )}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Comprehensive understanding of core concepts</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Practical applications and real-world examples</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Best practices and industry standards</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Hands-on experience through exercises</span>
          </li>
        </ul>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-3">Course Resources</h3>
        <div className="flex flex-wrap gap-2">
          {course.videoUrl && (
            <Badge variant="secondary">Video Content</Badge>
          )}
          {course.pdfUrl && (
            <Badge variant="secondary">PDF Materials</Badge>
          )}
          <Badge variant="secondary">Certificate of Completion</Badge>
          <Badge variant="secondary">Lifetime Access</Badge>
        </div>
      </div>

      <Separator />

      <div className="text-sm text-muted-foreground">
        <p>Last updated: {formatDate(course.updatedAt)}</p>
        <p>Created: {formatDate(course.createdAt)}</p>
      </div>
    </div>
  )
}