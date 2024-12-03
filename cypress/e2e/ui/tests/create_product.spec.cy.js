describe("Product's", () => {
  beforeEach(() => {
    cy.urlFront("login")
  })
  it('You must authenticate and register a product', () => {
    cy.urlFront('login')
    cy.authentication("teste_qa_7@qa.com", "123")
    cy.createProductUI()

    cy.xpath('//h1[contains(text(), "Lista dos Produtos")]').should(
      "be.visible"
    )
  })

  it('Name is required', () => {
    cy.urlFront('login')
    cy.authentication("teste_qa_7@qa.com", "123")
    
    cy.createProductUI({ nome: '' })
  
    cy.xpath('//span[contains(text(), "Nome é obrigatório")]').should("be.visible")
  })
  

  it('Description cannot be blank', () => {

    cy.urlFront('login')
    cy.authentication('teste_qa_7@qa.com', '123')
    
    cy.createProductUI({ descricao: '' })
  
    cy.xpath(
      '//span[contains(text(), "Descricao é obrigatório")]'
    ).should('be.visible')
  })
})
