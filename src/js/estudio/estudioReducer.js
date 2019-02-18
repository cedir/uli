import initialState from './estudioReducerInitialState';
import { FETCH_ESTUDIOS_DIARIOS, CANCEL_ESTUDIOS_DIARIOS,
    FETCH_ESTUDIO_DETAIL, FETCH_OBRAS_SOCIALES, LOAD_ESTUDIOS_DIARIOS,
    LOAD_ESTUDIO_DETAIL, RESET_ESTUDIO_DETAIL, LOAD_ESTUDIO_DETAIL_ERROR,
    UPDATE_SEARCH_PAGE, UPDATE_ESTUDIO, CREATE_ESTUDIO, LOAD_ESTUDIO_DETAIL_ID,
    FETCH_ESTUDIOS_IMPAGOS, LOAD_ESTUDIOS_IMPAGOS, PAGO_MEDICO_SUCCESS,
    RESET_ESTUDIOS_IMPAGOS } from './actionTypes';

const PAGE_SIZE = 100;

const fetchEstudiosReducer = (state, action) => {
    const newState = {};
    const actualPage = action.fetchEstudiosParams.actualPage;
    Object.assign(newState, state, { actualPage });

    return newState;
};

const actionsHandledByEpicReducer = (state) => {
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
    const { estudioDetail } = action;

    Object.assign(newState, state, { estudioDetail });

    return newState;
};

const loadEstudioDetailId = (state, action) => {
    const newState = {};

    const estudioDetail = {
        id: action.data.response.id,
    };

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

const loadEstudiosImpagos = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { estudiosImpagos: action.data.response });

    return newState;
};

const resetEstudiosImpagos = (state) => {
    const newState = {};
    Object.assign(newState, state, { estudiosImpagos: [] });

    return newState;
};

const handlePagoAMedicoSuccess = (state) => {
    const newState = {};
    Object.assign(newState, state, { estudiosImpagos: initialState.estudiosImpagos });

    return newState;
};

export function estudioReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ESTUDIOS_DIARIOS:
            return fetchEstudiosReducer(state, action);
        case CANCEL_ESTUDIOS_DIARIOS:
        case FETCH_ESTUDIO_DETAIL:
        case FETCH_OBRAS_SOCIALES:
        case UPDATE_ESTUDIO:
        case CREATE_ESTUDIO:
        case FETCH_ESTUDIOS_IMPAGOS:
            return actionsHandledByEpicReducer(state, action);
        case LOAD_ESTUDIOS_DIARIOS:
            return loadEstudiosDiariosReducer(state, action);
        case UPDATE_SEARCH_PAGE:
            return updateSearchPage(state, action);
        case LOAD_ESTUDIO_DETAIL:
            return loadEstudioDetail(state, action);
        case RESET_ESTUDIO_DETAIL:
            return resetEstudioDetail(state);
        case LOAD_ESTUDIO_DETAIL_ID:
            return loadEstudioDetailId(state, action);
        case LOAD_ESTUDIO_DETAIL_ERROR:
            return loadEstudioDetailErrorReducer(state);
        case LOAD_ESTUDIOS_IMPAGOS:
            return loadEstudiosImpagos(state, action);
        case RESET_ESTUDIOS_IMPAGOS:
            return resetEstudiosImpagos(state);
        case PAGO_MEDICO_SUCCESS:
            return handlePagoAMedicoSuccess(state);
        default:
            return state;
    }
}

