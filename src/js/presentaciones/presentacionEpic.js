import Rx from 'rxjs';
import { getPresentacionesObraSocial } from './api';
import { FETCH_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR }
    from './actionTypes';

export function presentacionEpic(action$) {
    return action$.ofType(FETCH_PRESENTACIONES_OBRA_SOCIAL)
        .mergeMap(action =>
            getPresentacionesObraSocial(action.id)
            .map(data => ({ type: LOAD_PRESENTACIONES_OBRA_SOCIAL, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR,
            }))),
    );
}
