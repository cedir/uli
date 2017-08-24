import * as types from './actionTypes';

const initialState = {
    lineasAra: [],
    lineasNoAra: [],
};

function loadPagoAnestesistaReducer(state, action) {
    const newState = {};
    const lineasAra = action.data.response.lineas_ARA;
    const lineasNoAra = action.data.response.lineas_no_ARA;
    Object.assign(newState, state, { lineasAra, lineasNoAra });
    return newState;
}

export function pagoAnestesistaReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_PAGO_ANESTESISTA:
        case types.CANCEL_PAGO_ANESTESISTA:
            return Object.assign({}, state);
        case types.LOAD_PAGO_ANESTESISTA:
            return loadPagoAnestesistaReducer(state, action);
        default:
            return state;
    }
}
