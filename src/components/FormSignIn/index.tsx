import Link from 'next/link'
import { Email, Lock } from 'styled-icons/material-outlined'

import TextField from 'components/TextField'
import Button from 'components/Button'

import * as S from './styles'

const FormSignIn = () => {
  return (
    <S.Wrapper>
      <form>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
        />
        <Link href="/forgot-password" passHref>
          <S.ForgotPassword>Forgot your password?</S.ForgotPassword>
        </Link>

        <Button size="large" fullWidth>
          Sign in now
        </Button>

        <S.FormLink>
          Don’t have an account?{' '}
          <Link href="/sign-up">
            <a>Sign Up</a>
          </Link>
        </S.FormLink>
      </form>
    </S.Wrapper>
  )
}

export default FormSignIn
