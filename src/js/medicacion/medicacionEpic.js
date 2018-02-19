import Rx from 'rxjs';
import { getMedicacion, addMedicactionToEstudio,
    removeMedicacionFromEstudio } from './api';
import { FETCH_MEDICACION_ESTUDIO, LOAD_MEDICACION_ESTUDIO,
    LOAD_MEDICACION_ESTUDIO_ERROR, ADD_MEDICACION_ESTUDIO,
    ADD_MEDICACION_ESTUDIO_ERROR, DELETE_MEDICACION_ESTUDIO,
    DELETE_MEDICACION_ESTUDIO_ERROR }
    from './actionTypes';

export function medicacionEpic(action$) {
    return action$.ofType(FETCH_MEDICACION_ESTUDIO)
        .mergeMap(action =>
            getMedicacion(action.estudioId)
            .map(data => ({ type: LOAD_MEDICACION_ESTUDIO, data }))
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
                ({ type: FETCH_MEDICACION_ESTUDIO, estudioId: data.response.estudio }))
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
            ({ type: FETCH_MEDICACION_ESTUDIO, estudioId: data.response.estudio }))
        .catch(() => (Rx.Observable.of({
            type: DELETE_MEDICACION_ESTUDIO_ERROR,
        }))),
    );
}
