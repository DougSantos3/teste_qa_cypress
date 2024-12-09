export const listAllRegisteredUsers = () => {
  
  const queryParams = {
    _id: "<string>",
    nome: "<string>",
    email: "teste3@qa.com",
    password: "<string>",
    administrador: "true",
  }

  return cy.request({
    method: "GET",
    url: "usuarios",
    qs: queryParams,
    headers: {
      Accept: "application/json",
    },
  })
}
