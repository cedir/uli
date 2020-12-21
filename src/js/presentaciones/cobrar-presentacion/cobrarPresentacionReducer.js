import * as types from './actionTypes';
import initialState from './cobrarPresentacionInitialState';
import { sumarImportesEstudios, actualizarInputEstudioDeUnaPresentacionReducer } from '../modificar-presentacion/modificarPresentacionReducer';
import { calculateImporteTotal } from '../../medicacion/medicacionHelper';

const actionsHandledByEpicReducer = state => ({
    ...state,
    estudiosApiLoading: true,
    cobrada: false,
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
    importesOriginales: action.presentacion.estudios.map(estudio => ({
        importe_estudio: estudio.importe_estudio || 0,
        diferencia_paciente: estudio.diferencia_paciente || 0,
        arancel_anestesia: estudio.arancel_anestesia || 0,
        pension: estudio.pension || 0,
    })),
    cobrada: action.presentacion.estado.toUpperCase() === 'COBRADO',
});

const fetchDatosDeUnaPresentacionFailed = state => ({
    ...state,
    ...initialState,
});

const descontarAEstudios = (state, action) => {
    const porcentaje = 1 - (action.porcentaje / 100);
    return sumarImportesEstudios({
        ...state,
        estudios: state.estudios.map(estudio => ({
            ...estudio,
            actualizarImportes: true,
            importe_estudio: Math.round(estudio.importe_estudio * porcentaje * 100) / 100,
            diferencia_paciente: Math.round(estudio.diferencia_paciente * porcentaje * 100) / 100,
            arancel_anestesia: Math.round(estudio.arancel_anestesia * porcentaje * 100) / 100,
            pension: Math.round(estudio.pension * porcentaje * 100) / 100,
        })),
    });
};

const resetearImportes = state => sumarImportesEstudios({
    ...state,
    estudios: state.estudios.map((estudio, i) => ({
        ...estudio,
        ...state.importesOriginales[i],
        actualizarImportes: true,
    })),
});

const importesActualizadosReducer = (state, action) => ({
    ...state,
    estudios: state.estudios.map((estudio, id) => ({
        ...estudio,
        actualizarImportes: id === action.id ? estudio.actualizarImportes : false,
    })),
});

const resetearImporteEstudioReducer = (state, action) => sumarImportesEstudios({
    ...state,
    estudios: state.estudios.map((estudio, i) => {
        const importes = i === action.estudioId ?
            { ...state.importesOriginales[i], actualizarImportes: true } : {};

        return {
            ...estudio,
            ...importes,
        };
    }),
});

const cobrarPresentacionSuccess = (state, action) => ({
    ...state,
    diferenciaCobrada: Number(action.diferencia),
    cobrada: true,
    estudiosApiLoading: false,
});

const cobrarPresentacionFailed = state => ({
    ...state,
    estudiosApiLoading: false,
});

const updateMedicacionEstudioReducer = (state, action) => sumarImportesEstudios({
    ...state,
    estudios: state.estudios.map((estudio) => {
        if (estudio.id !== action.estudioId) {
            return estudio;
        }
        return {
            ...estudio,
            importe_medicacion: calculateImporteTotal(action.medicacion),
        };
    }),
});

export function cobrarPresentacionReducer(state = initialState, action) {
    switch (action.type) {
        case types.REFACTURAR_ESTUDIO:
        case types.FETCH_DATOS_DE_UNA_PRESENTACION:
        case types.COBRAR_PRESENTACION:
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
        case types.RESETEAR_TODOS_LOS_IMPORTES:
            return resetearImportes(state);
        case types.RESETEAR_IMPORTE_ESTUDIO:
            return resetearImporteEstudioReducer(state, action);
        case types.IMPORTES_ACTUALIZADOS:
            return importesActualizadosReducer(state, action);
        case types.COBRAR_PRESENTACION_SUCCESS:
            return cobrarPresentacionSuccess(state, action);
        case types.COBRAR_PRESENTACION_FAILED:
            return cobrarPresentacionFailed(state);
        case types.UPDATE_MEDICACION_ESTUDIO_COBRAR:
            return updateMedicacionEstudioReducer(state, action);
        default:
            return state;
    }
}
