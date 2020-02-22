import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR,
} from './actionTypes';
import initialState from './estudiosSinPresentarAgregarReducerInitialState';

const actionsHandledByEpicReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { estudiosSinPresentarApiLoading: true });

    return newState;
};

const loadEstudiosSinPresentarAgregarReducer = (state, action) => {
    const newState = {};
    const estudiosSinPresentarAgregar = action.data.response;
    Object.assign(newState, state,
        { estudiosSinPresentarAgregar, estudiosSinPresentarAgregarApiLoading: false });

    return newState;
};

const loadEstudiosSinPresentarAgregarErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state,
        { estudiosSinPresentarAgregar: [], estudiosSinPresentarAgregarApiLoading: false });

    return newState;
};

export function estudiosSinPresentarAgregarReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR:
            return actionsHandledByEpicReducer(state);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR:
            return loadEstudiosSinPresentarAgregarReducer(state, action);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR:
            return loadEstudiosSinPresentarAgregarErrorReducer(state);
        default:
            return state;
    }
}
