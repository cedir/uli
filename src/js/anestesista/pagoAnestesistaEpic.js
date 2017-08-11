import Rx from 'rxjs';
import * as types from './actionTypes';
import { config } from '../app/config';


export function pagoAnestesistaEpic(action$) {
    return action$.ofType(types.FETCH_PAGO_ANESTESISTA)
        .mergeMap(action =>
            Rx.Observable.ajax.getJSON(`${config.baseUrl}/api/anestesista/${action.id}/pago/${action.año}/${action.mes}/`)
            .map(data => ({ type: types.LOAD_PAGO_ANESTESISTA, data }))
            .takeUntil(action$.ofType(types.CANCEL_PAGO_ANESTESISTA)),
        );
}
