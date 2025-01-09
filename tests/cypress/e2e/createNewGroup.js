import { doLogin, fillGroupModalFields } from "./utils";

describe('Create new group', () => {
  it('should fill the form and click create public open group', () => {
    // Visit the page where the modal is present
    doLogin();
    cy.contains('Dashboard').click();

    cy.get('button').contains('Create Group').click();

    fillGroupModalFields();

    cy.contains('Public Open').click();

    cy.get('button[aria-label="create-group-button-modal"]').click();

    cy.contains('Test Group').should('be.visible');
  });

  it('should fill the form and click create private group', () => {
    // Visit the page where the modal is present
    doLogin();
    cy.contains('Dashboard').click();

    cy.get('button').contains('Create Group').click();
    const rand = Math.random();
    const groupName = `TestGroup${rand}`;
    fillGroupModalFields(groupName);
    cy.get('div[id="private"]').click();

    cy.get('button[aria-label="create-group-button-modal"]').click();
    cy.contains(groupName).should('be.visible');

    // May not work with multiple "Test Group"
    // cy.contains('Test Group')
    //   .should('exist')
    //   .parent()
    //   .find('i.lock.icon')
    //   .should('exist');

    cy.contains(groupName).parent().find('[aria-label="already-a-member"]').should('exist');
  });
});
