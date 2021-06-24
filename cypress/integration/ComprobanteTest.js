/// <reference types="Cypress" />

beforeEach(() => {
    cy.login();
    cy.contains('Comprobantes').click();
});

describe('Listado de Comprobantes', () => {
    it('Carga listado correctamente', () => {
        cy.get('tbody').find('tr');
    });
});

describe('Crear comprobantes', () => {
    it('Crear comprobante simple', () => {
        cy.contains('Agregar').click();
        cy.url().should('include', 'comprobantes/create');
        cy.get('button').contains('Crear comprobante').should('be.disabled');

        cy.get('input[name=nombreCliente]').type('Daniel');
        cy.get('input[name=dni]').type('123456789');
        cy.get('input[name=domicilioCliente]').type('Casa 1526');
        cy.get('select[name=condicionFiscal]').select('CONSUMIDOR FINAL');

        cy.get('select[name=responsable]').select('Cedir');
        cy.get('select[name=iva]').select('Iva inscripto 10.5');
        cy.get('select[name=tipoComprobante]').select('Factura');
        cy.get('select[name=subTipo]').select('B');

        cy.get('input[name$=concepto]').type('Este es un concepto de prueba');
        cy.get('input[name$=importeNeto]').type('10');

        cy.contains('1.05').prev().contains('Iva');
        cy.contains('Sub-total').next().contains('11.05');
        cy.contains('Total: $11.05');

        cy.get('button').contains('Crear comprobante').should('not.be.disabled').click();
        cy.get('.modal').contains('Crear comprobante').click();
        cy.get('.modal').should('not.exist');
        cy.contains('Comprobante creado correctamente');
    });
});
