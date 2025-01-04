import { doLogin, fillGroupModalFields } from "./utils";

describe('show group members list', () => {
    it('should show all group members', () => {
        doLogin();
        cy.contains('Dashboard').click();
        cy.get('button').contains('Create Group').click();
        fillGroupModalFields('Test Member Group');
        cy.contains('Public Open').click();
        cy.get('button[aria-label="create-group-button-modal"]').click();
        cy.contains('Test Member Group').should('be.visible');

        // We mark the test group object to retrieve it later ( So that we can distinguish it from other group cards )
        cy.contains('Test Member Group').click()
        cy.get('[aria-label="members-tab"]').click();
        cy.get('[aria-label="member-card"]').should('exist');
    });
});
