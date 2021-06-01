import { get, patch, post } from '../utilities/rest';

export function querystring(searchParams, ordering, pageNumber) {
    const {
        fechaDesde = '', fechaHasta = '', medicoActuante = '',
        concepto = '', pagado = '', tipoMovimiento = '',
        incluirEstudio = '', paciente = '' } = searchParams;
    const idMedico = medicoActuante.length > 0 ? medicoActuante[0].id : '';
    const idPaciente = paciente.length > 0 ? paciente[0].id : '';

    return `?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}` +
    `&medico=${idMedico}&concepto=${concepto}&estado=${pagado}&paciente=${idPaciente}` +
    `&tipo_movimiento=${tipoMovimiento}&incluir_estudio=${incluirEstudio}&page=${pageNumber}` +
    `&ordering=${ordering}`;
}

export function getMovimientos({ searchParams, pageNumber, ordering }) {
    const url = '/api/caja/';
    return get(url + querystring(searchParams, ordering, pageNumber));
}

export function crearMovimientos({ movimientos, estudioAsociado }) {
    const url = '/api/caja/';

    const datosMovimientos = movimientos.map(movimiento => ({
        monto: movimiento.monto,
        concepto: movimiento.concepto || '',
        medico_id: movimiento.medico ? movimiento.medico.id : '',
        tipo_id: movimiento.tipoMovimiento.value,
    }));

    const body = {
        estudio_id: estudioAsociado.id || '',
        movimientos: datosMovimientos,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    return post(url, body, headers);
}

export function updateMovimiento(datos) {
    const url = `/api/caja/${datos.id}/update_movimientos/`;

    const medico = datos.medico || [];

    const body = {
        concepto: datos.concepto ? datos.concepto : '',
        medico: medico.length > 0 ? medico[0].id : '',
        tipo: datos.tipo,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    return patch(url, body, headers);
}

export function fetchMontosAcumulados() {
    const url = '/api/caja/montos_acumulados';

    return get(url);
}
