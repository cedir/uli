import initialState from './estudiosSinPresentarReducerInitialState';
import { FINALIZAR_PRESENTACION_OBRA_SOCIAL, LOAD_PRESENTACION_DETAIL_ID } from './actionTypes';

const actionsHandledByEpicReducer = (state) => {
    const newState = {};
    Object.assign(newState, state);

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

export function finalizarPresentacionReducer(state = initialState, action) {
    switch (action.type) {
        case FINALIZAR_PRESENTACION_OBRA_SOCIAL:
            return actionsHandledByEpicReducer(state, action);
        case LOAD_PRESENTACION_DETAIL_ID:
            return loadPresentacionDetailId(state, action);
        default:
            return state;
    }
}

