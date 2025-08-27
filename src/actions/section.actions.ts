'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/actions/auth.actions'
import { sectionSchema, roadmapItemSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function getSectionsAction() {
  try {
    const sections = await prisma.section.findMany({
      include: {
        _count: {
          select: { courses: true },
        },
      },
      orderBy: { order: 'asc' },
    })

    return sections
  } catch (error) {
    console.error('Get sections error:', error)
    throw new Error('Failed to fetch sections')
  }
}

export async function getSectionBySlugAction(slug: string) {
  try {
    const section = await prisma.section.findUnique({
      where: { slug },
      include: {
        roadmapItems: {
          orderBy: { order: 'asc' },
        },
        courses: {
          where: { isPublished: true },
          include: {
            _count: {
              select: { favorites: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    return section
  } catch (error) {
    console.error('Get section error:', error)
    throw new Error('Failed to fetch section')
  }
}

export async function createSectionAction(data: unknown) {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' }
  }

  const validated = sectionSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  try {
    const section = await prisma.section.create({
      data: validated.data,
    })

    revalidatePath('/sections')
    revalidatePath('/admin/sections')

    return { success: true, section }
  } catch (error) {
    console.error('Create section error:', error)
    return { success: false, error: 'Failed to create section' }
  }
}

export async function updateSectionAction(id: string, data: unknown) {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' }
  }

  const validated = sectionSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  try {
    const section = await prisma.section.update({
      where: { id },
      data: validated.data,
    })

    revalidatePath('/sections')
    revalidatePath(`/sections/${section.slug}`)
    revalidatePath('/admin/sections')

    return { success: true, section }
  } catch (error) {
    console.error('Update section error:', error)
    return { success: false, error: 'Failed to update section' }
  }
}

export async function createRoadmapItemAction(data: unknown) {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' }
  }

  const validated = roadmapItemSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  try {
    const roadmapItem = await prisma.roadmapItem.create({
      data: validated.data,
    })

    revalidatePath('/sections')
    revalidatePath('/admin/roadmaps')

    return { success: true, roadmapItem }
  } catch (error) {
    console.error('Create roadmap item error:', error)
    return { success: false, error: 'Failed to create roadmap item' }
  }
}

export async function getRecentViewsAction() {
  const user = await getCurrentUser()
  if (!user) {
    return []
  }

  try {
    const recentViews = await prisma.recentView.findMany({
      where: { userId: user.id },
      include: {
        course: {
          include: {
            section: true,
            _count: {
              select: { favorites: true },
            },
          },
        },
      },
      orderBy: { viewedAt: 'desc' },
      take: 6,
    })

    return recentViews.map(rv => rv.course)
  } catch (error) {
    console.error('Get recent views error:', error)
    return []
  }
}