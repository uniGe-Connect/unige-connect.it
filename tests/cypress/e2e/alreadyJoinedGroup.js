import { doLogin } from "./utils";

describe('Already Joined a Group', () => {
    it('should show -Already a Member- in the card if the user already joined it', () => {
        doLogin();
        cy.contains('Groups').click();

        // We mark the test group object to retrieve it later ( So that we can distinguish it from other group cards )
        cy.get('[aria-label="become-a-member-button"]').first().parent().then(($el) => {
            $el[0].setAttribute('name', 'test-group');
          });
        cy.get('[name="test-group"]').within(() => {
            cy.get('[aria-label="become-a-member-button"]').click();
        });
        cy.get('[aria-label="become-a-member-modal-button"]').click();
        cy.get('[aria-label="message"]').should('exist');

        // We retrieve the exact same test group object and we notice that now it contains the already-a-member label
        cy.get('[name="test-group"]')
        .find('[aria-label="already-a-member"]').should('exist');
    });
});
