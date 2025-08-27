import { jwtVerify } from 'jose'

export interface CustomJWTPayload {
  userId: string
  email: string
  role: string
  exp?: number
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
)

export async function verifyToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
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
  } catch {
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
