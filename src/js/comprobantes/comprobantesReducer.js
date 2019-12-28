import initialState from './comprobantesReducuerInitialState';
import * as types from './actionTypes';

const actionsHandledByEpicReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { comprobantesApiLoading: true });

    return newState;
};

const loadComprobantesReducer = (state, action) => {
    const newState = {};
    const comprobantes = action.data.response;
    Object.assign(newState, state, { comprobantes, comprobantesApiLoading: false });

    return newState;
};

const loadComprobantesErrorReducer = (state) => {
    const newState = {};
    Object
        .assign(newState, state, { comprobantes: initialState.comprobantes,
            comprobantesApiLoading: false });

    return newState;
};

const loadComprobantesAsociadosReducer = (state, action) => ({
    ...state,
    comprobantes_lista: action.data.response.results,
    comprobantesApiLoading: false,
});

const loadComprobantesAsociadosErrorReducer = state => ({
    ...state,
    comprobantesLista: initialState.comprobantesLista,
    comprobantesApiLoading: false,
});

export function comprobantesReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_COMPROBANTES_PAGO:
        case types.FETCH_COMPROBANTES_LISTA:
            return actionsHandledByEpicReducer(state);
        case types.LOAD_COMPROBANTES_PAGO:
            return loadComprobantesReducer(state, action);
        case types.LOAD_COMPROBANTES_PAGO_ERROR:
            return loadComprobantesErrorReducer(state);
        case types.LOAD_COMPROBANTES_LISTA_SUCCESS:
            return loadComprobantesAsociadosReducer(state, action);
        case types.LOAD_COMPROBANTES_LISTA_FAILED:
            return loadComprobantesAsociadosErrorReducer(state);
        default:
            return state;
    }
}
