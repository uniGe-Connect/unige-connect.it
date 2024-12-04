import { doLogin } from "./utils";

function fillFields() {
  cy.get('input[placeholder="Enter group name"]')
    .type('Test Group')
    .should('have.value', 'Test Group');

  cy.get('input[placeholder="Enter group topic"]')
    .type('Test Topic')
    .should('have.value', 'Test Topic');

  cy.get('textarea[placeholder="Enter group description"]')
    .type('This is a description for the test group.')
    .should('have.value', 'This is a description for the test group.');
}

describe('Create new group', () => {
  it('should fill the form and click create public open group', () => {
    // Visit the page where the modal is present
    doLogin();
    cy.contains('Dashbaord').click();

    cy.get('button').contains('Create Group').click();

    fillFields();

    cy.contains('Public Open').click();

    cy.get('button[aria-label="create-group-button-modal"]').click();

    cy.contains('Test Group').should('be.visible');
  });

  it('should fill the form and click create private group', () => {
    // Visit the page where the modal is present
    doLogin();
    cy.contains('Dashbaord').click();

    cy.get('button').contains('Create Group').click();

    fillFields();

    cy.contains('Private').click();

    cy.get('button[aria-label="create-group-button-modal"]').click();

    cy.contains('Test Group').should('be.visible');

    // May not work with multiple "Test Group"
    // cy.contains('Test Group')
    //   .should('exist')
    //   .parent()
    //   .find('i.lock.icon')
    //   .should('exist');

    cy.get('i.lock.icon').should('exist');

  });
});
