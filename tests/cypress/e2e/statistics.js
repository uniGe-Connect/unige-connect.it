import { doProfLogin } from "./utils";

describe('show statistics tab', () => {
    it('should show courses statistics with values', () => {
        doProfLogin();
        cy.contains('Statistics').click();

        // Wait and verify the container is present
        cy.get('div[aria-label="professor-statistics"]', { timeout: 10000 }).should('exist');

        cy.wait(1000);
        cy.get('div[aria-label="professor-statistics"]')
            .children()
            .each((child) => {
                cy.wrap(child)
                    .find('span')
                    .each((span) => {
                        cy.wrap(span).then(($span) => {
                            if ($span.hasClass('statCard')) {
                                const text = $span.text().trim();
                                const numericValue = Number(text);
                                expect(numericValue).to.be.at.least(0); // Ensure it's a number >= 0
                            }
                        });
                    });
            });
    });
});
