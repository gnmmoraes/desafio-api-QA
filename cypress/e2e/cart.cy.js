/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('Validation API Cart', () => {

  before(() => {
    cy.Cadastro_Usuario(user_adm.nome, user_adm.email, user_adm.password, user_adm.administrador)
  })

  var numeroAleatorio = Math.floor(Math.random() * 1000);
  var id_carrinho = ''

  const user_adm = {
    nome: faker.person.fullName(),
    email: faker.internet.email({ firstName: 'fake', lastName: `${numeroAleatorio}`, provider: 'test.com.br' }),
    password: faker.internet.password({ length: 8 }),
    administrador: 'true'
  }
  const produto1 = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 50, max: 500 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 2, max: 5 })
  };

  const produto2 = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 50, max: 500 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 2, max: 5 })
  };

  it('Cadastrar carrinho', () => {

    cy.Cadastro_Produto(produto1).then((res1) => {
      cy.Cadastro_Produto(produto2).then((res2) => {

        const products = {
          produtos: [
            {
              idProduto: res1.body._id,
              quantidade: 2
            },
            {
              idProduto: res2.body._id,
              quantidade: 2
            }
          ]
        }

        cy.login(user_adm.email, user_adm.password).then((response) => {
          cy.request({
            method: 'POST',
            url: '/carrinhos',
            headers: {
              'Authorization': response.body.authorization
            },
            body: products,
            contentType: 'application/json',
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eql('Cadastro realizado com sucesso')
            expect(response.body._id).to.exist
            id_carrinho = response.body._id
          })
        })
      })
    })
  }),


    it('Lista de carrinhos cadastrados', () => {

      cy.request({
        method: 'GET',
        url: '/carrinhos',
        headers: {
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.be.greaterThan(0)
      })
    }),

    it('Busca carrinho por id', () => {
      cy.request({
        method: 'GET',
        url: `/carrinhos/${id_carrinho}`,
        headers: {
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eql(200)
        expect(response.body.quantidadeTotal).to.eq(4)
        expect(response.body._id).to.exist
      })
    }),

    it('Excluir carrinho', () => {
      cy.login(user_adm.email, user_adm.password).then((response) => {
        cy.request({
          method: 'DELETE',
          url: '/carrinhos/concluir-compra',
          headers: {
            'Authorization': response.body.authorization,
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
      })
    })
    












})  