import 'rxjs';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { merge } from 'rxjs/observable/merge';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { getJSON } from 'jquery';
import moment from 'moment';

const baseUrl = 'http://localhost:8000';
const today = () => moment().add(-1, 'days').format('YYYY-MM-DD');

export const estudioEpic = function(action$) {
  return action$.ofType("FETCH_ESTUDIOS_DIARIOS")
    .mergeMap(action =>
      fromPromise(getJSON(`${baseUrl}/api/estudio/?fecha_desde=${ today() }`))
        .map(data => ({ type: 'LOAD_ESTUDIOS_DIARIOS', data }))
        .takeUntil(action$.ofType("FETCH_ESTUDIOS_DIARIOS_CANCELLED"))
    );
};