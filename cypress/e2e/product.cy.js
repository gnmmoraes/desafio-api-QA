/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('Validation API Product', () => {
  it.only('Cadastrar novo produto', () => {
    const user = {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      administrador: 'true'
    }

    const product = {
      nome: 'Samsung Galaxy M53',
      preco: 1000,
      descricao: 'Smartphone Samsung Galaxy M53',
      quantidade: 100
    }
    
    cy.Cadastro_Usuario(user.nome, user.email, user.password, user.administrador)
    
    cy.logon(user.email, user.password).then((response) => {           
      cy.request({
        url: '/produtos',
        method: 'POST',
        body: product,
        headers: {
          'Authorization': response.body.authorization
        },      
        contentType: 'application/json',
        failOnStatusCode: true
      }).then((response) => {
        expect(response.status).to.eql(201)
        expect(response.body.message).to.eql('Cadastro realizado com sucesso')
        expect(response.body._id).to.exist
      })
    })


    
  })
})