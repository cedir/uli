import { getEstudios } from './api';
import { FETCH_ESTUDIOS_DIARIOS, LOAD_ESTUDIOS_DIARIOS, CANCEL_ESTUDIOS_DIARIOS }
    from './actionTypes';

export function estudioEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_DIARIOS)
        .mergeMap(action =>
            getEstudios(action.fetchEstudiosParams)
            .map(data => ({ type: LOAD_ESTUDIOS_DIARIOS, data }))
            .takeUntil(action$.ofType(CANCEL_ESTUDIOS_DIARIOS)),
    );
}

