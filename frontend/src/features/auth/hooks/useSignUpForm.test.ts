import { renderHook, act } from '@testing-library/react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { signUp } from '../api/signUp'

import { useSignUpForm } from './useSignUpForm'

jest.mock('../api/signUp')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockSignUp = signUp as jest.Mock
const mockUseRouter = useRouter as jest.Mock

describe('useSignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const testData = {
    email: 'test@example.com',
    password: 'password123',
    passwordConfirmation: 'password123',
  }

  it('フォームの送信に成功した場合、トップページにリダイレクトされること', async () => {
    const mockPush = jest.fn()
    mockUseRouter.mockReturnValue({ push: mockPush })
    mockSignUp.mockResolvedValue({})

    const { result } = renderHook(() => useSignUpForm())

    await act(async () => {
      await result.current.onSubmit(testData, undefined)
    })

    expect(mockPush).toHaveBeenCalledWith('/')
    expect(result.current.apiError).toBe('')
  })

  it('フォームの送信に失敗した場合、エラーメッセージが設定されること', async () => {
    const errorMessage = 'メールアドレスはすでに存在します'
    mockSignUp.mockRejectedValue(
      new AxiosError('Request failed', '400', undefined, undefined, {
        data: { errors: { full_messages: [errorMessage] } },
        status: 400,
      } as any)
    )

    const { result } = renderHook(() => useSignUpForm())

    await act(async () => {
      await result.current.onSubmit(testData, undefined)
    })

    expect(result.current.apiError).toBe(errorMessage)
  })

  it('Axios以外の予期せぬエラーが発生した場合、エラーメッセージが表示されること', async () => {
    const genericErrorMessage = '予期せぬエラーが発生しました。'
    mockSignUp.mockRejectedValue(new Error('Something went wrong'))

    const { result } = renderHook(() => useSignUpForm())

    await act(async () => {
      await result.current.onSubmit(testData, undefined)
    })

    expect(result.current.apiError).toBe(genericErrorMessage)
  })
})
