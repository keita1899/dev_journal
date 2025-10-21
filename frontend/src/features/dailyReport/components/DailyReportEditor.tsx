'use client'

import { Controller } from 'react-hook-form'

import { TiptapEditor } from '../../../components/ui/TiptapEditor'
import { createDailyReport } from '../api/createDailyReport'
import { useDailyReportForm } from '../hooks/useDailyReportForm'

type DailyReportEditorProps = {
  date: string
  content: string
}

export const DailyReportEditor = ({ date, content }: DailyReportEditorProps) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    onSubmit,
  } = useDailyReportForm({
    onSubmit: createDailyReport,
    defaultValues: {
      date: date,
      content: content,
    },
  })

  const errorMessages = Object.values(errors)
    .map((error) => error?.message)
    .filter((msg): msg is string => msg !== undefined)

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full flex-col space-y-8 rounded-lg p-6 text-slate-800 shadow-lg sm:p-8 dark:text-slate-200"
    >
      <div className="mx-auto flex size-full flex-col p-4 sm:p-6 md:w-3/4">
        <div className="text-center">
          <input
            type="date"
            id="date"
            {...register('date')}
            className="cursor-pointer bg-transparent text-2xl font-bold text-slate-700 focus:outline-none dark:text-slate-300"
          />
        </div>

        <div className="mt-4">
          {errorMessages.length > 0 && (
            <div className="rounded-md bg-red-100 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
              <ul>
                {errorMessages.map((message, i) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-4 grow">
          <Controller
            name="content"
            control={control}
            render={({ field }) => <TiptapEditor value={field.value} onChange={field.onChange} />}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="fixed bottom-8 right-8 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? '保存中...' : '保存する'}
        </button>
      </div>
    </form>
  )
}
