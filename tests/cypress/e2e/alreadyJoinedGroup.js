import { doLogin } from "./utils";

describe('Already Joined a Group', () => {
    it('should show -Already a Member- in the card if the user already joined it', () => {
        doLogin();
        cy.contains('Groups').click();
        cy.get('[aria-label="become-a-member-button"]').last().click();
        cy.get('[aria-label="become-a-member-modal-button"]').click();
        cy.get('[aria-label="message"]').should('exist');

        cy.get('[aria-label="already-a-member"]').should('exist');


    });
});
