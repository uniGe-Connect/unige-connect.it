import { doLogin } from "./utils";

describe('Go to Dashboard (Dashboard)', () => {
  it('should go to the dashboard and see my groups', () => {
    doLogin();
    cy.contains('Dashboard').click();
    cy.contains(/Dashboard/).should('be.visible');
    cy.contains(/Groups/).should('be.visible');
    cy.contains(/Notifications/).should('be.visible');
  })
})