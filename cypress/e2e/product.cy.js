/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('Validation API Product', () => {
  
  before(() => {    
    cy.Cadastro_Usuario(user_adm.nome, user_adm.email, user_adm.password, user_adm.administrador)
    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador)    
  })

  const user_adm = {
    nome: faker.person.fullName(),
    email: faker.internet.email().toLocaleLowerCase(),
    password: faker.internet.password(),
    administrador: 'true'
  }

  const user = {
    nome: faker.person.fullName(),
    email: faker.internet.email().toLocaleLowerCase(),
    password: faker.internet.password(),
    administrador: 'false'
  }

  const product = {
    nome: faker.commerce.productName(), 
    preco: 1501,
    descricao: faker.commerce.productDescription(),
    quantidade: 10,
  }

  it('Cadastrar novo produto', () => {
    
    cy.logon(user_adm.email, user_adm.password).then((response) => {           
      cy.request({
        url: '/produtos',
        method: 'POST',
        body: product,
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
  }),

  it('Produto já cadastrado', () => {
    
    cy.logon(user_adm.email, user_adm.password).then((response) => {           
      cy.request({
        url: '/produtos',
        method: 'POST',
        body: product,
        headers: {
          'Authorization': response.body.authorization
        },      
        contentType: 'application/json',
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eql(400)
        expect(res.body.message).to.eql('Já existe produto com esse nome')        
      })
    })
  }),

  it('Token ausente, inválido ou expirado', () => {
    
    cy.logon(user_adm.email, user_adm.password).then((response) => {           
      cy.request({
        url: '/produtos',
        method: 'POST',
        body: product,
        headers: {
          'Authorization': ''
        },      
        contentType: 'application/json',
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eql(401)
        expect(res.body.message).to.eql('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')        
      })
    })
  }),

  it('Exclusiva para administradores', () => {
    
    cy.logon(user.email, user.password).then((response) => {                 
      cy.request({
        url: '/produtos',
        method: 'POST',
        body: product,
        headers: {
          'Authorization': response.body.authorization
        },      
        contentType: 'application/json',
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eql(403)
        expect(res.body.message).to.eql('Rota exclusiva para administradores')        
      })
    })
  })













  
})