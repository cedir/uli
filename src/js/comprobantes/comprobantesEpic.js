import Rx from 'rxjs';
import { getComprobantesPago, getComprobantes } from './api';
import {
    FETCH_COMPROBANTES_PAGO,
    LOAD_COMPROBANTES_PAGO,
    LOAD_COMPROBANTES_PAGO_ERROR,
    FETCH_COMPROBANTES_LISTA,
    LOAD_COMPROBANTES_LISTA_SUCCESS,
    LOAD_COMPROBANTES_LISTA_FAILED } from './actionTypes';

export function comprobantesEpic(action$) {
    return action$.ofType(FETCH_COMPROBANTES_PAGO)
        .mergeMap(action =>
            getComprobantesPago(action.data.anio, action.data.mes)
            .map(data => ({ type: LOAD_COMPROBANTES_PAGO, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_COMPROBANTES_PAGO_ERROR,
            }))),
    );
}

export function obtenerComprobantesEpic(action$) {
    return action$.ofType(FETCH_COMPROBANTES_LISTA)
        .mergeMap(() =>
            getComprobantes()
            .map(data => ({ type: LOAD_COMPROBANTES_LISTA_SUCCESS, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_COMPROBANTES_LISTA_FAILED,
            }))),
        );
}
