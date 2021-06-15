import Rx from 'rxjs';
import { getPracticas } from './api';
import { FETCH_PRACTICAS, LOAD_PRACTICAS,
    LOAD_PRACTICAS_ERROR }
    from './actionTypes';

export function practicaEpic(action$) {
    return action$.ofType(FETCH_PRACTICAS)
        .mergeMap(action =>
            getPracticas(action.searchText)
                .map(data => ({ type: LOAD_PRACTICAS, data }))
                .catch(() => (Rx.Observable.of({
                    type: LOAD_PRACTICAS_ERROR,
                }))),
        );
}
