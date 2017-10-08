import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { combineEpics } from 'redux-observable';

import { estudioReducer } from '../estudio/estudioReducer';
import { obraSocialReducer } from '../obraSocial/obraSocialReducer';
import { medicoReducer } from '../medico/medicoReducer';
import { pagoAnestesistaReducer } from '../anestesista/pagoAnestesistaReducer';
import { loginReducer } from '../login/loginReducer';

// API calls configurations
import { estudioEpic } from '../estudio/estudioEpic';
import { obraSocialEpic } from '../obraSocial/obraSocialEpic';
import { medicoEpic } from '../medico/medicoEpic';
import { pagoAnestesistaEpic } from '../anestesista/pagoAnestesistaEpic';
import { loginEpic } from '../login/loginEpic';

export const rootEpic = combineEpics(
    estudioEpic,
    obraSocialEpic,
    medicoEpic,
    pagoAnestesistaEpic,
    loginEpic,
);

export const rootReducer = combineReducers({
    estudiosReducer: estudioReducer,
    obraSocialReducer,
    medicoReducer,
    pago_anestesista: pagoAnestesistaReducer,
    login: loginReducer,
    // redux-form reducer
    form: formReducer,
});

