import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Apply rate limiting to auth endpoints
  if (pathname.startsWith('/api/user/')) {
    // Get client IP from headers
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 minutes
    const maxRequests = 100 // max 100 requests per 15 minutes
    
    const rateLimit = rateLimitMap.get(ip)
    
    if (rateLimit) {
      if (now > rateLimit.resetTime) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
      } else if (rateLimit.count >= maxRequests) {
        // Rate limit exceeded
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      } else {
        // Increment count
        rateLimit.count++
      }
    } else {
      // First request from this IP
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    }
  }
  
  // Security headers
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Add CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
  
  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
