/// <reference path="../support/index.d.ts" />

import { priceFields, platformFields, sortFields, genreFields } from '../../src/utils/filter/fields'

describe('Explore Page', () => {
  it('Should render filters columns', () => {
    cy.visit('/games')

    cy.findByRole('heading', { name: /sort by price/i }).should('exist')
    cy.findByRole('heading', { name: /^price/i }).should('exist')
    cy.findByRole('heading', { name: /platforms/i }).should('exist')
    cy.findByRole('heading', { name: /genres/i }).should('exist')

    cy.getFields(sortFields)
    cy.getFields(priceFields)
    cy.getFields(platformFields)
    cy.getFields(genreFields)
  })
})
