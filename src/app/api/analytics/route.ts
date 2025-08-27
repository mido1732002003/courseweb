export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: string
  userId?: string
}

// In production, this would save to a database or analytics service
const analyticsStore: AnalyticsEvent[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, properties } = body

    if (!event) {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      )
    }

    const token = request.cookies.get('token')?.value
    let userId: string | undefined

    if (token) {
      const user = await getUserFromToken(token)
      if (user) {
        userId = user.id
      }
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
      userId,
    }

    // In production, save to database or send to analytics service
    analyticsStore.push(analyticsEvent)
    console.log('Analytics event:', analyticsEvent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
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

    // Return recent analytics events (in production, query from database)
    const recentEvents = analyticsStore.slice(-100)

    return NextResponse.json({
      events: recentEvents,
      total: analyticsStore.length,
    })
  } catch (error) {
    console.error('Get analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}