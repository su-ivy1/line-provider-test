import LineProvider from 'next-auth/providers/line'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    LineProvider({
      profile(profile) {
        console.info('profile', profile)
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.pictureUrl,
        }
      },
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
      authorization: {
        url: 'https://access.line.me/oauth2/v2.1/authorize',
        params: {
          scope: 'openid profile email', // emailを取得するために追加
          response_type: 'code',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt', // JWTトークンによるセッション管理
  },
  // コールバックURLの設定
  callbacks: {
    async redirect({ url, baseUrl }) {
      // LINE Developer Consoleに登録されているコールバックURLを使用
      if (url.startsWith('/api/auth/callback/line')) {
        return process.env.NEXTAUTH_CALLBACK_URL || url
      }
      // デフォルトの動作
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async jwt({ token, account }) {
      // 初回サインイン時にアカウント情報をトークンに追加
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      // セッションにトークン情報を追加
      if (session.user) {
        session.user.accessToken = token.accessToken
        session.user.provider = token.provider
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
}
