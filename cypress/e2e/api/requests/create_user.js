import productUser from "../../../fixtures/user.json"

export const createUserRequest = () => {
  return cy.request({
    method: "POST",
    url: "usuarios",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: productUser,
  }).then((response) => {
    const userId = response.body._id
    cy.wrap(userId).as("userId") 
  })
}
