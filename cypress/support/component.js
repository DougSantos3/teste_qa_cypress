import './commands/commons'
import './commands/database-commands'
import { mount } from 'cypress/react'

Cypress.Commands.add('mount', mount)
