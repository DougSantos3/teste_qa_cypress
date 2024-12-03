import 'cypress-xpath'

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-testid="email"]').type(email)
  cy.get('senha').type(password)
  cy.get('[data-testid="entrar"]').click()
})

Cypress.Commands.add('createUser', (email, password, clickCheckbox = false) => {
  cy.get('[data-testid="cadastrar"]').click()
  cy.get('[data-testid="nome"]').type(email)
  cy.get('[data-testid="email"]').type(password)
  cy.get('[data-testid="password"]').click()

  if (clickCheckbox) {
    cy.get('[data-testid="checkbox"]').click()
  }

  cy.get('[data-testid="cadastrarUsuario"]').click()
})

Cypress.Commands.add('createProductUI', () => {
  const randomNum = Math.floor(Math.random() * 50000000) + 1

  const product = {
    nome: `Produto ${randomNum}`, // Nome com número aleatório
    preco: (Math.random() * 100).toFixed(2), // Preço aleatório entre 0 e 100
    descricao: `Descrição do Produto ${randomNum}`, // Descrição com número aleatório
    quantidade: Math.floor(Math.random() * 10) + 1, // Quantidade aleatória entre 1 e 10
  }

  // Criação do produto
  cy.get('[data-testid="cadastrarProdutos"]').click()
  cy.get('[data-testid="nome"]').type(product.nome)
  cy.get('[data-testid="preco"]').type(product.preco)
  cy.get('[data-testid="descricao"]').type(product.descricao)
  cy.get('[data-testid="quantity"]').type(product.quantidade)
  cy.get('[data-testid="cadastrarProdutos"]').click()
})


Cypress.Commands.add('generateRandomEmail', () => {
  const randomNumber = Math.floor(Math.random() * 50000000) + 1
  return `novo${randomNumber}email${randomNumber}@dominio.com`
})

Cypress.Commands.add('generateRandomProduct', () => {
  const randomNumber = Math.floor(Math.random() * 50000000) + 1
  return `Playstation 5 modelo-${randomNumber}`
})

//Not in use
Cypress.Commands.add('mockRegisterProduct', () => {
  cy.intercept('POST', 'produtos', {
    statusCode: 201,
    body: {
      message: 'Cadastro realizado com sucesso',
      id: '12345'
    }
  }).as('postCadastroProduto')

  cy.visit('')
  cy.get('[data-testid="nome"]').type('Nintendo Switch')
  cy.get('[data-testid="preco"]').type('50')
  cy.get('[data-testid="descricao"]').type('Video game com jogos para do Mario')
  cy.get('[data-testid="submit"]').click()
})
