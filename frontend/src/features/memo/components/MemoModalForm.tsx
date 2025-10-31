'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useModal } from '@/provider/ModalProvider'

import { createMemo } from '../api/createMemo'
import { memoSchema, MemoSchema } from '../schemas/memoSchema'

export const MemoModalForm = () => {
  const { isModalOpen, closeModal } = useModal()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MemoSchema>({
    resolver: zodResolver(memoSchema),
    defaultValues: { content: '' },
  })

  const contentValue = watch('content', '')
  const MAX_LENGTH = 300

  const onSubmit = async (data: MemoSchema) => {
    try {
      setIsSubmitting(true)
      await createMemo(data)
      reset()
      closeModal()
      toast.success('メモを作成しました')
    } catch (error) {
      console.error('メモ作成エラー:', error)
      toast.error('メモの作成に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    closeModal()
    reset()
  }

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCloseModal}
      ></div>

      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={handleCloseModal}
          className="absolute left-3 top-3 p-2 text-gray-400 transition hover:text-gray-600"
          aria-label="閉じる"
        >
          <X className="size-5" />
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="border-b-2 border-indigo-600 pb-2">
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
            )}
            <textarea
              {...register('content')}
              className=" min-h-[150px] w-full resize-none overflow-hidden p-2 text-gray-800 focus:outline-none"
              placeholder="メモを入力..."
              autoFocus
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = 'auto'
                target.style.height = `${target.scrollHeight}px`
              }}
            />
          </div>

          <div className="mt-4 flex justify-between gap-2">
            <div
              className={`mb-1 text-right text-sm ${
                contentValue.length > MAX_LENGTH ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {contentValue.length}/{MAX_LENGTH}文字
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-60"
            >
              {isSubmitting ? '保存中…' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
