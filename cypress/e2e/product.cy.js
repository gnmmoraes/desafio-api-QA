/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('Validation API Product', () => {
  
  var id_adm = ''

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
        
    cy.login(user_adm.email, user_adm.password).then((response) => {           
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
        id_adm = res.body._id        
      })
    })
  }),

  it('Produto já cadastrado', () => {
    
    cy.login(user_adm.email, user_adm.password).then((response) => {           
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
    
    cy.login(user_adm.email, user_adm.password).then((response) => {           
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
    
    cy.login(user.email, user.password).then((response) => {                 
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

  it('Produto encontrado por ID', () => {
    
    cy.login(user_adm.email, user_adm.password).then((response) => {
      cy.request({
        url: `/produtos/${id_adm}`,
        method: 'GET',
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eql(200)
        expect(res.body.nome).to.eql(product.nome)
        expect(res.body.preco).to.eql(product.preco)
        expect(res.body.descricao).to.eql(product.descricao)
        expect(res.body.quantidade).to.eql(product.quantidade)
        expect(res.body._id).to.exist
      })
    })
  }),

  it('Produto não encontrado por ID', () => {
    
    cy.login(user_adm.email, user_adm.password).then((response) => {
      cy.request({
        url: '/produtos/ixioi9aUNDbDB7oo',
        method: 'GET',
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eql(400)
        expect(res.body.message).to.eql('Produto não encontrado')
      })
    })
  }),

  it('Produto atualizado com sucesso', () => {

    var product_atualizado = {
      nome: faker.commerce.productName(),
      preco: 10,
      descricao: faker.commerce.productDescription(),
      quantidade: 10,
    }
    
    cy.login(user_adm.email, user_adm.password).then((response) => {
      cy.request({
        url: `/produtos/${id_adm}`,
        method: 'PUT',
        body: product_atualizado,
        headers: {
          'Authorization': response.body.authorization
        },      
        contentType: 'application/json',
        failOnStatusCode: true
      }).then((res) => {
        expect(res.status).to.eql(200)
        expect(res.body.message).to.eql('Registro alterado com sucesso')  
      })
    })
  }),
  
  it('Produto excluido com sucesso', () => {
    
    cy.login(user_adm.email, user_adm.password).then((response) => {
      cy.request({
        url: `/produtos/${id_adm}`,
        method: 'DELETE',
        headers: {
          'Authorization': response.body.authorization
        },      
        contentType: 'application/json',
        failOnStatusCode: true
      }).then((res) => {
        expect(res.status).to.eql(200)
        expect(res.body.message).to.eql('Registro excluído com sucesso')        
      })
    })
  }),

  it('Nenhum registro excluído', () => {
    
    cy.login(user_adm.email, user_adm.password).then((response) => {
      cy.request({
        url: `/produtos/${id_adm}`,
        method: 'DELETE',
        headers: {
          'Authorization': response.body.authorization
        },      
        contentType: 'application/json',
        failOnStatusCode: true
      }).then((res) => {
        expect(res.status).to.eql(200)
        expect(res.body.message).to.eql('Nenhum registro excluído')        
      })
    })
  })  
})