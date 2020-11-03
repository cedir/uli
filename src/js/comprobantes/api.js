import { get, post } from '../utilities/rest';
import { onlyNums } from '../utilities/reduxFormNormalizers';

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

export function crearComprobante(comprobante) {
    return post('/api/comprobante', {
        tipo_comprobante_id: comprobante.tipoComprobante,
        sub_tipo: comprobante.subTipo,
        responsable: comprobante.responsable,
        gravado_id: comprobante.iva,
        nombre_cliente: comprobante.nombreCliente,
        domicilio_cliente: comprobante.domicilioCliente,
        nro_cuit: onlyNums(comprobante.dni),
        condicion_fiscal: comprobante.condicionFiscal,
        lineas: comprobante.lineas,
    });
}
