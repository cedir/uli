import Rx from 'rxjs';
import { destroy } from 'redux-form';
import {
    getEstudios, updateEstudio, createEstudio, getEstudiosImpagos, createPagoAMedico,
    actualizaImportesEstudio, realizarPagoContraFactura, anularPagoContraFactura,
    getEstudiosConAsociados,
} from './api';
import { FETCH_ESTUDIOS_DIARIOS, LOAD_ESTUDIOS_DIARIOS, CANCEL_ESTUDIOS_DIARIOS,
    UPDATE_ESTUDIO, ERROR_UPDATING_ESTUDIO, CREATE_ESTUDIO, LOAD_ESTUDIO_DETAIL_ID,
    FETCH_ESTUDIOS_IMPAGOS, LOAD_ESTUDIOS_IMPAGOS, SEND_PAGO_MEDICO, PAGO_MEDICO_SUCCESS,
    PAGO_MEDICO_ERROR, ACTULIZA_IMPORTES_ESTUDIO, REALIZAR_PAGO_CONTRA_FACTURA,
    ANULAR_PAGO_CONTRA_FACTURA, FETCH_ESTUDIOS_CON_MOVIMIENTOS }
    from './actionTypes';
import { ADD_ALERT } from '../utilities/components/alert/actionTypes';
import { createAlert } from '../utilities/components/alert/alertUtility';

export function estudioEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_DIARIOS)
        .mergeMap(action =>
            getEstudios(action.fetchEstudiosParams)
                .map(data => ({ type: LOAD_ESTUDIOS_DIARIOS, data }))
                .takeUntil(action$.ofType(CANCEL_ESTUDIOS_DIARIOS)),
        );
}

export function estudioConAsociadosEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_CON_MOVIMIENTOS)
        .mergeMap(action =>
            getEstudiosConAsociados(action.fetchEstudiosParams)
                .mergeMap(data => Rx.Observable.of(
                    { type: LOAD_ESTUDIOS_DIARIOS, data },
                ))
                .catch(() => (Rx.Observable.of(
                    { type: ADD_ALERT, alert: createAlert('Error al intentar cargar estudios', 'danger') },
                    { type: CANCEL_ESTUDIOS_DIARIOS },
                ))),
        );
}

export function updateEstudioEpic(action$) {
    return action$.ofType(UPDATE_ESTUDIO)
        .mergeMap(action =>
            updateEstudio(action.estudio)
                .map(() => ({ type: ADD_ALERT, alert: createAlert('Cambios guardados') }))
                .catch(() => (Rx.Observable.of({
                    type: ERROR_UPDATING_ESTUDIO,
                }))),
        );
}

export function createEstudioEpic(action$) {
    return action$.ofType(CREATE_ESTUDIO)
        .mergeMap(action =>
            createEstudio(action.estudio)
                .mergeMap(data => Rx.Observable.of(
                    { type: ADD_ALERT, alert: createAlert('Estudio creado correctamente') },
                    { type: LOAD_ESTUDIO_DETAIL_ID, data },
                ))
                .catch(() => (Rx.Observable.of({
                    type: ADD_ALERT, alert: createAlert('Error al intentar guardar estudio', 'danger'),
                }))),
        );
}

export function estudioImpagosEpic(action$) {
    return action$.ofType(FETCH_ESTUDIOS_IMPAGOS)
        .mergeMap(action =>
            getEstudiosImpagos(action.fetchEstudiosParams.medicoActuante[0])
                .map(data => ({ type: LOAD_ESTUDIOS_IMPAGOS, data }))
                .takeUntil(action$.ofType(CANCEL_ESTUDIOS_DIARIOS)),
        );
}

export function pagoAMedicoEpic(action$) {
    return action$.ofType(SEND_PAGO_MEDICO)
        .mergeMap(action =>
            createPagoAMedico(action.pago)
                .mergeMap(() => Rx.Observable.of(
                // for a success pago creation, create an alert msg and reset all data
                // of selected medico and estudios impagos.
                    { type: ADD_ALERT, alert: createAlert('Pago creado correctamente') },
                    { type: PAGO_MEDICO_SUCCESS },
                    destroy('editImportesPagoMedicos'),
                    destroy('searchEstudiosImpagosMedico'),
                ))
                .catch(() => (Rx.Observable.of(
                // if an error happens creating a pago, alert the user.
                    { type: ADD_ALERT, alert: createAlert('Error al crear el pago') },
                    { type: PAGO_MEDICO_ERROR },
                ))),
        );
}

export function realizarPagoContraFacturaEpic(action$) {
    return action$.ofType(REALIZAR_PAGO_CONTRA_FACTURA)
        .mergeMap(action =>
            realizarPagoContraFactura(action.datos)
                .map(() => ({ type: ADD_ALERT, alert: createAlert('Cambios guardados'), actPagoContraFactura: action.datos.setPagoContraFactura(true) }))
                .catch(data => (Rx.Observable.of({
                    type: ADD_ALERT, alert: createAlert(`Error al realizar el pago contra factura.\n${data.response.error}`, 'danger'),
                }))),
        );
}

export function anularPagoContraFacturaEpic(action$) {
    return action$.ofType(ANULAR_PAGO_CONTRA_FACTURA)
        .mergeMap(action =>
            anularPagoContraFactura(action.datos)
                .map(() => ({ type: ADD_ALERT, alert: createAlert('Cambios guardados'), actPagoContraFactura: action.datos.setPagoContraFactura(false) }))
                .catch(data => (Rx.Observable.of({
                    type: ADD_ALERT, alert: createAlert(`Error al anular el pago contra factura.\n${data.response.error}`, 'danger'),
                }))),
        );
}

export function actualizaImportesEstudioEpic(action$) {
    return action$.ofType(ACTULIZA_IMPORTES_ESTUDIO)
        .mergeMap(action =>
            actualizaImportesEstudio(action.importes)
                .map(() => ({ type: ADD_ALERT, alert: createAlert('Cambios guardados') }))
                .catch(() => (Rx.Observable.of({
                    type: ADD_ALERT, alert: createAlert('Error al actualizar importes', 'danger'),
                }))),
        );
}
