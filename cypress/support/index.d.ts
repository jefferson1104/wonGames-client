// load type definitions from Cypress module
/// <reference types="cypress" />

type ShowCaseAtributes = {
  name: string
  highlight?: boolean
}

type FieldsAttributes = {
  label: string
  name: string | number
}

type User = {
  username: string
  email: string
  password: string
}

declare namespace Cypress {
  interface Chainable {
    /**
     * custom command to visit google page
     * @example cy.google()
    */
    google(): Chainable<Window>


    /**
     * Custom command to sign up
     * @example cy.signUp(user)
    */
    signUp(user: User): Chainable<Element>


    /**
     * Custom command to sign up
     * @example cy.signIn()
    */
    signIn(email?: string, password?: string): Chainable<Element>


    /**
     * custom command to get element by data-cy values
     * @example cy.getByDataCy('selector')
    */
    getByDataCy(selector: string): Chainable<Element>


    /**
     * Custom command to get fields by label
     * @example cy.getFields([{ label: 'foo', name: 'foo' }])
    */
    getFields(fields: FieldsAttributes[]): Chainable<Element>


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

    /**
     * Custom command to check if value is less than
     * @example cy.shouldBeLessThan(100)
    */
    shouldBeLessThan(value: number): Chainable<Element>


    /**
      * Custom command to check if value is greater than
      * @example cy.shouldBeGreaterThan(100)
    */
    shouldBeGreaterThan(value: number): Chainable<Element>


    /**
     * Custom command to add game to cart by index.
     * @example cy.addToCartByIndex(3)
    */
     addToCartByIndex(index: number): Chainable<Element>


    /**
     * Custom command to remove game from cart by index.
     * @example cy.removeFromCartByIndex(2)
    */
     removeFromCartByIndex(index: number): Chainable<Element>
  }
}
