import Rx from 'rxjs';
import { getMovimientos } from './api';
import { FETCH_MOVIMIENTOS_CAJA, LOAD_MOVIMIENTOS_CAJA, LOAD_MOVIMIENTOS_CAJA_ERROR }
    from './actionTypes';

export function movimientosCajaEpic(action$) {
    return action$.ofType(FETCH_MOVIMIENTOS_CAJA)
        .mergeMap(() =>
            getMovimientos()
            .map(data => ({ type: LOAD_MOVIMIENTOS_CAJA, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_MOVIMIENTOS_CAJA_ERROR,
            }))),
    );
}
