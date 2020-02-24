import Rx from 'rxjs';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';
import { ABRIR_PRESENTACION, LOAD_PRESENTACION_ABIERTA } from './actionTypes';
import { patchAbrirPresentacion } from './api';

export function abrirPresentacionEpic(action$) {
    return action$.ofType(ABRIR_PRESENTACION)
        .mergeMap(action =>
            patchAbrirPresentacion(action.id)
            .mergeMap(data => Rx.Observable.of(
                { type: LOAD_PRESENTACION_ABIERTA, data },
            ))
            .catch(() => (Rx.Observable.of({
                type: ADD_ALERT, alert: createAlert('Error al abrir la presentacion', 'danger'),
            }))),
        );
}
