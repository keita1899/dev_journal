'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { useAuth } from '@/hooks/useAuth'

export const useRedirectIfUnauthenticated = (redirectTo: string = '/signin') => {
  const { currentUser, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !currentUser) {
      toast.error('ログインが必要です')
      router.replace(redirectTo)
    }
  }, [currentUser, isLoading, router, redirectTo])
}
