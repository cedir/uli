/// <reference types="Cypress" />
import { listadoCols } from '../../support/utilities/PresentacionUtilities';

context('Cobrar Presentacion', () => {
    /* Setup section */
    beforeEach(() => {
        cy.login();
        cy.visit('/presentaciones-obras-sociales');
        cy.contains('button', 'Buscar').click();
        cy.firstRowType('Pendiente')
            .eq(listadoCols.cobrar)
            .children()
            .click();
        cy.contains('Estudios cargados correctamente');
    });

    describe('Cobrar presentacion Test', () => {
        /* Test section */
        it('Cobrar presentacion funciona correctamente', () => {
            cy.get('input[name=recibo]').type('asd123');
            cy.contains('button', 'Cobrar').click();
            cy.get('.modal').contains('button', 'Confirmar').click();
            cy.get('.modal')
                .contains('button', 'Confirmar')
                .should('be.disabled');
            cy.contains('Presentacion cobrada');
            cy.get('.modal').contains('×').click();
            cy.get('.modal').should('not.exist');
            cy.contains('button', 'Cobrar').should('be.disabled');
        });
    });
});
