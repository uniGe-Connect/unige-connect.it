import { doLogin } from "./utils";

describe('Already Joined a Group', () => {
    it('should show -Already a Member- in the card if the user already joined it', () => {
        doLogin();
        cy.contains('Groups').click();
        cy.get('[aria-label="become-a-member-button"]').first().parent().as('group-card');
        cy.get('@group-card').then(($el) => {
            $el[0].style.border = '3px solid black'
          });
        cy.get('@group-card').within(() => {
            cy.get('[aria-label="become-a-member-button"]').click();
        });
        cy.get('[aria-label="become-a-member-modal-button"]').click();
        cy.get('[aria-label="message"]').should('exist');
        cy.get('@group-card').then(($el) => {
            $el[0].style.border = '3px solid red'
          });
        cy.get('@group-card')
        .find('[aria-label="already-a-member"]').should('exist');
    });
});
