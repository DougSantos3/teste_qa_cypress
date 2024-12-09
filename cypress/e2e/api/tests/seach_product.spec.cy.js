import { createUserRequest } from '../requests/create_user'
import { loginRequest } from '../requests/login'
import { createProductRequest } from '../requests/create_product'
import { searchProduct } from '../requests/search_product'


describe('Check product', () => {
  it('You must create the user, log in, create a product and verify that the product was created successfully.', () => {
    cy.generateRandomEmailAndPassword().then((userData) => {
      const email = userData.email
      const password = userData.password

      createUserRequest(email, password).then(() => {
        loginRequest(email, password).then(() => {
          cy.get('@authorization').then((authorization) => {
            cy.generateRandomProduct().then((userData) => {
              createProductRequest(authorization, userData.nome, userData.preco, userData.descricao, userData.quantidade).then(() => {
                cy.get('@productId').then((productId) => {
                  searchProduct(productId).then((getProductResponse) => {
                    expect(getProductResponse.status).to.eq(200)
                    expect(getProductResponse.body._id).to.eq(productId)
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
