'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  let errorMessage = '認証中にエラーが発生しました。'
  if (error === 'AccessDenied') {
    errorMessage = 'アクセスが拒否されました。'
  } else if (error === 'Configuration') {
    errorMessage = '認証設定に問題があります。'
  } else if (error === 'Verification') {
    errorMessage = '検証に失敗しました。'
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-red-500">
          認証エラー
        </h1>

        <div className="mb-6 rounded-md bg-red-50 p-4 text-red-700">
          <p>{errorMessage}</p>
          <p className="mt-2 text-sm text-gray-600">
            エラーコード: {error || '不明'}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => router.push('/')}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  )
}
