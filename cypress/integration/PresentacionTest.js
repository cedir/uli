/// <reference types="Cypress" />

const columnas = {
    fecha: 0,
    estado: 1,
    obraSocial: 2,
    nroComprobante: 3,
    totalFacturado: 4,
    totalCobrado: 5,
    descargar: 6,
    abrir: 7,
    editar: 8,
    cobrar: 8,
    imprimir: 9,
};

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

    it('Abrir presentacion funciona correctamente', () => {
        cy.contains('button', 'Buscar').click();
        cy.firstRowType('Pendiente').eq(columnas.nroComprobante).invoke('text')
            .then((numero) => {
                cy.contains('td', numero).parent().find('td').eq(columnas.abrir)
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
        cy.login();
        cy.visit('/presentaciones-obras-sociales');
        cy.contains('button', 'Buscar').click();
        cy.firstRowType('Pendiente').eq(columnas.cobrar).children().click();
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
