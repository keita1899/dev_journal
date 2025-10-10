'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { dailyReportSchema, DailyReportSchema } from '../schemas/dailyReportSchema'
import { AxiosError } from 'axios'

type UseDailyReportFormProps = {
  defaultValues?: DailyReportSchema
  onSubmit: SubmitHandler<DailyReportSchema>
}

export const useDailyReportForm = ({ defaultValues, onSubmit }: UseDailyReportFormProps) => {
  const router = useRouter()
  const formMethods = useForm<DailyReportSchema>({
    resolver: zodResolver(dailyReportSchema),
    defaultValues: defaultValues || { content: '', date: new Date().toISOString().split('T')[0] },
  })

  const handleFormSubmit = formMethods.handleSubmit(async (data) => {
    try {
      await onSubmit(data)
      toast.success('日報を保存しました')
      router.push('/calendar')
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessages = error.response.data.errors as string[]
        console.error(errorMessages)
        if (errorMessages.length > 0) {
          toast.error(errorMessages.join('\n'))
        } else {
          toast.error('日報の保存に失敗しました')
        }
      } else {
        console.error(error)
        toast.error('予期せぬエラーが発生しました')
      }
    }
  })

  return {
    ...formMethods,
    onSubmit: handleFormSubmit,
  }
}
