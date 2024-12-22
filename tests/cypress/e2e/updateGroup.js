import { doLogin } from "./utils";

function fillFields(update = false) {
  cy.get('input[placeholder="Enter group name"]')
    .type(update ? ' Updated' : 'Test Group')
    .should('have.value', update ? 'Test Group Updated' : 'Test Group');

  cy.get('input[placeholder="Enter group topic"]')
      .type(update ? ' Updated' : 'Test Topic')
      .should('have.value', update ? 'Test Topic Updated' : 'Test Topic');


  cy.get('textarea[placeholder="Enter group description"]')
    .type(update ? ' Updated' : 'This is a description for the test group.')
    .should('have.value', update ? 'This is a description for the test group. Updated' : 'This is a description for the test group.');
}

describe('Update group', () => {
  it('Update the group details', () => {
    // Visit the page where the modal is present
    doLogin();
    cy.contains('Dashboard').click();

    cy.get('button').contains('Create Group').click();

    fillFields();

    cy.contains('Public Open').click();

    cy.get('button[aria-label="create-group-button-modal"]').click();

    cy.contains('Test Group').should('be.visible');
    cy.contains('Test Group').click();
    cy.contains('Settings').click();

    cy.get('button').contains('Update').click();

    fillFields(true);

    cy.contains('Public Open').click();

    cy.get('button[aria-label="update-group-button-modal"]').click();

    cy.contains('Test Group Updated').should('be.visible');
  });

  it('can not update the group because of time restriction', () => {
    // Visit the page where the modal is present
    doLogin();
    cy.contains('Dashboard').click();

    cy.get('button').contains('Create Group').click();

    fillFields();

    cy.contains('Public Open').click();

    cy.get('button[aria-label="create-group-button-modal"]').click();

    cy.contains('Test Group').should('be.visible');
    cy.contains('Test Group').click();
    cy.contains('Settings').click();

    cy.get('button').contains('Update').click();
    fillFields(true);
    cy.contains('Public Open').click();
    cy.get('button[aria-label="update-group-button-modal"]').click();
    cy.contains('Test Group Updated').should('be.visible');
    cy.contains('Settings').click();
    cy.get('button').contains('Update').click();
    cy.contains('Public Open').click();
    cy.get('button[aria-label="update-group-button-modal"]').click();

    cy.get('button[aria-label="update-group-button-modal"]').should('be.visible');
  });
});
