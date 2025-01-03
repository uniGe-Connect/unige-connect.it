import { doLogin } from "./utils";

function fillFields(groupName, groupTopic, groupDescription) {
  cy.get('input[placeholder="Enter group name"]')
      .clear()
      .type(groupName)
      .should('have.value', groupName);

  cy.get('input[placeholder="Enter group topic"]')
      .clear()
      .type(groupTopic)
      .should('have.value', groupTopic);

  cy.get('textarea[placeholder="Enter group description"]')
      .clear()
      .type(groupDescription)
      .should('have.value', groupDescription);
}

describe('Group Management Tests', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should create and update a group', () => {
    const groupName = 'Test Group 10';
    const updatedGroupName = `${groupName} Updated`;

    // Login and navigate to the dashboard
    doLogin();
    cy.contains('Dashboard').click();

    // Create a group
    cy.get('button').contains('Create Group').click();
    fillFields(groupName, 'Test Topic', 'This is a description for the test group.');
    cy.contains('Public Open').click();
    cy.get('button[aria-label="create-group-button-modal"]').click();

    // Verify the group is created
    cy.contains(groupName).should('be.visible');
    cy.contains(groupName).click();
    cy.contains('Settings').click();

    // Update the group
    cy.get('button').contains('Update').click();
    fillFields(updatedGroupName, 'Updated Topic', 'Updated description for the test group.');
    cy.contains('Public Open').click();
    cy.get('button[aria-label="update-group-button-modal"]').click();

    // Verify the group is updated
    cy.contains(updatedGroupName).should('be.visible');
  });

  it('should not update the group due to time restriction', () => {
    const groupName = `Test Group ${Date.now()}`;
    const updatedGroupName = `${groupName} Updated`;

    // Login and navigate to the dashboard
    doLogin();
    cy.contains('Dashboard').click();

    // Create a group
    cy.get('button').contains('Create Group').click();
    fillFields(groupName, 'Test Topic', 'This is a description for the test group.');
    cy.contains('Public Open').click();
    cy.get('button[aria-label="create-group-button-modal"]').click();

    // Attempt to update the group
    cy.contains(groupName).should('be.visible');
    cy.contains(groupName).click();

    // Because of the bug that we have when we create a group for the first time and click on it and it goes to groups page we have to do that
    cy.contains('Dashboard').click();
    cy.contains(groupName).should('be.visible');
    cy.contains(groupName).click();

    cy.contains('Settings').click();
    cy.get('button').contains('Update').click();
    fillFields(updatedGroupName, 'Updated Topic', 'Updated description for the test group.');
    cy.contains('Public Open').click();
    cy.get('button[aria-label="update-group-button-modal"]').click();

    //Attempt to update the group again
    cy.contains(updatedGroupName).should('be.visible');
    cy.contains(updatedGroupName).click();
    cy.contains('Settings').click();
    cy.get('button').contains('Update').click();
    fillFields(updatedGroupName, 'Updated Topic Again', 'Updated description for the test group.');
    cy.contains('Public Open').click();
    cy.get('button[aria-label="update-group-button-modal"]').click();

    // Verify that the update is restricted
    cy.get('button[aria-label="update-group-button-modal"]').should('be.visible');

  });

  it('should not update the group because the user is not the owner', () => {
    const groupName = 'Test Group 13';

    // Login and navigate to Groups
    doLogin();
    cy.contains('Groups').click();

    // Join a group as a member
    cy.get('[aria-label="become-a-member-button"]').last().click();
    cy.get('[aria-label="become-a-member-modal-button"]').click();
    cy.get('[aria-label="message"]').should('exist');

    // Attempt to update the group
    cy.contains('Dashboard').click();
    cy.scrollTo('top');
    cy.contains('Joined Groups').click();
    cy.contains('Already a Member').click();
    cy.contains('Settings').click();
    cy.get('button').contains('Update').click();
    fillFields(`${groupName} Updated`, 'Updated Topic', 'Updated description for the test group.');
    cy.contains('Public Open').click();
    cy.get('button[aria-label="update-group-button-modal"]').click();

    // Verify that the update is restricted
    cy.get('button[aria-label="update-group-button-modal"]').should('be.visible');
  });
});
