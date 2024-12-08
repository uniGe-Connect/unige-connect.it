import { doLogin } from "./utils";

describe('Login', () => {
  it('should click the SignIn button', () => {
    doLogin();
    cy.contains(/Search/).should('be.visible');
    cy.contains(/Groups/).should('be.visible');
    cy.contains(/Dashboard/).should('be.visible');
    cy.contains(/Notifications/).should('be.visible');
  })

  it('should click the Connect Now button', () => {
    cy.visit('/');
    cy.contains('button', 'CONNECT NOW').click();
    cy.origin(Cypress.env('IDP_ORIGIN_URL'), () => { // This is needed to tell cypress that the following commands are runned on another domain
      cy.contains('button', 'Login').click();
    });
    cy.contains(/Search/).should('be.visible');
    cy.contains(/Groups/).should('be.visible');
    cy.contains(/Dashboard/).should('be.visible');
    cy.contains(/Notifications/).should('be.visible');
  })
})