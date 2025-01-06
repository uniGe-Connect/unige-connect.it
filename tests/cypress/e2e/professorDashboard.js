import { doProfLogin } from "./utils";

describe('show dashboard tab', () => {
    it('should show group associated with professor courses', () => {
        doProfLogin();
        cy.contains('Dashboard').click();

        // Wait and verify the container is present
        cy.get('div[aria-label="group-card"]', { timeout: 10000 }).should('exist');

        cy.wait(1000);
        cy.get('div[aria-label="group-card"]')
            .each((card) => {
                cy.wrap(card).find('div[aria-label="group-top-section"]').should('exist');
                cy.wrap(card).find('div[aria-label="group-description"]').should('exist');
                }
            );
        });
});

describe('show groups tab', () => {
    it('should show group associated with professor courses', () => {
        doProfLogin();
        cy.contains('Groups').click();

        // Wait and verify the container is present
        cy.get('div[aria-label="group-card"]', { timeout: 10000 }).should('exist');

        cy.wait(1000);
        cy.get('div[aria-label="group-card"]')
            .each((card) => {
                cy.wrap(card).find('div[aria-label="group-top-section"]').should('exist');
                cy.wrap(card).find('div[aria-label="group-description"]').should('exist');
                }
            );
        });
});
