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

const fetchDatosDeUnaPresentacionSuccess = state => ({
    ...state,
    estudiosApiLoading: false,
});

const fetchDatosDeUnaPresentacionFailed = state => ({
    ...state,
    estudiosApiLoading: false,
});

export function cobrarPresentacionReducer(state, action) {
    switch (action.type) {
        case types.REFACTURAR_ESTUDIO:
        case types.FETCH_DATOS_DE_UNA_PRESENTACION:
            return actionsHandledByEpicReducer(state);
        case types.REFACTURAR_ESTUDIO_SUCCESS:
            return refacturarEstudioSuccess(state);
        case types.REFACTURAR_ESTUDIO_FAILED:
            return refacturarEstudioFailed(state);
        case types.FETCH_DATOS_DE_UNA_PRESENTACION_SUCCESS:
            return fetchDatosDeUnaPresentacionSuccess(state);
        case types.FETCH_DATOS_DE_UNA_PRESENTACION_FAILED:
            return fetchDatosDeUnaPresentacionFailed(state);
        default:
            return state;
    }
}
