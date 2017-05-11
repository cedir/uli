import Rx from 'rxjs';

const baseUrl = 'http://localhost:8000';

export const estudioEpic = function(action$) {
  return action$.ofType("FETCH_ESTUDIOS_DIARIOS")
    .mergeMap(action =>
      Rx.Observable.ajax.getJSON(`${baseUrl}/api/estudio/?fecha_desde=${action.fecha.fechaDesde}&fecha_hasta=${action.fecha.fechaHasta}`)
        .map(data => ({ type: 'LOAD_ESTUDIOS_DIARIOS', data }))
        .takeUntil(action$.ofType("CANCEL_ESTUDIOS_DIARIOS"))
    );
};
