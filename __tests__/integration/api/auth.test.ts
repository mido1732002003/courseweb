import { NextRequest } from 'next/server'
import { POST as signUp } from '@/app/api/auth/sign-up/route'
import { POST as signIn } from '@/app/api/auth/sign-in/route'
import { prisma } from '@/lib/prisma'

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}))

describe('Auth API Routes', () => {
  describe('POST /api/auth/sign-up', () => {
    it('should create a new user', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue(mockUser)

      const request = new NextRequest('http://localhost:3000/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        }),
      })

      const response = await signUp(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.user.email).toBe('test@example.com')
    })
  })
})