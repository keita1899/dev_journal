import { AxiosError } from 'axios'

import axiosInstance from '../../../lib/axios'

import { signUp } from './signUp'

jest.mock('../../../lib/axios')

const mockAxiosPost = axiosInstance.post as jest.Mock

describe('signUp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('正しいエンドポイントとパラメータでPOSTリクエストを送信すること', () => {
    const testData = {
      email: 'test@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    }

    signUp(testData)

    expect(mockAxiosPost).toHaveBeenCalledWith('api/v1/auth', {
      email: 'test@example.com',
      password: 'password123',
      password_confirmation: 'password123',
    })
  })

  it('APIからエラーレスポンスが返された場合、エラーを再スローすること', async () => {
    const testData = {
      email: 'test@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    }
    const mockError = new AxiosError('Bad Request', '400', undefined, undefined, {
      status: 400,
      data: { errors: ['メールアドレスはすでに登録されています。'] },
    } as any)

    mockAxiosPost.mockRejectedValueOnce(mockError)

    await expect(signUp(testData)).rejects.toStrictEqual(mockError)
  })
})
