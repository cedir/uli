import Rx from 'rxjs';

import { getJSON } from 'jquery';
import moment from 'moment';

const baseUrl = 'http://localhost:8000';
const today = () => moment().add(-1, 'days').format('YYYY-MM-DD');

export const estudioEpic = function(action$) {
  return action$.ofType("FETCH_ESTUDIOS_DIARIOS")
    .mergeMap(action =>
      Rx.Observable.ajax.getJSON(`${baseUrl}/api/estudio/?fecha_desde=${ today() }`)
        .map(data => ({ type: 'LOAD_ESTUDIOS_DIARIOS', data }))
        .takeUntil(action$.ofType("CANCEL_ESTUDIOS_DIARIOS"))
    );
};