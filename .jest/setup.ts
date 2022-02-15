import '@testing-library/jest-dom'
import 'jest-styled-components'

// colocando para carregar as variaveis de ambiente nos testes
import dotenv from 'dotenv'

dotenv.config({
  path: '.env.development'
})
