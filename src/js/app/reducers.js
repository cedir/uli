import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { estudioReducer } from '../estudio/estudioReducer';
import { pagoAnestesistaReducer } from '../anestesista/pagoAnestesistaReducer';
import { loginReducer } from '../login/loginReducer';

// API calls configurations
import { estudioEpic } from '../estudio/estudioEpic';
import { pagoAnestesistaEpic } from '../anestesista/pagoAnestesistaEpic';
import { loginEpic } from '../login/loginEpic';

export const rootEpic = combineEpics(
  estudioEpic,
  pagoAnestesistaEpic,
  loginEpic,
);

export const rootReducer = combineReducers({
    estudios: estudioReducer,
    pago_anestesista: pagoAnestesistaReducer,
    login: loginReducer,
});

