import Rx from 'rxjs';
import {
    getEstudiosDeUnaPresentacion,
    getPresentacionesObraSocial,
    patchAbrirPresentacion,
    updatePresentacionObraSocial,
} from './api';
import {
    FETCH_PRESENTACIONES_OBRA_SOCIAL,
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR,
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR_ERROR,
    CREAR_PRESENTACION_OBRA_SOCIAL,
    LOAD_PRESENTACION_DETAIL_ID,
    ABRIR_PRESENTACION,
    UPDATE_PRESENTACION,
}
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
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Estudios cargados correctamente') },
                {
                    type: LOAD_ESTUDIOS_DE_UNA_PRESENTACION, data,
                    obraSocial: action.obraSocial,
                    id: action.id,
                    fecha: action.fecha,
                },
            ))
            .catch(() => (Rx.Observable.of(
                { type: LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR },
                { type: ADD_ALERT, alert: createAlert('Error al intentar ver presentacion', 'danger') },
            ))),
    );
}

export function estudiosDeUnaPresentacionAgregarEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR)
        .mergeMap(action =>
            getEstudiosDeUnaPresentacion(action.id, action.idPresentacion)
            .map(data => ({ type: LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR_ERROR,
            }))),
    );
}

export function updatePresentacionEpic(action$) {
    return action$.ofType(CREAR_PRESENTACION_OBRA_SOCIAL)
        .mergeMap(action =>
            updatePresentacionObraSocial(action.presentacion, action.id)
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Presentación creada con éxito', 'success') },
                { type: LOAD_PRESENTACION_DETAIL_ID, data },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al intentar crear presentacion', 'danger'),
            }))),
        );
}

export function abrirPresentacionEpic(action$) {
    return action$.ofType(ABRIR_PRESENTACION)
        .mergeMap(action =>
            patchAbrirPresentacion(action.id)
            .mergeMap(data => Rx.Observable.of(
                { type: UPDATE_PRESENTACION, data, index: action.index },
                { type: ADD_ALERT, alert: createAlert('La presentacion fue abierta exitosamente') },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al abrir la presentacion', 'danger'),
            }))),
        );
}
