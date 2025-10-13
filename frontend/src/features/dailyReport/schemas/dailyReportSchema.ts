import { z } from 'zod'

export const dailyReportSchema = z.object({
  content: z
    .string()
    .min(1, { message: '本文を入力してください' })
    .refine((val) => val.trim().length > 0, {
      message: '本文を入力してください',
    }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: '正しい日付を入力してください(YYYY-MM-DD)',
  }),
})

export type DailyReportSchema = z.infer<typeof dailyReportSchema>
