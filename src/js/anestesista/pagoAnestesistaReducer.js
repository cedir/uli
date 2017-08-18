import * as types from './actionTypes';

const pagoAnestesistaInitialState = { lineas: [], anestesista: {} };

export function pagoAnestesistaReducer(state = pagoAnestesistaInitialState, action) {
    switch (action.type) {
        case types.FETCH_PAGO_ANESTESISTA:
        case types.CANCEL_PAGO_ANESTESISTA:
            return [];
        case types.LOAD_PAGO_ANESTESISTA:
            return action.data;
        default:
            return state;
    }
}

