/// <reference path="../support/index.d.ts" />

describe('Cart', () => {
  it('Should add and remove items from cart', () => {
    // visitar a home
    cy.visit('/')

    // pegando os jogos e selecionando via index
    // clicando no botao/icone para adicionar ao carrinho em cada um
    cy.addToCartByIndex(0)
    cy.addToCartByIndex(2)

    // verifica se o icone do carrinho tem o numero de jogos adicionados
    // clica para abrir o carrinho
    cy.findAllByLabelText(/cart items/i).first().should('have.text', 2).click()

    // verificar se os jogos estão lá no carrinho, através dos headings
    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading').should('have.length', 2)
    })

    // fecha o carrinho
    cy.findAllByLabelText(/cart items/i).first().click()




    // procurando pelos jogos adicionado através do index
    // clicando no botao/icone de remover cada jogo do carrinho
    cy.removeFromCartByIndex(0)
    cy.removeFromCartByIndex(2)

    // verifica se o icone do carrinho ta zerado
    cy.findAllByLabelText(/cart items/i).should('not.exist')

    // abre o carrinho e verifica se tá vazio
    cy.findAllByLabelText(/shopping cart/i).first().click()
    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading', { name: /your cart is empty/i }).should('exist')
    })
  })
})
