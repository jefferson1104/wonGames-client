// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Add testing library commands
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('google', () => cy.visit('https://google.com'))

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})

Cypress.Commands.add('shouldRenderBanner', () => {
  // pegando o slider e o conteudo dentro dele com o metodo within()
  cy.get('.slick-slider').within(() => {
    cy.findByRole('heading', { name: /cyberpunk 2077/i })
    cy.findByRole('link', { name: /buy now/i })

    // clicando para passar para o segundo slide e testando
    cy.get('.slick-dots :nth-child(2) > button').click()
    cy.wait(500) // aguarda 500 milisegundos
    cy.findByRole('heading', { name: /pathfinder/i })

    // clicando para passar para o terceiro slide e testando
    cy.get('.slick-dots :nth-child(3) > button').click()
    cy.wait(500)  // aguarda 500 milisegundos
    cy.findByRole('heading', { name: /STALKER/i })
  })
})

Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false }) => {
  // exemplo de teste utilizando o common assertion e condicionais nos comandos
  cy.getByDataCy(`"${name}"`).within(() => {
    cy.findByRole('heading', { name }).should('exist')

    // ex testando gamecard dentro da showcase usando assertions
    cy.getByDataCy('game-card').should('have.length.gt', 0)

    // ex com condicionais e assertions para verificar se exite o highlight
    cy.getByDataCy('highlight').should(highlight ? 'exist' : 'not.exist')

    // ex com condicionais e assertions, para pegar links dentro do highlight
    if (highlight) {
      cy.getByDataCy('highlight').within(() => {
        cy.findByRole('link').should('have.attr', 'href')
      })
    }
  })
})

Cypress.Commands.add('getFields', (fields) => {
  fields.map(({ label }) => {
    cy.findByText(label).should('exist')
  })
})

Cypress.Commands.add('shouldBeGreaterThan', (value) => {
  // com regex pegamos o numero
  // com invoke transformamos em texto
  // com then removemos o '$' e em seguida com parseFloat transformamos em numero
  // no fim com o should fazemos a comparação
  cy
    .findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then($el => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.gt', value)
})

Cypress.Commands.add('shouldBeLessThan', (value) => {
  // com regex pegamos o numero
  // com invoke transformamos em texto
  // com then removemos o '$' e em seguida com parseFloat transformamos em numero
  // no fim com o should fazemos a comparação
  cy
    .findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then($el => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.lt', value)
})
