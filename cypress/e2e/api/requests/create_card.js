export const createCartRequest = (authorization, productId) => {
  return cy.request({
    method: "POST",
    url: "carrinhos",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authorization}`,
    },
    body: {
      produtos: [
        {
          idProduto: productId,
          quantidade: 1,
        },
      ],
    },
  })
}
