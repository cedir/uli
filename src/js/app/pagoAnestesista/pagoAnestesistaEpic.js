import Rx from 'rxjs';
import { getJSON } from 'jquery';
import moment from 'moment';
import {config} from '../config';


export const pagoAnestesistaEpic = function(action$) {
  return action$.ofType("FETCH_PAGO_ANESTESISTA")
    .mergeMap(action =>
      Rx.Observable.ajax.getJSON(`${config.baseUrl}/api/anestesista/${action.id}/pago/${action.año}/${action.mes}/`)
        .map(data => ({ type: 'LOAD_PAGO_ANESTESISTA', data }))
        .takeUntil(action$.ofType("CANCEL_PAGO_ANESTESISTA"))
    );
};