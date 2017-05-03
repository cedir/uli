export function pagoAnestesistaReducer(state={}, action){
    switch(action.type){
        case 'FETCH_PAGO_ANESTESISTA':
        case 'CANCEL_PAGO_ANESTESISTA':
            return [];
        case 'LOAD_PAGO_ANESTESISTA':
            return action.data;
        default:
            return state;
    }
}