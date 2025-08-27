import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { courseSchema } from '@/lib/validations'
import { getUserFromToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || undefined
    const sectionId = searchParams.get('sectionId') || undefined
    const level = searchParams.get('level') || undefined
    const skip = (page - 1) * limit

    const where: any = {
      isPublished: true,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (sectionId) {
      where.sectionId = sectionId
    }

    if (level) {
      where.level = level
    }

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

    return NextResponse.json({
      items: courses,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
    })
  } catch (error) {
    console.error('Get courses error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
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
    const validated = courseSchema.safeParse(body)
    
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0].message },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: validated.data,
      include: {
        section: true,
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Create course error:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}