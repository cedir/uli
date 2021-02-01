import { get, patch } from '../utilities/rest';
import saveFile from '../utilities/saveFile';
import store from '../app/configureStore';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';
import { getSucursal } from '../app/storeHelper';

export function getPresentacionesObraSocial(filtros) {
    const sucursal = getSucursal();
    const obraSocial = (filtros.obraSocial || [{ id: 0 }])[0];
    const body = {
        obraSocial: obraSocial.id,
        sucursalId: sucursal,
        numero: filtros.numero,
        anio: filtros.anio,
        tipoComprobante: filtros.tipoComprobante,
        presentacionAbierta: filtros.presentacionAbierta,
        tipoPresentacion: filtros.tipoPresentacion,
    };
    const queryString = `?obraSocial=${obraSocial.id}` +
        `&sucursal=${sucursal}` +
        `&numeroComprobante=${filtros.numero}` +
        `&anio=${filtros.anio}` +
        `&tipoComprobante=${filtros.tipoComprobante}` +
        `&presentacionAbierta=${filtros.presentacionAbierta}` +
        `&tipoPresentacion=${filtros.tipoPresentacion}`;
    const url = `/api/presentacion/${queryString}`;
    console.log(body);
    console.log(url);
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
