import { doLogin, fillGroupModalFields } from "./utils";
const groupName = 'Test Group'+new Date().toLocaleString();
const updatedGroupName = `${groupName} Updated`;

function createGoToOverview() {
  doLogin();
  cy.contains('Dashboard').click();
  cy.get('button').contains('Create Group').click();
  fillGroupModalFields(groupName);
  cy.contains('Public Open').click();
  cy.get('button[aria-label="create-group-button-modal"]').click();
  cy.contains(groupName).should('be.visible');
  // Group overview
  cy.contains(groupName).click();
  cy.contains('Settings').should('be.visible').click();
}

describe('Group Management Tests', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should create and update a group', () => {
   
    createGoToOverview();

    // Update the group
    cy.get('button').contains('Update').click();
    fillGroupModalFields(updatedGroupName);
    cy.get('button[aria-label="update-group-button-modal"]').click();

    // Verify the group is updated
    cy.contains(updatedGroupName).should('be.visible');
  });

  it('should not update the group due to time restriction', () => {
    // Login and navigate to the dashboard
    doLogin();
    cy.contains('Dashboard').click();
    cy.contains(updatedGroupName).should('be.visible').click();
  
    // Attempt to update the group
    cy.contains('Settings').should('be.visible').click();
    cy.get('button').contains('Update').click();
    fillGroupModalFields(updatedGroupName);
    cy.get('button[aria-label="update-group-button-modal"]').click();

    // Verify that the update is restricted
    cy.contains('You can only update the group every 10 minutes').should('be.visible');

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
    cy.contains('div', 'Joined Groups').children().eq(0).click();
    cy.contains('Already a Member').click();
    cy.contains('Settings').click();
    cy.get('button').contains('Update').click();
    fillGroupModalFields(groupName);
    cy.get('button[aria-label="update-group-button-modal"]').click();

    // Verify that the update is restricted
    cy.get('button[aria-label="update-group-button-modal"]').should('be.visible');
    cy.contains('You are not authorized to update this group').should('be.visible');
  });
});
