import { createContext } from 'react'

import { User } from '@/types/user'

export type AuthContextType = {
  currentUser?: User | null
  isLoading: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: false,
  signOut: async () => {},
})
