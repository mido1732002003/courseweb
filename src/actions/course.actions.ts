'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/actions/auth.actions'
import { courseSchema, progressSchema, favoriteSchema } from '@/lib/validations'
import type { Course, PaginatedResponse } from '@/types'
import { revalidatePath } from 'next/cache'

export async function getCoursesAction(params: {
  page?: number
  limit?: number
  search?: string
  sectionId?: string
  level?: string
}): Promise<PaginatedResponse<Course>> {
  const page = params.page || 1
  const limit = params.limit || 12
  const skip = (page - 1) * limit

  const where: any = {
    isPublished: true,
  }

  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { description: { contains: params.search, mode: 'insensitive' } },
    ]
  }

  if (params.sectionId) {
    where.sectionId = params.sectionId
  }

  if (params.level) {
    where.level = params.level
  }

  try {
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          section: true,
          _count: {
            select: { favorites: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return {
      items: courses as any,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
    }
  } catch (error) {
    console.error('Get courses error:', error)
    throw new Error('Failed to fetch courses')
  }
}

export async function getCourseBySlugAction(slug: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        section: true,
        _count: {
          select: { favorites: true },
        },
      },
    })

    if (course) {
      // Increment view count
      await prisma.course.update({
        where: { id: course.id },
        data: { viewCount: { increment: 1 } },
      })

      // Track recent view for logged-in users
      const user = await getCurrentUser()
      if (user) {
        await prisma.recentView.upsert({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: course.id,
            },
          },
          update: {
            viewedAt: new Date(),
          },
          create: {
            userId: user.id,
            courseId: course.id,
          },
        })
      }
    }

    return course
  } catch (error) {
    console.error('Get course error:', error)
    throw new Error('Failed to fetch course')
  }
}

export async function createCourseAction(data: unknown) {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' }
  }

  const validated = courseSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  try {
    const course = await prisma.course.create({
      data: validated.data,
    })

    revalidatePath('/courses')
    revalidatePath('/admin/courses')

    return { success: true, course }
  } catch (error) {
    console.error('Create course error:', error)
    return { success: false, error: 'Failed to create course' }
  }
}

export async function updateCourseAction(id: string, data: unknown) {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' }
  }

  const validated = courseSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  try {
    const course = await prisma.course.update({
      where: { id },
      data: validated.data,
    })

    revalidatePath('/courses')
    revalidatePath(`/courses/${course.slug}`)
    revalidatePath('/admin/courses')

    return { success: true, course }
  } catch (error) {
    console.error('Update course error:', error)
    return { success: false, error: 'Failed to update course' }
  }
}

export async function deleteCourseAction(id: string) {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    await prisma.course.delete({
      where: { id },
    })

    revalidatePath('/courses')
    revalidatePath('/admin/courses')

    return { success: true }
  } catch (error) {
    console.error('Delete course error:', error)
    return { success: false, error: 'Failed to delete course' }
  }
}