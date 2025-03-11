'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('line', { callbackUrl: '/' })
    } catch (error) {
      console.error('サインインエラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">ログイン</h1>

        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-md bg-[#06C755] px-4 py-2 text-white hover:bg-[#05a649] disabled:opacity-50"
        >
          {isLoading ? (
            <span>読み込み中...</span>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="mr-2 h-5 w-5 fill-current"
              >
                <path d="M19.952 11.121c0-3.831-3.839-6.948-8.551-6.948-4.713 0-8.551 3.117-8.551 6.948 0 3.436 3.05 6.316 7.166 6.866.279.06.659.184.755.422.086.217.056.558.027.778l-.123.741c-.037.217-.173.85.745.463.919-.387 4.962-2.921 6.77-5.002 1.25-1.371 1.762-2.761 1.762-4.268zm-11.154 3.259h-1.764a.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27.27.27 0 0 1 .27.27v2.559h1.494a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27v.27zm1.494 0a.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27.27.27 0 0 1 .27.27v3.099a.27.27 0 0 1-.27.27zm3.527 0h-1.764a.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27h1.764a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27h-1.494v.81h1.494a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27h-1.494v.81h1.494a.27.27 0 0 1 .27.27.27.27 0 0 1-.27.27zm2.302-.27a.27.27 0 0 1-.481.168l-2.302-3.099v2.931a.27.27 0 0 1-.27.27.27.27 0 0 1-.27-.27v-3.099a.27.27 0 0 1 .27-.27.27.27 0 0 1 .211.102l2.302 3.099v-2.931a.27.27 0 0 1 .27-.27.27.27 0 0 1 .27.27v3.099z" />
              </svg>
              LINEでログイン
            </>
          )}
        </button>
      </div>
    </div>
  )
}
