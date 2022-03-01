/* eslint-disable @typescript-eslint/no-var-requires */
import { CartContextData, CartContextDefaultValues } from 'hooks/use-cart'
import { Session } from 'next-auth/client'
import { render, screen, waitFor } from 'utils/test-utils'

import items from 'components/CartList/mock'
import * as stripeMethods from 'utils/stripe/methods'

import PaymentForm from '.'

// mock do useRouter
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  push: jest.fn()
}))

// Mock do Stripe js
jest.mock('@stripe/react-stripe-js', () => ({
  CardElement: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock CardElement">{children}</div>
  },
  Elements: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Elements">{children}</div>
  },
  useStripe: jest.fn().mockReturnValue({
    confirmCardPayment: jest.fn().mockResolvedValue({
      paymentMethod: {
        card: 'card'
      }
    })
  }),
  useElements: jest.fn().mockReturnValue({
    getElement: jest.fn()
  })
}))

// Criando mock do createPaymentIntent Method
const createPaymentIntent = jest.spyOn(stripeMethods, 'createPaymentIntent')

describe('<PaymentForm />', () => {
  let session: Session
  let cartProviderProps: CartContextData

  beforeEach(() => {
    session = {
      jwt: 'token',
      user: {
        email: 'won@games.com'
      },
      expires: '1234'
    }

    cartProviderProps = {
      ...CartContextDefaultValues,
      items
    }
  })

  it('should render the component correctly', () => {
    render(<PaymentForm session={session} />)

    expect(
      screen.getByRole('heading', { name: /Payment/i })
    ).toBeInTheDocument()

    expect(screen.getByTestId(/Mock CardElement/i)).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /Buy now/i })).toBeDisabled()
  })

  it('should call createPayment when it renders free if gets freeGames', async () => {
    createPaymentIntent.mockResolvedValueOnce({ freeGames: true })

    render(<PaymentForm session={session} />, { cartProviderProps })

    expect(createPaymentIntent).toHaveBeenCalled()

    await waitFor(() => {
      expect(
        screen.getByText(/only free games, click buy and enjoy!/i)
      ).toBeInTheDocument()
    })
  })

  it('should call createPayment when it renders and render error if has any issue', async () => {
    createPaymentIntent.mockResolvedValueOnce({ error: 'Error message' })

    render(<PaymentForm session={session} />, { cartProviderProps })

    expect(createPaymentIntent).toHaveBeenCalled()

    await waitFor(() => {
      expect(screen.getByText(/Error message/i)).toBeInTheDocument()
    })
  })
})
