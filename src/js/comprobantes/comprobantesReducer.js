import initialState from './comprobantesReducuerInitialState';
import { FETCH_COMPROBANTES_PAGO,
    LOAD_COMPROBANTES_PAGO,
    LOAD_COMPROBANTES_PAGO_ERROR } from './actionTypes';

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

export function comprobantesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMPROBANTES_PAGO:
            return actionsHandledByEpicReducer(state);
        case LOAD_COMPROBANTES_PAGO:
            return loadComprobantesReducer(state, action);
        case LOAD_COMPROBANTES_PAGO_ERROR:
            return loadComprobantesErrorReducer(state);
        default:
            return state;
    }
}
