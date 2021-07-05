/// <reference types="Cypress" />

const date = new Date();
const today = date.toISOString().substring(0, 10);

const crearEstudio = (
    fecha = today, obraSocial = 'OSDE BINARIO', paciente = 'DANIEL',
    actuante = 'DANIEL', solicitante = 'DANIEL', anestesista = 'DANIEL',
    practica = 'CONSULTA', motivo = '',
) => {
    cy.get('input[name=fecha]').type(fecha);

    cy.typeAsyncInput('obraSocial', obraSocial);
    cy.clickFirstOption();

    cy.typeAsyncInput('paciente', paciente);
    cy.clickFirstOption();

    cy.typeAsyncInput('medicoActuante', actuante);
    cy.clickFirstOption();

    cy.typeAsyncInput('medicoSolicitante', solicitante);
    cy.clickFirstOption();

    cy.typeAsyncInput('anestesista', anestesista);
    cy.clickFirstOption();

    cy.typeAsyncInput('practica', practica);
    cy.clickFirstOption();

    if (motivo) {
        cy.get('input[name=motivo]').type(motivo);
    }

    cy.get('button').contains('Crear').click();
    cy.contains('Estudio creado correctamente');
};

describe('Crear estudio', () => {
    /* Setup section */

    beforeEach(() => {
        cy.login();
        cy.visit('/estudios/create');
    });

    /* Testing section */
    it('Crear estudio funciona', () => {
        crearEstudio();
    });
});

describe('Listado de estudios', () => {
    /* Setup section */

    before(() => {
        cy.login();
        cy.visit('/estudios/create');
        crearEstudio(today);
        cy.contains('Log out').click();
    });

    beforeEach(() => {
        cy.login();
        cy.visit('/estudios');
    });

    /* Testing section */

    it('Listado de estudios ejecuta busqueda al ingresar al listado', () => {
        cy.get('tbody').find('tr');
    });

    it('Seleccionar estudio envia a editar estudio', () => {
        cy.get('tbody').find('tr').eq(0).click();
        cy.url().should('include', 'estudios/detail');
    });
});

describe('Detalle y edicion de datos de estudios', () => {

});

describe('Detalle y edicion de medicacion de estudios', () => {

});

describe('Detalle y edicion de facturacion de estudios', () => {

});
