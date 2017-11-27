import * as types from './actionTypes';

const initialState = {
    lineasAra: [],
    lineasNoAra: [],
};

function loadPagoAnestesistaReducer(state, action) {
    const newState = {};
    const lineasAra = action.data.response.lineas_ARA;
    const lineasNoAra = action.data.response.lineas_no_ARA;
    const anestesista = action.data.response.anestesista;
    const totalesAra = action.data.response.totales_ara;
    const subtotalesNoAra = action.data.response.subtotales_no_ara;
    const totalesIvaNoAra = action.data.response.totales_iva_no_ara;
    const totalesNoAra = action.data.response.totales_no_ara;
    Object.assign(newState, state,
        {
            lineasAra,
            lineasNoAra,
            anestesista,
            totalesAra,
            subtotalesNoAra,
            totalesIvaNoAra,
            totalesNoAra,
        });
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

