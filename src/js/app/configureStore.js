import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './reducers';
import { saveStateLocally, removeStateLocally, loadLocallyPersistedState } from './persistStateLocally';
import { REDUX_LOGGER_STATUS } from './config';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// TODO: esto lo hace asi Cory. Ver para que sirve y probarlo.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    token: '',
};

const locallyPersistedState = loadLocallyPersistedState();

const epicMiddleware = createEpicMiddleware(rootEpic);

let middleware;
if (process.env.NODE_ENV !== 'production' && REDUX_LOGGER_STATUS) {
    /* eslint-disable import/no-extraneous-dependencies */
    /* eslint-disable global-require */
    const logger = require('redux-logger').logger;
    middleware = applyMiddleware(epicMiddleware, logger);
} else {
    middleware = applyMiddleware(epicMiddleware);
}

const store = createStore(
    rootReducer,
    locallyPersistedState,
    composeEnhancers(middleware),
    // TODO: esto lo hace asi Cory. Ver para que sirve y probarlo.
    // applyMiddleware(thunk, reduxImmutableStateInvariant())
);
store.subscribe(() => {
    const token = store.getState().login.token;
    const sucursal = store.getState().login.sucursal;
    if (token) {
        const modifiedInitialState = {};
        Object.assign(modifiedInitialState, initialState, { token, sucursal });
        return saveStateLocally({ login: modifiedInitialState });
    }

    return removeStateLocally();
});

export default store;
