import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { saveAuthToken } from '@/lib/authToken'

import { signUp } from '../api/signUp'
import { signUpSchema, SignUpFormInput } from '../types'

export const useSignUpForm = () => {
  const [apiError, setApiError] = useState<string>('')
  const router = useRouter()

  const formMethods = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    setApiError('')
    try {
      const res = await signUp(data)
      saveAuthToken(res.headers)
      toast.success('新規登録が完了しました')
      router.push('/')
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        toast.error('新規登録に失敗しました')
        const messages = err.response.data.errors.full_messages
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
