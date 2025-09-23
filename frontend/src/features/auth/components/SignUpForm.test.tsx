import { render, screen } from '@testing-library/react'

import { useSignUpForm } from '../hooks/useSignUpForm'

import { SignUpForm } from './SignUpForm'

jest.mock('../hooks/useSignUpForm')

const mockUseSignUpForm = useSignUpForm as jest.Mock

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('バリデーションエラーがある場合、エラーメッセージが表示されること', () => {
    mockUseSignUpForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: (fn: any) => fn,
      onSubmit: jest.fn(),
      formState: {
        errors: { email: { message: 'メールアドレスを入力してください' } },
        isSubmitting: false,
      },
      apiError: '',
    })

    render(<SignUpForm />)

    expect(screen.getByText('メールアドレスを入力してください')).toBeInTheDocument()
  })

  it('APIエラーがある場合、エラーメッセージが表示されること', () => {
    mockUseSignUpForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: (fn: any) => fn,
      onSubmit: jest.fn(),
      formState: { errors: {}, isSubmitting: false },
      apiError: 'APIからのエラーです',
    })

    render(<SignUpForm />)

    expect(screen.getByText('APIからのエラーです')).toBeInTheDocument()
  })
})
