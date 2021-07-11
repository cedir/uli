/// <reference types="Cypress" />
import { crearEstudio } from '../support/utilities/EstudiosUtilities';

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
        crearEstudio();
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
