import { z } from 'zod'

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'タイトルを入力してください' })
    .max(255, { message: 'タイトルは255文字以内で入力してください' })
    .refine((val) => val.trim().length > 0, { message: 'タイトルを入力してください' }),
  content: z
    .string()
    .min(1, { message: '本文を入力してください' })
    .refine((val) => val.trim().length > 0, {
      message: '本文を入力してください',
    }),
  published: z.boolean(),
})

export type ArticleSchema = z.infer<typeof articleSchema>
