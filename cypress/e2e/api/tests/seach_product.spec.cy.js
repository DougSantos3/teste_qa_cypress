import { createUserRequest } from '../requests/createUserRequest'
import { loginRequest } from '../requests/loginRequest'
import { createProductRequest } from '../requests/createProductRequest'
import { requestProduto } from '../requests/requestProduto'

describe('Check product', () => {
  it('You must create the user, log in, create a product and verify that the product was created successfully.', () => {
    
    createUserRequest().then(() => {
      loginRequest().then(() => {
        cy.get('@authorization').then((authorization) => {
          
          createProductRequest(authorization).then(() => {
            cy.get('@product_id').then((product_id) => {
              
              requestProduto(product_id).then((getProductResponse) => {
                expect(getProductResponse.status).to.eq(200)
                expect(getProductResponse.body._id).to.eq(product_id) 
              })
            })
          })
        })
      })
    })
  })
})
