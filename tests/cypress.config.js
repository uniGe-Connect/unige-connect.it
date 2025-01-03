const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        specPattern: 'cypress/e2e/**.{js,jsx,ts,tsx}',
        supportFile: false,
        pageLoadTimeout: 5000,
        baseUrl: 'http://localhost:3000/',
        env: {
            IDP_ORIGIN_URL: 'https://auth.unige-connect.it/',
            email: 's123457@studenti.unige.it',
            password: 'password'
        }
    },
})