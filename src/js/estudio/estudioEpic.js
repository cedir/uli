import { getEstudios } from './api';
import * as types from './actionTypes';

export function estudioEpic(action$) {
    return action$.ofType('FETCH_ESTUDIOS_DIARIOS')
        .mergeMap(action =>
            getEstudios(action.fecha.fechaDesde, action.fecha.fechaHasta)
            .map(data => ({ type: types.LOAD_ESTUDIOS_DIARIOS, data }))
            .takeUntil(action$.ofType(types.CANCEL_ESTUDIOS_DIARIOS)),
    );
}

