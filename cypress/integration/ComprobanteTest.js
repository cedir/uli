/// <reference types="Cypress" />

beforeEach(() => {
    cy.login();
});

describe('Listado de Comprobantes', () => {
    it('Carga listado correctamente', () => {
        cy.contains('Comprobantes').click();
        cy.get('tbody').find('tr');
    });
});
