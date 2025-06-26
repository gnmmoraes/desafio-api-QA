/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

Cypress.Commands.add('login', (email, password) => {

  return cy.request({
    url: '/login',
    method: 'POST',
    body: { email, password },
    contentType: 'application/json',
    failOnStatusCode: false
  })
});

Cypress.Commands.add('Cadastro_Usuario', (nome, email, password, administrador) => {

  return cy.request({
    url: '/usuarios',
    method: 'POST',
    body: { nome, email, password, administrador },
    contentType: 'application/json',
    failOnStatusCode: false
  })
});

Cypress.Commands.add('Cadastro_Produto', (products) => {

  cy.login('fulano@qa.com', 'teste').then((response) => {
    cy.request({
      url: '/produtos',
      method: 'POST',
      body: products,
      headers: {
        'Authorization': response.body.authorization
      },
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eql(201)
      expect(res.body.message).to.eql('Cadastro realizado com sucesso')
      expect(res.body._id).to.exist
      })
  })
})





// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })