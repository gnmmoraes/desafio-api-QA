
Cypress.Commands.add('logon', (email, password) => {

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
})



// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })