/// <reference types="Cypress" />

describe('Listado de presentaciones', () => {
    /* Setup section */

    beforeEach(() => {
        cy.login();
        cy.visit('/presentaciones-obras-sociales');
    });

    /* Test section */
    it('Listado de presentaciones busca las presentaciones pendientes y abiertas', () => {
        cy.contains('Buscar').click();
        cy.get('tbody > tr').each((tr) => {
            cy.wrap(tr).contains('td', /Abierto|Pendiente/g);
        });
    });
});
