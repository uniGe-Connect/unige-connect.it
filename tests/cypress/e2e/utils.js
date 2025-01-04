// Utils file for different functions
export function doLogin() {
    cy.visit('/');
    cy.contains('Signin').click();

    cy.origin(Cypress.env('IDP_ORIGIN_URL'), () => { // This is needed to tell cypress that the following commands are runned on another domain
      cy.get("input[id=username]").type("s123456@studenti.unige.it");
      cy.get("input[id=password]").type("password");
      cy.contains('button', 'Login').click();
      });
}

export function fillGroupModalFields(groupName = 'Test Group') {
  cy.get('input[placeholder="Enter group name"]')
    .type(groupName)
    .should('have.value', groupName);

  cy.get('div[id="course-dropdown"]').click();
  cy.get('div[role="option"]').first().click();

  cy.get('textarea[placeholder="Enter group description"]')
    .type('This is a description for the test group.')
    .should('have.value', 'This is a description for the test group.');
}