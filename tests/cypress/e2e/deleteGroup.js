import { doLogin, fillGroupModalFields } from "./utils";

function goToOverview() {
  doLogin();
  cy.contains('Dashboard').click();

  cy.get('button').contains('Create Group').click();

  fillGroupModalFields();

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

    cy.get('[aria-label="deleted-group"]').should('exist');
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
