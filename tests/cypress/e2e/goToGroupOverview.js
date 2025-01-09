import { doLogin, fillGroupModalFields } from "./utils";

describe('Create group and go to overview', () => {
  it('should create group and navigate to its overview', () => {
    // Visit the page where the modal is present
    doLogin();
    cy.contains('Dashboard').click();

    cy.get('button').contains('Create Group').click();
    const groupName = 'Test Group'+new Date().toLocaleString();
    fillGroupModalFields(groupName);

    cy.contains('Public Open').click();

    cy.get('button[aria-label="create-group-button-modal"]').click();

    cy.contains(groupName).should('be.visible');

    // Group overview
    cy.contains(groupName).click();
    cy.contains(groupName).should('be.visible');
    cy.contains('Message Board').should('be.visible');
    cy.contains('Members').should('be.visible');
    cy.contains('Settings').should('be.visible');
  });

});
