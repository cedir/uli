import Rx from 'rxjs';
import { finalizarPresentacionObraSocial } from './api';
import { FINALIZAR_PRESENTACION_OBRA_SOCIAL,
    FINALIZAR_PRESENTACION_OBRA_SOCIAL_ID } from './actionTypes';
import { ADD_ALERT, createAlert } from '../../utilities/components/alert/alertUtility';

export function finalizarPresentacionEpic(action$) {
    return action$.ofType(FINALIZAR_PRESENTACION_OBRA_SOCIAL)
        .mergeMap(action =>
            finalizarPresentacionObraSocial(action.presentacion)
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Presentacion creada correctamente') },
                { type: FINALIZAR_PRESENTACION_OBRA_SOCIAL_ID, data },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al intentar guardar la presentacion', 'danger'),
            }))),
        );
}
