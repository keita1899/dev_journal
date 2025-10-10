import { z } from 'zod'

export const dailyReportSchema = z.object({
  content: z.string().min(1, { message: '本文を入力してください' }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: '正しい日付を入力してください',
  }),
})

export type DailyReportSchema = z.infer<typeof dailyReportSchema>
