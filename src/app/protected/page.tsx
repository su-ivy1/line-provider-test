'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500 mx-auto"></div>
          <p>読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // useEffectでリダイレクトするため、一時的に何も表示しない
  }

  return (
    <div className="container mx-auto p-6">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">保護されたページ</h1>

        <div className="mb-6 rounded-md bg-green-50 p-4 text-green-700">
          <p>認証済みユーザーのみがアクセスできるページです。</p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">ユーザー情報</h2>
          <div className="rounded-md bg-gray-50 p-4">
            <p>
              <strong>名前:</strong> {session.user?.name || '不明'}
            </p>
            <p>
              <strong>メール:</strong> {session.user?.email || '不明'}
            </p>
            <p>
              <strong>プロバイダー:</strong> {session.user?.provider || '不明'}
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Link
            href="/"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            ホームに戻る
          </Link>

          <Link
            href="/auth/signout"
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            ログアウト
          </Link>
        </div>
      </div>
    </div>
  )
}
