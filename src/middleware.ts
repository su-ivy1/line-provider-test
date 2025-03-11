import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// 保護されたルート
const protectedRoutes = ['/protected']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 保護されたルートかどうかをチェック
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // 認証されていない場合はサインインページにリダイレクト
    if (!token) {
      const url = new URL('/auth/signin', request.url)
      url.searchParams.set('callbackUrl', encodeURI(request.url))
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}
