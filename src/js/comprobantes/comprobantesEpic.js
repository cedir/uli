import Rx from 'rxjs';
import { getComprobantesPago } from './api';
import { FETCH_COMPROBANTES_PAGO,
    LOAD_COMPROBANTES_PAGO,
    LOAD_COMPROBANTES_PAGO_ERROR }
    from './actionTypes';

export function comprobantesEpic(action$) {
    return action$.ofType(FETCH_COMPROBANTES_PAGO)
        .mergeMap(action =>
            getComprobantesPago(action.data.anio, action.data.mes)
            .map(data => ({ type: LOAD_COMPROBANTES_PAGO, data }))
            .catch(() => (Rx.Observable.of({
                type: LOAD_COMPROBANTES_PAGO_ERROR,
            }))),
    );
}
