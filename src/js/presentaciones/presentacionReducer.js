import initialState from './presentacionReducerInitialState';
import { FETCH_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR,
    ABRIR_PRESENTACION } from './actionTypes';

const actionsHandledByEpicReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { presentacionesApiLoading: true });

    return newState;
};

const loadPresentacionesReducer = (state, action) => {
    const newState = {};
    const presentaciones = action.data.response.results;
    Object.assign(newState, state, { presentaciones, presentacionesApiLoading: false });

    return newState;
};

const loadPresentacionesErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { presentaciones: [], presentacionesApiLoading: false });

    return newState;
};

/* eslint-disable no-unused-vars */
const abrirPresentacionReducer = (state, action) => {
    const presentaciones = state.presentaciones.slice();
    presentaciones.splice(action.payload.index, 1, action.payload.item);
    return {
        ...state,
        presentaciones,
    };
};

export function presentacionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRESENTACIONES_OBRA_SOCIAL:
            return actionsHandledByEpicReducer(state);
        case LOAD_PRESENTACIONES_OBRA_SOCIAL:
            return loadPresentacionesReducer(state, action);
        case LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR:
            return loadPresentacionesErrorReducer(state);
        case ABRIR_PRESENTACION:
            return abrirPresentacionReducer(state, action);
        default:
            return state;
    }
}
