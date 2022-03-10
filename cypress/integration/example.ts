/// <reference path="../support/index.d.ts" />

describe('Cypress TS', () => {
  it.skip('Should go to go google', () => {
    cy.google()
  })

  it.skip('Should change light/dark theme on willian justen website', () => {
    cy.visit('https://willianjusten.com.br')

    cy.findByTitle(/Mudar o tema/i).click()
    cy.get('.light').should('exist')

    cy.findByTitle(/Mudar o tema/i).click()
    cy.get('.dark').should('exist')
  })

  it('Should visit won games', () => {
    cy.visit('https://wongames.willianjusten.com.br')

    cy.findByText(/Esse é um site de estudos!/i).should('exist')
  })
})
