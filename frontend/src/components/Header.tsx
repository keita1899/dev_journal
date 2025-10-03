'use client'

import Link from 'next/link'

import { useAuth } from '@/hooks/useAuth'

export const Header = () => {
  const { currentUser, isLoading, signOut } = useAuth()

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          DevJournal
        </Link>

        <nav className="flex items-center space-x-6">
          {isLoading ? (
            <div
              data-testid="header-skeleton"
              className="h-8 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"
            />
          ) : currentUser ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                  {currentUser.email?.charAt(0).toUpperCase()}
                </span>
                <span className="hidden text-sm font-medium text-gray-700 sm:block dark:text-gray-300">
                  {currentUser.email}
                </span>
              </div>
              <button
                onClick={signOut}
                className="text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                ログイン
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                新規登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
