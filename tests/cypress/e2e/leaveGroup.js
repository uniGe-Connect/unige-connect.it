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

describe('Existence of leave button', () => {

    it('create a group, go to its settings and click leave. You cannot leave (you are the owner), so you are no redirect in another page', () => {
        goToOverview();
        cy.get('button').contains('Leave').click();
        cy.wait(3000);
        cy.url().should('include', '/group-overview');
    });
});
