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

const sendComprobanteAsociadoReducer = (state, action) => ({
    ...state,
    idComp: action.idComp,
    importe: action.importe,
    comprobantesApiLoading: true,
});

const createdComprobanteAsociadoSuccessReducer = (state, action) => ({
    ...state,
    comprobanteAsociado: action.comprobante.data,
    comprobantesApiLoading: false,
});

const createdComprobanteAsociadoFailedReducer = state => ({
    ...state,
    comprobanteAsociadoCreado: false,
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
        case types.SEND_COMPROBANTE_ASOCIADO:
            return sendComprobanteAsociadoReducer(state, action);
        case types.CREATED_COMPROBANTE_ASOCIADO_SUCCESS:
            return createdComprobanteAsociadoSuccessReducer(state, action);
        case types.CREATED_COMPROBANTE_ASOCIADO_FAILED:
            return createdComprobanteAsociadoFailedReducer(state);
        default:
            return state;
    }
}
