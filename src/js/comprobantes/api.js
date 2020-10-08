import { get, post } from '../utilities/rest';

export function getComprobantesPago(year, month) {
    const url = `/api/comprobantes/?mes=${month}&anio=${year}`;

    return get(url);
}

export function getComprobantes() {
    const url = '/api/comprobante';

    return get(url);
}

export function saveComprobanteAsociado(idComp, importe, concepto) {
    const url = '/api/comprobante/crear_comprobante_asociado';

    return post(url, {
        'id-comprobante-asociado': idComp,
        importe,
        concepto,
    });
}

export function searchComprobante(filtro) {
    const url = `/api/comprobante?filtro=${filtro}`;

    return get(url);
}

export function crearComprobante() {
    return post('/api/comprobante');
}
