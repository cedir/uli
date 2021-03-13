import initialState from './cajaReducerInitialState';
import { FETCH_MOVIMIENTOS_CAJA, LOAD_MOVIMIENTOS_CAJA,
    LOAD_MOVIMIENTOS_CAJA_ERROR, CREATE_MOVIMIENTOS_CAJA,
    CREATE_MOVIMIENTOS_CAJA_SUCCESS, CREATE_MOVIMIENTOS_CAJA_FAILED,
    ASOCIAR_ESTUDIO } from './actionTypes';

const fetchMovimientosCaja = (state) => {
    const newState = {};
    Object.assign(newState, state);

    return newState;
};

const loadMovimientosCaja = (state, action) => {
    const newState = {};
    const newValues = {
        movimientos: action.data.response.results,
    };
    Object.assign(newState, state, newValues);

    return newState;
};

const loadMovimientosCajaError = (state) => {
    const newState = {};
    Object.assign(newState, state, { movimientos: [] });

    return newState;
};

const createMovimientosCaja = state => ({
    ...state,
    apiIsLoading: true,
});

const createMovimientosCajaFailed = state => ({
    ...state,
    apiIsLoading: false,
});

const createMovimientosCajaSuccess = state => ({
    ...state,
    apiIsLoading: false,
});

const asociarEstudio = (state, action) => ({
    ...state,
    estudioAsociado: action.estudio,
});

export function cajaReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MOVIMIENTOS_CAJA:
            return fetchMovimientosCaja(state);
        case LOAD_MOVIMIENTOS_CAJA:
            return loadMovimientosCaja(state, action);
        case LOAD_MOVIMIENTOS_CAJA_ERROR:
            return loadMovimientosCajaError(state, action);
        case CREATE_MOVIMIENTOS_CAJA:
            return createMovimientosCaja(state);
        case CREATE_MOVIMIENTOS_CAJA_FAILED:
            return createMovimientosCajaFailed(state);
        case CREATE_MOVIMIENTOS_CAJA_SUCCESS:
            return createMovimientosCajaSuccess(state);
        case ASOCIAR_ESTUDIO:
            return asociarEstudio(state, action);
        default:
            return state;
    }
}
