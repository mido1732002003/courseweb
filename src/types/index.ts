export interface User {
  id: string
  email: string
  name?: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

export interface Section {
  id: string
  slug: string
  title: string
  description?: string | null
  order: number
  icon?: string | null
  createdAt: Date
  updatedAt: Date
  _count?: {
    courses: number
  }
}

export interface Course {
  id: string
  sectionId: string
  title: string
  slug: string
  description?: string | null
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null
  duration?: number | null
  thumbnailUrl?: string | null
  videoUrl?: string | null
  pdfUrl?: string | null
  isPublished: boolean
  viewCount: number
  createdAt: Date
  updatedAt: Date
  section?: Section
  progress?: Progress[]
  favorites?: Favorite[]
  _count?: {
    favorites: number
  }
}

export interface RoadmapItem {
  id: string
  sectionId: string
  title: string
  description?: string | null
  order: number
  url?: string | null
  content?: string | null
  createdAt: Date
  updatedAt: Date
  section?: Section
}

export interface Favorite {
  id: string
  userId: string
  courseId: string
  createdAt: Date
  course?: Course
  user?: User
}

export interface Progress {
  id: string
  userId: string
  courseId: string
  percent: number
  updatedAt: Date
  course?: Course
  user?: User
}

export interface RecentView {
  id: string
  userId: string
  courseId: string
  viewedAt: Date
  course?: Course
  user?: User
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  sectionId?: string
  level?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}