import Rx from 'rxjs';
import moment from 'moment';
import { getEstudio } from './api';
import { FETCH_ESTUDIO_DETAIL,
    LOAD_ESTUDIO_DETAIL,
    LOAD_ESTUDIO_DETAIL_ERROR,
    CLONE_ESTUDIO }
    from './actionTypes';

export function estudioDetailEpic(action$) {
    return action$.ofType(FETCH_ESTUDIO_DETAIL)
        .mergeMap(action =>
            getEstudio(action.estudioId)
            .map(data => ({ type: LOAD_ESTUDIO_DETAIL, estudioDetail: data.response }))
            .takeUntil(action$.ofType(LOAD_ESTUDIO_DETAIL_ERROR)),
    );
}

// This epic is for the flow of prefilling a estudio with the data of
// another existing one.
export function estudioDetailToCloneEpic(action$) {
    return action$.ofType(CLONE_ESTUDIO)
        .mergeMap(action =>
            getEstudio(action.estudioId)
            .map((data) => {
                const { medico,
                    medico_solicitante,
                    obra_social,
                    paciente } = data.response;

                const estudioDetail = {
                    fecha: moment().format('YYYY-MM-DD'),
                    medico,
                    medico_solicitante,
                    obra_social,
                    paciente,
                };

                return { type: LOAD_ESTUDIO_DETAIL, estudioDetail };
            })
            .catch(() => (Rx.Observable.of({
                type: LOAD_ESTUDIO_DETAIL_ERROR,
            }))),
    );
}
