import Rx from 'rxjs';
import { getPacientes } from './api';
import { FETCH_PACIENTES, LOAD_PACIENTES, LOAD_PACIENTES_ERROR }
    from './actionTypes';

export function pacienteEpic(action$) {
    return action$.ofType(FETCH_PACIENTES)
        .mergeMap(action =>
            getPacientes(action.searchText)
                .map(data => ({ type: LOAD_PACIENTES, data }))
                .catch(() => (Rx.Observable.of({
                    type: LOAD_PACIENTES_ERROR,
                }))),
        );
}
