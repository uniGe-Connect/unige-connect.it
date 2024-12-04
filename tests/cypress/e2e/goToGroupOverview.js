import { doLogin } from "./utils";

function fillFields() {
  cy.get('input[placeholder="Enter group name"]')
    .type('Test Group')
    .should('have.value', 'Test Group');

  cy.get('input[placeholder="Enter group topic"]')
    .type('Test Topic')
    .should('have.value', 'Test Topic');

  cy.get('textarea[placeholder="Enter group description"]')
    .type('This is a description for the test group.')
    .should('have.value', 'This is a description for the test group.');
}

describe('Create group and go to overview', () => {
  it('should create group and navigate to its overview', () => {
    // Visit the page where the modal is present
    doLogin();
    cy.contains('My Groups').click();

    cy.get('button').contains('Create Group').click();

    fillFields();

    cy.contains('Public Open').click();

    cy.get('button[aria-label="create-group-button-modal"]').click();

    cy.contains('Test Group').should('be.visible');

    // Group overview
    cy.contains('Test Group').click();
    cy.contains('Test Group').should('be.visible');
    cy.contains('Message Board').should('be.visible');
    cy.contains('Members').should('be.visible');
    cy.contains('Settings').should('be.visible');
  });

});
