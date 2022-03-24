/// <reference path="../support/index.d.ts" />

import { createUser } from "../support/generate"

describe('Checkout', () => {
  let user: User
  describe('Free Games', () => {
    before(() => {
      user = createUser()
    })

    it('Should buy free games', () => {
      // acessa pagina de sign-up criar um usuario e verifica se foi para a home
      cy.visit('/sign-up')
      cy.signUp(user)
      cy.url().should('eq', `${Cypress.config().baseUrl}/`)

      // ir para explore page e verificar se esta na rota /games
      cy.findByRole('link', { name: /explore/i }).click()
      cy.url().should('eq', `${Cypress.config().baseUrl}/games`)

      // filtrar por jogos free e verificar se na url esta o parametro correto
      cy.findByText('Free').click()
      cy.url().should('contain', 'price_lte=0')

      // adicionar um jogo no carrinho
      cy.addToCartByIndex(0)

      // verificar se tem algum jogo no carrinho e abrir dropdown
      cy.findAllByLabelText(/cart items/i).first().should('have.text', 1).click()

      // clicar no button para fazer a compra
      cy.getByDataCy('cart-list').within(() => {
        cy.findByText(/buy it now/i).click()
      })

      // pagina do carrinho buscar o texto de só jogos free
      cy.findByText(/only free games, click buy and enjoy/i).should('exist')

      // clicar no botão para comprar
      cy.findByRole('button', { name: /buy now/i }).click()

      // verificar se foi redirecionado para pagina de sucesso
      cy.url().should('eq', `${Cypress.config().baseUrl}/success`)

      // verificar o texto da pagina de sucesso
      cy.findByRole('heading', { name: /Your purchase was successful!/i }).should('exist')
    })

    it('Should show games in order page', () => {
      cy.visit('/profile/orders')
      cy.location('href').should('eq', `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/orders`)

      cy.signIn(user.email, user.password)
      cy.location('href').should('eq', `${Cypress.config().baseUrl}/profile/orders`)

      cy.getByDataCy('game-item').should('have.length', 1)
    })
  })


  describe('Paid Games', () => {

  })
})



