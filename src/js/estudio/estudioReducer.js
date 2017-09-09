import * as types from './actionTypes';

const initialState = {
    estudios: [],
};

const fetchEstudiosReducer = (state) => {
    const newState = {};
    Object.assign(newState, state);

    return newState;
};

const loadEstudiosDiariosReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { estudios: action.data.response.results });

    return newState;
};

export function estudioReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_ESTUDIOS_DIARIOS:
        case types.CANCEL_ESTUDIOS_DIARIOS:
            return fetchEstudiosReducer(state);
        case types.LOAD_ESTUDIOS_DIARIOS:
            return loadEstudiosDiariosReducer(state, action);
        default:
            return state;
    }
}

