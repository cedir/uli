import { get } from '../utilities/rest';

export function getMovimientos(fetchMovimientosCaja) {
    let url = '/api/caja/';
    if (fetchMovimientosCaja) {
        const { fechaDesde = '', fechaHasta = '', medicoActuante = '', concepto = '', pagado = '' } = fetchMovimientosCaja;
        let idMedico = '';
        if (medicoActuante.length > 0) {
            idMedico = medicoActuante[0].id;
        }
        url += `?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}` +
        `&medico=${idMedico}&concepto=${concepto}&pagado=${pagado}`;
    }
    return get(url);
}
