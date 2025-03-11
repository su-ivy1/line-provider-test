import { authOptions } from '@/utils/next-auth'
import NextAuth from 'next-auth'

// 型拡張
declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      accessToken?: string
      provider?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    provider?: string
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
