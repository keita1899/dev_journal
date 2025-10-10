import axiosInstance from '@/lib/axios'

import { DailyReportSchema } from '../schemas/dailyReportSchema'

export const createDailyReport = async (data: DailyReportSchema) => {
  const params = {
    daily_report: {
      content: data.content,
      date: data.date,
    },
  }
  return await axiosInstance.post('api/v1/daily_reports', params)
}
