/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('Users', () => {
  var userId = ''
  const users = {
    nome: 'Gabriel',
    email: faker.internet.email().toLocaleLowerCase(),
    password: '123456',
    administrador: 'false'
  }        

  it('Cadastrar novo usuário', () => {
    
    cy.request({
      url: '/usuarios',
      method: 'POST',
      body: users,
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((response) => {
      switch (response.status) {
        case 201:
          expect(response.body.message).to.eql('Cadastro realizado com sucesso')
          expect(response.body._id).to.exist
          userId = response.body._id
          break
        case 400:
          expect(response.body.message).to.eql('Este email já está cadastrado')
          break
      }
      
    })
  }),

  it('Cadastrar com nome em branco', () => {
    let user = {
      nome: '',
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      administrador: 'false'
    }        
    cy.request({
      url: '/usuarios',
      method: 'POST',
      body: user,
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.nome).to.eql('nome não pode ficar em branco')
    })
  }),

  it('Payload sem atributo nome', () => {
    let user = {
      
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      administrador: 'false'
    }        
    cy.request({
      url: '/usuarios',
      method: 'POST',
      body: user,
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.nome).to.eql('nome é obrigatório')
    })
  }),

  it('Cadastrar com email em branco', () => {
    let user = {
      nome: faker.person.fullName(),
      email: '',
      password: faker.internet.password(),
      administrador: 'false'
    }        
    cy.request({
      url: '/usuarios',
      method: 'POST',
      body: user,
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.email).to.eql('email não pode ficar em branco')
    })
  }),

  it('Payload sem atributo email', () => {
    let user = {
      nome: faker.person.fullName(),
      
      password: faker.internet.password(),
      administrador: 'false'
    }        
    cy.request({
      url: '/usuarios',
      method: 'POST',
      body: user,
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.email).to.eql('email é obrigatório')
    })
  }),

  it('Cadastrar com password em branco', () => {
    let user = {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: '',
      administrador: 'false'
    }        
    cy.request({
      url: '/usuarios',
      method: 'POST',
      body: user,
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.password).to.eql('password não pode ficar em branco')
    })
  }),

  it('Payload sem atributo password', () => {
    let user = {
     nome: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      
      administrador: 'false'
    }        
    cy.request({
      url: '/usuarios',
      method: 'POST',
      body: user,
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.password).to.eql('password é obrigatório')
    })
  }),
  
  it('Cadastrar com administrador em branco', () => {
    let user = {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      administrador: ''
    }        
    cy.request({
      url: '/usuarios',
      method: 'POST',
      body: user,
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.administrador).to.eql("administrador deve ser 'true' ou 'false'")
    })
  }),

  it('Payload sem atributo administrador', () => {
    let user = {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password()
      
    }        
    cy.request({
      url: '/usuarios',
      method: 'POST',
      body: user,
      contentType: 'application/json',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.administrador).to.eql('administrador é obrigatório')
    })
  }),
  
  it('Buscar usuário por id', (id = userId) => {
               
    cy.request({
      url: `/usuarios/${id}`,
      method: 'GET',      
      contentType: 'application/json',
      failOnStatusCode: true
    }).then((response) => {
      expect(response.status).to.eql(200)
      expect(response.body.nome).to.eql(users.nome)
      expect(response.body.email).to.eql(users.email)
      expect(response.body.password).to.eql(users.password)
      expect(response.body.administrador).to.eql(users.administrador)
    })
  }),

  it('Deletar usuário por id', (id = userId) => {               
    cy.request({
      url: `/usuarios/${id}`,
      method: 'DELETE',      
      contentType: 'application/json',
      failOnStatusCode: true
    }).then((response) => {
      expect(response.status).to.eql(200)
      expect(response.body.message).to.eql('Registro excluído com sucesso')      
    })
  })
})