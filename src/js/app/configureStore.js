import { createStore, applyMiddleware } from 'redux';
import { rootReducer, rootEpic } from './reducers';
import { createEpicMiddleware } from 'redux-observable';


// Middleware you want to use in production:  <-- TODO esto no se que onda!
//const enhancer = applyMiddleware(promise);
const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
    return createStore(
      rootReducer,
      applyMiddleware(epicMiddleware)
      );
}

