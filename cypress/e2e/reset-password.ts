/// <reference path="../support/index.d.ts" />

describe('Reset Password', () => {
  it('Should show error if password does not match', () => {
    cy.visit('/reset-password?code=123456')

    cy.findAllByPlaceholderText(/^password/i).type('123')
    cy.findAllByPlaceholderText(/confirm password/i).type('321')
    cy.findByRole('button', { name: /reset password/i }).click()

    cy.findByText(/confirm password does not match with password/i).should('exist')
  })

  it('Should show error if code is not valid', () => {
    cy.intercept('POST', '**/auth/reset-password', res => {
      res.reply({
        status: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'Incorrect code provided'
                }
              ]
            }
          ]
         }
      })
    })

    cy.visit('/reset-password?code=wrong_code')

    cy.findAllByPlaceholderText(/^password/i).type('1234')
    cy.findAllByPlaceholderText(/confirm password/i).type('1234')
    cy.findByRole('button', { name: /reset password/i }).click()

    cy.findByText(/Incorrect code provided/i).should('exist')
  })

  it('Should fill the input and redirect to the home page with the user signed in', () => {
    // interceptando a rota do backend
    cy.intercept('POST', '**/auth/reset-password', {
      statusCode: 200,
      body: { user: { email: 'e2e@wongames.com' }}
    })

    // interceptando a rota do callback de credentials do next-auth
    cy.intercept('POST', '**/auth/callback/credentials*', {
      statusCode: 200,
      body: { user: { email: 'e2e@wongames.com' }}
    })

    // interceptando a rota de session do next-auth
    cy.intercept('GET', '**/auth/session*', {
      statusCode: 200,
      body: { user: { name: 'e2e_user', email: 'e2e@wongames.com' }}
    })

    // usuario acessa a pagina de reset
    cy.visit('/reset-password?code=valid_token')


    // preencher as senhas (já com o token valido) e clicar para realizar login
    cy.findAllByPlaceholderText(/^password/i).type('123456')
    cy.findAllByPlaceholderText(/confirm password/i).type('123456')
    cy.findByRole('button', { name: /reset password/i }).click()

    // redireciona para a home
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    // tem o usuario logado com name no menu
    cy.findByText(/e2e_user/i).should('exist')

  })
})
