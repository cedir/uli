import { get, update, post } from '../utilities/rest';

function createSearchQueryString(fetchEstudiosParams) {
    const { fechaDesde, fechaHasta, obraSocial, dniPaciente, nombrePaciente, apellidoPaciente,
        medicoActuante, medicoSolicitante } = fetchEstudiosParams;

    const { apellido: apellidoMedicoActuante, nombre: nombreMedicoActuante }
        = medicoActuante[0] ? medicoActuante[0] : { nombre: '', apellido: '' };
    const { apellido: apellidoMedicoSolicitante, nombre: nombreMedicoSolicitante }
        = medicoSolicitante[0] ? medicoSolicitante[0] : { nombre: '', apellido: '' };
    const { nombre: nombreObraSocial } = obraSocial[0] ? obraSocial[0] : { nombre: '' };

    const actualPage = fetchEstudiosParams.actualPage || 1;
    const queryString = `?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}` +
        `&obra_social=${nombreObraSocial}&paciente_dni=${dniPaciente}` +
        `&paciente_nombre=${nombrePaciente}&paciente_apellido=${apellidoPaciente}` +
        `&medico_nombre=${nombreMedicoActuante}&medico_apellido=${apellidoMedicoActuante}` +
        `&medico_solicitante_nombre=${nombreMedicoSolicitante}` +
        `&medico_solicitante_apellido=${apellidoMedicoSolicitante}&page=${actualPage}&ordering=-fecha,-id`;
    return queryString;
}

export function getEstudios(fetchEstudiosParams) {
    const queryString = createSearchQueryString(fetchEstudiosParams);
    const url = `/api/estudio/${queryString}`;
    return get(url);
}

export function getEstudiosImpagos(medico) {
    const { apellido: apellidoMedicoActuante, nombre: nombreMedicoActuante }
        = medico[0] ? medico[0] : { nombre: '', apellido: '' };
    const url = `/api/estudio/?&medico_nombre=${nombreMedicoActuante}&` +
        `medico_apellido=${apellidoMedicoActuante}`;
    return get(url);
}

export function getEstudio(estudioId) {
    const url = `/api/estudio/${estudioId}/`;

    return get(url);
}

export function updateEstudio(estudio) {
    const url = `/api/estudio/${estudio.id}/`;
    const body = {
        fecha: estudio.fecha,
        paciente: estudio.paciente[0].id,
        medico_solicitante: estudio.medicoSolicitante[0].id,
        medico: estudio.medicoActuante[0].id,
        anestesista: estudio.anestesista[0].id,
        practica: estudio.practica[0].id,
        obra_social: estudio.obraSocial[0].id,
        motivo: estudio.motivo,
        informe: estudio.informe,
    };

    return update(url, body);
}

export function createEstudio(estudio) {
    const url = '/api/estudio/';
    const body = {
        fecha: estudio.fecha,
        paciente: estudio.paciente[0].id,
        medico_solicitante: estudio.medicoSolicitante[0].id,
        medico: estudio.medicoActuante[0].id,
        anestesista: estudio.anestesista[0].id,
        practica: estudio.practica[0].id,
        obra_social: estudio.obraSocial[0].id,
        motivo: estudio.motivo,
        informe: estudio.informe,
    };

    return post(url, body);
}
