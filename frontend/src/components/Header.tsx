'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BookOpenIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'

export const Header = () => {
  const { isAuthenticated, currentUser, clearAuth, isLoading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await clearAuth()
    router.push('/')
  }

  return (
    <nav className="absolute top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpenIcon className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-purple-400">DevJournal</span>
        </Link>

        <div className="flex items-center space-x-4">
          {isLoading ? (
            <div className="w-32"></div>
          ) : isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-gray-300 transition hover:text-white">
                ダッシュボード
              </Link>
              <div className="flex items-center space-x-2 text-gray-300">
                <UserCircleIcon className="h-5 w-5" />
                <span>{currentUser?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full bg-gray-600 px-4 py-2 text-sm transition-all hover:bg-gray-700"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <button className="flex items-center space-x-2 text-gray-300 transition hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>GitHubでログイン</span>
              </button>
              <Link href="/signin" className="text-gray-300 transition hover:text-white">
                ログイン
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-purple-600 px-6 py-2 transition-all hover:bg-purple-700"
              >
                無料で始める
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
