export const updateUserEmailRequest = (authorization, newEmail) => {
  return cy
    .request({
      method: "PUT",
      url: `usuarios/${Cypress.env("userId")}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authorization,
      },
      body: {
        email: newEmail, 
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200) 
      expect(response.body.message).to.eq("Cadastro realizado com sucesso") 
      expect(response.body).to.have.property("_id") 
      cy.wrap(response.body._id).as("updatedUserId") 
    })
}
