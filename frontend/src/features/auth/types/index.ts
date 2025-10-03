import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '必須入力です' })
      .max(255, { message: '255文字以内で入力してください' })
      .email({ message: '正しいメールアドレスを入力してください' }),
    password: z
      .string()
      .min(8, { message: 'パスワードは8文字以上で入力してください' })
      .max(128, { message: '128文字以内で入力してください' }),
    passwordConfirmation: z
      .string()
      .min(8, { message: 'パスワードは8文字以上で入力してください' })
      .max(128, { message: '128文字以内で入力してください' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirmation'],
  })

export const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
})

export type SignUpFormInput = z.infer<typeof signUpSchema>
export type SignInFormInput = z.infer<typeof signInSchema>
