import { getEstudio } from './api';
import { FETCH_ESTUDIO_DETAIL, LOAD_ESTUDIO_DETAIL, LOAD_ESTUDIO_DETAIL_ERROR }
    from './actionTypes';

export function estudioDetailEpic(action$) {
    return action$.ofType(FETCH_ESTUDIO_DETAIL)
        .mergeMap(action =>
            getEstudio(action.estudioId)
            .map(data => ({ type: LOAD_ESTUDIO_DETAIL, data }))
            .takeUntil(action$.ofType(LOAD_ESTUDIO_DETAIL_ERROR)),
    );
}
