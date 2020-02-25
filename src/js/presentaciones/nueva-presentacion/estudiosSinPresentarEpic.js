import Rx from 'rxjs';
import {
    getEstudiosSinPresentarObraSocial,
    getEstudiosDeUnaPresentacion,
    } from './api';
import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR }
    from './actionTypes';

export function estudiosSinPresentarEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL)
        .mergeMap(action =>
            getEstudiosSinPresentarObraSocial(action.id)
            .map(data => ({ type: LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR,
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
