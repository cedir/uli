import * as types from './actionTypes';

export function estudioReducer(state=[], action){
    switch(action.type){
        case types.FETCH_ESTUDIOS_DIARIOS:
        case types.CANCEL_ESTUDIOS_DIARIOS:
            return [];
        case types.LOAD_ESTUDIOS_DIARIOS:
            return action.data.results;
        default:
            return state;
    }
}

