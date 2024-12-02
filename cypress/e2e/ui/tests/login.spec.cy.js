describe("Login Page", () => {
  it('should log in successfully and show "Bem Vindo"', () => {
    cy.login("usuario@example.com", "senha123")

    cy.xpath('//h1[contains(text(), "Bem Vindo")]').should("be.visible")
  })
})
