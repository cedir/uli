import { SET_AUTHORIZATION_TOKEN, LOGIN_ERROR, LOGOUT } from './actionTypes';

const initialState = {
    token: '',
    loginError: false,
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

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHORIZATION_TOKEN:
            return setAuthorizationReducer(state, action);
        case LOGIN_ERROR:
            return loginErrorReducer(state);
        case LOGOUT:
            return logoutReducer(state);
        default:
            return state;
    }
}

