'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp, SignUpData } from '@/lib/auth'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { setAuth } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors([])

    try {
      const response = await signUp(formData)

      if (response.status === 'success') {
        setAuth(response.user, response.token)
        router.push('/dashboard')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorArray = (error as any).errors || [error.message]
        setErrors(errorArray)
      } else {
        setErrors(['新規登録に失敗しました'])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="flex min-h-screen flex-col justify-between pt-20">
        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">新規登録</h2>
              <p className="mt-2 text-center text-sm text-gray-400">
                すでにアカウントをお持ちの方は{' '}
                <Link href="/signin" className="font-medium text-purple-400 hover:text-purple-300">
                  ログインはこちら
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {errors.length > 0 && (
                <div className="rounded-md border border-red-500 bg-red-900/20 p-4">
                  <ul className="text-sm text-red-400">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    メールアドレス
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="your@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    パスワード
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="パスワード"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-medium text-gray-300"
                  >
                    パスワード確認
                  </label>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="パスワード確認"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? '登録中...' : '新規登録'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
