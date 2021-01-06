import Rx from 'rxjs';
import {
    getEstudiosSinPresentarObraSocial,
    guardarNuevaPresentacionObraSocial,
} from './api';
import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR,
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR,
    CREAR_NUEVA_PRESENTACION_OBRA_SOCIAL,
    FINALIZAR_NUEVA_PRESENTACION,
    CLEAN_ESTUDIOS_FROM_STORE,
} from './actionTypes';
import { createAlert } from '../../utilities/components/alert/alertUtility';
import { ADD_ALERT } from '../../utilities/components/alert/actionTypes';
import { patchCerrarPresentacion } from '../../presentaciones/api';
import { UPDATE_PRESENTACIONES_LIST } from '../actionTypes';

export function estudiosSinPresentarEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL)
        .mergeMap(action =>
            getEstudiosSinPresentarObraSocial(action.obraSocial.id)
            .mergeMap(data => Rx.Observable.of(
                {
                    type: ADD_ALERT,
                    alert: data.response.length ?
                        createAlert('Estudios cargados correctamente', 'success') :
                        createAlert('La obra social no cuenta con estudios sin presentar', 'danger'),
                },
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

export function guardarNuevaPresentacionEpic(action$) {
    return action$.ofType(CREAR_NUEVA_PRESENTACION_OBRA_SOCIAL)
        .mergeMap(action =>
            guardarNuevaPresentacionObraSocial(action.presentacion)
            .mergeMap(data => Rx.Observable.of(
                { type: CLEAN_ESTUDIOS_FROM_STORE },
                { type: UPDATE_PRESENTACIONES_LIST, data },
                { type: ADD_ALERT, alert: createAlert('Presentación Creada con Exito') },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al intentar crear presentacion', 'danger'),
            }))),
        );
}

/* eslint-disable */
export function finalizarNuevaPresentacionEpic(action$) {
    return action$.ofType(FINALIZAR_NUEVA_PRESENTACION)
        .mergeMap(action =>
            guardarNuevaPresentacionObraSocial(action.presentacion)
            .mergeMap(d =>
                patchCerrarPresentacion(action.comprobante, d.response.id)
                .mergeMap(data => Rx.Observable.of(
                    { type: CLEAN_ESTUDIOS_FROM_STORE },
                    { type: UPDATE_PRESENTACIONES_LIST, data },
                    { type: ADD_ALERT, alert: createAlert('Presentación creada y cerrada con éxito', 'success') },
                    {
                        setIdModal: action.setId(data.response.id),
                        showModal: action.setShowModal(true),
                    },
                ))
                .catch(e => (Rx.Observable.of(
                    { type: ADD_ALERT, alert: createAlert('Presentación creada con éxito', 'success') },
                    { type: ADD_ALERT, alert: createAlert(e.response.error, 'danger') },
                ))),
            )
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al crear la presentacion', 'danger'),
            }))),
        );
}
