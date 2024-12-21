import { doLogin } from "./utils";

function fillFields() {
    cy.get('input[placeholder="Enter group name"]')
      .type('Test Member Group')
      .should('have.value', 'Test Member Group');
  
    cy.get('input[placeholder="Enter group topic"]')
      .type('Test Topic')
      .should('have.value', 'Test Topic');
  
    cy.get('textarea[placeholder="Enter group description"]')
      .type('This is a description for the test group.')
      .should('have.value', 'This is a description for the test group.');
  }

describe('show group members list', () => {
    it('should show all group members', () => {
        doLogin();
        cy.contains('Dashboard').click();
        cy.get('button').contains('Create Group').click();
        fillFields();
        cy.contains('Public Open').click();
        cy.get('button[aria-label="create-group-button-modal"]').click();
        cy.contains('Test Member Group').should('be.visible');

        // We mark the test group object to retrieve it later ( So that we can distinguish it from other group cards )
        cy.contains('Test Member Group').click()
        cy.get('[aria-label="members-tab"]').click();
        cy.get('[aria-label="member-card"]').should('exist');
    });
});
