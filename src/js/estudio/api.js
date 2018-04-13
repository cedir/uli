import { get } from '../utilities/rest';

function createSearchQueryString(fetchEstudiosParams) {
    const { fechaDesde, fechaHasta, obraSocial, dniPaciente, nombrePaciente, apellidoPaciente,
        medicoActuante, medicoSolicitante } = fetchEstudiosParams.searchParams;

    const [apellidoMedicoActuante, nombreMedicoActuante] =
        medicoActuante ? medicoActuante.split(', ') : ['', ''];
    const [apellidoMedicoSolicitante, nombreMedicoSolicitante] =
        medicoSolicitante ? medicoSolicitante.split(', ') : ['', ''];

    const actualPage = fetchEstudiosParams.actualPage || 1;
    const queryString = `?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}` +
        `&obra_social=${obraSocial}&paciente_dni=${dniPaciente}` +
        `&paciente_nombre=${nombrePaciente}&paciente_apellido=${apellidoPaciente}` +
        `&medico_nombre=${nombreMedicoActuante}&medico_apellido=${apellidoMedicoActuante}` +
        `&medico_solicitante_nombre=${nombreMedicoSolicitante}` +
        `&medico_solicitante_apellido=${apellidoMedicoSolicitante}&page=${actualPage}&ordering=-fecha`;
    return queryString;
}

export function getEstudios(fetchEstudiosParams) {
    const queryString = createSearchQueryString(fetchEstudiosParams);
    const url = `/api/estudio/${queryString}`;
    return get(url);
}

export function getEstudio(estudioId) {
    const url = `/api/estudio/${estudioId}/`;

    return get(url);
}
