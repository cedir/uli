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

const createComprobante = (state, action) => ({
    ...state,
    comprobante: action.comprobante,
    comprobantesApiLoading: true,
});

const createComprobanteSuccess = (state, action) => ({
    ...state,
    cae: action.cae,
    comprobantesApiLoading: false,
});

const createComprobanteFailed = state => ({
    ...state,
    comprobante: [],
    comprobantesApiLoading: false,
});

const deleteCae = state => ({
    ...state,
    cae: initialState.cae,
});

const fetchComprobanteSuccess = (state, action) => ({
    ...state,
    initialValues: {
        nombreCliente: action.comprobante.nombre_cliente,
        hola: console.log(action.comprobante),
        domicilioCliente: action.comprobante.domicilio_cliente,
        dni: action.comprobante.nro_cuit,
        condicionFiscal: action.comprobante.condicion_fiscal,
        responsable: action.comprobante.responsable,
        iva: action.comprobante.gravado.porcentaje,
        tipoComprobante: action.comprobante.tipo_comprobante.nombre,
        subTipo: action.comprobante.sub_tipo,
        lineas: action.comprobante.lineas.map(linea => ({
            concepto: linea.concepto,
            importeNeto: linea.importe_neto,
        })),
    },
});

const fetchComprobanteFailed = (state, action) => ({
    ...state,
    initialValues: state.comprobantes_lista.filter(c => c.id === action.id)[0],
});

export function comprobantesReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_COMPROBANTES_PAGO:
        case types.FETCH_COMPROBANTES_LISTA:
        case types.FETCH_COMPROBANTE:
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
        case types.CREATE_COMPROBANTE:
            return createComprobante(state, action);
        case types.CREATE_COMPROBANTE_SUCCESS:
            return createComprobanteSuccess(state, action);
        case types.CREATED_COMPROBANTE_FAILED:
            return createComprobanteFailed(state);
        case types.DELETE_CAE:
            return deleteCae(state);
        case types.FETCH_COMPROBANTE_SUCCESS:
            return fetchComprobanteSuccess(state, action);
        case types.FETCH_COMPROBANTE_FAILED:
            return fetchComprobanteFailed(state, action);
        default:
            return state;
    }
}
