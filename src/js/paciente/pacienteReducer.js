import initialState from './pacienteReducerInitialState';
import { FETCH_PACIENTES, LOAD_PACIENTES, LOAD_PACIENTES_ERROR, DELETE_PACIENTES } from './actionTypes';

const fetchPacientes = (state) => {
    const newState = {};
    Object.assign(newState, state, { pacienteApiLoading: true });

    return newState;
};

const loadPacientes = (state, action) => {
    const newState = {};
    const pacientes = action.data.response;
    Object.assign(newState, state, { pacientes, pacienteApiLoading: false });

    return newState;
};

const loadPacientesError = (state) => {
    const newState = {};
    const pacientes = initialState.pacientes;
    Object.assign(newState, state, { pacientes, pacienteApiLoading: false });

    return newState;
};

export function pacienteReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PACIENTES:
            return fetchPacientes(state);
        case LOAD_PACIENTES:
            return loadPacientes(state, action);
        case LOAD_PACIENTES_ERROR:
        case DELETE_PACIENTES:
            return loadPacientesError(state);
        default:
            return state;
    }
}
