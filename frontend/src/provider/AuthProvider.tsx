'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

import { fetchCurrentUser } from '@/features/auth/api/fetchCurrentUser'
import { signOut as apiSignOut } from '@/features/auth/api/signOut'
import { clearAuthToken } from '@/lib/authToken'
import { User } from '@/types/user'

import { AuthContext } from '../context/AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const shouldFetchUser = !['/signin', '/signup'].includes(pathname)

  const {
    data: currentUser,
    mutate,
    isLoading,
  } = useSWR<User | null>(shouldFetchUser ? 'currentUser' : null, fetchCurrentUser, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  })

  const router = useRouter()

  const signOut = async () => {
    try {
      await apiSignOut()
    } catch (error) {
      console.error('Sign out API call failed:', error)
      toast.error('ログアウトに失敗しました')
    } finally {
      clearAuthToken()
      mutate(null, false)
      toast.success('ログアウトしました')
      router.push('/signin')
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
