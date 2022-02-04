import NextAuth from 'next-auth'

import Providers from 'next-auth/providers'
import {
  GenericObject,
  NextApiRequest,
  NextApiResponse
} from 'next-auth/_utils'

// criando opcoes para ser utilizada no NextAuth
const options = {
  pages: {
    signIn: '/sign-in'
  },
  //lista de providers
  providers: [
    Providers.Credentials({
      name: 'Sign-in',
      credentials: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize({ email, password }: any) {
        // fazendo request na API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
          {
            method: 'POST',
            body: new URLSearchParams({ identifier: email, password })
          }
        )

        // transformando retorno da request em um json
        const data = await response.json()

        // verificando se existe o usuario e retornando o objeto do usuario e o jwt, se nao existe retorna null
        if (data.user) {
          return { ...data.user, jwt: data.jwt }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    session: async (session: GenericObject, user: GenericObject) => {
      session.jwt = user.jwt
      session.id = user.id

      return Promise.resolve(session)
    },
    jwt: async (token: GenericObject, user: GenericObject) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.username
        token.jwt = user.jwt
      }

      return Promise.resolve(token)
    }
  }
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default Auth
