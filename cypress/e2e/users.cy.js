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

  it.only('Cadastrar novo usuário', () => {
    
    cy.Cadastro_Usuario(users.nome, users.email, users.password, users.administrador).then((response) => {
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

  it.only('Cadastrar com nome em branco', () => {
    let user = {
      nome: '',
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      administrador: 'false'
    }  
    
    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.nome).to.eql('nome não pode ficar em branco')
    })
  }),

  it.only('Payload sem atributo nome', () => {
    let user = {
      
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      administrador: 'false'
    }     
    
    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.nome).to.eql('nome é obrigatório')
    })
  }),

  it.only('Cadastrar com email em branco', () => {
    let user = {
      nome: faker.person.fullName(),
      email: '',
      password: faker.internet.password(),
      administrador: 'false'
    }    
    
    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.email).to.eql('email não pode ficar em branco')
    })
  }),

  it.only('Payload sem atributo email', () => {
    let user = {
      nome: faker.person.fullName(),
      
      password: faker.internet.password(),
      administrador: 'false'
    }     
    
    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.email).to.eql('email é obrigatório')
    })
  }),

  it.only('Cadastrar com password em branco', () => {
    let user = {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: '',
      administrador: 'false'
    }        

    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.password).to.eql('password não pode ficar em branco')
    })
  }),

  it.only('Payload sem atributo password', () => {
    let user = {
     nome: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      
      administrador: 'false'
    }      
    
    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.password).to.eql('password é obrigatório')
    })
  }),
  
  it.only('Cadastrar com administrador em branco', () => {
    let user = {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      administrador: ''
    }        

    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.administrador).to.eql("administrador deve ser 'true' ou 'false'")
    })
  }),

  it.only('Payload sem atributo administrador', () => {
    let user = {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password()
      
    }     
    
    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.administrador).to.eql('administrador é obrigatório')
    })
  }),
  
  it.only('Buscar usuário por id', (id = userId) => {
               
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

  it.only('Deletar usuário por id', (id = userId) => {               
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