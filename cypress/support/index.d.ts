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
     * custom command to get element by data-cy values
     * @example cy.getByDataCy('selector')
    */
     getByDataCy(selector: string): Chainable<Element>


    /**
     * custom command to check banner in page
     * @example cy.shouldRenderBanner()
    */
    shouldRenderBanner(): Chainable<Element>


    /**
     * custom command to check showcase in page
     * @example cy.shouldRenderShowcase({ name: 'Showcase', highlight: true })
    */
    shouldRenderShowcase(attrs: ShowCaseAtributes): Chainable<Element>
  }
}
