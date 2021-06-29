import Rx from 'rxjs';
import { getMedicacion, addMedicactionToEstudio,
    removeMedicacionFromEstudio, addDefaultMedicacionToEstudio,
    deleteAllMedicacion } from './api';
import { FETCH_MEDICACION_ESTUDIO, LOAD_MEDICACION_ESTUDIO,
    LOAD_MEDICACION_ESTUDIO_ERROR, ADD_MEDICACION_ESTUDIO,
    ADD_MEDICACION_ESTUDIO_ERROR, DELETE_MEDICACION_ESTUDIO,
    DELETE_MEDICACION_ESTUDIO_ERROR, ADD_DEFAULT_MEDICACION_ESTUDIO,
    ADD_DEFAULT_MEDICACION_ESTUDIO_ERROR, DELETE_ALL_MEDICACION,
    DELETE_ALL_MEDICACION_SUCCESS, DELETE_ALL_MEDICACION_FAILED } from './actionTypes';
import { UPDATE_MEDICACION_ESTUDIO_MODIFICAR } from '../presentaciones/modificar-presentacion/actionTypes';
import { UPDATE_MEDICACION_ESTUDIO_NUEVA } from '../presentaciones/nueva-presentacion/actionTypes';
import { UPDATE_MEDICACION_ESTUDIO_COBRAR } from '../presentaciones/cobrar-presentacion/actionTypes';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

export function medicacionEpic(action$) {
    return action$.ofType(FETCH_MEDICACION_ESTUDIO)
        .mergeMap(action =>
            getMedicacion(action.estudioId)
                .mergeMap(data => Rx.Observable.of(
                    { type: LOAD_MEDICACION_ESTUDIO, data },
                    // si viene desde seccion modificar-presentacion va a dispatchear la accion
                    {
                        type: action.seccion === 'modificar-presentacion' && UPDATE_MEDICACION_ESTUDIO_MODIFICAR,
                        data,
                        estudioId: action.estudioId,
                    },
                    // si viene desde seccion nueva-presentacion va a dispatchear la accion
                    {
                        type: action.seccion === 'nueva-presentacion' && UPDATE_MEDICACION_ESTUDIO_NUEVA,
                        data,
                        estudioId: action.estudioId,
                    },
                    // si está en la seccion de estudio no dispatch ninguna accion de las secciones.
                    {
                        type: action.seccion === 'cobrar-presentacion' && UPDATE_MEDICACION_ESTUDIO_COBRAR,
                        medicacion: data.response,
                        estudioId: action.estudioId,
                    },
                ))
                .catch(() => (Rx.Observable.of({
                    type: LOAD_MEDICACION_ESTUDIO_ERROR,
                }))),
        );
}

export function addMedicacionToEstudioEpic(action$) {
    return action$.ofType(ADD_MEDICACION_ESTUDIO)
        .mergeMap(action =>
            addMedicactionToEstudio(action.medicacion)
                .map(data =>
                    ({
                        type: FETCH_MEDICACION_ESTUDIO,
                        estudioId: data.response.estudio,
                        seccion: action.seccion,
                    }))
                .catch(() => (Rx.Observable.of({
                    type: ADD_MEDICACION_ESTUDIO_ERROR,
                }))),
        );
}

export function removeMedicacionFromEstudioEpic(action$) {
    return action$.ofType(DELETE_MEDICACION_ESTUDIO)
        .mergeMap(action =>
            removeMedicacionFromEstudio(action.medicacion)
                .map(data =>
                    ({
                        type: FETCH_MEDICACION_ESTUDIO,
                        estudioId: data.response.estudio,
                        seccion: action.seccion,
                    }))
                .catch(() => (Rx.Observable.of({
                    type: DELETE_MEDICACION_ESTUDIO_ERROR,
                }))),
        );
}

export function addDefaultMedicacionToEstudioEpic(action$) {
    return action$.ofType(ADD_DEFAULT_MEDICACION_ESTUDIO)
        .mergeMap(action =>
            addDefaultMedicacionToEstudio(action.estudioId)
                .map(data =>
                    ({
                        type: FETCH_MEDICACION_ESTUDIO,
                        estudioId: data.response.estudio,
                        seccion: action.seccion,
                    }))
                .catch(() => (Rx.Observable.of({
                    type: ADD_DEFAULT_MEDICACION_ESTUDIO_ERROR,
                }))),
        );
}

export function deleteAllMedicacionEpic(action$) {
    return action$.ofType(DELETE_ALL_MEDICACION)
        .mergeMap(action =>
            deleteAllMedicacion(action.idEstudio)
                .mergeMap(() => Rx.Observable.of(
                    { type: DELETE_ALL_MEDICACION_SUCCESS },
                ))
                .catch(data => Rx.Observable.of(
                    { type: DELETE_ALL_MEDICACION_FAILED },
                    { type: ADD_ALERT, alert: createAlert(`Ocurrio un error al crear los montos: ${data.response.error}`, 'danger') },
                )));
}
