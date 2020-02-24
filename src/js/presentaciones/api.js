import { get, patch } from '../utilities/rest';
import saveFile from '../utilities/saveFile';
import store from '../app/configureStore';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

export function getPresentacionesObraSocial(idObraSocial) {
    const url = `/api/presentacion/?obra_social=${idObraSocial}`;

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
    const url = `/api/presentacion/${idPresentacion}/abrir`;

    return patch(url);
}

