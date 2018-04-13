import initialState from './medicamentoReducerInitialState';
import { FETCH_MEDICAMENTOS, LOAD_MEDICAMENTOS,
    LOAD_MEDICAMENTOS_ERROR } from './actionTypes';

const fetchMedicamentosReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { apiLoading: true });

    return newState;
};

const loadMedicamentosnReducer = (state, action) => {
    const newState = {};
    const medicamentos = action.data.response.results;
    Object.assign(newState, state, { medicamentos });

    return newState;
};

const loadMedicamentosnErrorReducer = (state) => {
    const newState = {};
    const medicamentos = initialState.medicamentos;
    Object.assign(newState, state, { medicamentos });

    return newState;
};

export function medicamentoReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MEDICAMENTOS:
            return fetchMedicamentosReducer(state);
        case LOAD_MEDICAMENTOS:
            return loadMedicamentosnReducer(state, action);
        case LOAD_MEDICAMENTOS_ERROR:
            return loadMedicamentosnErrorReducer(state);
        default:
            return state;
    }
}
