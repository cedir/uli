import initialState from './cajaReducerInitialState';
import { FETCH_MOVIMIENTOS_CAJA, LOAD_MOVIMIENTOS_CAJA, LOAD_MOVIMIENTOS_CAJA_ERROR } from './actionTypes';

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

export function cajaReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MOVIMIENTOS_CAJA:
            return fetchMovimientosCaja(state);
        case LOAD_MOVIMIENTOS_CAJA:
            return loadMovimientosCaja(state, action);
        case LOAD_MOVIMIENTOS_CAJA_ERROR:
            return loadMovimientosCajaError(state, action);
        default:
            return state;
    }
}
