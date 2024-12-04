const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        specPattern: 'tests/cypress/e2e/**/*.{js,jsx,ts,tsx}',
        supportFile: false
    },
})