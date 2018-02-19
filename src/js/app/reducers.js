import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { combineEpics } from 'redux-observable';

import { estudioReducer } from '../estudio/estudioReducer';
import { obraSocialReducer } from '../obraSocial/obraSocialReducer';
import { medicoReducer } from '../medico/medicoReducer';
import { pagoAnestesistaReducer } from '../anestesista/pagoAnestesistaReducer';
import { medicacionReducer } from '../medicacion/medicacionReducer';
import { medicamentoReducer } from '../medicamento/medicamentoReducer';
import { loginReducer } from '../login/loginReducer';

// API calls configurations
import { estudioEpic } from '../estudio/estudioEpic';
import { estudioDetailEpic } from '../estudio/estudioDetailEpic';
import { obraSocialEpic } from '../obraSocial/obraSocialEpic';
import { medicosActuantesEpic, medicosSolicitantesEpic } from '../medico/medicoEpic';
import { pagoAnestesistaEpic } from '../anestesista/pagoAnestesistaEpic';
import { medicacionEpic, addMedicacionToEstudioEpic,
    removeMedicacionFromEstudioEpic } from '../medicacion/medicacionEpic';
import { medicamentosEpic } from '../medicamento/medicamentoEpic';
import { loginEpic } from '../login/loginEpic';

export const rootEpic = combineEpics(
    estudioEpic,
    estudioDetailEpic,
    obraSocialEpic,
    medicosActuantesEpic,
    medicosSolicitantesEpic,
    pagoAnestesistaEpic,
    medicacionEpic,
    addMedicacionToEstudioEpic,
    removeMedicacionFromEstudioEpic,
    medicamentosEpic,
    loginEpic,
);

export const rootReducer = combineReducers({
    estudiosReducer: estudioReducer,
    obraSocialReducer,
    medicoReducer,
    pago_anestesista: pagoAnestesistaReducer,
    medicacionReducer,
    medicamentoReducer,
    login: loginReducer,
    // redux-form reducer
    form: formReducer,
});
