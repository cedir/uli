import initialState from './turnosReducerInitialState';
import { FETCH_CANTIDAD_TURNOS } from './actionTypes';

const actionsHandledByEpicReducer = state => ({
    ...state,
    turnosApiLoading: false,
});

export function turnosReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CANTIDAD_TURNOS:
            return actionsHandledByEpicReducer(state);

        default:
            return state;
    }
}
