import { get, post } from '../utilities/rest';
import {
    ID_TIPO_COMPROBANTE_NOTA_DE_CREDITO,
    ID_TIPO_COMPROBANTE_NOTA_DE_CREDITO_ELECTRONICA } from './comprobantesTypes';

export function getComprobantesPago(year, month) {
    const url = `/api/comprobantes/?mes=${month}&anio=${year}`;

    return get(url);
}

export function getComprobantes() {
    const url = '/api/comprobante';

    return get(url);
}

export function saveComprobanteAsociado(idComp, importe, tipoComp) {
    const url = '/api/comprobante/crear_comprobante_asociado';

    let idTipoComprobante = ID_TIPO_COMPROBANTE_NOTA_DE_CREDITO;

    if (tipoComp.toUpperCase().indexOf('ELECTRONICA') !== -1) {
        idTipoComprobante = ID_TIPO_COMPROBANTE_NOTA_DE_CREDITO_ELECTRONICA;
    }

    return post(url, {
        'id-comprobante-asociado': idComp,
        importe,
        'id-tipo': idTipoComprobante,
    });
}
