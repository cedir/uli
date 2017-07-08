import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';

import { userReducer } from '../user/userReducer';
import { estudioReducer } from '../estudio/estudioReducer';
import { pagoAnestesistaReducer } from '../anestesista/pagoAnestesistaReducer';

// API calls configurations
import { userEpic } from '../user/userEpic';
import { estudioEpic } from '../estudio/estudioEpic';
import { pagoAnestesistaEpic } from '../anestesista/pagoAnestesistaEpic';

export const rootEpic = combineEpics(
  userEpic,
  estudioEpic,
  pagoAnestesistaEpic,
);

export const rootReducer = combineReducers({
    routing: routerReducer,
    user: userReducer,
    estudios: estudioReducer,
    pago_anestesista: pagoAnestesistaReducer,
});

