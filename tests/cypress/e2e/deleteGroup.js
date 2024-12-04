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

function goToOverview() {
  doLogin();
  cy.contains('Dashboard').click();

  cy.get('button').contains('Create Group').click();

  fillFields();

  cy.contains('Public Open').click();

  cy.get('button[aria-label="create-group-button-modal"]').click();

  cy.contains('Test Group').should('be.visible');

  // Group overview
  cy.contains('Test Group').click();
  cy.contains('Test Group').should('be.visible');
  cy.contains('Settings').should('be.visible').click();

}

describe('Create group, go to overview and delete group', () => {
  it('should create group and navigate to its overview', () => {
    // Visit the page where the modal is present
    goToOverview();
    cy.get('button').contains('Delete').click();

    cy.get('input').type('Delete');

    cy.contains('button', 'Delete Group').click();

    cy.url().should('include', '/dashboard');
  });

  it('should show an error if input is not "Delete"', () => {
    goToOverview();
    cy.get('button').contains('Delete').click();
    
    cy.get('.ui.modal').should('be.visible');

    cy.get('input').type('Incorrect Text');

    cy.contains('button', 'Delete Group').click();

    cy.get('input').should('have.css', 'border-color', 'rgb(200, 16, 46)');
  });
});
