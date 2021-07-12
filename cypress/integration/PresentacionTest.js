/// <reference types="Cypress" />
import { listadoCols } from '../support/utilities/PresentacionUtilities';
import { crearEstudio } from '../support/utilities/EstudiosUtilities';
import { today } from '../support/utilities/GeneralUtilities';

/* General setup */
beforeEach(() => {
    cy.login();
    cy.visit('/presentaciones-obras-sociales');
});

describe('Crear Presentacion', () => {
    /* Setup section */
    beforeEach(() => {
        /* Create a study and open presentation for the study */
        cy.visit('/estudios/create');
        crearEstudio();
        cy.visit('/presentaciones-obras-sociales');
        cy.typeAsyncInput('obraSocial', 'OSDE BINARIO');
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
        cy.get('.modal').contains('button', 'Finalizar').should('not.be.disabled').click();

        /* ok confirmation */
        cy.contains('Presentación creada y cerrada con éxito');

        /* Check existence and status */
        cy.visit('/presentaciones-obras-sociales');
        cy.typeAsyncInput('obraSocial', 'OSDE BINARIO');
        cy.clickFirstOption();
        cy.contains('button', 'Buscar').click();
        cy.get('tbody > tr').contains('td', 'OSDE BINARIO').parent().contains('td', 'Pendiente');
    });
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
                /* Open the first presentation with status "Pendiente" */
                cy.contains('td', numero).parent().find('td').eq(listadoCols.abrir)
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

describe('Modificar presentacion', () => {
    /* Test section */
    beforeEach(() => {
        cy.contains('button', 'Buscar').click();
        cy.firstRowType('Abierto').eq(listadoCols.editar).children().click();
        cy.contains('Estudios cargados correctamente');
    });

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
        cy.get('.modal').contains('button', 'Finalizar').should('not.be.disabled').click();

        /* Ok confirmation */
        cy.contains('Presentación actualizada y cerrada con éxito');

        /* Check status */
        cy.visit('/presentaciones-obras-sociales');
        cy.typeAsyncInput('obraSocial', 'OSDE BINARIO');
        cy.clickFirstOption();
        cy.contains('button', 'Buscar').click();
        cy.get('tbody > tr').contains('td', 'OSDE BINARIO').parent().contains('td', 'Pendiente');
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
