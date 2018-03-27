import initialState from './estudioReducerInitialState';
import { FETCH_ESTUDIOS_DIARIOS, CANCEL_ESTUDIOS_DIARIOS,
    FETCH_ESTUDIO_DETAIL, FETCH_OBRAS_SOCIALES, LOAD_ESTUDIOS_DIARIOS,
    LOAD_ESTUDIO_DETAIL, RESET_ESTUDIO_DETAIL, LOAD_ESTUDIO_DETAIL_ERROR,
    UPDATE_SEARCH_PAGE, UPDATE_ESTUDIO } from './actionTypes';

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

const loadEstudioDetail = (state, action) => {
    const newState = {};
    const estudioDetail = action.data.response;

    Object.assign(newState, state, { estudioDetail });

    return newState;
};

const resetEstudioDetail = (state) => {
    const newState = {};
    const estudioDetail = {};

    Object.assign(newState, state, { estudioDetail });

    return newState;
};

const loadEstudioDetailErrorReducer = (state) => {
    const newState = {};
    const estudioDetail = initialState.estudioDetail;
    Object.assign(newState, state, { estudioDetail });

    return newState;
};

const updateSearchPage = (state, action) => {
    const newState = {};

    Object.assign(newState, state, { actualPage: action.actualPage });

    return newState;
};

export function estudioReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ESTUDIOS_DIARIOS:
        case CANCEL_ESTUDIOS_DIARIOS:
        case FETCH_ESTUDIO_DETAIL:
        case FETCH_OBRAS_SOCIALES:
        case UPDATE_ESTUDIO:
            return fetchEstudiosReducer(state);
        case LOAD_ESTUDIOS_DIARIOS:
            return loadEstudiosDiariosReducer(state, action);
        case UPDATE_SEARCH_PAGE:
            return updateSearchPage(state, action);
        case LOAD_ESTUDIO_DETAIL:
            return loadEstudioDetail(state, action);
        case RESET_ESTUDIO_DETAIL:
            return resetEstudioDetail(state);
        case LOAD_ESTUDIO_DETAIL_ERROR:
            return loadEstudioDetailErrorReducer(state);
        default:
            return state;
    }
}

