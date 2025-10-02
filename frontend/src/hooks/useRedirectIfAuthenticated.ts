'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { useAuth } from '@/hooks/useAuth'

export const useRedirectIfAuthenticated = (redirectTo: string = '/') => {
  const { currentUser, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && currentUser) {
      toast.error('ログイン済みです')
      router.replace(redirectTo)
    }
  }, [currentUser, isLoading, router, redirectTo])
}
