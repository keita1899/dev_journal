import axiosInstance from '@/lib/axios'

import { ArticleSchema } from '../schemas/articleSchema'

export const createArticle = async (data: ArticleSchema) => {
  const params = {
    article: {
      title: data.title,
      content: data.content,
      published: data.published,
    },
  }
  return await axiosInstance.post('api/v1/articles', params)
}
