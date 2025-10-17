import { render, screen, fireEvent } from '@testing-library/react'

import { useAuth } from '../../hooks/useAuth'

import { Header } from './Header'

jest.mock('../hooks/useAuth')

describe('Header', () => {
  const mockSignOut = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('ロード中はスケルトンを表示する', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      currentUser: null,
      isLoading: true,
      signOut: mockSignOut,
    })
    render(<Header />)
    expect(screen.getByTestId('header-skeleton')).toBeInTheDocument()
  })

  it('未ログイン時はログインと新規登録が表示される', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      currentUser: null,
      isLoading: false,
      signOut: mockSignOut,
    })
    render(<Header />)
    expect(screen.getByText('ログイン')).toBeInTheDocument()
    expect(screen.getByText('新規登録')).toBeInTheDocument()
  })

  it('ログイン時はユーザー情報とログアウトボタンが表示される', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      currentUser: { email: 'test@example.com' },
      isLoading: false,
      signOut: mockSignOut,
    })
    render(<Header />)
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('ログアウト')).toBeInTheDocument()
  })

  it('ログアウトボタンをクリックすると signOut が呼ばれる', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      currentUser: { email: 'test@example.com' },
      isLoading: false,
      signOut: mockSignOut,
    })
    render(<Header />)
    fireEvent.click(screen.getByText('ログアウト'))
    expect(mockSignOut).toHaveBeenCalled()
  })
})
