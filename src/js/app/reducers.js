import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';

import { userReducer } from './reducers/userReducer';
import { estudioReducer } from './reducers/estudioReducer';

import { userEpic } from './epics/userEpic';
import { estudioEpic } from './epics/estudioEpic';

export const rootEpic = combineEpics(
  userEpic,
  estudioEpic
);

export const rootReducer = combineReducers({
    routing: routerReducer,
    user: userReducer,
    estudios: estudioReducer
});

