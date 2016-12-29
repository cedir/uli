import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';

import { userReducer } from './reducers/userReducer';
import { userEpic } from './epics/userEpic';

export const rootEpic = combineEpics(
  userEpic
);

export const rootReducer = combineReducers({
    routing: routerReducer,
    user: userReducer
});

