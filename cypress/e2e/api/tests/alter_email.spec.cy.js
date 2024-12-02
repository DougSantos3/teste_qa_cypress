import { createUserSchema } from "../contracts/createUserSchema"
import { createUserRequest } from "../requests/create_user"
import { loginRequest } from "../requests/login"
import { updateUserEmailRequest } from "../requests/alter_user"

const generateRandomEmail = () => {
  const randomNumber = Math.floor(Math.random() * 50000000) + 1
  return `novoemail${randomNumber}@dominio.com`
}

describe("Testing user creation flow, login, email change", () => {
  it.only("Validate contract", () => {
    cy.generateRandomEmail().then((randomEmail) => {
      createUserRequest().then((response) => {
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

  it("You must create the user, authenticate, change the email and validate the response", () => {
    createUserRequest().then(() => {
      loginRequest().then(() => {
        cy.get("@authorization").then((authorization) => {
          const newEmail = generateRandomEmail()
          updateUserEmailRequest(authorization, newEmail).then(() => {
            cy.get("@updatedUserId").then((updatedUserId) => {
              expect(updatedUserId).to.not.be.null
            })
          })
        })
      })
    })
  })
})
