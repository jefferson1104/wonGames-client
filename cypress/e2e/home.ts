/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('Should render home sections', () => {
    // visitar a home page
    cy.visit('/')

    // Selecionando os banners
    cy.shouldRenderBanner()
  })
})
