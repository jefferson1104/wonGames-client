/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('Should render home sections', () => {
    // visitar a home page
    cy.visit('/')

    // pegando o slider e o conteudo dentro dele com o metodo within()
    cy.get('.slick-slider').within(() => {
      cy.findByRole('heading', { name: /cyberpunk 2077/i })
      cy.findByRole('link', { name: /buy now/i })

      // clicando para passar para o segundo slide e testando
      cy.get('.slick-dots :nth-child(2) > button').click()
      cy.wait(500) // aguarda 500 milisegundos
      cy.findByRole('heading', { name: /pathfinder/i })

      // clicando para passar para o terceiro slide e testando
      cy.get('.slick-dots :nth-child(3) > button').click()
      cy.wait(500)  // aguarda 500 milisegundos
      cy.findByRole('heading', { name: /STALKER/i })
    })
  })
})
