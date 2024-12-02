describe("Product's", () => {
  it("You must authenticate and register a product", () => {
    cy.login("usuario@example.com", "senha123")

    cy.createProduct()

    cy.xpath('//h1[contains(text(), "Lista dos Produtos")]').should(
      "be.visible"
    )
  })

  it("Name is required", () => {
    cy.login("usuario@example.com", "senha123")

    cy.createProduct()

    cy.xpath('//span[contains(text(), "Nome é obrigatório")]').should(
      "be.visible"
    )
  })

  it("Description cannot be blank", () => {
    cy.login("usuario@example.com", "senha123")

    cy.createProduct()

    cy.xpath(
      '//span[contains(text(), "Descricao não pode ficar em branco")]'
    ).should("be.visible")
  })
})
