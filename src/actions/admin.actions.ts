'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/actions/auth.actions'

export async function getDashboardStatsAction() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return null
  }

  try {
    const [totalUsers, totalCourses, totalSections, recentUsers] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.section.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      }),
    ])

    return {
      totalUsers,
      totalCourses,
      totalSections,
      recentUsers,
    }
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    return null
  }
}

export async function getAllCoursesAction() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return []
  }

  try {
    const courses = await prisma.course.findMany({
      include: {
        section: true,
        _count: {
          select: {
            favorites: true,
            progress: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return courses
  } catch (error) {
    console.error('Get all courses error:', error)
    return []
  }
}

export async function getAllSectionsAction() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return []
  }

  try {
    const sections = await prisma.section.findMany({
      include: {
        _count: {
          select: {
            courses: true,
            roadmapItems: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    })

    return sections
  } catch (error) {
    console.error('Get all sections error:', error)
    return []
  }
}

export async function getAllRoadmapsAction() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') {
    return []
  }

  try {
    const roadmaps = await prisma.roadmapItem.findMany({
      include: {
        section: true,
      },
      orderBy: [
        { sectionId: 'asc' },
        { order: 'asc' },
      ],
    })

    return roadmaps
  } catch (error) {
    console.error('Get all roadmaps error:', error)
    return []
  }
}