import { createUserRequest } from '../requests/create_user'
import { loginRequest } from '../requests/login'
import { createProductRequest } from '../requests/create_product'
import { deleteProductRequest } from '../requests/delete_product'
import { searchProduct } from '../requests/search_product'

describe('Delete product', () => {
  it('You must create a user, authenticate, create a product and delete it', () => {
    cy.generateRandomEmail().as('randomEmail')

    cy.get('@randomEmail').then((randomEmail) => {
      createUserRequest(randomEmail).then(() => {
        loginRequest(randomEmail).then(() => {
          cy.get('@authorization').then((authorization) => {
            cy.generateRandomProduct().then((product) => {
              createProductRequest(authorization, product).then(() => {
                cy.get('@productId').then((productId) => {
                  searchProduct(productId).then((getProductResponse) => {
                    deleteProductRequest(authorization, getProductResponse.body._id).then((deleteProductResponse) => {
                      expect(deleteProductResponse.status).to.eq(200)
                      expect(deleteProductResponse.body.message).to.eq('Registro excluído com sucesso')
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
})
