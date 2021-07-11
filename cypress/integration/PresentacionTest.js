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
        cy.firstRowType('Pendiente').find('td').eq(columnas.nroComprobante).invoke('text')
            .then((numero) => {
                cy.contains(numero).parent().find('td').eq(columnas.abrir)
                    .click();
                cy.get('.modal').contains('button', 'Abrir').click();
                cy.contains('La presentacion fue abierta exitosamente');
                cy.contains(numero).should('not.exist');
                cy.get('tbody > tr').contains('Abierto');
            });
    });
});
