/// <reference types="cypress" />

describe('Login', () => {

  it('Deve fazer login com sucesso', () => {
    const user = {
      email: 'fulano@qa.com',
      password: 'teste'
    }
    cy.request({
      url: '/login',
      method: 'POST',
      body: user,
      contentType: 'application/json',      
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(200)
      expect(response.body.message).to.eql('Login realizado com sucesso')
      expect(response.body.authorization).to.exist
    })
  }),

  it('Deve retornar erro ao fazer login com email ou senha inválida', () => {
    const user = {
      email: 'fulano@qa.com',
      password: '1234567'
    }
    cy.request({
      url: '/login',
      method: 'POST',
      body: user,
      contentType: 'application/json',      
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(401)
      expect(response.body.message).to.eql('Email e/ou senha inválidos')
    })
  })
})

