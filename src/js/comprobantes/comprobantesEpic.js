import Rx from 'rxjs';
import { getComprobantesPago, getComprobantes, saveComprobanteAsociado,
    searchComprobante, crearComprobante, getComprobante } from './api';
import {
    FETCH_COMPROBANTES_PAGO,
    LOAD_COMPROBANTES_PAGO,
    LOAD_COMPROBANTES_PAGO_ERROR,
    FETCH_COMPROBANTES_LISTA,
    LOAD_COMPROBANTES_LISTA_SUCCESS,
    LOAD_COMPROBANTES_LISTA_FAILED,
    SEND_COMPROBANTE_ASOCIADO,
    CREATED_COMPROBANTE_ASOCIADO_SUCCESS,
    CREATED_COMPROBANTE_ASOCIADO_FAILED,
    FETCH_COMPROBANTES_FILTRO,
    CREATE_COMPROBANTE,
    CREATE_COMPROBANTE_SUCCESS,
    CREATED_COMPROBANTE_FAILED,
    FETCH_COMPROBANTE,
    FETCH_COMPROBANTE_SUCCESS,
    FETCH_COMPROBANTE_FAILED,
} from './actionTypes';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

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

export function guardarComprobanteAsociadoEpic(action$) {
    return action$.ofType(SEND_COMPROBANTE_ASOCIADO)
        .mergeMap(action =>
            saveComprobanteAsociado(action.idComp, action.data)
                .mergeMap(data => Rx.Observable.of(
                    {
                        type: CREATED_COMPROBANTE_ASOCIADO_SUCCESS,
                        comprobante: data.response,
                        mostrar: action.mostrarModal(false),
                    },
                    { type: ADD_ALERT, alert: createAlert(data.response.message) },
                ))
                .catch(data => Rx.Observable.of(
                    {
                        type: CREATED_COMPROBANTE_ASOCIADO_FAILED,
                        mostrar: action.mostrarModal(false),
                    },
                    { type: ADD_ALERT, alert: createAlert(data.response.message, 'danger') },
                )));
}

export function obtenerComprobantesConFiltroEpic(action$) {
    return action$.ofType(FETCH_COMPROBANTES_FILTRO)
        .mergeMap(action =>
            searchComprobante(action.params)
                .mergeMap(data => Rx.Observable.of(
                    {
                        type: LOAD_COMPROBANTES_LISTA_SUCCESS,
                        data,
                    },
                )));
}

export function crearComprobanteEpic(action$) {
    return action$.ofType(CREATE_COMPROBANTE)
        .mergeMap(action =>
            crearComprobante(action.comprobante)
                .mergeMap(data => Rx.Observable.of(
                    {
                        type: CREATE_COMPROBANTE_SUCCESS,
                        cae: data.response.cae,
                    },
                    { type: ADD_ALERT, alert: createAlert('Comprobante creado correctamente') },
                ))
                .catch(data => Rx.Observable.of(
                    {
                        type: CREATED_COMPROBANTE_FAILED,
                    },
                    { type: ADD_ALERT, alert: createAlert(data.response.error, 'danger') },
                )));
}

export function fetchComprobanteEpic(action$) {
    return action$.ofType(FETCH_COMPROBANTE)
        .mergeMap(action =>
            getComprobante(action.id)
                .mergeMap(data => Rx.Observable.of(
                    {
                        type: FETCH_COMPROBANTE_SUCCESS,
                        comprobante: data.response,
                    },
                ))
                .catch(data => Rx.Observable.of(
                    {
                        type: FETCH_COMPROBANTE_FAILED,
                    },
                    { type: ADD_ALERT, alert: createAlert(`Ocurrio un error al traer el comprobante. ${data.response.error}`, 'danger') },
                )));
}
