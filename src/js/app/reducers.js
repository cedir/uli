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
import { loginReducer } from '../login/loginReducer';
import { alertReducer } from '../utilities/components/alert/alertReducer';

// API calls configurations
import { estudioEpic, updateEstudioEpic, createEstudioEpic } from '../estudio/estudioEpic';
import { estudioDetailEpic } from '../estudio/estudioDetailEpic';
import { obraSocialEpic } from '../obraSocial/obraSocialEpic';
import { medicosActuantesEpic, medicosSolicitantesEpic } from '../medico/medicoEpic';
import { pagoAnestesistaEpic, anestesistaEpic } from '../anestesista/pagoAnestesistaEpic';
import { medicacionEpic, addMedicacionToEstudioEpic,
    removeMedicacionFromEstudioEpic, addDefaultMedicacionToEstudioEpic } from '../medicacion/medicacionEpic';
import { medicamentosEpic } from '../medicamento/medicamentoEpic';
import { pacienteEpic } from '../paciente/pacienteEpic';
import { practicaEpic } from '../practica/practicaEpic';
import { loginEpic } from '../login/loginEpic';

export const rootEpic = combineEpics(
    estudioEpic,
    updateEstudioEpic,
    createEstudioEpic,
    estudioDetailEpic,
    obraSocialEpic,
    medicosActuantesEpic,
    medicosSolicitantesEpic,
    pagoAnestesistaEpic,
    anestesistaEpic,
    medicacionEpic,
    addMedicacionToEstudioEpic,
    removeMedicacionFromEstudioEpic,
    addDefaultMedicacionToEstudioEpic,
    medicamentosEpic,
    pacienteEpic,
    practicaEpic,
    loginEpic,
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
    login: loginReducer,
    alertReducer,
    // redux-form reducer
    form: formReducer,
});
