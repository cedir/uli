import initialState from './obraSocialReducerInitialState';
import * as types from './actionTypes';

const fetchObrasSociales = (state) => {
    const newState = {};
    Object.assign(newState, state, { apiLoading: true });

    return newState;
};

const loadObrasSocialesReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { obrasSociales: action.data.response, apiLoading: false });

    return newState;
};

const loadObrasSocialesErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { obrasSociales: [], apiLoading: false });

    return newState;
};

export function obraSocialReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_OBRAS_SOCIALES:
            return fetchObrasSociales(state);
        case types.LOAD_OBRAS_SOCIALES:
            return loadObrasSocialesReducer(state, action);
        case types.LOAD_OBRAS_SOCIALES_ERROR:
        case types.DELETE_OBRAS_SOCIALES:
            return loadObrasSocialesErrorReducer(state);
        default:
            return state;
    }
}
