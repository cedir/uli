import Rx from 'rxjs';
import { getDatosDeUnaPresentacion, cobrarPresentacion } from './api';
import {
    FETCH_DATOS_DE_UNA_PRESENTACION,
    FETCH_DATOS_DE_UNA_PRESENTACION_SUCCESS,
    FETCH_DATOS_DE_UNA_PRESENTACION_FAILED,
    COBRAR_PRESENTACION,
    COBRAR_PRESENTACION_SUCCESS,
    COBRAR_PRESENTACION_FAILED,
} from './actionTypes';
import { ADD_ALERT } from '../../utilities/components/alert/actionTypes';
import { createAlert } from '../../utilities/components/alert/alertUtility';

export function getDatosDeUnaPresentacionEpic(action$) {
    return action$.ofType(FETCH_DATOS_DE_UNA_PRESENTACION)
        .mergeMap(action =>
            getDatosDeUnaPresentacion(action.id)
            .mergeMap(data => Rx.Observable.of(
                {
                    type: FETCH_DATOS_DE_UNA_PRESENTACION_SUCCESS,
                    presentacion: data.response,
                    obraSocial: action.obraSocial,
                    id: action.id,
                    fecha: action.fecha,
                },
                { type: ADD_ALERT, alert: createAlert('Estudios cargados correctamente') },
            ))
            .catch(() => (Rx.Observable.of(
                { type: FETCH_DATOS_DE_UNA_PRESENTACION_FAILED },
                { type: ADD_ALERT, alert: createAlert('Error al intentar cargar estudios', 'danger') },
            ))),
    );
}

export function cobrarPresentacionEpic(action$) {
    return action$.ofType(COBRAR_PRESENTACION)
        .mergeMap(action =>
            cobrarPresentacion(
                action.idPresentacion,
                action.estudios,
                action.nroRecibo,
                action.retencionImpositiva,
            )
            .mergeMap(data => Rx.Observable.of(
                { type: ADD_ALERT, alert: createAlert('Presentacion cobrada') },
                {
                    type: COBRAR_PRESENTACION_SUCCESS,
                    diferencia: data.response.diferencia_facturada,
                },
            ))
            .catch(data => (Rx.Observable.of(
                { type: COBRAR_PRESENTACION_FAILED },
                { type: ADD_ALERT, alert: createAlert(`Error al dar de cobro la presentacion. ${data.response.error}`, 'danger') },
            ))),
    );
}
