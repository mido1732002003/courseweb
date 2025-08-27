import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth-edge'


const protectedRoutes = ['/dashboard', '/admin']
const authRoutes = ['/auth/sign-in', '/auth/sign-up']
const adminRoutes = ['/admin']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Check if it's a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

  // Verify token if exists
  let user = null
  if (token) {
    const payload = await verifyToken(token)
    if (payload) {
      user = payload
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Protect routes that require authentication
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/auth/sign-in', request.url)
    redirectUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Protect admin routes
  if (isAdminRoute && (!user || user.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Add user info to headers for server components
  const requestHeaders = new Headers(request.headers)
  if (user) {
    requestHeaders.set('x-user-id', user.userId)
    requestHeaders.set('x-user-email', user.email)
    requestHeaders.set('x-user-role', user.role)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
  ],
}