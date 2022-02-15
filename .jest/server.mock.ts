
global.fetch = require('node-fetch')

import { server } from '../src/utils/mockServer/server'

beforeAll(() => {
  // colocar para ficar escutando todas as chamadas nos testes
  server.listen()
})

afterEach(() => {
  // apos todos os testes resetar handlers para caso eles sejam chamados novamente
  server.restoreHandlers()
})

afterAll(() => {
  // fechar o server e limpar os testes
  server.close()
})
