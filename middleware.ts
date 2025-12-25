import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isLoginPage = req.nextUrl.pathname === '/admin/login'
        
        // Login sayfasına herkes erişebilir
        if (isLoginPage) {
          return true
        }
        
        // Diğer admin sayfaları için token gerekli
        return !!token
      }
    },
    pages: {
      signIn: '/admin/login'
    }
  }
)

export const config = {
  matcher: '/admin/:path*'
}