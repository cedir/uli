import Rx from 'rxjs';
import {
    getEstudiosSinPresentarObraSocial,
    crearNuevaPresentacionObraSocial,
} from './api';
import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR,
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR,
    CREAR_NUEVA_PRESENTACION_OBRA_SOCIAL,
    LOAD_PRESENTACION_DETAIL_ID }
    from './actionTypes';
import { createAlert } from '../../utilities/components/alert/alertUtility';
import { ADD_ALERT } from '../../utilities/components/alert/actionTypes';

export function estudiosSinPresentarEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL)
        .mergeMap(action =>
            getEstudiosSinPresentarObraSocial(action.obraSocial.id)
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Estudios cargados correctamente') },
                {
                    type: LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL, data,
                    obraSocial: action.obraSocial,
                },
            ))
            .catch(() => (Rx.Observable.of(
                { type: LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR },
                { type: ADD_ALERT, alert: createAlert('Error al intentar cargar los estudios', 'danger') },
            ))),
    );
}

export function estudiosSinPresentarAgregarEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR)
        .mergeMap(action =>
            getEstudiosSinPresentarObraSocial(action.id)
            .map(data => ({ type: LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR,
            }))),
    );
}

export function crearNuevaPresentacionEpic(action$) {
    return action$.ofType(CREAR_NUEVA_PRESENTACION_OBRA_SOCIAL)
        .mergeMap(action =>
            crearNuevaPresentacionObraSocial(action.presentacion)
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Presentación Creada con Exito') },
                { type: LOAD_PRESENTACION_DETAIL_ID, data },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al intentar crear presentacion', 'danger'),
            }))),
        );
}
