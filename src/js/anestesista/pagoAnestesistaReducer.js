import * as types from './actionTypes';

export function pagoAnestesistaReducer(state={}, action){
    switch(action.type){
        case types.FETCH_PAGO_ANESTESISTA:
        case types.CANCEL_PAGO_ANESTESISTA:
            return [];
        case types.LOAD_PAGO_ANESTESISTA:
            return action.data;
        default:
            return state;
    }
}

