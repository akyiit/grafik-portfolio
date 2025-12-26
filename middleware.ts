import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Sadece /admin ile başlayan path'leri kontrol et
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  const isLoginPage = pathname === '/admin/login'
  
  // Giriş yapmış kullanıcı login sayfasına erişmeye çalışıyorsa
  if (isLoginPage) {
    if (token) {
      // Dashboard'a yönlendir
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    // Giriş yapmamış, login sayfasına erişebilir
    return NextResponse.next()
  }
  
  // Diğer admin sayfaları için giriş kontrolü
  if (!token) {
    // Login sayfasına yönlendir
    const url = new URL('/admin/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }
  
  // Giriş yapmış, devam et
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}