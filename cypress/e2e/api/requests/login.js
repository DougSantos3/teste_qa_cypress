import productUser from "../../../fixtures/user.json"

export const loginRequest = () => {
    return cy.request({
        method: 'POST',
        url: 'login',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: productUser
    }).then((response) => {
        const authorization = response.body.authorization
        cy.wrap(authorization).as('authorization')
    })
}