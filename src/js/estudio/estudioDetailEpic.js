import Rx from 'rxjs';
import { getEstudio, eliminarEstudio } from './api';
import { FETCH_ESTUDIO_DETAIL,
    LOAD_ESTUDIO_DETAIL,
    LOAD_ESTUDIO_DETAIL_ERROR,
    CLONE_ESTUDIO,
    ELIMINAR_ESTUDIO,
    ELIMINAR_ESTUDIO_ERROR,
    ELIMINAR_ESTUDIO_SUCCES }
    from './actionTypes';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

export function estudioDetailEpic(action$) {
    return action$.ofType(FETCH_ESTUDIO_DETAIL)
        .mergeMap(action =>
            getEstudio(action.estudioId)
                .map(data => ({
                    type: LOAD_ESTUDIO_DETAIL,
                    estudioDetail: data.response,
                    updatePagoContraFactura:
                    action.setPagoContraFactura(data.response.es_pago_contra_factura === 1),
                }))
                .takeUntil(action$.ofType(LOAD_ESTUDIO_DETAIL_ERROR)),
        );
}

export function estudioEliminarEpic(action$) {
    return action$.ofType(ELIMINAR_ESTUDIO)
        .mergeMap(action =>
            eliminarEstudio(action.estudioId)
                .mergeMap(() => Rx.Observable.of(
                    {
                        type: ELIMINAR_ESTUDIO_SUCCES,
                        showModal: action.showModal(),
                        goBack: action.history.push('/estudios'),
                    },
                    { type: ADD_ALERT, alert: createAlert('El estudio se elimino correctamente.') },
                ))
                .catch(data => Rx.Observable.of(
                    {
                        type: ELIMINAR_ESTUDIO_ERROR,
                        showModal: action.showModal(),
                    },
                    { type: ADD_ALERT, alert: createAlert(data.response.error, 'danger') },
                )));
}

// This epic is for the flow of prefilling a estudio with the data of
// another existing one.
export function estudioDetailToCloneEpic(action$) {
    return action$.ofType(CLONE_ESTUDIO)
        .mergeMap(action =>
            getEstudio(action.estudioId)
                .map((data) => {
                    const { fecha,
                        medico,
                        medico_solicitante,
                        obra_social,
                        paciente,
                        anestesista } = data.response;

                    const estudioDetail = {
                        fecha,
                        medico,
                        medico_solicitante,
                        obra_social,
                        paciente,
                        anestesista,
                    };

                    return { type: LOAD_ESTUDIO_DETAIL, estudioDetail };
                })
                .catch(() => (Rx.Observable.of({
                    type: LOAD_ESTUDIO_DETAIL_ERROR,
                }))),
        );
}
