export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { roadmapItemSchema } from '@/lib/validations'
import { getUserFromToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sectionId = searchParams.get('sectionId')

    const where = sectionId ? { sectionId } : {}

    const roadmapItems = await prisma.roadmapItem.findMany({
      where,
      include: {
        section: true,
      },
      orderBy: [
        { sectionId: 'asc' },
        { order: 'asc' },
      ],
    })

    return NextResponse.json(roadmapItems)
  } catch (error) {
    console.error('Get roadmap items error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch roadmap items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await getUserFromToken(token)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validated = roadmapItemSchema.safeParse(body)
    
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0].message },
        { status: 400 }
      )
    }

    const roadmapItem = await prisma.roadmapItem.create({
      data: validated.data,
      include: {
        section: true,
      },
    })

    return NextResponse.json(roadmapItem, { status: 201 })
  } catch (error) {
    console.error('Create roadmap item error:', error)
    return NextResponse.json(
      { error: 'Failed to create roadmap item' },
      { status: 500 }
    )
  }
}