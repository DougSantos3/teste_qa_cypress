import { createUserRequest } from "../../request/createUserRequest"
import { loginRequest } from "../../request/loginRequest"
import { createProductRequest } from "../../request/createProductRequest"
import { createCartRequest } from "../../request/createCartRequest"
import { getCartRequest } from "../../request/getCartRequest"


describe("reate cart", () => {
  it("You must create a user, log in, create a product, create a cart and validate the cart.", () => {
    let authorization
    let productId
    let cartId

    createUserRequest()
      .then((response) => {
        expect(response.status).to.eq(201)

        const { email, password } = response.body
        return loginRequest(email, password)
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        authorization = response.body.authorization

        return createProductRequest(authorization)
      })
      .then((response) => {
        expect(response.status).to.eq(201)
        productId = response.body._id

        return createCartRequest(authorization, productId)
      })
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq("Cadastro realizado com sucesso")
        cartId = response.body._id

        return getCartRequest(cartId)
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property("_id", cartId)
        expect(response.body.produtos[0].idProduto).to.eq(productId)
      })
  })
})
