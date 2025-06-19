/// <reference types="cypress" />

describe('Validation API Login', () => {

  it('Login com sucesso', () => {
    const user = {
      email: 'fulano@qa.com',
      password: 'teste'
    }
    cy.request({
      url: '/login',
      method: 'POST',
      body: user,
      contentType: 'application/json',
      failOnStatusCode: true
    }).then((response) => {
      expect(response.status).to.eql(200)
      expect(response.body.message).to.eql('Login realizado com sucesso')
      expect(response.body.authorization).to.exist
    })
  }),

    it('Login com email inválido', () => {
      const user = {
        email: 'fulano##qa.com',
        password: 'teste'
      }
      cy.request({
        url: '/login',
        method: 'POST',
        body: user,
        contentType: 'application/json',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eql(400)
        expect(response.body.email).to.eql('email deve ser um email válido')
      })
    }),

    it('Login com email em branco', () => {
      const user = {
        email: '',
        password: 'teste'
      }
      cy.request({
        url: '/login',
        method: 'POST',
        body: user,
        contentType: 'application/json',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eql(400)
        expect(response.body.email).to.eql('email não pode ficar em branco')
      })
    }),

    it('Login senha invalida', () => {
      const user = {
        email: 'fulano@qa.com',
        password: '#'
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
    }),

    it('Login senha em branco', () => {
      const user = {
        email: 'fulano@qa.com',
        password: ''
      }
      cy.request({
        url: '/login',
        method: 'POST',
        body: user,
        contentType: 'application/json',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eql(400)
        expect(response.body.password).to.eql('password não pode ficar em branco')
        
      })
    })
})

