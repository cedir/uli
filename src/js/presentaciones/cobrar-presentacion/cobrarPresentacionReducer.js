import * as types from './actionTypes';

const actionsHandledByEpicReducer = state => ({
    ...state,
    estudiosApiLoading: true,
});

const refacturarEstudioSuccess = state => ({
    ...state,
    estudiosApiLoading: false,
});

const refacturarEstudioFailed = state => ({
    ...state,
    estudiosApiLoading: false,
});

export function cobrarPresentacionReducer(state, action) {
    switch (action.type) {
        case types.REFACTURAR_ESTUDIO:
            return actionsHandledByEpicReducer(state);
        case types.REFACTURAR_ESTUDIO_SUCCESS:
            return refacturarEstudioSuccess(state);
        case types.REFACTURAR_ESTUDIO_FAILED:
            return refacturarEstudioFailed();
        default:
            return state;
    }
}
