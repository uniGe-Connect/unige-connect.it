import { doLogin, fillGroupModalFields } from "./utils";


function joinGoToOverview() {
    doLogin();
    cy.contains('Groups').click();
    cy.get('button').contains('Become A Member').click();
    cy.get('[aria-label="become-a-member-modal-button"]').click();
    cy.contains('Dashboard').click();
    cy.contains('div', 'Joined Groups').children().eq(0).click();
    cy.wait(3000)
    cy.get('[aria-label="already-a-member"]').eq(0).click();
    cy.contains('Settings').should('be.visible').click();
}

function createGoToOverview() {
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
    cy.contains('Settings').should('be.visible').click();
}

describe('Join group, go to overview and leave group', () => {
    it('should display a success toast when leaving the group succeeds', () => {
        joinGoToOverview();
        cy.get('button').contains('Leave').click();
        cy.contains('Successfully left the group!');
        cy.url().should('include', '/dashboard/Dashboard');
    });
});

describe('Create group, go to overview and leave group', () => {

    it('should display an error toast when leaving the group fails', () => {
        createGoToOverview();
        cy.get('button').contains('Leave').click();
        cy.contains('The owner cannot leave the group.');
    });
});
