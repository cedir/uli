import Rx from 'rxjs';
import {
    getEstudiosDeUnaPresentacion,
    getPresentacionesObraSocial,
    patchAbrirPresentacion } from './api';
import {
    FETCH_PRESENTACIONES_OBRA_SOCIAL,
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR,
    ABRIR_PRESENTACION,
    LOAD_PRESENTACION_ABIERTA }
    from './actionTypes';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

export function presentacionEpic(action$) {
    return action$.ofType(FETCH_PRESENTACIONES_OBRA_SOCIAL)
        .mergeMap(action =>
            getPresentacionesObraSocial(action.id)
            .map(data => ({ type: LOAD_PRESENTACIONES_OBRA_SOCIAL, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR,
            }))),
    );
}

export function verEstudiosDeUnaPresentacionEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_DE_UNA_PRESENTACION)
        .mergeMap(action =>
            getEstudiosDeUnaPresentacion(action.id)
            .map(data => ({ type: LOAD_ESTUDIOS_DE_UNA_PRESENTACION, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR,
            }))),
    );
}

export function abrirPresentacionEpic(action$) {
    return action$.ofType(ABRIR_PRESENTACION)
        .mergeMap(action =>
            patchAbrirPresentacion(action.id)
            .mergeMap(data => Rx.Observable.of(
                { type: LOAD_PRESENTACION_ABIERTA, data },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al abrir la presentacion', 'danger'),
            }))),
        );
}
