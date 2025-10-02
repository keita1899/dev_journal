'use client'

import { SignUpForm } from '@/features/auth/components/SignUpForm'
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated'

const SignUpPage = () => {
  useRedirectIfAuthenticated('/')
  return (
    <>
      <SignUpForm />
    </>
  )
}
export default SignUpPage
