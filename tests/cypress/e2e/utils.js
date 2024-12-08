// Utils file for different functions
export function doLogin() {
    cy.visit('/');
    cy.contains('Signin').click();
    cy.origin('https://auth.unige-connect.it/', () => {
        cy.contains('button', 'Login').click(); // yup all good
      });
}