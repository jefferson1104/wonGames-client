import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Session } from 'next-auth/client'

import { useCart } from 'hooks/use-cart'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { PaymentIntent, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { createPayment, createPaymentIntent } from 'utils/stripe/methods'

import Button from 'components/Button'
import Heading from 'components/Heading'
import { FormLoading } from 'components/Form'

import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'
import * as S from './styles'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { push } = useRouter()
  const { items } = useCart()
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        setFreeGames(false)

        // fazer request na api /orders/create-payment-intent e enviar os items do carrinho
        const data = await createPaymentIntent({ items, token: session.jwt })

        // se receber freeGames: true, então setFreeGames e faz o fluxo de jogos gratuitos
        if (data.freeGames) {
          setFreeGames(true)
          return
        }

        // se receber um erro, setError
        if (data.error) {
          setError(data.error)
          return
        }

        // se der tudo certo será criado um novo paymentIntent e agora fazemos o setClientSecret
        setClientSecret(data.client_secret)
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const data = await createPayment({
      items,
      paymentIntent,
      token: session.jwt
    })

    return data
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    // Se for freeGames (gratuito)
    if (freeGames) {
      // bate na api /orders e salva no banco de dados
      saveOrder()

      // redireciona para /success
      push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setLoading(false)
    } else {
      setError(null)
      setLoading(false)

      // bate na api /orders e salva no banco de dados
      saveOrder(payload.paymentIntent)

      // redireciona para /success
      push('/success')
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" lineBottom size="small">
            Payment
          </Heading>
          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
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
          )}

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
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && (disabled || !!error || loading)}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
