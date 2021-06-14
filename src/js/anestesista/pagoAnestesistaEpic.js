import Rx from 'rxjs';
import { getPagoAnestesista, getAnestesistasList } from './api';
import { FETCH_ANESTESISTAS, LOAD_ANESTESISTAS,
    LOAD_ANESTESISTAS_ERROR, FETCH_PAGO_ANESTESISTA,
    LOAD_PAGO_ANESTESISTA, CANCEL_PAGO_ANESTESISTA } from './actionTypes';

export function pagoAnestesistaEpic(action$) {
    return action$.ofType(FETCH_PAGO_ANESTESISTA)
        .mergeMap(action =>
            getPagoAnestesista(action.id, action.año, action.mes)
                .map(data => ({ type: LOAD_PAGO_ANESTESISTA, data }))
                .takeUntil(action$.ofType(CANCEL_PAGO_ANESTESISTA)),
        );
}

export function anestesistaEpic(action$) {
    return action$.ofType(FETCH_ANESTESISTAS)
        .mergeMap(() =>
            getAnestesistasList()
                .map(data => ({ type: LOAD_ANESTESISTAS, data }))
                .catch(() => (Rx.Observable.of({
                    type: LOAD_ANESTESISTAS_ERROR,
                }))),
        );
}
