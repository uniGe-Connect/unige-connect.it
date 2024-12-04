// Utils file for different functions

export function doLogin() {
    cy.visit('https://alpha.unige-connect.it/');
    cy.contains('Signin').click();
    cy.contains('button', 'Login').click();
}