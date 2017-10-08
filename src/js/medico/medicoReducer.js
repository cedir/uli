import initialState from './medicoReducerInitialState';
import * as types from './actionTypes';

const fetchMedicos = (state) => {
    const newState = {};
    Object.assign(newState, state);

    return newState;
};

const loadMedicosReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { medicos: action.data.response });

    return newState;
};

const loadMedicosErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { medicos: [] });

    return newState;
};

export function medicoReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_MEDICOS:
            return fetchMedicos(state);
        case types.LOAD_MEDICOS:
            return loadMedicosReducer(state, action);
        case types.LOAD_MEDICOS_ERROR:
            return loadMedicosErrorReducer(state);
        default:
            return state;
    }
}
