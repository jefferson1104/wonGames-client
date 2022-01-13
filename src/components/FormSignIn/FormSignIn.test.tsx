import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import FormSignIn from '.'

describe('FormSignIn component', () => {
  it('should render the form', () => {
    renderWithTheme(<FormSignIn />)

    const emailTextField = screen.getByPlaceholderText(/email/i)
    const passwordTextField = screen.getByPlaceholderText(/password/i)

    expect(emailTextField).toBeInTheDocument()
    expect(passwordTextField).toBeInTheDocument()
  })

  it('should render the forgot password link', () => {
    renderWithTheme(<FormSignIn />)

    const link = screen.getByRole('link', { name: /forgot your password/i })

    expect(link).toBeInTheDocument()
  })

  it('should render the text to sign up if already have an account', () => {
    renderWithTheme(<FormSignIn />)

    const link = screen.getByRole('link', { name: /sign up/i })
    const signUpText = screen.getByText(/don’t have an account\?/i)

    expect(link).toBeInTheDocument()
    expect(signUpText).toBeInTheDocument()
  })
})
