import initialState from './cajaReducerInitialState';
import { FETCH_MOVIMIENTOS_CAJA, LOAD_MOVIMIENTOS_CAJA_SUCCESS,
    LOAD_MOVIMIENTOS_CAJA_ERROR, CREATE_MOVIMIENTOS_CAJA,
    CREATE_MOVIMIENTOS_CAJA_SUCCESS, CREATE_MOVIMIENTOS_CAJA_FAILED,
    ASOCIAR_ESTUDIO, UPDATE_MOVIMIENTO_CAJA, UPDATE_MOVIMIENTO_CAJA_FAILED,
    UPDATE_MOVIMIENTO_CAJA_SUCCESS } from './actionTypes';

const PAGE_SIZE = 100;

const loadMovimientosCajaSuccess = (state, action) => ({
    ...state,
    movimientos: action.data.response.results,
    apiLoading: false,
    cantPages: Math.ceil(action.data.response.count / PAGE_SIZE),
    pageNumber: action.pageNumber,
});

const loadMovimientosCajaError = state => ({
    ...state,
    movimientos: [],
    apiLoading: false,
});

const actionsHandledByEpicReducer = state => ({
    ...state,
    apiLoading: true,
});

const actionsHandledByEpicReducerFinish = state => ({
    ...state,
    apiLoading: false,
});

const asociarEstudio = (state, action) => ({
    ...state,
    estudioAsociado: action.estudio,
});

export function cajaReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_MOVIMIENTOS_CAJA_SUCCESS:
            return loadMovimientosCajaSuccess(state, action);
        case LOAD_MOVIMIENTOS_CAJA_ERROR:
            return loadMovimientosCajaError(state, action);
        case CREATE_MOVIMIENTOS_CAJA:
        case FETCH_MOVIMIENTOS_CAJA:
        case UPDATE_MOVIMIENTO_CAJA:
            return actionsHandledByEpicReducer(state);
        case ASOCIAR_ESTUDIO:
            return asociarEstudio(state, action);
        case CREATE_MOVIMIENTOS_CAJA_SUCCESS:
        case UPDATE_MOVIMIENTO_CAJA_SUCCESS:
        case UPDATE_MOVIMIENTO_CAJA_FAILED:
        case CREATE_MOVIMIENTOS_CAJA_FAILED:
            return actionsHandledByEpicReducerFinish(state, action);
        default:
            return state;
    }
}
