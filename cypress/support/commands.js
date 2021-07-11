/// <reference types="Cypress" />
/* eslint-disable no-unused-expressions */

import { config } from '../../src/js/app/config';

Cypress.Commands.add('login', () => {
    cy.request('POST', `${config.baseUrl}/api/security/auth/`, {
        username: Cypress.env('loginUser'),
        password: Cypress.env('loginPassword'),
    }).then((response) => {
        window.localStorage.setItem('state', `{"login":{"token":"${response.body.token}","sucursal":1}}`);
        cy.visit('/');
    });
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

Cypress.Commands.add('clickFirstOption', () =>
    cy.get('form').find('ul > li > a').eq(0).click());

Cypress.Commands.add('typeAsyncInput', (input, text) => {
    cy.get(`input[name=${input}]`).type(text);
    cy.contains('Type to search').should('not.exist');
    cy.contains('Searching').should('not.exist');
});

Cypress.Commands.add('firstRowType', type => cy.get('tbody > tr').contains(type).parent().find('td'));
