'use server'

import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword, createToken } from '@/lib/auth'
import { signUpSchema, signInSchema } from '@/lib/validations'
import { rateLimit } from '@/lib/rate-limit'
import type { User } from '@/types'

export async function signUpAction(data: unknown) {
  const ip = 'user-ip' // In production, get actual IP
  const rateLimitResult = rateLimit(`signup:${ip}`)
  
  if (!rateLimitResult.success) {
    return { success: false, error: 'Too many requests. Please try again later.' }
  }

  const validated = signUpSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  const { email, password, name } = validated.data

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: 'Email already registered' }
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    const token = await createToken(user)
    
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, user }
  } catch (error) {
    console.error('Sign up error:', error)
    return { success: false, error: 'Failed to create account' }
  }
}

export async function signInAction(data: unknown) {
  const ip = 'user-ip' // In production, get actual IP
  const rateLimitResult = rateLimit(`signin:${ip}`)
  
  if (!rateLimitResult.success) {
    return { success: false, error: 'Too many attempts. Please try again later.' }
  }

  const validated = signInSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  const { email, password } = validated.data

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { success: false, error: 'Invalid credentials' }
    }

    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return { success: false, error: 'Invalid credentials' }
    }

    const token = await createToken(user)
    
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const { passwordHash: _, ...userWithoutPassword } = user

    return { success: true, user: userWithoutPassword }
  } catch (error) {
    console.error('Sign in error:', error)
    return { success: false, error: 'Failed to sign in' }
  }
}

export async function signOutAction() {
  try {
    cookies().delete('token')
    return { success: true }
  } catch (error) {
    console.error('Sign out error:', error)
    return { success: false, error: 'Failed to sign out' }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = cookies().get('token')?.value
    if (!token) return null

    const { verifyToken } = await import('@/lib/auth')
    const payload = await verifyToken(token)
    if (!payload) return null

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return user
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}