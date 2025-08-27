interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(
  identifier: string,
  maxRequests: number = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
  windowMs: number = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000')
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now()
  const window = store[identifier]

  if (!window || window.resetTime < now) {
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return {
      success: true,
      remaining: maxRequests - 1,
      reset: now + windowMs,
    }
  }

  if (window.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      reset: window.resetTime,
    }
  }

  window.count++
  return {
    success: true,
    remaining: maxRequests - window.count,
    reset: window.resetTime,
  }
}

export function cleanupRateLimitStore(): void {
  const now = Date.now()
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  }
}

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000)
}