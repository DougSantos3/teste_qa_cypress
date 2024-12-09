import { listAllRegisteredUsers } from "../requests/list_all_registered_users"
import { allUserSchema } from "../contracts/allUserSchema"


describe('Contract Test for empty user listing', () => {
  it('List of users', () => {
    listAllRegisteredUsers().should((response) => {
      expect(response.status).to.be.eq(200)
      return allUserSchema.validateAsync(response.body)
    })
  })
})
