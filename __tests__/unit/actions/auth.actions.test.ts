import { signUpAction, signInAction, signOutAction } from '@/actions/auth.actions'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}))

// Mock auth functions
jest.mock('@/lib/auth', () => ({
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
  createToken: jest.fn(),
}))

describe('Auth Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('signUpAction', () => {
    it('should create a new user successfully', async () => {
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
      ;(hashPassword as jest.Mock).mockResolvedValue('hashed-password')

      const result = await signUpAction({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })

      expect(result.success).toBe(true)
      expect(result.user).toEqual(mockUser)
    })

    it('should reject duplicate email', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 'existing-user' })

      const result = await signUpAction({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Email already registered')
    })
  })
})