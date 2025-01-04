import { doLogin, fillGroupModalFields } from "./utils";

describe('FilterOwnedAndJoined', () => {
    it('should click the checkbox and visualize only the owned groups', () => {
        doLogin();
        cy.contains('Dashboard').click();

        cy.get('button').contains('Create Group').click();

        fillGroupModalFields('Test Group Owned2');

        cy.contains('Public Open').click();

        cy.get('button[aria-label="create-group-button-modal"]').click();

        cy.scrollTo('top');

        cy.contains('Owned Groups').click();

        cy.contains('Test Group Owned2').should('be.visible');

    });

    it('joined a group and visualize only the joined groups', () => {
        doLogin();
        cy.contains('Groups').click();
        cy.get('[aria-label="become-a-member-button"]').last().click();
        cy.get('[aria-label="become-a-member-modal-button"]').click();
        cy.get('[aria-label="message"]').should('exist');
        cy.contains('Dashboard').click();
        cy.scrollTo('top');
        cy.contains('Joined Groups').click();
        cy.contains('Test Group').should('be.visible');
    });


});
