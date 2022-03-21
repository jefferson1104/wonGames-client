/// <reference path="../support/index.d.ts" />

import { createUser } from '../support/generate'

describe('User', () => {
  it.skip('Should sign up', () => {
    const user = createUser()

    cy.visit('/sign-up')
    cy.signUp(user)

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.findByText(user.username).should('exist')
  })

  it('Should sign in and sign out', () => {
    cy.visit('/sign-in')

    cy.signIn()

    cy.findByText(/e2e_user/i).should('exist').click()
    cy.findByText(/sign out/i).click()

    cy.findByRole('link', { name: /sign in/i }).should('exist')
    cy.findByText(/e2e_user/i).should('not.exist')
  })
})
