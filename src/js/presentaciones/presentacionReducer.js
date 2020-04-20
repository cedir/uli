import initialState from './presentacionReducerInitialState';
import {
    FETCH_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_PRESENTACIONES_OBRA_SOCIAL,
    LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR,
    LOAD_PRESENTACION_DETAIL_ID,
} from './actionTypes';


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


const loadPresentacionDetailId = (state, action) => {
    const newState = {};

    const presentacionDetail = {
        id: action.data.response.id,
    };

    Object.assign(newState, state, { presentacionDetail });

    return newState;
};

export function presentacionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRESENTACIONES_OBRA_SOCIAL:
            return actionsHandledByEpicReducer(state);
        case LOAD_PRESENTACIONES_OBRA_SOCIAL:
            return loadPresentacionesReducer(state, action);
        case LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR:
            return loadPresentacionesErrorReducer(state);
        case LOAD_PRESENTACION_DETAIL_ID:
            return loadPresentacionDetailId(state, action);

        default:
            return state;
    }
}
