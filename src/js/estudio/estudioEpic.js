import Rx from 'rxjs';
import * as types from './actionTypes';
import {config} from '../app/config';

export const estudioEpic = function(action$) {
  return action$.ofType("FETCH_ESTUDIOS_DIARIOS")
    .mergeMap(action =>
      Rx.Observable.ajax.getJSON(`${config.baseUrl}/api/estudio/?fecha_desde=${action.fecha.fechaDesde}&fecha_hasta=${action.fecha.fechaHasta}`)
        .map(data => ({ type: types.LOAD_ESTUDIOS_DIARIOS, data }))
        .takeUntil(action$.ofType(types.CANCEL_ESTUDIOS_DIARIOS))
    );
};
