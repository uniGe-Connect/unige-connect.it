import { doLogin } from "./utils";

describe('Logout', () => {
  it('should logout', () => {
    doLogin();
    cy.get('img[src="/static/media/arrow.42e04fbf88b372fa7cb3b5f93a2cf356.svg"]').click();

    cy.contains("Logout").click();

    cy.wait(2000);

    cy.contains('Signin').should('be.visible'); // Checked for navbar
    cy.contains('Connect, Collaborate, and grow.').should('be.visible'); // Check for being on Home
  })
})