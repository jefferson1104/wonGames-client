/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('Should render home sections', () => {
    // visitar a home page
    cy.visit('/')

    // pegando o slider e o conteudo dentro dele com o metodo within()
    cy.get('.slick-slider').within(() => {
      cy.findByRole('heading', { name: /cyberpunk 2077/i })
      cy.findByRole('link', { name: /buy now/i })
    })
  })
})
