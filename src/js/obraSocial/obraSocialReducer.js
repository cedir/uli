import initialState from './obraSocialReducerInitialState';
import * as types from './actionTypes';

const fetchObrasSociales = (state) => {
    const newState = {};
    Object.assign(newState, state);

    return newState;
};

const loadObrasSocialesReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { obrasSociales: action.data.response });

    return newState;
};

const loadObrasSocialesErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { obrasSociales: [] });

    return newState;
};

export function obraSocialReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_OBRAS_SOCIALES:
            return fetchObrasSociales(state);
        case types.LOAD_OBRAS_SOCIALES:
            return loadObrasSocialesReducer(state, action);
        case types.LOAD_OBRAS_SOCIALES_ERROR:
            return loadObrasSocialesErrorReducer(state);
        default:
            return state;
    }
}
