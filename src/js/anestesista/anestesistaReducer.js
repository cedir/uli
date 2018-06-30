import { FETCH_ANESTESISTAS, LOAD_ANESTESISTAS,
    LOAD_ANESTESISTAS_ERROR } from './actionTypes';
import initialState from './anestesistaReducerInitialState';

function fetchAnestesistasReducer(state) {
    const newState = {};

    Object.assign(newState, state, { anestesistasApiLoading: true });

    return newState;
}

function loadAnestesistasReducer(state, action) {
    const newState = {};
    const anestesistas = action.data.response;

    Object.assign(newState, state, { anestesistas, anestesistasApiLoading: false });

    return newState;
}

function loadAnestesistasErrorReducer(state) {
    const newState = {};
    const anestesistas = [];

    Object.assign(newState, state, { anestesistas, anestesistasApiLoading: false });

    return newState;
}

export function anestesistaReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ANESTESISTAS:
            return fetchAnestesistasReducer(state);
        case LOAD_ANESTESISTAS:
            return loadAnestesistasReducer(state, action);
        case LOAD_ANESTESISTAS_ERROR:
            return loadAnestesistasErrorReducer(state);
        default:
            return state;
    }
}
