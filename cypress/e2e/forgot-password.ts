/// <reference path="../support/index.d.ts" />

import { find } from "cypress/types/lodash"

describe('Forgot Password', () => {
  it('Should fill the input and receive a success message', () => {
    // intercepta qualquer chamada e retorna sucesso
    cy.intercept('POST', '**/auth/forgot-password', res => {
      res.reply({
        status: 200,
        body: { ok: true }
      })

      expect(res.body.email).to.eq('cypress@wongames.com')
    })

    // acessa a pagina para recuperar senha
    cy.visit('/forgot-password')

    // digita um email e clica no botao enviar
    cy.findAllByPlaceholderText(/email/i).type('cypress@wongames.com')
    cy.findByRole('button', { name: /send email/i}).click()

    // retorna a messagem de sucesso
    cy.findByText(/you just received an email!/i).should('exist')
  })

  it('Should fill the input with an invalid email and receive an error', () => {
    // intercepta qualquer chamada e retorna um erro
    cy.intercept('POST', '**/auth/forgot-password', res => {
      res.reply({
        status: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'This email does not exist'
                }
              ]
            }
          ]
         }
      })
    })

    // acessa a pagina para recuperar senha
    cy.visit('/forgot-password')

    // digita um email e clica no botao enviar
    cy.findAllByPlaceholderText(/email/i).type('cypress@wongames.com')
    cy.findByRole('button', { name: /send email/i}).click()

    // mensagem de erro
    cy.findByText(/This email does not exist/i).should('exist')
  })
})
