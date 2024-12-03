describe("Login Page", () => {
  it('should log in successfully and show "Bem Vindo"', () => {
    cy.urlFront('login')
    cy.authentication('teste_qa_7@qa.com', '123')
    cy.xpath('//h1[contains(text(), "Bem Vindo")]').should("be.visible")
  })
})
