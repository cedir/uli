import Rx from 'rxjs';
import { getObrasSociales } from './api';
import { FETCH_OBRAS_SOCIALES, LOAD_OBRAS_SOCIALES, LOAD_OBRAS_SOCIALES_ERROR }
    from './actionTypes';

export function obraSocialEpic(action$) {
    return action$.ofType(FETCH_OBRAS_SOCIALES)
        .mergeMap(() =>
            getObrasSociales()
            .map(data => ({ type: LOAD_OBRAS_SOCIALES, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_OBRAS_SOCIALES_ERROR,
            }))),
    );
}
