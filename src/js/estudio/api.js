import { get } from '../utilities/rest';

export function getEstudios(fechaDesde, fechaHasta) {
    const url = `/api/estudio/?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}`;
    return get(url);
}
