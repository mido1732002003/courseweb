import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
)

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')

// Rename our custom interface to avoid conflict
export interface CustomJWTPayload {
  userId: string
  email: string
  role: string
  exp?: number
}

// Create a type for user without password
type UserWithoutPassword = {
  id: string
  email: string
  name: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createToken(user: UserWithoutPassword): Promise<string> {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  return token
}

export async function verifyToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    
    // Type guard to ensure the payload has our required fields
    if (
      typeof payload.userId === 'string' &&
      typeof payload.email === 'string' &&
      typeof payload.role === 'string'
    ) {
      return {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        exp: payload.exp,
      }
    }
    
    return null
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export async function getUserFromToken(token: string): Promise<UserWithoutPassword | null> {
  const payload = await verifyToken(token)
  if (!payload) return null

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  
  const cookies = cookieHeader.split(';').map(c => c.trim())
  const tokenCookie = cookies.find(c => c.startsWith('token='))
  
  if (!tokenCookie) return null
  return tokenCookie.split('=')[1]
}