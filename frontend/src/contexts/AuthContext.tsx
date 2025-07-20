'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { User, signOut, authApi } from '@/lib/auth'

interface AuthContextType {
  currentUser: User | null
  setAuth: (user: User, token: string) => void
  clearAuth: () => Promise<void>
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!currentUser

  const setAuth = (user: User, token: string) => {
    setCurrentUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const clearAuth = async () => {
    await signOut()
    setCurrentUser(null)
  }

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          await authApi.get('/api/v1/auth/validate')
          setCurrentUser(parsedUser)
        } catch (error) {
          console.error('Token validation failed:', error)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setCurrentUser(null)
        }
      }

      setIsLoading(false)
    }

    validateToken()
  }, [])

  const value = {
    currentUser,
    setAuth,
    clearAuth,
    isAuthenticated,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
