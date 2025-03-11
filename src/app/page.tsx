'use client'

import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* ヘッダー */}
      <header className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={24}
            priority
          />
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <span className="text-sm">
                  こんにちは、{session?.user?.name || 'ゲスト'}さん
                </span>
              </div>
              <Link
                href="/protected"
                className="rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
              >
                マイページ
              </Link>
              <Link
                href="/auth/signout"
                className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
              >
                ログアウト
              </Link>
            </div>
          ) : (
            <button
              onClick={() => signIn('line')}
              className="flex items-center rounded-md bg-[#06C755] px-3 py-1.5 text-sm text-white hover:bg-[#05a649]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="mr-1.5 h-4 w-4 fill-current"
              >
                <path d="M19.952 11.121c0-3.831-3.839-6.948-8.551-6.948-4.713 0-8.551 3.117-8.551 6.948 0 3.436 3.05 6.316 7.166 6.866.279.06.659.184.755.422.086.217.056.558.027.778l-.123.741c-.037.217-.173.85.745.463.919-.387 4.962-2.921 6.77-5.002 1.25-1.371 1.762-2.761 1.762-4.268zm-11.154 3.259h-1.764a.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27.27.27 0 0 1 .27.27v2.559h1.494a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27v.27zm1.494 0a.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27.27.27 0 0 1 .27.27v3.099a.27.27 0 0 1-.27.27zm3.527 0h-1.764a.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27h1.764a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27h-1.494v.81h1.494a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27h-1.494v.81h1.494a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27zm2.302-.27a.27.27 0 0 1-.481.168l-2.302-3.099v2.931a.27.27 0 0 1-.27.27.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27.27.27 0 0 1 .211.102l2.302 3.099v-2.931a.27.27 0 0 1 .27-.27.27.27 0 0 1 .27.27v3.099z" />
              </svg>
              ログイン
            </button>
          )}
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex flex-col gap-8 items-center text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold">
          LINE認証で簡単ログイン
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Next.jsとNextAuthを使用したLINE認証の実装例です。LINEアカウントを使って簡単にログインできます。
        </p>

        {isAuthenticated ? (
          <div className="mt-4 w-full max-w-md rounded-lg bg-green-50 p-6 text-left">
            <h2 className="mb-4 text-xl font-semibold text-green-800">
              ログイン成功！
            </h2>
            <div className="space-y-2 text-blue-600">
              <p>
                <strong>名前:</strong> {session?.user?.name || '不明'}
              </p>
              <p>
                <strong>メール:</strong> {session?.user?.email || '不明'}
              </p>
              <p>
                <strong>プロバイダー:</strong>{' '}
                {session?.user?.provider || 'LINE'}
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/protected"
                className="inline-block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                保護されたページへ
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center">
            <button
              onClick={() => signIn('line')}
              className="flex items-center justify-center rounded-md bg-[#06C755] px-6 py-3 text-white hover:bg-[#05a649]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="mr-2 h-5 w-5 fill-current"
              >
                <path d="M19.952 11.121c0-3.831-3.839-6.948-8.551-6.948-4.713 0-8.551 3.117-8.551 6.948 0 3.436 3.05 6.316 7.166 6.866.279.06.659.184.755.422.086.217.056.558.027.778l-.123.741c-.037.217-.173.85.745.463.919-.387 4.962-2.921 6.77-5.002 1.25-1.371 1.762-2.761 1.762-4.268zm-11.154 3.259h-1.764a.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27.27.27 0 0 1 .27.27v2.559h1.494a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27v.27zm1.494 0a.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27.27.27 0 0 1 .27.27v3.099a.27.27 0 0 1-.27.27zm3.527 0h-1.764a.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27h1.764a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27h-1.494v.81h1.494a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27h-1.494v.81h1.494a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27zm2.302-.27a.27.27 0 0 1-.481.168l-2.302-3.099v2.931a.27.27 0 0 1-.27.27.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27.27.27 0 0 1 .211.102l2.302 3.099v-2.931a.27.27 0 0 1 .27-.27.27.27 0 0 1 .27.27v3.099z" />
              </svg>
              LINEでログイン
            </button>
            <p className="mt-4 text-sm text-gray-500">
              ※LINEアカウントを使用してログインします
            </p>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="w-full text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} LINE認証サンプル</p>
      </footer>
    </div>
  )
}
