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

export function searchComprobante({ nombreCliente = '', numero = '', cuit = '' }) {
    const url = `/api/comprobante?nombre_cliente=${nombreCliente}&numero=${numero}&cuit=${cuit}`;

    return get(url);
}

export function crearComprobante(comprobante) {
    const url = '/api/comprobante';

    const lineas = comprobante.lineas.map(linea => ({
        concepto: linea.concepto,
        importe_neto: linea.importeNeto,
    }));

    const body = {
        tipo_comprobante_id: comprobante.tipoComprobante,
        sub_tipo: comprobante.subTipo,
        responsable: comprobante.responsable,
        gravado_id: comprobante.iva,
        nombre_cliente: comprobante.nombreCliente.toUpperCase(),
        domicilio_cliente: comprobante.domicilioCliente,
        nro_cuit: onlyNums(comprobante.dni),
        condicion_fiscal: comprobante.condicionFiscal,
        lineas,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    return post(url, body, headers);
}

export function getComprobante(id) {
    const url = `/api/comprobante/${id}`;

    return get(url);
}
