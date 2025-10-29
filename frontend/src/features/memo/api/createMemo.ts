import axiosInstance from '@/lib/axios'

import { MemoSchema } from '../schemas/memoSchema'

export const createMemo = async (data: MemoSchema) => {
  const params = {
    memo: {
      content: data.content,
    },
  }
  return await axiosInstance.post('api/v1/memos', params)
}
