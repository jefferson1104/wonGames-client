/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('Should render home sections', () => {
    // visitar a home page
    cy.visit('/')

    // Banners
    cy.shouldRenderBanner()

    // Showcases
    cy.shouldRenderShowcase({ name: 'New Games', highlight: false })
    cy.shouldRenderShowcase({ name: 'Most Popular Games', highlight: true })
    cy.shouldRenderShowcase({ name: 'Upcoming Games', highlight: true })
    cy.shouldRenderShowcase({ name: 'Free Games', highlight: true })
  })
})
