import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { combineEpics } from 'redux-observable';

import { estudioReducer } from '../estudio/estudioReducer';
import { obraSocialReducer } from '../obraSocial/obraSocialReducer';
import { medicoReducer } from '../medico/medicoReducer';
import { pagoAnestesistaReducer } from '../anestesista/pagoAnestesistaReducer';
import { anestesistaReducer } from '../anestesista/anestesistaReducer';
import { medicacionReducer } from '../medicacion/medicacionReducer';
import { medicamentoReducer } from '../medicamento/medicamentoReducer';
import { pacienteReducer } from '../paciente/pacienteReducer';
import { practicaReducer } from '../practica/practicaReducer';
import { presentacionReducer } from '../presentaciones/presentacionReducer';
import { loginReducer } from '../login/loginReducer';
import { alertReducer } from '../utilities/components/alert/alertReducer';
import { comprobantesReducer } from '../comprobantes/comprobantesReducer';
import { cajaReducer } from '../caja/cajaReducer';

// API calls configurations
import { estudioEpic, updateEstudioEpic, createEstudioEpic,
    estudioImpagosEpic, pagoAMedicoEpic, actualizaImportesEstudioEpic } from '../estudio/estudioEpic';
import { estudioDetailEpic, estudioDetailToCloneEpic } from '../estudio/estudioDetailEpic';
import { obraSocialEpic } from '../obraSocial/obraSocialEpic';
import { medicosActuantesEpic, medicosSolicitantesEpic,
    medicosEpic } from '../medico/medicoEpic';
import { pagoAnestesistaEpic, anestesistaEpic } from '../anestesista/pagoAnestesistaEpic';
import { medicacionEpic, addMedicacionToEstudioEpic,
    removeMedicacionFromEstudioEpic, addDefaultMedicacionToEstudioEpic } from '../medicacion/medicacionEpic';
import { medicamentosEpic } from '../medicamento/medicamentoEpic';
import { pacienteEpic } from '../paciente/pacienteEpic';
import { practicaEpic } from '../practica/practicaEpic';
import { presentacionEpic } from '../presentaciones/presentacionEpic';
import { loginEpic } from '../login/loginEpic';
import { comprobantesEpic } from '../comprobantes/comprobantesEpic';
import { movimientosCajaEpic } from '../caja/cajaEpic';

export const rootEpic = combineEpics(
    estudioEpic,
    updateEstudioEpic,
    actualizaImportesEstudioEpic,
    createEstudioEpic,
    estudioImpagosEpic,
    pagoAMedicoEpic,
    estudioDetailEpic,
    estudioDetailToCloneEpic,
    obraSocialEpic,
    medicosActuantesEpic,
    medicosSolicitantesEpic,
    medicosEpic,
    pagoAnestesistaEpic,
    anestesistaEpic,
    medicacionEpic,
    addMedicacionToEstudioEpic,
    removeMedicacionFromEstudioEpic,
    addDefaultMedicacionToEstudioEpic,
    medicamentosEpic,
    pacienteEpic,
    practicaEpic,
    presentacionEpic,
    loginEpic,
    comprobantesEpic,
    movimientosCajaEpic,
);

export const rootReducer = combineReducers({
    estudiosReducer: estudioReducer,
    obraSocialReducer,
    medicoReducer,
    pago_anestesista: pagoAnestesistaReducer,
    anestesistaReducer,
    medicacionReducer,
    medicamentoReducer,
    pacienteReducer,
    practicaReducer,
    presentacionReducer,
    login: loginReducer,
    alertReducer,
    comprobantesReducer,
    cajaReducer,
    // redux-form reducer
    form: formReducer,
});
