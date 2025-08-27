'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/actions/auth.actions'
import { favoriteSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function toggleFavoriteAction(courseId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: 'Please sign in to add favorites' }
  }

  try {
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    })

    if (existing) {
      await prisma.favorite.delete({
        where: { id: existing.id },
      })
      
      revalidatePath('/dashboard/favorites')
      return { success: true, action: 'removed' }
    } else {
      await prisma.favorite.create({
        data: {
          userId: user.id,
          courseId,
        },
      })
      
      revalidatePath('/dashboard/favorites')
      return { success: true, action: 'added' }
    }
  } catch (error) {
    console.error('Toggle favorite error:', error)
    return { success: false, error: 'Failed to update favorite' }
  }
}

export async function getUserFavoritesAction() {
  const user = await getCurrentUser()
  if (!user) {
    return []
  }

  try {
    const favorites = await prisma.favorite.findMany({
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
      orderBy: { createdAt: 'desc' },
    })

    return favorites.map(f => f.course)
  } catch (error) {
    console.error('Get favorites error:', error)
    return []
  }
}

export async function checkFavoriteAction(courseId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return false
  }

  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    })

    return !!favorite
  } catch (error) {
    console.error('Check favorite error:', error)
    return false
  }
}