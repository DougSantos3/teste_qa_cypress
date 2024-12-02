import { createUserRequest } from '../../request/createUserRequest'
import { loginRequest } from '../../request/loginRequest'
import { createProductRequest } from '../../request/createProductRequest'
import { deleteProductRequest } from '../../request/deleteProductRequest'

describe('Delete product', () => {
  let authorizationToken
  let productId

  it('You must create a user, authenticate, create a product and delete it', () => {
    createUserRequest().then((createUserResponse) => {
      expect(createUserResponse.status).to.eq(201)
      expect(createUserResponse.body.message).to.eq('Cadastro realizado com sucesso')

      loginRequest().then((loginResponse) => {
        expect(loginResponse.status).to.eq(200)
        expect(loginResponse.body.authorization).to.exist

        authorizationToken = loginResponse.body.authorization.split(' ')[1] // Extrai o token sem o 'Bearer'

        createProductRequest(`Bearer ${authorizationToken}`).then((createProductResponse) => {
          expect(createProductResponse.status).to.eq(201)
          expect(createProductResponse.body.message).to.eq('Cadastro realizado com sucesso')

          productId = createProductResponse.body._id

          deleteProductRequest(authorizationToken, productId).then((deleteProductResponse) => {
            expect(deleteProductResponse.status).to.eq(200)
            expect(deleteProductResponse.body.message).to.eq('Registro excluído com sucesso')
          })
        })
      })
    })
  })
})
