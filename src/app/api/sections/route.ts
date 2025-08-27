import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sectionSchema } from '@/lib/validations'
import { getUserFromToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const sections = await prisma.section.findMany({
      include: {
        _count: {
          select: { courses: true },
        },
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(sections)
  } catch (error) {
    console.error('Get sections error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
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
    const validated = sectionSchema.safeParse(body)
    
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0].message },
        { status: 400 }
      )
    }

    const section = await prisma.section.create({
      data: validated.data,
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    console.error('Create section error:', error)
    return NextResponse.json(
      { error: 'Failed to create section' },
      { status: 500 }
    )
  }
}