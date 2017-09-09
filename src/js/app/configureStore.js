import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './reducers';
import { saveStateLocally, removeStateLocally, loadLocallyPersistedState } from './persistStateLocally';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// TODO: esto lo hace asi Cory. Ver para que sirve y probarlo.

const initialState = {
    token: '',
};

const locallyPersistedState = loadLocallyPersistedState();

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
    rootReducer,
    locallyPersistedState,
    applyMiddleware(epicMiddleware),
    // TODO: esto lo hace asi Cory. Ver para que sirve y probarlo.
    // applyMiddleware(thunk, reduxImmutableStateInvariant())
);

store.subscribe(() => {
    const token = store.getState().login.token;
    if (token) {
        const modifiedInitialState = {};
        Object.assign(modifiedInitialState, initialState, { token });
        return saveStateLocally({ login: modifiedInitialState });
    }

    return removeStateLocally();
});

export default store;
