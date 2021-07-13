/// <reference types="Cypress" />
import { listadoCols } from '../../support/utilities/PresentacionUtilities';

context('Listado de presentaciones', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/presentaciones-obras-sociales');
    });

    describe('Listado de Presentaciones Test', () => {
        /* Test section */
        it('Listado de presentaciones busca las presentaciones pendientes y abiertas', () => {
            cy.contains('Buscar').click();
            cy.get('tbody > tr').each((tr) => {
                cy.wrap(tr).contains('td', /Abierto|Pendiente/g);
            });
        });

        it('Abrir presentacion funciona correctamente', () => {
            cy.contains('button', 'Buscar').click();
            cy.firstRowType('Pendiente')
                .eq(listadoCols.nroComprobante)
                .invoke('text')
                .then((numero) => {
                    /* Open the first presentation with status "Pendiente" */
                    cy.contains('td', numero)
                        .parent()
                        .find('td')
                        .eq(listadoCols.abrir)
                        .children()
                        .click();
                    cy.get('.modal').contains('button', 'Abrir').click();

                    /* Ok confirmation */
                    cy.contains('La presentacion fue abierta exitosamente');

                    /* Check if number of invoice is deleted */
                    cy.contains(new RegExp(`^${numero}$`)).should('not.exist');
                    cy.get('tbody > tr').contains('Abierto');
                });
        });
    });
});
