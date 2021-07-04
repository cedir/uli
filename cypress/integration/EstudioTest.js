/// <reference types="Cypress" />

const date = new Date();
const today = date.toISOString().substring(0, 10);

const typeAsyncInput = (input, text) => {
    cy.get(`input[name=${input}]`).type(text);
    cy.contains('Type to search').should('not.exist');
    cy.contains('Searching').should('not.exist');
};

const clickFirstOption = () => cy.get('form').find('ul > li > a').eq(0).click();

describe('Crear estudio', () => {
    before(() => {
        cy.login();
        cy.visit('/estudios/create');
    });

    afterEach(() => {
        cy.visit('/estudios/create');
    });

    it('Crear estudio funciona', () => {
        cy.get('input[name=fecha]').type(today);

        typeAsyncInput('obraSocial', 'osde');
        cy.contains('OSDE BINARIO').click();

        typeAsyncInput('paciente', 'daniel');
        clickFirstOption();

        typeAsyncInput('medicoActuante', 'brun');
        clickFirstOption();

        typeAsyncInput('medicoSolicitante', 'dan');
        clickFirstOption();

        typeAsyncInput('anestesista', 'dan');
        clickFirstOption();

        typeAsyncInput('practica', 'colangio');
        clickFirstOption();

        cy.get('input[name=motivo]').type('pruebas');

        cy.get('button').contains('Crear').click();
        cy.contains('Estudio creado correctamente');
    });
});
