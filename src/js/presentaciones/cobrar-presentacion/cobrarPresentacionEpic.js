import Rx from 'rxjs';
import { getPresentacion } from './api';
import {
    FETCH_DATOS_DE_UNA_PRESENTACION,
    FETCH_DATOS_DE_UNA_PRESENTACION_SUCCESS,
    FETCH_DATOS_DE_UNA_PRESENTACION_ERROR,
} from './actionTypes';
import { ADD_ALERT } from '../../utilities/components/alert/actionTypes';
import { createAlert } from '../../utilities/components/alert/alertUtility';

export function estudiosDeUnaPresentacionEpic(action$) {
    return action$.ofType(FETCH_DATOS_DE_UNA_PRESENTACION)
        .mergeMap(action =>
            getPresentacion(action.id)
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Estudios cargados correctamente') },
                {
                    type: FETCH_DATOS_DE_UNA_PRESENTACION_SUCCESS, data,
                    obraSocial: action.obraSocial,
                    id: action.id,
                    fecha: action.fecha,
                },
            ))
            .catch(() => (Rx.Observable.of(
                { type: FETCH_DATOS_DE_UNA_PRESENTACION_ERROR },
                { type: ADD_ALERT, alert: createAlert('Error al intentar cargar estudios', 'danger') },
            ))),
    );
}
