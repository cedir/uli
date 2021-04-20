import Rx from 'rxjs';
import { getCantidadTurnos } from './api';
import {
    FETCH_CANTIDAD_TURNOS,
    FETCH_CANTIDAD_TURNOS_SUCCESS,
    FETCH_CANTIDAD_TURNOS_FAILED,
} from './actionTypes';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

export function contadorTurnosEpic(action$) {
    return action$.ofType(FETCH_CANTIDAD_TURNOS)
        .mergeMap(action => getCantidadTurnos(action.usuarios, action.tiempo)
            .mergeMap(data => Rx.Observable.of({
                type: FETCH_CANTIDAD_TURNOS_SUCCESS,
                cantidadTurnos: data.response,
            }))
            .catch(() => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Error al cargar los turnos', 'danger') },
                { type: FETCH_CANTIDAD_TURNOS_FAILED },
            {})),
        );
}
