export const deleteProductRequest = (authorization, productId) => {
  return cy.request({
    method: "DELETE",
    url: `produtos/${productId}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${authorization}`,
    },
    failOnStatusCode: false,
  })
}
