/// <reference types="Cypress" />
import { listadoCols } from '../support/PresentacionUtilities';

/* General setup */
beforeEach(() => {
    cy.login();
    cy.visit('/presentaciones-obras-sociales');
});

describe('Listado de presentaciones', () => {
    /* Test section */
    it('Listado de presentaciones busca las presentaciones pendientes y abiertas', () => {
        cy.contains('Buscar').click();
        cy.get('tbody > tr').each((tr) => {
            cy.wrap(tr).contains('td', /Abierto|Pendiente/g);
        });
    });

    it('Abrir presentacion funciona correctamente', () => {
        cy.contains('button', 'Buscar').click();
        cy.firstRowType('Pendiente').eq(listadoCols.nroComprobante).invoke('text')
            .then((numero) => {
                cy.contains('td', numero).parent().find('td').eq(listadoCols.abrir)
                    .children()
                    .click();
                cy.get('.modal').contains('button', 'Abrir').click();
                cy.contains('La presentacion fue abierta exitosamente');
                cy.contains(numero).should('not.exist');
                cy.get('tbody > tr').contains('Abierto');
            });
    });
});

describe('Cobrar presentacion', () => {
    /* Setup section */
    beforeEach(() => {
        cy.contains('button', 'Buscar').click();
        cy.firstRowType('Pendiente').eq(listadoCols.cobrar).children().click();
        cy.contains('Estudios cargados correctamente');
    });

    /* Test section */
    it('Cobrar presentacion funciona correctamente', () => {
        cy.get('input[name=recibo]').type('asd123');
        cy.contains('button', 'Cobrar').click();
        cy.get('.modal').contains('button', 'Confirmar').click();
        cy.get('.modal').contains('button', 'Confirmar').should('be.disabled');
        cy.contains('Presentacion cobrada');
        cy.get('.modal').contains('×').click();
        cy.get('.modal').should('not.exist');
        cy.contains('button', 'Cobrar').should('be.disabled');
    });
});
