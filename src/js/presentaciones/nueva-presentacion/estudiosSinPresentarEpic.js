import Rx from 'rxjs';
import {
    getEstudiosSinPresentarObraSocial,
    finalizarPresentacionObraSocial,
} from './api';
import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR,
    FINALIZAR_PRESENTACION_OBRA_SOCIAL,
    LOAD_PRESENTACION_DETAIL_ID }
    from './actionTypes';
import { createAlert } from '../../utilities/components/alert/alertUtility';
import { ADD_ALERT } from '../../utilities/components/alert/actionTypes';

export function estudiosSinPresentarEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL)
        .mergeMap(action =>
            getEstudiosSinPresentarObraSocial(action.id)
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Estudios cargados correctamente') },
                { type: LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL, data, idObraSocial: action.id },
            ))
            .catch(() => (Rx.Observable.of(
                { type: LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR },
                { type: ADD_ALERT, alert: createAlert('Error al intentar cargar los estudios', 'danger') },
            ))),
    );
}

export function finalizarPresentacionEpic(action$) {
    return action$.ofType(FINALIZAR_PRESENTACION_OBRA_SOCIAL)
        .mergeMap(action =>
            finalizarPresentacionObraSocial(action.presentacion)
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Presentación Finalizada') },
                { type: LOAD_PRESENTACION_DETAIL_ID, data },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al intentar finalizar presentacion', 'danger'),
            }))),
        );
}
