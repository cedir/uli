import { get, patch } from '../utilities/rest';
import saveFile from '../utilities/saveFile';
import store from '../app/configureStore';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';
import { getSucursal } from '../app/storeHelper';

export function getPresentaciones({
    obraSocial,
    numero,
    anio,
    tipoComprobante,
    tipoPresentacion,
    presentacionesCobradas,
}) {
    const sucursal = getSucursal();
    const obraSocialId = () => {
        if (obraSocial) {
            if (obraSocial.length === 1) {
                return obraSocial[0].id;
            }
        }
        return '';
    };
    const queryString = `?obraSocial=${obraSocialId()}` +
        `&sucursal=${sucursal}` +
        `&numeroComprobante=${numero || ''}` +
        `&anio=${anio || ''}` +
        `&tipoComprobante=${tipoComprobante || ''}` +
        `&presentacionesCobradas=${presentacionesCobradas}` +
        `&tipoPresentacion=${tipoPresentacion || ''}  `;
    const url = `/api/presentacion/${queryString}`;
    return get(url);
}

export function getPresentacionFormatoOsde(presentacion) {
    const {
        id,
        obra_social: obraSocial,
        fecha } = presentacion;

    const url = `/api/presentacion/${id}/get_detalle_osde`;
    const customHeader = {
        'Content-Type': 'text/plain',
    };

    get(url, customHeader, 'string')
        .subscribe(
            (ajaxResponse) => {
                const fileName = `presentacion_${obraSocial.nombre}_${fecha}_format_OSDE.txt`;
                saveFile(fileName, ajaxResponse.response);
            },
            reason => (
                store.dispatch({ type: ADD_ALERT, alert: createAlert(JSON.parse(reason.response).error, 'danger') })),
        );
}

export function getPresentacionFormatoAMR(presentacion) {
    const {
        id,
        obra_social: obraSocial,
        fecha } = presentacion;

    const url = `/api/presentacion/${id}/get_detalle_amr`;
    const customHeader = {
        'Content-Type': 'text/plain',
    };

    get(url, customHeader, 'string')
        .subscribe(
            (ajaxResponse) => {
                const fileName = `presentacion_${obraSocial.nombre}_${fecha}_format_AMR.txt`;
                saveFile(fileName, ajaxResponse.response);
            },
            reason => (
                store.dispatch({ type: ADD_ALERT, alert: createAlert(JSON.parse(reason.response).error, 'danger') })),
        );
}

export function patchAbrirPresentacion(idPresentacion) {
    const url = `/api/presentacion/${idPresentacion}/abrir/`;

    return patch(url);
}

export function patchCerrarPresentacion(comprobante, id) {
    const url = `/api/presentacion/${id}/cerrar/`;
    const tipoLiquidacion = comprobante.tipo_comprobante_id === 2;
    let body;
    if (tipoLiquidacion) {
        body = {
            tipo_comprobante_id: comprobante.tipo_comprobante_id,
        };
    } else {
        body = {
            ...comprobante,
        };
    }
    const headers = {
        'Content-Type': 'application/json',
    };

    return patch(url, body, headers);
}
