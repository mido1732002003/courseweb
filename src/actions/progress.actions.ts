'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/actions/auth.actions'
import { progressSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function updateProgressAction(courseId: string, percent: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: 'Please sign in to track progress' }
  }

  const validated = progressSchema.safeParse({ courseId, percent })
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  try {
    const progress = await prisma.progress.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
      update: {
        percent: validated.data.percent,
      },
      create: {
        userId: user.id,
        courseId,
        percent: validated.data.percent,
      },
    })

    revalidatePath('/dashboard')
    return { success: true, progress }
  } catch (error) {
    console.error('Update progress error:', error)
    return { success: false, error: 'Failed to update progress' }
  }
}

export async function getUserProgressAction() {
  const user = await getCurrentUser()
  if (!user) {
    return []
  }

  try {
    const progress = await prisma.progress.findMany({
      where: { userId: user.id },
      include: {
        course: {
          include: {
            section: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return progress
  } catch (error) {
    console.error('Get progress error:', error)
    return []
  }
}

export async function getCourseProgressAction(courseId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return null
  }

  try {
    const progress = await prisma.progress.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    })

    return progress
  } catch (error) {
    console.error('Get course progress error:', error)
    return null
  }
}