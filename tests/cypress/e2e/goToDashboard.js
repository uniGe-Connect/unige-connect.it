import { doLogin } from "./utils";

describe('Go to Dashboard (My groups)', () => {
  it('should go to the dashboard and see my groups', () => {
    doLogin();
    cy.contains('My Groups').click();
    cy.contains(/Dashboard/).should('be.visible');
    cy.contains(/My Groups/).should('be.visible');
    cy.contains(/Notifications/).should('be.visible');
  })
})