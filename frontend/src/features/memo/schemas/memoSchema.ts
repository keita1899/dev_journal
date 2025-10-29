import { z } from 'zod'

export const memoSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'メモを入力してください' })
    .max(300, { message: '300文字以内で入力してください' })
    .refine((val) => val.trim().length > 0, {
      message: 'メモを入力してください',
    }),
})

export type MemoSchema = z.infer<typeof memoSchema>
