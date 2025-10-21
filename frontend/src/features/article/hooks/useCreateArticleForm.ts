import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { createArticle } from '../api/createArticle'
import { articleSchema, ArticleSchema } from '../schemas/articleSchema'

export const useCreateArticleForm = () => {
  const [apiError, setApiError] = useState<string>('')
  const router = useRouter()

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ArticleSchema>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      content: '',
      published: false,
    },
  })

  const errorMessages = Object.values(errors)
    .map((error) => error?.message)
    .filter((msg): msg is string => msg !== undefined)

  const onSubmit: SubmitHandler<ArticleSchema> = async (data) => {
    try {
      await createArticle(data)
      toast.success('記事を保存しました')
      router.push('/articles')
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        toast.error('記事の保存に失敗しました')
        const messages = err.response.data.errors
        setApiError(messages?.join(', ') || '予期せぬエラーが発生しました。')
      } else {
        setApiError('予期せぬエラーが発生しました。')
      }
    }
  }

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    errorMessages,
    apiError,
    isSubmitting,
  }
}
