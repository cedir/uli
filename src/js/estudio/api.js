import { get, update, post, patch, remove } from '../utilities/rest';
import { getSucursal } from '../app/storeHelper';

function createSearchQueryString(fetchEstudiosParams) {
    const { fechaDesde = '', fechaHasta = '', obraSocial = '', dniPaciente = '',
        nombrePaciente = '', apellidoPaciente = '', medicoActuante = '',
        medicoSolicitante = '', practica = '' } = fetchEstudiosParams;

    const { apellido: apellidoMedicoActuante, nombre: nombreMedicoActuante }
        = Array.isArray(medicoActuante) && medicoActuante[0] ? medicoActuante[0] : { nombre: '', apellido: '' };
    const { apellido: apellidoMedicoSolicitante, nombre: nombreMedicoSolicitante }
        = Array.isArray(medicoSolicitante) && medicoSolicitante[0] ? medicoSolicitante[0] : { nombre: '', apellido: '' };
    const { nombre: nombreObraSocial } = Array.isArray(obraSocial) && obraSocial[0] ? obraSocial[0] : { nombre: '' };
    const { id: idPractica } = Array.isArray(practica) && practica[0] ? practica[0] : { id: '' };

    const actualPage = fetchEstudiosParams.actualPage || 1;
    const queryString = `?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}` +
        `&obra_social=${nombreObraSocial}&paciente_dni=${dniPaciente}` +
        `&paciente_nombre=${nombrePaciente}&paciente_apellido=${apellidoPaciente}` +
        `&medico_nombre=${nombreMedicoActuante}&medico_apellido=${apellidoMedicoActuante}` +
        `&medico_solicitante_nombre=${nombreMedicoSolicitante}` +
        `&medico_solicitante_apellido=${apellidoMedicoSolicitante}&page=${actualPage}&ordering=-fecha,-id` +
        `&practica=${idPractica}&sucursal=${getSucursal()}`;
    return queryString;
}

export function getEstudios(fetchEstudiosParams) {
    const queryString = createSearchQueryString(fetchEstudiosParams);
    const url = `/api/estudio/${queryString}`;
    return get(url);
}

export function getEstudiosConAsociados(fetchEstudiosParams) {
    const queryString = createSearchQueryString(fetchEstudiosParams);
    const url = `/api/estudio/get_estudios_con_asociados/${queryString}`;
    return get(url);
}

export function getEstudiosImpagos(medico) {
    const url = `/api/medico/${medico.id}/get_estudios_pendientes_de_pago/?sucursal=${getSucursal()}`;
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
        motivo: estudio.motivo || '',
        informe: estudio.informe || '',
    };

    return update(url, body);
}

export function createEstudio(estudio) {
    const sucursal = getSucursal();
    const url = '/api/estudio/';
    const body = {
        fecha: estudio.fecha,
        paciente: estudio.paciente[0].id,
        medico_solicitante: estudio.medicoSolicitante[0].id,
        medico: estudio.medicoActuante[0].id,
        anestesista: estudio.anestesista[0].id,
        practica: estudio.practica[0].id,
        obra_social: estudio.obraSocial[0].id,
        motivo: estudio.motivo || '',
        informe: estudio.informe || '',
        sucursal,
    };

    return post(url, body);
}

export function realizarPagoContraFactura(datos) {
    const url = `/api/estudio/${datos.estudio_id}/realizar_pago_contra_factura/`;
    const body = {
        pago_contra_factura: datos.pago_contra_factura,
    };

    return update(url, body);
}

export function anularPagoContraFactura(datos) {
    const url = `/api/estudio/${datos.estudio_id}/anular_pago_contra_factura/`;

    return update(url);
}

export function actualizaImportesEstudio(importes) {
    const url = `/api/estudio/${importes.estudio_id}/update_importes/`;
    const body = {
        pension: importes.pension,
        diferencia_paciente: importes.diferencia_paciente,
        arancel_anestesia: importes.arancel_anestesia,
    };

    return patch(url, body);
}

export function eliminarEstudio(estudio) {
    const url = `/api/estudio/${estudio}/`;
    return remove(url);
}

export function createPagoAMedico(pago) {
    const url = '/api/pago-medico/';

    return post(url, pago);
}
