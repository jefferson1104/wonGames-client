// load type definitions from cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /* custom command to visit google page, ex: cy.google() */
    google(): Chainable<Window>

    /* custom command to check banner in page, ex: cy.shouldRenderBanner()*/
    shouldRenderBanner(): Chainable<Element>
  }
}
