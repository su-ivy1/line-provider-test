'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignOut() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('サインアウトエラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">ログアウト</h1>
        <p className="mb-6 text-center text-gray-600">
          ログアウトしてもよろしいですか？
        </p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {isLoading ? '処理中...' : 'ログアウト'}
          </button>

          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}
