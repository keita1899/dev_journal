'use client'

import { TanStackQueryProvider } from '@/providers/tanstack-query-provider'
import { AuthProvider } from '@/contexts/AuthContext'
import { type ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <TanStackQueryProvider>{children}</TanStackQueryProvider>
    </AuthProvider>
  )
}
