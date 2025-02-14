// Utils file for different functions
export function doLogin() {
    cy.visit('/');
    cy.contains('Signin').click();
    cy.origin(Cypress.env('IDP_ORIGIN_URL'), () => { // This is needed to tell cypress that the following commands are runned on another domain
        cy.get('input[name="username"]').type(Cypress.env('email'));
        cy.get('input[name="password"]').type(Cypress.env('password'));
        cy.contains('button', 'Login').click();
     });
}

export function doProfLogin() {
    cy.visit('/');
    cy.contains('Signin').click();
    cy.origin(Cypress.env('IDP_ORIGIN_URL'), () => { // This is needed to tell cypress that the following commands are runned on another domain
        cy.get('input[name="username"]').type(Cypress.env('profEmail'));
        cy.get('input[name="password"]').type(Cypress.env('password'));
        cy.contains('button', 'Login').click();
     });
}

export function fillGroupModalFields(groupName = 'Test Group') {
  cy.get('input[placeholder="Enter group name"]')
    .clear()
    .type(groupName)
    .should('have.value', groupName);

  cy.get('div[id="course-dropdown"]').click();
  cy.get('div[role="option"]').first().click();

  cy.get('textarea[placeholder="Enter group description"]')
    .clear()
    .type('This is a description for the test group.')
    .should('have.value', 'This is a description for the test group.');
}