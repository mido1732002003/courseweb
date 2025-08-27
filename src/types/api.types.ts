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
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

export interface ApiError {
  status: number
  message: string
  details?: any
}

export interface QueryParams {
  [key: string]: string | number | boolean | undefined
}