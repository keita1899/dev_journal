import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { saveAuthToken } from '@/lib/authToken'

import { signIn } from '../api/signIn'
import { signInSchema, SignInFormInput } from '../types'

export const useSignInForm = () => {
  const [apiError, setApiError] = useState<string>('')
  const router = useRouter()

  const formMethods = useForm<SignInFormInput>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<SignInFormInput> = async (data) => {
    setApiError('')
    try {
      const res = await signIn(data)
      saveAuthToken(res.headers)
      toast.success('ログインしました')
      router.push('/')
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        toast.error('ログインに失敗しました')
        const messages = err.response.data.errors
        setApiError(messages?.join(', ') || '予期せぬエラーが発生しました。')
      } else {
        setApiError('予期せぬエラーが発生しました。')
      }
    }
  }

  return {
    ...formMethods,
    onSubmit,
    apiError,
  }
}
