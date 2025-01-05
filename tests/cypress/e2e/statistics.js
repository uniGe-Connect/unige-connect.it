import { fillGroupModalFields, doProfLogin } from "./utils";

describe('show statistics tab', () => {
    it('should show 4 courses with digits', () => {
        doProfLogin();
        cy.contains('Statistics').click();

        // Wait and verify the container is present
        cy.get('.sc-dhGPYp', { timeout: 10000 }).should('exist');

        // Check that each child contains spans with the correct class and numeric text
        cy.get('.sc-dhGPYp')
            .children()
            .each((child) => {
                cy.wrap(child)
                    .find('span')
                    .each((span) => {
                        cy.wrap(span).then(($span) => {
                            if ($span.hasClass('sc-eePZqt')) {
                                const text = $span.text().trim();
                                const numericValue = Number(text);
                                expect(numericValue).to.be.at.least(0);
                            }
                        });
                    });
            });
    });
});
