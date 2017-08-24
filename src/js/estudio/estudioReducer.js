import * as types from './actionTypes';

const loginEmailReducer = (state) => {
    const newState = {};
    Object.assign(newState, state);

    return newState;
};

export function estudioReducer(state = [], action) {
    switch (action.type) {
        case types.FETCH_ESTUDIOS_DIARIOS:
        case types.CANCEL_ESTUDIOS_DIARIOS:
            return [];
        case types.LOAD_ESTUDIOS_DIARIOS:
            return loginEmailReducer(state, action);
        default:
            return state;
    }
}

