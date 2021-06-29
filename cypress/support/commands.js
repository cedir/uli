/// <reference types="Cypress" />
/* eslint-disable no-unused-expressions */

Cypress.Commands.add('login', () => {
    cy.visit('/login');
    cy.get('#username').type(Cypress.env('loginUser'));
    cy.get('#password').type(Cypress.env('loginPassword'));
    cy.get('select').select('Cedir');
    cy.contains('Login').click();
});

Cypress.Commands.add('createComprobante', (iva, tipo, importe, subTipo = 'B') => {
    cy.get('input[name=nombreCliente]').type('Daniel');
    cy.get('input[name=dni]').type('20420874120');
    cy.get('input[name=domicilioCliente]').type('Casa 1526');
    cy.get('select[name=condicionFiscal]').select('CONSUMIDOR FINAL');

    cy.get('select[name=responsable]').select('Cedir');
    cy.get('select[name=iva]').select(iva);
    cy.get('select[name=tipoComprobante]').select(tipo);
    cy.get('select[name=subTipo]').select(subTipo);

    cy.get('input[name$=concepto]').type('Pruebas');
    cy.get('input[name$=importeNeto]').type(importe);

    cy.get('button').contains('Crear comprobante').should('not.be.disabled').click();
    cy.get('.modal').contains('Crear comprobante').click();
    cy.contains('Comprobante creado correctamente');
});

Cypress.Commands.add('createComprobanteAsociado', (tipoAsociado, importe, concepto, iva, tipoComprobante) => {
    cy.get('tbody').find('tr').contains(tipoAsociado).next()
        .find('.mdi-icon')
        .click();

    cy.get('.modal').find('input[name=importe]').type(importe);
    concepto && cy.get('.modal').find('input[name=concepto]').type(concepto);
    iva && cy.get('.modal').find('select[name=iva]').select(iva);
    tipoComprobante && cy.get('.modal').find('select[name=tipo]').select(tipoComprobante);

    cy.get('button').contains('Crear comprobante asociado').click();

    cy.contains('Comprobante creado correctamente');
    cy.get('button').contains('Buscar').click();
});
