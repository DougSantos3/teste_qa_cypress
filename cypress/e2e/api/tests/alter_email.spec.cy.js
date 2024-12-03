import { createUserSchema } from '../contracts/createUserSchema'
import { createUserRequest } from '../requests/create_user'
import { loginRequest } from '../requests/login'
import { updateUserEmailRequest } from '../requests/alter_user'

describe('Testing user creation flow, login, email change', () => {
  beforeEach(() => {
    cy.generateRandomEmail().as('randomEmail')
  })

  it('Validate contract', function () {
    cy.get('@randomEmail').then((randomEmail) => {
      createUserRequest(randomEmail).then((response) => {
        const { error, value } = createUserSchema.validate(response.body, {
          abortEarly: false,
        })

        if (error) {
          cy.log('Validation Error:', JSON.stringify(error))
        } else {
          cy.log('Validation Passed:', JSON.stringify(value))
        }

        expect(error).to.be.not.null
      })
    })
  })

  it('You must create the user, authenticate, change the email and validate the response', () => {
    cy.get('@randomEmail').then((randomEmail) => {
      createUserRequest(randomEmail).then(() => {
        loginRequest(randomEmail).then(() => {
          cy.get('@authorization').then((authorization) => {
            const emailString = String(randomEmail)
            const newEmail = `new_${emailString}`

            cy.get('@userId').then((userId) => {
              updateUserEmailRequest(authorization, userId, newEmail).then(
                () => {
                  cy.get('@updatedUserId').then((updatedUserId) => {
                    expect(updatedUserId).to.not.be.null
                  })
                }
              )
            })
          })
        })
      })
    })
  })
})
