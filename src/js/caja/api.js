import { get } from '../utilities/rest';

export function getMovimientos(fetchMovimientosCaja) {
    let url = '/api/caja/';
    if (fetchMovimientosCaja) {
        const { fechaDesde = '', fechaHasta = '', medicoActuante = '', concepto = '', pagado = '', tipoMovimiento = '', incluirEstudio = '' } = fetchMovimientosCaja;
        const idMedico = medicoActuante.length > 0 ? medicoActuante[0].id : '';
        const incluyeEstudio = !incluirEstudio || incluirEstudio === 'false' ? '' : incluirEstudio;
        url += `?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}` +
        `&medico=${idMedico}&concepto=${concepto}&estado=${pagado}` +
        `&tipo_movimiento=${tipoMovimiento}&incluir_estudio=${incluyeEstudio}`;
    }
    return get(url);
}
