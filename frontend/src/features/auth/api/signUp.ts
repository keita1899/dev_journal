import axiosInstance from '@/lib/axios'

import { SignUpFormInput } from '../types'

export const signUp = (data: SignUpFormInput) => {
  const params = {
    email: data.email,
    password: data.password,
    password_confirmation: data.passwordConfirmation,
  }
  return axiosInstance.post('api/v1/auth', params)
}
