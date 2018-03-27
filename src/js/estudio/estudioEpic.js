import Rx from 'rxjs';
import { getEstudios, updateEstudio } from './api';
import { FETCH_ESTUDIOS_DIARIOS, LOAD_ESTUDIOS_DIARIOS, CANCEL_ESTUDIOS_DIARIOS,
    UPDATE_ESTUDIO, ERROR_UPDATING_ESTUDIO }
    from './actionTypes';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

export function estudioEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_DIARIOS)
        .mergeMap(action =>
            getEstudios(action.fetchEstudiosParams)
            .map(data => ({ type: LOAD_ESTUDIOS_DIARIOS, data }))
            .takeUntil(action$.ofType(CANCEL_ESTUDIOS_DIARIOS)),
    );
}

export function updateEstudioEpic(action$) {
    return action$.ofType(UPDATE_ESTUDIO)
        .mergeMap(action =>
            updateEstudio(action.estudio)
            .map(() => ({ type: ADD_ALERT, alert: createAlert('Cambios guardados') }))
            .catch(() => (Rx.Observable.of({
                type: ERROR_UPDATING_ESTUDIO,
            }))),
        );
}
