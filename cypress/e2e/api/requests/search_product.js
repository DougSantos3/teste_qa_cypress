export const requestProduto = (product_id) => {
  return cy.request({
    method: "GET",
    url: `produtos/${product_id}`,
    headers: {
      Accept: "application/json",
    },
  })
}
