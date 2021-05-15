import Rx from 'rxjs';
import { getMovimientos, crearMovimientos } from './api';
import { FETCH_MOVIMIENTOS_CAJA, LOAD_MOVIMIENTOS_CAJA_SUCCESS, LOAD_MOVIMIENTOS_CAJA_ERROR,
CREATE_MOVIMIENTOS_CAJA, CREATE_MOVIMIENTOS_CAJA_FAILED, CREATE_MOVIMIENTOS_CAJA_SUCCESS } from './actionTypes';
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
                { type: CREATE_MOVIMIENTOS_CAJA_SUCCESS, data, volver: action.goBack() },
                { type: ADD_ALERT, alert: createAlert('Movimientos creados correctamente') },
            ))
            .catch(data => Rx.Observable.of(
                { type: CREATE_MOVIMIENTOS_CAJA_FAILED, volver: action.goBack() },
                { type: ADD_ALERT, alert: createAlert(data.response.error, 'danger') },
            )));
}
