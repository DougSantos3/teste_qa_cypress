import { createUserSchema } from "../contracts/createUserSchema"
import { createUserRequest } from "../requests/create_user"
import { loginRequest } from "../requests/login"
import { updateUserEmailRequest } from "../requests/alter_user"


describe("Testing user creation flow, login, email change", () => {
  it("Validate contract", function () {
    cy.generateRandomEmailAndPassword().then((userData) => {
      const email = userData.email
      const password = userData.password

      createUserRequest(email, password).then((response) => {
        loginRequest(email, password).then(() => {
          const { error, value } = createUserSchema.validate(response.body, {
            abortEarly: false,
          })

          if (error) {
            cy.log("Validation Error:", JSON.stringify(error))
          } else {
            cy.log("Validation Passed:", JSON.stringify(value))
          }

          expect(error).to.be.not.null
        })
      })
    })
  })

  it("You must create the user, authenticate, change the email and validate the response", () => {
    cy.generateRandomEmailAndPassword().then((userData) => {
      const actualEmail = userData.email
      const password = userData.password

      createUserRequest(actualEmail, password).then(() => {
        loginRequest(actualEmail, password).then(() => {
          cy.get("@authorization").then((authorization) => {
            const emailString = String(actualEmail)
            const newEmail = `new_${emailString}`

            cy.get("@userId").then((userId) => {
              updateUserEmailRequest(
                authorization,
                userId,
                newEmail,
                password
              ).then(() => {
                cy.get("@updatedUserId").then((updatedUserId) => {
                  expect(updatedUserId).to.not.be.null
                })
              })
            })
          })
        })
      })
    })
  })
})
