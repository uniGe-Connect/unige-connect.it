// Utils file for different functions
export function doLogin() {
    cy.visit('/');
    cy.contains('Signin').click();
    cy.origin(Cypress.env('IDP_ORIGIN_URL'), () => { // This is needed to tell cypress that the following commands are runned on another domain
        cy.contains('button', 'Login').click();
      });
}