// Utils file for different functions
export function doLogin() {
    cy.visit('/');
    cy.contains('Signin').click();
    cy.origin(Cypress.env('IDP_ORIGIN_URL'), () => { // This is needed to tell cypress that the following commands are runned on another domain
        cy.get('input[placeholder="Email"]')
        .type('s123457@studenti.unige.it')
        .should('have.value', 's123457@studenti.unige.it');

        cy.get('input[placeholder="Password"]')
        .type('password')
        .should('have.value', 'password');

        cy.contains('button', 'Login').click();
      });
}