import productBody from '../../../fixtures/product.json'

export const createProductRequest = (authorization, name) => {

    const userWithDynamicProduct = {
        ...productBody,
        nome: name
    }

    return cy.request({
        method: 'POST',
        url: 'produtos',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: authorization  
        },
        body: userWithDynamicProduct
    }).then((response) => {
        const productId = response.body._id  
        cy.wrap(productId).as('productId')  
    })
}
  