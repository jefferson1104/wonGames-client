/// <reference path="../support/index.d.ts" />

describe('Wishlist', () => {
  it('Should add and remove games from wishlist', () => {
    // acessa a pagina de wishlist sem estar logado
    cy.visit('/wishlist')

    // ao ser redirecionado faz o sign-in
    cy.signIn()

    // verifica se a wishlist está vazia
    cy.findByText(/your wishlist is empty/i).should('exist')

    // procura por um jogo e adiciona na wishlist
    cy.getByDataCy('game-card').eq(0).within(() => {
      cy.findAllByLabelText(/add to wishlist/i).click()
    })

    // verifica se o jogo está na wishlist
    cy.getByDataCy('wishlist').within(() => {
      cy.getByDataCy('game-card').should('have.length', 1)
    })

    // remove o jogo da wishlist
    cy.getByDataCy('wishlist').within(() => {
      cy.findAllByLabelText(/remove from wishlist/i).click()
    })

    // verifica novamente se a wishlist está vazia
    cy.findByText(/your wishlist is empty/i).should('exist')
  })
})
