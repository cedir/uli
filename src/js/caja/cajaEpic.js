import Rx from 'rxjs';
import { getMovimientos, crearMovimientos, fetchMontosAcumulados, updateMovimiento } from './api';
import { FETCH_MOVIMIENTOS_CAJA, LOAD_MOVIMIENTOS_CAJA_SUCCESS, LOAD_MOVIMIENTOS_CAJA_ERROR,
    CREATE_MOVIMIENTOS_CAJA, CREATE_MOVIMIENTOS_CAJA_FAILED, CREATE_MOVIMIENTOS_CAJA_SUCCESS,
    FETCH_MONTOS_ACUMULADOS, FETCH_MONTOS_ACUMULADOS_SUCCESS, FETCH_MONTOS_ACUMULADOS_FAILED,
    UPDATE_MOVIMIENTO_CAJA, UPDATE_MOVIMIENTO_CAJA_FAILED, UPDATE_MOVIMIENTO_CAJA_SUCCESS } from './actionTypes';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

export function movimientosCajaEpic(action$) {
    return action$.ofType(FETCH_MOVIMIENTOS_CAJA)
        .mergeMap(action =>
            getMovimientos(action.searchParams, action.pageNumber)
            .mergeMap(data => Rx.Observable.of(
                { type: LOAD_MOVIMIENTOS_CAJA_SUCCESS, data, pageNumber: action.pageNumber },
            ))
            .catch(() => (Rx.Observable.of(
                { type: LOAD_MOVIMIENTOS_CAJA_ERROR },
                { type: ADD_ALERT, alert: createAlert('Error al cargar movimientos', 'danger') },
            ))),
    );
}

export function crearMovimientosCajaEpic(action$) {
    return action$.ofType(CREATE_MOVIMIENTOS_CAJA)
        .mergeMap(action =>
            crearMovimientos(action.movimientos)
            .mergeMap(data => Rx.Observable.of(
                {
                    type: CREATE_MOVIMIENTOS_CAJA_SUCCESS,
                    data, volver: action.goBack(),
                    destruirForm: action.destruirForm(),
                },
                { type: ADD_ALERT, alert: createAlert('Movimientos creados correctamente') },
            ))
            .catch(data => Rx.Observable.of(
                { type: CREATE_MOVIMIENTOS_CAJA_FAILED },
                { type: ADD_ALERT, alert: createAlert(`Ocurrio un error al crear los montos: ${data.response.error}`, 'danger') },
            )));
}

export function fetchMontosAcumuladosEpic(action$) {
    return action$.ofType(FETCH_MONTOS_ACUMULADOS)
        .mergeMap(() =>
            fetchMontosAcumulados()
            .mergeMap(data => Rx.Observable.of(
                { type: FETCH_MONTOS_ACUMULADOS_SUCCESS, montos: data.response },
            ))
            .catch(data => Rx.Observable.of(
                { type: FETCH_MONTOS_ACUMULADOS_FAILED },
                { type: ADD_ALERT, alert: createAlert(data.response.error, 'danger') },
            )));
}

export function updateMovimientosCajaEpic(action$) {
    return action$.ofType(UPDATE_MOVIMIENTO_CAJA)
        .mergeMap(action =>
            updateMovimiento(action.datos)
            .mergeMap(() => Rx.Observable.of(
                {
                    type: UPDATE_MOVIMIENTO_CAJA_SUCCESS,
                    datos: action.datos,
                    closeModal: action.setModal(false),
                },
                { type: ADD_ALERT, alert: createAlert('Movimiento modificado correctamente') },
                { type: FETCH_MONTOS_ACUMULADOS },
            ))
            .catch(data => Rx.Observable.of(
                { type: UPDATE_MOVIMIENTO_CAJA_FAILED, closeModal: action.setModal(false) },
                { type: ADD_ALERT, alert: createAlert(`Error al modificar el movimiento: ${data.response}`, 'danger') },
            )));
}
