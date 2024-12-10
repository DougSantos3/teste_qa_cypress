const { defineConfig } = require('cypress')

const cyPostgres = require('cypress-postgres-10v-compatibility')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        dbQuery: (query) => cyPostgres(query.query, query.connection),
      })

      return config
    },
    baseUrl: 'https://serverest.dev/',
    env: {
      baseUrlFront: 'https://front.serverest.dev',
    },
    retries: {
      runMode: 0,
      openMode: 0,
    },
    specPattern: 'cypress/e2e/**/tests/*.cy.{js,ts,jsx,tsx}',
  },

  fixturesFolder: false,

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
