import { get } from '../utilities/rest';

export function getComprobantesPago(year, month) {
    const url = `/api/comprobantes/?mes=${month}&anio=${year}`;

    return get(url);
}
