import { doLogin } from "./utils";

describe('Become a memeber', () => {
  it('should show a message when the user clicks on become a memeber', () => {
    doLogin();
    cy.contains('Groups').click();
    cy.get('[aria-label="become-a-member-button"]').last().click();
    cy.get('[aria-label="become-a-member-modal-button"]').click();
    cy.get('[aria-label="message"]').should('exist');
    });
});
