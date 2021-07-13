import { today } from './GeneralUtilities';

export const crearEstudio = ({
    fecha = today, obraSocial = Cypress.env('obraSocial'), paciente = Cypress.env('paciente'),
    actuante = Cypress.env('actuante'), solicitante = Cypress.env('solicitante'), anestesista = Cypress.env('anestesista'),
    practica = Cypress.env('practica'), motivo = '',
}) => {
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
