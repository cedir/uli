import { get, post } from '../utilities/rest';

export function getMovimientos(searchParams) {
    const {
        fechaDesde = '', fechaHasta = '', medicoActuante = '',
        concepto = '', pagado = '', tipoMovimiento = '',
        incluirEstudio = '', pageNumber = '',
    } = searchParams;
    const idMedico = medicoActuante.length > 0 ? medicoActuante[0].id : '';

    const url = `/api/caja/?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}` +
    `&medico=${idMedico}&concepto=${concepto}&estado=${pagado}` +
    `&tipo_movimiento=${tipoMovimiento}&incluir_estudio=${incluirEstudio}&page=${pageNumber}`;

    return get(url);
}

export function crearMovimientos({ movimientos, estudioAsociado }) {
    const url = '/api/caja/';

    const datosMovimientos = movimientos.map(movimiento => ({
        monto: movimiento.monto,
        concepto: movimiento.concepto,
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
