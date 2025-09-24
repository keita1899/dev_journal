import axiosInstance from '@/lib/axios'

import { SignUpFormInput } from '../types'

type SignUpParams = {
  user: Omit<SignUpFormInput, 'passwordConfirmation'>
}

export const signUp = (data: SignUpFormInput) => {
  const params: SignUpParams = {
    user: {
      email: data.email,
      password: data.password,
    },
  }
  return axiosInstance.post('/api/v1/users', params)
}
