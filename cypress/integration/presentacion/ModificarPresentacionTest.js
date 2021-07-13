/// <reference types="Cypress" />
import { listadoCols } from '../../support/utilities/PresentacionUtilities';
import { today } from '../../support/utilities/GeneralUtilities';

context('Modificar Presentacion Test', () => {
    /* Setup section */
    const obraSocial = Cypress.env('obraSocial');

    beforeEach(() => {
        cy.login();
        cy.visit('/presentaciones-obras-sociales');
        cy.contains('button', 'Buscar').click();
        cy.firstRowType('Abierto')
            .eq(listadoCols.editar)
            .children()
            .click();
        cy.contains('Estudios cargados correctamente');
    });

    describe('Modificar presentacion Test', () => {
        /* Test section */
        it('Abrir presentacion funciona correctamente', () => {
            /* Date input. Delete when the bug was fixed */
            cy.get('input[name=date]').type('2021-07-10');
            cy.get('input[name=date]').type(today);

            /* Comprobante modal */
            cy.contains('button', 'Comprobante').click();
            cy.get('.modal').find('select').eq(0).select('Liquidacion');
            cy.contains('button', 'Cerrar').click();

            /* Finalizar modal */
            cy.contains('button', 'Finalizar').click();
            cy.get('.modal').find('input[name=periodo]').type('2 MESES');
            cy.get('.modal')
                .contains('button', 'Finalizar')
                .should('not.be.disabled')
                .click();

            /* Ok confirmation */
            cy.contains('Presentación actualizada y cerrada con éxito');

            /* Check status */
            cy.visit('/presentaciones-obras-sociales');
            cy.typeAsyncInput('obraSocial', obraSocial);
            cy.clickFirstOption();
            cy.contains('button', 'Buscar').click();
            cy.get('tbody > tr')
                .contains('td', obraSocial)
                .parent()
                .contains('td', 'Pendiente');
        });
    });
});
