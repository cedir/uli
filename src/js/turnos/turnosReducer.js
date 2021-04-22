import initialState from './turnosReducerInitialState';
import {
    FETCH_CANTIDAD_TURNOS, FETCH_CANTIDAD_TURNOS_FAILED,
    FETCH_CANTIDAD_TURNOS_SUCCESS,
} from './actionTypes';


const actionsHandledByEpicReducer = state => ({
    ...state,
    turnosApiLoading: true,
});

const fetchCantidadTurnosSuccess = (state, action) => ({
    ...state,
    cantidadTurnos: action.cantidadTurnos,
    turnosApiLoading: false,
});

const fetchCantidadTurnosFailed = state => ({
    ...state,
    turnosApiLoading: false,
});

export function turnosReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CANTIDAD_TURNOS:
            return actionsHandledByEpicReducer(state, action);
        case FETCH_CANTIDAD_TURNOS_SUCCESS:
            return fetchCantidadTurnosSuccess(state, action);
        case FETCH_CANTIDAD_TURNOS_FAILED:
            return fetchCantidadTurnosFailed(state);
        default:
            return state;
    }
}
