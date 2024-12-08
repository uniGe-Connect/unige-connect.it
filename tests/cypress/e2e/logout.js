import { doLogin } from "./utils";

describe('Logout', () => {
  it('should logout', () => {
    doLogin();
    cy.get('div[aria-label="nav-dropdown-menu"]').click();

    cy.contains("Logout").click();

    cy.wait(2000);

    cy.contains('Signin').should('be.visible'); // Checked for navbar
    cy.contains('Connect, Collaborate, and grow.').should('be.visible'); // Check for being on Home
  })
})