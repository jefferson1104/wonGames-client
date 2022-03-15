// load type definitions from cypress module
/// <reference types="cypress" />

type ShowCaseAtributes = {
  name: string
  highlight?: boolean
}

declare namespace Cypress {
  interface Chainable {
    /**
     * custom command to visit google page
     * @example cy.google()
    */
    google(): Chainable<Window>


    /**
     * custom command to check banner in page
     * @example cy.shouldRenderBanner()
    */
    shouldRenderBanner(): Chainable<Element>


    /**
     * custom command to check showcase in page
     * @example cy.shouldRenderShowcase()
    */
    shouldRenderShowcase(attrs: ShowCaseAtributes): Chainable<Element>
  }
}
