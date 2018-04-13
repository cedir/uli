import initialState from './practicaReducerInitialState';
import { FETCH_PRACTICAS, LOAD_PRACTICAS,
    LOAD_PRACTICAS_ERROR } from './actionTypes';

const fetchPracticaEstudiosReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { practicaApiLoading: true });

    return newState;
};

const loadPracticaReducer = (state, action) => {
    const newState = {};
    const practicas = action.data.response.results;
    Object.assign(newState, state, { practicas, practicaApiLoading: false });

    return newState;
};

const loadPracticaErrorReducer = (state) => {
    const newState = {};
    const practicas = initialState.practicas;
    Object.assign(newState, state, { practicas, practicaApiLoading: false });

    return newState;
};

export function practicaReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRACTICAS:
            return fetchPracticaEstudiosReducer(state);
        case LOAD_PRACTICAS:
            return loadPracticaReducer(state, action);
        case LOAD_PRACTICAS_ERROR:
            return loadPracticaErrorReducer(state);
        default:
            return state;
    }
}
