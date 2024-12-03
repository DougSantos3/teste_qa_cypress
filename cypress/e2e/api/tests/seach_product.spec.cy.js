import { createUserRequest } from '../requests/create_user'
import { loginRequest } from '../requests/login'
import { createProductRequest } from '../requests/create_product'
import { searchProduct } from '../requests/search_product'

describe('Check product', () => {
  it('You must create the user, log in, create a product and verify that the product was created successfully.', () => {
    cy.generateRandomEmail().as('randomEmail')

    cy.get('@randomEmail').then((randomEmail) => {
      createUserRequest(randomEmail).then(() => {
        loginRequest(randomEmail).then(() => {
          cy.get('@authorization').then((authorization) => {
            cy.generateRandomProduct().then((product) => {
              createProductRequest(authorization, product).then(() => {
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
