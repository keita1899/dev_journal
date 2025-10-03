import axiosInstance from '@/lib/axios'

import { SignInFormInput } from '../types'

export const signIn = (data: SignInFormInput) => {
  const params = {
    email: data.email,
    password: data.password,
  }
  return axiosInstance.post('api/v1/auth/sign_in', params)
}
