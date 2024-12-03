import { createUserRequest } from '../requests/create_user'
import { loginRequest } from '../requests/login'
import { createProductRequest } from '../requests/create_product'
import { createCardRequest } from '../requests/create_card'
import { getCartRequest } from '../requests/seach_card'

describe('Create cart', () => {
  it('You must create a user, log in, create a product, create a cart and validate the cart.', () => {
    cy.generateRandomEmail().as('randomEmail')

    cy.get('@randomEmail').then((randomEmail) => {
      createUserRequest(randomEmail).then(() => {
        loginRequest(randomEmail).then(() => {
          cy.get('@authorization').then((authorization) => {
            cy.generateRandomProduct().then((product) => {
              createProductRequest(authorization, product).then(() => {
                cy.get('@productId').then((productId) => {
                  createCardRequest(authorization, productId).then(() => {
                    cy.get('@cardId').then((cardId) => {
                      getCartRequest(cardId).then((response) => {
                        expect(response.status).to.eq(200)
                        expect(response.body).to.have.property('_id', cardId)
                        expect(response.body.produtos[0].idProduto).to.eq(
                          productId
                        )
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
})
