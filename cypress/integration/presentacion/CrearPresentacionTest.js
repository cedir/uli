/// <reference types="Cypress" />
import { crearEstudio } from '../../support/utilities/EstudiosUtilities';
import { today } from '../../support/utilities/GeneralUtilities';

context('Crear Presentacion', () => {
    const obraSocial = Cypress.env('obraSocial');

    beforeEach(() => {
        cy.login();
        cy.visit('/presentaciones-obras-sociales');
    });

    /* Test */
    describe('Crear Presentacion Test', () => {
        /* Setup section */
        beforeEach(() => {
            /* Create a study and open presentation for the study */
            cy.visit('/estudios/create');
            crearEstudio({ obraSocial });
            cy.visit('/presentaciones-obras-sociales');
            cy.typeAsyncInput('obraSocial', obraSocial);
            cy.clickFirstOption();
            cy.contains('button', 'Nueva').click();
            cy.contains('Estudios cargados correctamente');
        });

        /* Test section */
        it('Crear presentacion con factura funciona', () => {
            /* Date input */
            cy.get('input[name=date]').type(today);

            /* Comprobante modal */
            cy.contains('button', 'Comprobante').click();
            cy.get('.modal').find('select').eq(0).select('Factura');
            cy.get('.modal').find('select').eq(1).select('A');
            cy.get('.modal').find('select').eq(2).select('CeDIR');
            cy.contains('button', 'Cerrar').click();

            /* Finalizar modal */
            cy.contains('button', 'Finalizar').click();
            cy.get('.modal').find('input[name=periodo]').type('1 MES');
            cy.get('.modal')
                .contains('button', 'Finalizar')
                .should('not.be.disabled')
                .click();

            /* ok confirmation */
            cy.contains('Presentación creada y cerrada con éxito');

            /* Check existence and status */
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
