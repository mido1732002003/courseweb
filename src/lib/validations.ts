import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().optional(),
  sectionId: z.string().min(1, 'Section is required'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  duration: z.number().int().positive().optional(),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
  pdfUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().default(false),
})

export const sectionSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().optional(),
  order: z.number().int().min(0).default(0),
  icon: z.string().optional(),
})

export const roadmapItemSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  sectionId: z.string().min(1, 'Section is required'),
  order: z.number().int().min(0).default(0),
  url: z.string().url().optional().or(z.literal('')),
  content: z.string().optional(),
})

export const progressSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  percent: z.number().int().min(0).max(100),
})

export const favoriteSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type CourseInput = z.infer<typeof courseSchema>
export type SectionInput = z.infer<typeof sectionSchema>
export type RoadmapItemInput = z.infer<typeof roadmapItemSchema>
export type ProgressInput = z.infer<typeof progressSchema>
export type FavoriteInput = z.infer<typeof favoriteSchema>