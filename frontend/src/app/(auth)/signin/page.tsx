'use client'

import { SignInForm } from '@/features/auth/components/SignInForm'
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated'

const SignInPage = () => {
  useRedirectIfAuthenticated('/')
  return (
    <>
      <SignInForm />
    </>
  )
}
export default SignInPage
