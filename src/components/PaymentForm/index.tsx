import React, { useEffect, useState } from 'react'
import { Session } from 'next-auth/client'

import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { CardElement } from '@stripe/react-stripe-js'
import Button from 'components/Button'
import Heading from 'components/Heading'

import { useCart } from 'hooks/use-cart'
import { createPaymentIntent } from 'utils/stripe/methods'

import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'
import * as S from './styles'
import { FormLoading } from 'components/Form'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
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
        if (error) {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
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
            disabled={!freeGames && (disabled || !!error)}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
