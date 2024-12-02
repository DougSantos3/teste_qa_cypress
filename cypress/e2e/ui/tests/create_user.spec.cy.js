describe("Testing user creation", () => {
  it("You must create a user without administrative access", () => {
    cy.createUser("usuario@example.com", "senha123")

    cy.contains("Usuário criado com sucesso").should("be.visible")
    cy.get('[data-testid="checkbox"]').should("not.be.checked")

     cy.xpath('//h1[contains(text(), "Serverest Store")]').should("be.visible")
  })

  it("You must create a user with administrative access", () => {
    cy.createUser("usuario2@example.com", "senha456", true)

    cy.contains("Usuário criado com sucesso").should("be.visible")
    cy.get('[data-testid="checkbox"]').should("be.checked")

     cy.xpath('//h1[contains(text(), "Serverest Store")]').should("be.visible")
  })
})


