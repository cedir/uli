import { get } from '../utilities/rest';

export function getMovimientos(searchParams) {
    let url = '/api/caja/';
    if (searchParams) {
        const { fechaDesde = '', fechaHasta = '', medicoActuante = '', concepto = '', pagado = '', tipoMovimiento = '', incluirEstudio = '' } = searchParams;
        const idMedico = medicoActuante.length > 0 ? medicoActuante[0].id : '';
        url += `?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}` +
        `&medico=${idMedico}&concepto=${concepto}&estado=${pagado}` +
        `&tipo_movimiento=${tipoMovimiento}&incluir_estudio=${incluirEstudio}`;
    }
    return get(url);
}
