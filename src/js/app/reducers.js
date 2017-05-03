import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';

import { userReducer } from './layout/userReducer';
import { estudioReducer } from './estudios/estudioReducer';
import { pagoAnestesistaReducer } from './pagoAnestesista/pagoAnestesistaReducer';

import { userEpic } from './layout/userEpic';
import { estudioEpic } from './estudios/estudioEpic';
import { pagoAnestesistaEpic } from './pagoAnestesista/pagoAnestesistaEpic';

export const rootEpic = combineEpics(
  userEpic,
  estudioEpic,
  pagoAnestesistaEpic
);

export const rootReducer = combineReducers({
    routing: routerReducer,
    user: userReducer,
    estudios: estudioReducer,
    pago_anestesista: pagoAnestesistaReducer
});

