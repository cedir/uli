import { findIndex } from 'lodash';
import initialState from './alertReducerInitialState';
import { ADD_ALERT, REMOVE_ALERT } from './actionTypes';

const addAlert = (state, action) => {
    const newState = {};
    const alertsArrayCopy = state.alerts.slice();
    alertsArrayCopy.push(action.alert);
    Object.assign(newState, state, { alerts: alertsArrayCopy });

    return newState;
};

const removeAlert = (state, action) => {
    const newState = {};
    const { alertId } = action;
    // remove the alert related with the alert index provided in the action
    const alertsArrayCopy = state.alerts.slice();
    const index = findIndex(alertsArrayCopy, alert => alert.id === alertId);
    if (index > -1) {
        alertsArrayCopy.splice(index, 1);
    }
    Object.assign(newState, state, { alerts: alertsArrayCopy });

    return newState;
};

export function alertReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ALERT:
            return addAlert(state, action);
        case REMOVE_ALERT:
            return removeAlert(state, action);
        default:
            return state;
    }
}
