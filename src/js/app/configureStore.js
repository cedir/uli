import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './reducers';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// TODO: esto lo hace asi Cory. Ver para que sirve y probarlo.

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
    return createStore(
      rootReducer,
      applyMiddleware(epicMiddleware),
      // TODO: esto lo hace asi Cory. Ver para que sirve y probarlo.
      // applyMiddleware(thunk, reduxImmutableStateInvariant())
      );
}

