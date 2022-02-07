import { render, screen } from 'utils/test-utils'

import FormSignIn from '.'

// mock useRouter
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()

useRouter.mockImplementation(() => ({
  push,
  query: '',
  asPath: '',
  route: '/'
}))

describe('FormSignIn component', () => {
  it('should render the form', () => {
    render(<FormSignIn />)

    const emailTextField = screen.getByPlaceholderText(/email/i)
    const passwordTextField = screen.getByPlaceholderText(/password/i)

    expect(emailTextField).toBeInTheDocument()
    expect(passwordTextField).toBeInTheDocument()
  })

  it('should render the forgot password link', () => {
    render(<FormSignIn />)

    const link = screen.getByRole('link', { name: /forgot your password/i })

    expect(link).toBeInTheDocument()
  })

  it('should render the text to sign up if already have an account', () => {
    render(<FormSignIn />)

    const link = screen.getByRole('link', { name: /sign up/i })
    const signUpText = screen.getByText(/don’t have an account\?/i)

    expect(link).toBeInTheDocument()
    expect(signUpText).toBeInTheDocument()
  })
})
