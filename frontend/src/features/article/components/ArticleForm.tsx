import { Controller } from 'react-hook-form'

import { TiptapEditor } from '../../../components/ui/TiptapEditor'
import { useCreateArticleForm } from '../hooks/useCreateArticleForm'

export const ArticleForm = () => {
  const { register, control, handleSubmit, onSubmit, errorMessages, apiError, isSubmitting } =
    useCreateArticleForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col space-y-8 rounded-lg p-6 text-slate-800 shadow-lg sm:p-8 dark:text-slate-200"
    >
      <div className="mx-auto flex size-full flex-col p-4 sm:p-6 md:w-3/4">
        <div className="mt-4">
          {apiError && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{apiError}</p>
            </div>
          )}
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

        <div className="mt-4 flex justify-end">
          <Controller
            name="published"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className={`flex h-6 w-12 cursor-pointer items-center rounded-full p-1 transition-colors ${
                    field.value ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`size-4 rounded-full bg-white shadow-md transition-transform${
                      field.value ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
                <span>{field.value ? '公開中' : '非公開'}</span>
              </div>
            )}
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            {...register('title')}
            className="w-full border-b border-gray-600 bg-transparent p-2 text-white placeholder:text-gray-400 focus:border-white focus:outline-none"
            placeholder="タイトルを入力"
            autoFocus
          />
        </div>

        <div className="mt-4 grow">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TiptapEditor value={field.value} autofocus={false} onChange={field.onChange} />
            )}
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
