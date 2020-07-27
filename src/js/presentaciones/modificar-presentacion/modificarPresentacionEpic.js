import Rx from 'rxjs';
import {
    getEstudiosDeUnaPresentacion,
    updatePresentacionObraSocial,
} from './api';
import {
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR,
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR_ERROR,
    UPDATE_PRESENTACION,
    LOAD_PRESENTACION_DETAIL,
    FINALIZAR_MODIFICAR_PRESENTACION,
    CLEAN_ESTUDIOS_DE_UNA_PRESENTACION_FROM_STORE,
} from './actionTypes';
import { ADD_ALERT } from '../../utilities/components/alert/actionTypes';
import { createAlert } from '../../utilities/components/alert/alertUtility';
import { patchCerrarPresentacion } from '../api';
import { UPDATE_PRESENTACIONES_LIST, FETCH_PRESENTACIONES_OBRA_SOCIAL } from '../actionTypes';
import { getEstudiosSinPresentarObraSocial } from '../nueva-presentacion/api';

export function estudiosDeUnaPresentacionEpic(action$) {
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
                { type: ADD_ALERT, alert: createAlert('Error al intentar cargar estudios', 'danger') },
            ))),
    );
}

export function estudiosDeUnaPresentacionAgregarEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR)
        .mergeMap(action =>
            getEstudiosSinPresentarObraSocial(action.id)
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Estudios cargados correctamente') },
                {
                    type: LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR, data,
                },
            ))
            .catch(() => (Rx.Observable.of(
                { type: LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR_ERROR },
                { type: ADD_ALERT, alert: createAlert('Error al intentar cargar estudios', 'danger') },
            ))),
    );
}

export function updatePresentacionEpic(action$) {
    return action$.ofType(UPDATE_PRESENTACION)
        .mergeMap(action =>
            updatePresentacionObraSocial(action.presentacion, action.id)
            .mergeMap(data => Rx.Observable.of(
                { type: CLEAN_ESTUDIOS_DE_UNA_PRESENTACION_FROM_STORE },
                { type: ADD_ALERT, alert: createAlert('Presentación actualizada con éxito', 'success') },
                { type: LOAD_PRESENTACION_DETAIL, data },
                { type: FETCH_PRESENTACIONES_OBRA_SOCIAL, id: data.response.obra_social_id },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al actualizar presentacion', 'danger'),
            }))),
        );
}

export function finalizarModificarPresentacionEpic(action$) {
    return action$.ofType(FINALIZAR_MODIFICAR_PRESENTACION)
        .mergeMap(action =>
            updatePresentacionObraSocial(action.presentacion, action.id)
            .mergeMap(() =>
            patchCerrarPresentacion(action.comprobante, action.id)
            .mergeMap(data => Rx.Observable.of(
                    { type: CLEAN_ESTUDIOS_DE_UNA_PRESENTACION_FROM_STORE },
                    { type: UPDATE_PRESENTACIONES_LIST, data },
                    { type: ADD_ALERT, alert: createAlert('Presentación actualizada y cerrada con éxito', 'success') },
                    { type: LOAD_PRESENTACION_DETAIL, data },
                ))
                .catch(e => (Rx.Observable.of(
                    { type: CLEAN_ESTUDIOS_DE_UNA_PRESENTACION_FROM_STORE },
                    { type: ADD_ALERT, alert: createAlert('Presentación actualizada con éxito', 'success') },
                    { type: ADD_ALERT, alert: createAlert(e.response.error, 'danger') },
                ))),
            )
            .catch(() => (Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Error al actualizar presentacion', 'danger') },
                { type: CLEAN_ESTUDIOS_DE_UNA_PRESENTACION_FROM_STORE },
            ))),
        );
}
