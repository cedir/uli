import Rx from 'rxjs';
import { getMedicamentosByDescription } from './api';
import { FETCH_MEDICAMENTOS, LOAD_MEDICAMENTOS, LOAD_MEDICAMENTOS_ERROR }
    from './actionTypes';

export function medicamentosEpic(action$) {
    return action$.ofType(FETCH_MEDICAMENTOS)
        .mergeMap(action =>
            getMedicamentosByDescription(action.descripcion)
                .map(data => ({ type: LOAD_MEDICAMENTOS, data }))
                .catch(() => (Rx.Observable.of({
                    type: LOAD_MEDICAMENTOS_ERROR,
                }))),
        );
}
