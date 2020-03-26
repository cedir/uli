import {
    SET_AUTHORIZATION_TOKEN, LOGIN_ERROR, LOGOUT,
    ELEGIR_SUCURSAL } from './actionTypes';

const initialState = {
    token: '',
    loginError: false,
    sucursal: null,
};

function setAuthorizationReducer(state, action) {
    const newState = {};
    const token = action.data.token;
    Object.assign(newState, state, { token, loginError: false });

    return newState;
}

function loginErrorReducer(state) {
    const newState = {};
    Object.assign(newState, state, { token: '', loginError: true });

    return newState;
}

function logoutReducer(state) {
    const newState = {};
    Object.assign(newState, state, { token: '' });

    return newState;
}

function elegirSucursalHandler(state, action) {
    const sucursal = action.id;
    return {
        ...state,
        sucursal,
    };
}

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHORIZATION_TOKEN:
            return setAuthorizationReducer(state, action);
        case LOGIN_ERROR:
            return loginErrorReducer(state);
        case LOGOUT:
            return logoutReducer(state);
        case ELEGIR_SUCURSAL:
            return elegirSucursalHandler(state, action);
        default:
            return state;
    }
}

