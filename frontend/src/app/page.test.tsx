import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from './page'
import { AuthProvider } from '@/contexts/AuthContext'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

describe('Page', () => {
  it('renders a heading', () => {
    render(
      <AuthProvider>
        <Page />
      </AuthProvider>
    )

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
