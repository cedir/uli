import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';

import { userReducer } from './layout/userReducer';
import { estudioReducer } from './estudios/estudioReducer';

import { userEpic } from './layout/userEpic';
import { estudioEpic } from './estudios/estudioEpic';

export const rootEpic = combineEpics(
  userEpic,
  estudioEpic
);

export const rootReducer = combineReducers({
    routing: routerReducer,
    user: userReducer,
    estudios: estudioReducer
});

