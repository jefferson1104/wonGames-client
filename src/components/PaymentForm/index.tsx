import { useEffect, useState } from 'react'
import { Session } from 'next-auth/client'

import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { CardElement } from '@stripe/react-stripe-js'
import Button from 'components/Button'
import Heading from 'components/Heading'

import { useCart } from 'hooks/use-cart'
import { createPaymentIntent } from 'utils/stripe/methods'

import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'
import * as S from './styles'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        // fazer request na api /orders/create-payment-intent e enviar os items do carrinho
        const data = await createPaymentIntent({ items, token: session.jwt })

        // se receber freeGames: true, então setFreeGames e faz o fluxo de jogos gratuitos
        if (data.freeGames) {
          setFreeGames(true)
          console.log('FREEGAMES =', data.freeGames)
          return
        }

        // se receber um erro, setError
        if (error) {
          setError(data.error)
          return
        }

        // se der tudo certo será criado um novo paymentIntent e agora fazemos o setClientSecret
        setClientSecret(data.client_secret)
        console.log('CLIENT SECRET =', data.client_secret)
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" lineBottom size="small">
          Payment
        </Heading>
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '16px'
              }
            }
          }}
          onChange={handleChange}
        />
        {error && (
          <S.Error>
            <ErrorOutline size={20} />
            {error}
          </S.Error>
        )}
      </S.Body>
      <S.Footer>
        <Button as="a" fullWidth minimal>
          Continue shopping
        </Button>
        <Button
          fullWidth
          icon={<ShoppingCart />}
          disabled={disabled || !!error}
        >
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default PaymentForm
