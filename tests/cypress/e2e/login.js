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
    cy.origin('https://auth.unige-connect.it/', () => {
      cy.contains('button', 'Login').click(); // yup all good
    });
    cy.contains(/Search/).should('be.visible');
    cy.contains(/Groups/).should('be.visible');
    cy.contains(/Dashboard/).should('be.visible');
    cy.contains(/Notifications/).should('be.visible');
  })
})