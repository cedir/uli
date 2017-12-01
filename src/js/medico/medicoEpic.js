import Rx from 'rxjs';
import { getMedicos } from './api';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES, LOAD_MEDICOS_ACTUANTES,
    LOAD_MEDICOS_SOLICITANTES, LOAD_MEDICOS_ACTUANTES_ERROR, LOAD_MEDICOS_SOLICITANTES_ERROR }
    from './actionTypes';

export function medicosActuantesEpic(action$) {
    return action$.ofType(FETCH_MEDICOS_ACTUANTES)
        .mergeMap(action =>
            getMedicos(action.searchParams)
            .map(data => ({ type: LOAD_MEDICOS_ACTUANTES, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_MEDICOS_ACTUANTES_ERROR,
            }))),
    );
}

export function medicosSolicitantesEpic(action$) {
    return action$.ofType(FETCH_MEDICOS_SOLICITANTES)
        .mergeMap(action =>
            getMedicos(action.searchParams)
            .map(data => ({ type: LOAD_MEDICOS_SOLICITANTES, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_MEDICOS_SOLICITANTES_ERROR,
            }))),
    );
}
