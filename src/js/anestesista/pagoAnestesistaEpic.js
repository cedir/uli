import { getPagoAnestesista } from './api';
import * as types from './actionTypes';


export function pagoAnestesistaEpic(action$) {
    return action$.ofType(types.FETCH_PAGO_ANESTESISTA)
        .mergeMap(action =>
            getPagoAnestesista(action.id, action.año, action.mes)
            .map(data => ({ type: types.LOAD_PAGO_ANESTESISTA, data }))
            .takeUntil(action$.ofType(types.CANCEL_PAGO_ANESTESISTA)),
        );
}
