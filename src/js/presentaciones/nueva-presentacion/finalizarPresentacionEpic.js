import Rx from 'rxjs';
import { ADD_ALERT } from '../../utilities/components/alert/actionTypes';
import { createAlert } from '../../utilities/components/alert/alertUtility';
import { FINALIZAR_PRESENTACION_OBRA_SOCIAL, LOAD_PRESENTACION_DETAIL_ID } from './actionTypes';
import { finalizarPresentacionObraSocial } from './api';

export function finalizarPresentacionEpic(action$) {
    return action$.ofType(FINALIZAR_PRESENTACION_OBRA_SOCIAL)
        .mergeMap(action =>
            finalizarPresentacionObraSocial(action.presentacion)
            .mergeMap(data => Rx.Observable.of(
                { type: LOAD_PRESENTACION_DETAIL_ID, data },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al intentar finalizar presentacion', 'danger'),
            }))),
        );
}
