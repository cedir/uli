import Rx from 'rxjs';
import { getMedicos } from './api';
import { FETCH_MEDICOS, LOAD_MEDICOS, LOAD_MEDICOS_ERROR }
    from './actionTypes';

export function medicoEpic(action$) {
    return action$.ofType(FETCH_MEDICOS)
        .mergeMap(action =>
            getMedicos(action.searchText)
            .map(data => ({ type: LOAD_MEDICOS, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_MEDICOS_ERROR,
            }))),
    );
}
