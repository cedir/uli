/// <reference types="Cypress" />

import { ID_NOTA_DE_CREDITO, ID_NOTA_DE_DEBITO,
    ID_NOTA_DE_DEBITO_ELECTRONICA, ID_NOTA_DE_CREDITO_ELECTRONICA } from '../../src/js/utilities/generalUtilities';

beforeEach(() => {
    cy.login();
    cy.contains('Comprobantes').click();
});

describe('Listado de Comprobantes', () => {
    before(() => {
        cy.login();
        cy.contains('Comprobantes').click();
        cy.contains('Agregar').click();
        cy.createComprobante('Iva inscripto 10.5', 'Factura', 123);
        cy.visit('/comprobantes');
        cy.contains('Agregar').click();
        cy.createComprobante('Iva inscripto 10.5', 'Factura Electronica', 123, 'A');
        cy.contains('Log out').click();
    });

    it('Carga listado correctamente', () => {
        cy.get('tbody').find('tr');
    });

    it('Crear comprobante asociado funciona', () => {
        cy.get('tbody').find('tr').contains(/^Factura$/).next()
            .find('.mdi-icon')
            .click();

        cy.get('.modal').find('input[name=importe]').type('100');
        cy.get('.modal').find('input[name=concepto]').type('Concepto de prueba');

        cy.get('button').contains('Crear comprobante asociado').should('not.be.disabled').click()
            .and('be.disabled');

        cy.contains('Comprobante creado correctamente');
    });

    it('Crear comprobante asociado sin concepto funciona', () => {
        cy.get('tbody').find('tr').contains(/^Factura$/).next()
            .find('.mdi-icon')
            .click();

        cy.get('.modal').find('input[name=importe]').type('123');

        cy.get('button').contains('Crear comprobante asociado').click();

        cy.contains('Comprobante creado correctamente');
        cy.get('button').contains('Buscar').click();
    });

    it('Crear comprobante asociado sin importe falla', () => {
        cy.get('tbody').find('tr').contains(/^Factura$/).next()
            .find('.mdi-icon')
            .click();

        cy.get('.modal').find('input[name=importe]').clear();
        cy.get('.modal').find('input[name=concepto]').type('asdasdasd');

        cy.get('button').contains('Crear comprobante asociado').should('be.disabled');
    });

    it('Crear comprobante asociado no deja ingresar mas de dos decimales', () => {
        cy.get('tbody').find('tr').contains(/^Factura$/).next()
            .find('.mdi-icon')
            .click();

        cy.get('.modal').find('input[name=importe]').type('1.163').should('have.value', '1.16');
    });

    it('Crear comprobante asociado autocompleta correctamente el tipo por defecto', () => {
        cy.createComprobanteAsociado('Nota De Credito', 10);
        cy.createComprobanteAsociado('Factura Electronica', 10);
        cy.createComprobanteAsociado('Factura Electronica', 10, '', '', 'Nota de Debito Electronica');

        const selectAsociado = (tipo) => {
            cy.get('tbody').find('tr').contains(tipo).next()
                .find('.mdi-icon')
                .click();
        };

        const tipoHaveValue = (tipo) => {
            cy.get('.modal').find('select[name=tipo]').should('have.value', tipo);
            cy.contains('×').click();
        };

        selectAsociado(/^Factura$/);
        tipoHaveValue(ID_NOTA_DE_CREDITO);

        selectAsociado('Nota De Credito');
        tipoHaveValue(ID_NOTA_DE_DEBITO);

        selectAsociado('Nota De Debito');
        tipoHaveValue(ID_NOTA_DE_CREDITO);

        selectAsociado('Factura Electronica');
        tipoHaveValue(ID_NOTA_DE_CREDITO_ELECTRONICA);

        selectAsociado('Nota de Credito Electronica MiPyME');
        tipoHaveValue(ID_NOTA_DE_DEBITO_ELECTRONICA);

        selectAsociado('Nota de Debito Electronica MiPyME');
        tipoHaveValue(ID_NOTA_DE_CREDITO_ELECTRONICA);
    });

    it('Crear comprobante asociado permite seleccionar todos los datos', () => {
        cy.createComprobanteAsociado(/^Factura$/, 5, 'Pruebas', 'Exento', 'Nota De Debito');
        cy.contains('Comprobante creado correctamente');
        cy.get('button').contains('Buscar').click().should('not.be.disabled');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000); // Borrar cuando haya una mejor forma de esperar a la busqueda de comprobante
        cy.get('tbody > tr').eq(0).contains(/^Nota De Debito$/);
        cy.get('tbody > tr > td > div').eq(0).click();
        cy.contains('Nota De Debito');
        cy.contains('Pruebas');
        cy.contains('Nota De Debito');
        cy.contains('Importe Neto').next().contains('5.00').parent()
            .parent()
            .next()
            .contains('Iva')
            .next()
            .contains('-');
        cy.contains('Sub-total').next().contains('5');
        cy.contains('Total: $5');
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
