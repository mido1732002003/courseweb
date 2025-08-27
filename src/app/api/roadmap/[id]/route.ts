export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { roadmapItemSchema } from '@/lib/validations'
import { getUserFromToken } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const roadmapItem = await prisma.roadmapItem.findUnique({
      where: { id: params.id },
      include: {
        section: true,
      },
    })

    if (!roadmapItem) {
      return NextResponse.json(
        { error: 'Roadmap item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(roadmapItem)
  } catch (error) {
    console.error('Get roadmap item error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch roadmap item' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const roadmapItem = await prisma.roadmapItem.update({
      where: { id: params.id },
      data: validated.data,
    })

    return NextResponse.json(roadmapItem)
  } catch (error) {
    console.error('Update roadmap item error:', error)
    return NextResponse.json(
      { error: 'Failed to update roadmap item' },
      { status: 500 }
    )
  }
}