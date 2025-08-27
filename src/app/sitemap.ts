import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { APP_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [sections, courses] = await Promise.all([
    prisma.section.findMany({
      select: { slug: true, updatedAt: true },
    }),
    prisma.course.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    }),
  ])

  const sectionUrls = sections.map((section) => ({
    url: `${APP_URL}/sections/${section.slug}`,
    lastModified: section.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const courseUrls = courses.map((course) => ({
    url: `${APP_URL}/courses/${course.slug}`,
    lastModified: course.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${APP_URL}/sections`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${APP_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...sectionUrls,
    ...courseUrls,
  ]
}