import * as types from './actionTypes';
import initialState from './cobrarPresentacionInitialState';
import { sumarImportesEstudios, actualizarInputEstudioDeUnaPresentacionReducer } from '../modificar-presentacion/modificarPresentacionReducer';

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

const fetchDatosDeUnaPresentacionSuccess = (state, action) => sumarImportesEstudios({
    ...state,
    estudiosApiLoading: false,
    estudios: action.presentacion.estudios,
    fecha: action.presentacion.fecha,
    comprobante: action.presentacion.comprobante,
    estado: action.presentacion.estado,
    obraSocial: action.obraSocial,
    id: action.id,
});

const fetchDatosDeUnaPresentacionFailed = state => ({
    ...state,
    estudiosApiLoading: false,
});

const descontarAEstudios = (state, action) => {
    const porcentaje = 1 - (action.porcentaje / 100);
    return sumarImportesEstudios({
        ...state,
        estudios: state.estudios.map(estudio => ({
            ...estudio,
            importe_estudio: Math.round(estudio.importe_estudio * porcentaje * 100) / 100,
            diferencia_paciente: Math.round(estudio.diferencia_paciente * porcentaje * 100) / 100,
            importe_medicacion: Math.round(estudio.importe_medicacion * porcentaje * 100) / 100,
            arancel_anestesia: Math.round(estudio.arancel_anestesia * porcentaje * 100) / 100,
            pension: Math.round(estudio.pension * porcentaje * 100) / 100,
        })),
    });
};

export function cobrarPresentacionReducer(state = initialState, action) {
    switch (action.type) {
        case types.REFACTURAR_ESTUDIO:
        case types.FETCH_DATOS_DE_UNA_PRESENTACION:
            return actionsHandledByEpicReducer(state);
        case types.REFACTURAR_ESTUDIO_SUCCESS:
            return refacturarEstudioSuccess(state);
        case types.REFACTURAR_ESTUDIO_FAILED:
            return refacturarEstudioFailed(state);
        case types.FETCH_DATOS_DE_UNA_PRESENTACION_SUCCESS:
            return fetchDatosDeUnaPresentacionSuccess(state, action);
        case types.FETCH_DATOS_DE_UNA_PRESENTACION_FAILED:
            return fetchDatosDeUnaPresentacionFailed(state);
        case types.DESCONTAR_A_ESTUDIOS:
            return descontarAEstudios(state, action);
        case types.ACTUALIZAR_INPUT_ESTUDIO_DE_COBRAR_PRESENTACION:
            return actualizarInputEstudioDeUnaPresentacionReducer(state, action);
        default:
            return state;
    }
}
