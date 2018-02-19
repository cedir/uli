import initialState from './medicoReducerInitialState';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES, LOAD_MEDICOS_ACTUANTES,
    LOAD_MEDICOS_SOLICITANTES, LOAD_MEDICOS_ACTUANTES_ERROR, LOAD_MEDICOS_SOLICITANTES_ERROR } from './actionTypes';

const fetchMedicosActuantes = (state) => {
    const newState = {};
    Object.assign(newState, state, { medicoActuanteApiLoading: true });

    return newState;
};

const fetchMedicosSolicitantes = (state) => {
    const newState = {};
    Object.assign(newState, state, { medicoSolicitanteApiLoading: true });

    return newState;
};

const loadMedicosActuantesReducer = (state, action) => {
    const newState = {};
    const newValues = {
        medicosActuantes: action.data.response,
        medicoActuanteApiLoading: false,
    };
    Object.assign(newState, state, newValues);

    return newState;
};

const loadMedicosSolicitantesReducer = (state, action) => {
    const newState = {};
    const newValues = {
        medicosSolicitantes: action.data.response,
        medicoSolicitanteApiLoading: false,
    };
    Object.assign(newState, state, newValues);

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
            return fetchMedicosActuantes(state);
        case FETCH_MEDICOS_SOLICITANTES:
            return fetchMedicosSolicitantes(state);
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
