import { get } from '../utilities/rest';

export function getComprobantesPago(year, month) {
    const url = `/api/comprobantes/?mes=${month}&anio=${year}`;

    return get(url);
}

export function getComprobantes() {
    const url = '/api/comprobante';

    return get(url);
}
