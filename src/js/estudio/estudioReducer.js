import initialState from './estudioReducerInitialState';
import * as types from './actionTypes';

const PAGE_SIZE = 100;

const fetchEstudiosReducer = (state) => {
    const newState = {};
    Object.assign(newState, state);

    return newState;
};

const loadEstudiosDiariosReducer = (state, action) => {
    const newState = {};
    const totalResultsCount = action.data.response.count;
    const resultPages = Math.floor(totalResultsCount / PAGE_SIZE) + 1;
    Object.assign(newState, state, { estudios: action.data.response.results, resultPages });

    return newState;
};

const updateSearchPage = (state, action) => {
    const newState = {};

    Object.assign(newState, state, { actualPage: action.actualPage });

    return newState;
};

export function estudioReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_ESTUDIOS_DIARIOS:
        case types.CANCEL_ESTUDIOS_DIARIOS:
        case types.FETCH_OBRAS_SOCIALES:
            return fetchEstudiosReducer(state);
        case types.LOAD_ESTUDIOS_DIARIOS:
            return loadEstudiosDiariosReducer(state, action);
        case types.UPDATE_SEARCH_PAGE:
            return updateSearchPage(state, action);
        default:
            return state;
    }
}

