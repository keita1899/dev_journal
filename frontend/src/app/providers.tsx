'use client'

import { TanStackQueryProvider } from '@/providers/tanstack-query-provider'
import { type ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return <TanStackQueryProvider>{children}</TanStackQueryProvider>
}
