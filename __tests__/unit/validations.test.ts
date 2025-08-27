import {
  signUpSchema,
  signInSchema,
  courseSchema,
  sectionSchema,
  roadmapItemSchema,
  progressSchema,
  favoriteSchema,
} from '@/lib/validations'

describe('Validation Schemas', () => {
  describe('signUpSchema', () => {
    it('should validate correct sign up data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      }
      const result = signUpSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'not-an-email',
        password: 'password123',
      }
      const result = signUpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
      }
      const result = signUpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('courseSchema', () => {
    it('should validate correct course data', () => {
      const validData = {
        title: 'Test Course',
        slug: 'test-course',
        sectionId: 'section-123',
        isPublished: true,
      }
      const result = courseSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid slug format', () => {
      const invalidData = {
        title: 'Test Course',
        slug: 'Test Course',
        sectionId: 'section-123',
      }
      const result = courseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should accept empty optional URL fields', () => {
      const validData = {
        title: 'Test Course',
        slug: 'test-course',
        sectionId: 'section-123',
        videoUrl: '',
        pdfUrl: '',
      }
      const result = courseSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('progressSchema', () => {
    it('should validate correct progress data', () => {
      const validData = {
        courseId: 'course-123',
        percent: 50,
      }
      const result = progressSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid percent values', () => {
      const invalidData = {
        courseId: 'course-123',
        percent: 150,
      }
      const result = progressSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})