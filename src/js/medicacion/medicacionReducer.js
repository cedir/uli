import initialState from './medicacionReducerInitialState';
import { FETCH_MEDICACION_ESTUDIO, LOAD_MEDICACION_ESTUDIO,
    LOAD_MEDICACION_ESTUDIO_ERROR, ADD_MEDICACION_ESTUDIO,
    ADD_MEDICACION_ESTUDIO_ERROR, DELETE_MEDICACION_ESTUDIO_ERROR,
    ADD_DEFAULT_MEDICACION_ESTUDIO, CLEAN_MEDICACIONES_STORE,
    ADD_DEFAULT_MEDICACION_ESTUDIO_ERROR, DELETE_ALL_MEDICACION,
    DELETE_ALL_MEDICACION_SUCCESS, DELETE_ALL_MEDICACION_FAILED } from './actionTypes';

const actionsHandledByEpicReducer = state => ({
    ...state,
    apiLoading: true,
});

const loadMedicacionReducer = (state, action) => {
    const newState = {};
    const medicaciones = action.data.response;
    Object.assign(newState, state, { medicaciones, apiLoading: false });

    return newState;
};

const loadMedicacionErrorReducer = (state) => {
    const newState = {};
    const medicaciones = initialState.medicaciones;
    Object.assign(newState, state, { medicaciones, apiLoading: false });

    return newState;
};

const addMedicacionToEstudio = (state) => {
    const newState = {};
    Object.assign(newState, state);

    return newState;
};

function cleanMedicacionesStoreReducer(state) {
    return {
        ...state,
        medicaciones: [],
    };
}

const deleteAllMediacionSuccess = state => ({
    ...state,
    apiLoading: false,
    medicaciones: [],
});

const deleteAllMediacionFailed = state => ({
    ...state,
    apiLoading: false,
});

export function medicacionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MEDICACION_ESTUDIO:
        case DELETE_ALL_MEDICACION:
            return actionsHandledByEpicReducer(state);
        case LOAD_MEDICACION_ESTUDIO:
            return loadMedicacionReducer(state, action);
        case LOAD_MEDICACION_ESTUDIO_ERROR:
            return loadMedicacionErrorReducer(state);
        case DELETE_ALL_MEDICACION_SUCCESS:
            return deleteAllMediacionSuccess(state);
        case DELETE_ALL_MEDICACION_FAILED:
            return deleteAllMediacionFailed(state);
        case ADD_MEDICACION_ESTUDIO:
        case ADD_MEDICACION_ESTUDIO_ERROR:
        case DELETE_MEDICACION_ESTUDIO_ERROR:
        case ADD_DEFAULT_MEDICACION_ESTUDIO:
        case ADD_DEFAULT_MEDICACION_ESTUDIO_ERROR:
            return addMedicacionToEstudio(state);
        case CLEAN_MEDICACIONES_STORE:
            return cleanMedicacionesStoreReducer(state);
        default:
            return state;
    }
}
