import productBody from '../../../fixtures/product.json'

export const createProductRequest = (authorization) => {
    return cy.request({
        method: 'POST',
        url: 'produtos',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: authorization  
        },
        body: productBody
    }).then((response) => {
        const product_id = response.body._id  
        cy.wrap(product_id).as('product_id')  
    })
}
  