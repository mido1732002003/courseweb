import { notFound } from 'next/navigation'
import { getCourseBySlugAction } from '@/actions/course.actions'
import { getCourseProgressAction } from '@/actions/progress.actions'
import { checkFavoriteAction } from '@/actions/favorite.actions'
import CourseDetails from '@/components/course/course-details'
import VideoPlayer from '@/components/course/video-player'
import dynamic from "next/dynamic"

const PDFViewer = dynamic(() => import("@/components/course/pdf-viewer"), {
  ssr: false,
})


import ProgressBar from '@/components/course/progress-bar'
import FavoriteButton from '@/components/course/favorite-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Metadata } from 'next'
import Link from 'next/link'

interface CoursePageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = await getCourseBySlugAction(params.slug)
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: course.title,
    description: course.description || `Learn ${course.title}`,
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseBySlugAction(params.slug)

  if (!course) {
    notFound()
  }

  const progress = await getCourseProgressAction(course.id)
  const isFavorite = await checkFavoriteAction(course.id)

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight mb-3">
                {course.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                {course.section && (
                  <Link href={`/sections/${course.section.slug}`}>
                    <Badge variant="secondary" className="hover:bg-secondary/80">
                      {course.section.title}
                    </Badge>
                  </Link>
                )}
                {course.level && (
                  <Badge variant="outline">{course.level}</Badge>
                )}
                {course.duration && (
                  <Badge variant="outline">
                    {Math.floor(course.duration / 60)}h {course.duration % 60}m
                  </Badge>
                )}
                <Badge variant="outline">
                  {course.viewCount} views
                </Badge>
              </div>
            </div>
            <FavoriteButton courseId={course.id} className="h-10 w-10" />
          </div>
        </div>

        {progress && (
          <div className="mb-6">
            <ProgressBar 
              courseId={course.id} 
              initialProgress={progress.percent} 
            />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            <Card className="overflow-hidden">
              <Tabs defaultValue="video" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b">
                  {course.videoUrl && (
                    <TabsTrigger value="video">Video</TabsTrigger>
                  )}
                  {course.pdfUrl && (
                    <TabsTrigger value="pdf">PDF Material</TabsTrigger>
                  )}
                  <TabsTrigger value="description">Description</TabsTrigger>
                </TabsList>
                
                {course.videoUrl && (
                  <TabsContent value="video" className="mt-0 p-0">
                    <VideoPlayer 
                      url={course.videoUrl} 
                      courseId={course.id}
                    />
                  </TabsContent>
                )}
                
                {course.pdfUrl && (
                  <TabsContent value="pdf" className="mt-0 p-0">
                    <PDFViewer url={course.pdfUrl} />
                  </TabsContent>
                )}
                
                <TabsContent value="description" className="p-6">
                  <CourseDetails course={course} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <aside>
            <Card className="p-6 sticky top-20">
              <h3 className="font-semibold mb-4">Course Information</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Section</dt>
                  <dd className="font-medium">{course.section?.title}</dd>
                </div>
                {course.level && (
                  <div>
                    <dt className="text-muted-foreground">Level</dt>
                    <dd className="font-medium">{course.level}</dd>
                  </div>
                )}
                {course.duration && (
                  <div>
                    <dt className="text-muted-foreground">Duration</dt>
                    <dd className="font-medium">
                      {Math.floor(course.duration / 60)}h {course.duration % 60}m
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-muted-foreground">Last Updated</dt>
                  <dd className="font-medium">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
                {course._count?.favorites !== undefined && (
                  <div>
                    <dt className="text-muted-foreground">Favorites</dt>
                    <dd className="font-medium">{course._count.favorites}</dd>
                  </div>
                )}
              </dl>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}