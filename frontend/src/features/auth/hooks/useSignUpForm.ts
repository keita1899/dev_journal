import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

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
      await signUp(data)
      router.push('/')
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setApiError(err.response.data.errors.join(', '))
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
