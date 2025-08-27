import { notFound } from 'next/navigation'
import { getSectionBySlugAction } from '@/actions/section.actions'
import RoadmapList from '@/components/section/roadmap-list'
import CourseGrid from '@/components/course/course-grid'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'

interface SectionPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const section = await getSectionBySlugAction(params.slug)
  
  if (!section) {
    return {
      title: 'Section Not Found',
    }
  }

  return {
    title: section.title,
    description: section.description || `Learn ${section.title} with our comprehensive courses`,
  }
}

export default async function SectionPage({ params }: SectionPageProps) {
  const section = await getSectionBySlugAction(params.slug)

  if (!section) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{section.icon}</span>
          <h1 className="text-4xl font-bold tracking-tight">{section.title}</h1>
        </div>
        {section.description && (
          <p className="text-lg text-muted-foreground">{section.description}</p>
        )}
        <div className="mt-4 flex items-center gap-4">
          <Badge variant="secondary">
            {section.courses.length} Courses
          </Badge>
          <Badge variant="secondary">
            {section.roadmapItems.length} Roadmap Steps
          </Badge>
        </div>
      </div>

      {section.roadmapItems.length > 0 && (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Learning Roadmap</h2>
            <RoadmapList items={section.roadmapItems} />
          </div>
          <Separator className="my-8" />
        </>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6">Available Courses</h2>
        {section.courses.length > 0 ? (
          <CourseGrid courses={section.courses} />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No courses available yet in this section.
          </div>
        )}
      </div>
    </div>
  )
}