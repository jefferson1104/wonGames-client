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

  it.skip('Should sign in and sign out', () => {
    cy.visit('/sign-in')

    cy.signIn()

    cy.findByText(/e2e_user/i).should('exist').click()
    cy.findByText(/sign out/i).click()

    cy.findByRole('link', { name: /sign in/i }).should('exist')
    cy.findByText(/e2e_user/i).should('not.exist')
  })

  it('Should sign the user and redirect to the page that it was defined previously', () => {
    cy.visit('/profile/me')

    // redirecionado para sign-in com a callback do profile/me
    cy.location('href').should('eq', `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/me`)

    // fazer sign-in
    cy.signIn()

    // esperamos ser redirecionado para profile/me
    cy.location('href').should('eq', `${Cypress.config().baseUrl}/profile/me`)

    cy.findByLabelText(/username/i).should('have.value', 'e2e_user')
    cy.findByLabelText(/e-mail/i).should('have.value', 'e2e@wongames.com')
  })
})
