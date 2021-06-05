import Rx from 'rxjs';
import {
    getPresentaciones,
    patchAbrirPresentacion,
    patchCerrarPresentacion,
} from './api';
import {
    FETCH_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR,
    ABRIR_PRESENTACION,
    CERRAR_PRESENTACION,
    UPDATE_PRESENTACIONES_LIST,
} from './actionTypes';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

export function presentacionEpic(action$) {
    return action$.ofType(FETCH_PRESENTACIONES_OBRA_SOCIAL)
        .mergeMap(action =>
            getPresentaciones(action.filtros)
            .map(data => ({ type: LOAD_PRESENTACIONES_OBRA_SOCIAL, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR,
            }))),
    );
}

export function abrirPresentacionEpic(action$) {
    return action$.ofType(ABRIR_PRESENTACION)
        .mergeMap(action =>
            patchAbrirPresentacion(action.id)
            .mergeMap(data => Rx.Observable.of(
                { type: UPDATE_PRESENTACIONES_LIST, data, index: action.index },
                { type: ADD_ALERT, alert: createAlert('La presentacion fue abierta exitosamente') },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al abrir la presentacion', 'danger'),
            }))),
        );
}

export function cerrarPresentacionEpic(action$) {
    return action$.ofType(CERRAR_PRESENTACION)
        .mergeMap(action =>
            patchCerrarPresentacion(action.comprobante, action.id)
            .mergeMap(() => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Presentación cerrada con éxito', 'success') },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al cerrar presentacion', 'danger'),
            }))),
        );
}
