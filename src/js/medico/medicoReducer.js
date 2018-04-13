import initialState from './medicoReducerInitialState';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES, LOAD_MEDICOS_ACTUANTES,
    LOAD_MEDICOS_SOLICITANTES, LOAD_MEDICOS_ACTUANTES_ERROR, LOAD_MEDICOS_SOLICITANTES_ERROR } from './actionTypes';

const fetchMedicos = (state) => {
    const newState = {};
    Object.assign(newState, state);

    return newState;
};

const loadMedicosActuantesReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { medicosActuantes: action.data.response });

    return newState;
};

const loadMedicosSolicitantesReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { medicosSolicitantes: action.data.response });

    return newState;
};

const loadMedicosActuantesErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { medicosActuantes: [] });

    return newState;
};

const loadMedicosSolicitantesErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { medicosSolicitantes: [] });

    return newState;
};

export function medicoReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MEDICOS_ACTUANTES:
            return fetchMedicos(state);
        case FETCH_MEDICOS_SOLICITANTES:
            return fetchMedicos(state);
        case LOAD_MEDICOS_ACTUANTES:
            return loadMedicosActuantesReducer(state, action);
        case LOAD_MEDICOS_SOLICITANTES:
            return loadMedicosSolicitantesReducer(state, action);
        case LOAD_MEDICOS_ACTUANTES_ERROR:
            return loadMedicosActuantesErrorReducer(state);
        case LOAD_MEDICOS_SOLICITANTES_ERROR:
            return loadMedicosSolicitantesErrorReducer(state);
        default:
            return state;
    }
}
