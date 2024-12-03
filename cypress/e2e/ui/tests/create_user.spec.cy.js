describe("Testing user creation", () => {
  beforeEach(() => {
    cy.urlFront("login")
  })
  it('You must create a user without administrative access', () => {
    cy.generateRandomEmail()
      .as('randomEmail')
      .then((randomEmail) => {
        cy.createUser('teste qa', randomEmail, '123')

        cy.xpath('//h1[contains(text(), "Serverest Store")]').should(
          "be.visible"
        )
      })
  })

  it('You must create a user with administrative access', () => {
    cy.generateRandomEmail()
      .as("randomEmail")
      .then((randomEmail) => {
        cy.createUser('teste qa', randomEmail, '123', true)

        cy.xpath('//h1[contains(text(), "Serverest Store")]').should(
          "be.visible"
        )
      })

    cy.xpath('//h1[contains(text(), "Serverest Store")]').should('be.visible')
  })
})
