import initialState from './presentacionReducerInitialState';
import {
    FETCH_PRESENTACIONES_OBRA_SOCIAL,
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_PRESENTACIONES_OBRA_SOCIAL,
    UPDATE_PRESENTACION,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR,
    ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION,
    ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION,
    LOAD_GRAVADO_VALUE_MODIFICAR,
    LOAD_DATE_VALUE_MODIFICAR } from './actionTypes';

const sumarImportesEstudios = (state) => {
    const newState = {};
    const estudiosDeUnaPresentacion = state.estudiosDeUnaPresentacion;
    let suma = 0;
    estudiosDeUnaPresentacion.forEach((estudio) => {
        suma = suma +
            parseFloat(estudio.importe_estudio, 10) +
            parseFloat(estudio.pension, 10) +
            parseFloat(estudio.diferencia_paciente, 10) +
            parseFloat(estudio.importe_medicacion) +
            parseFloat(estudio.arancel_anestesia, 10) + 0.0001;
    });
    suma -= 0.0001;
    Object.assign(newState, state,
        { estudiosDeUnaPresentacion, suma });

    return newState;
};

const actionsHandledByEpicReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { presentacionesApiLoading: true });

    return newState;
};

const fetchEstudiosDeUnaPresentacionReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { estudiosDeUnaPresentacionApiLoading: true });

    return newState;
};

const loadPresentacionesReducer = (state, action) => {
    const newState = {};
    const presentaciones = action.data.response.results;
    Object.assign(newState, state, { presentaciones, presentacionesApiLoading: false });

    return newState;
};

const updatePresentacionReducer = (state, action) => {
    const newState = {};
    const presentaciones = state.presentaciones.slice();
    presentaciones.splice(action.index, 1, action.data.response);
    Object.assign(newState, state, { presentaciones });

    return newState;
};

const loadEstudiosDeUnaPresentacionReducer = (state, action) => {
    const newState = {};
    const estudiosDeUnaPresentacion = action.data.response;
    Object.assign(newState, state,
        { estudiosDeUnaPresentacion, estudiosDeUnaPresentacionApiLoading: false });

    return sumarImportesEstudios(newState);
};

const loadPresentacionesErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { presentaciones: [], presentacionesApiLoading: false });

    return newState;
};

const loadEstudiosDeUnaPresentacionErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state,
        { estudiosDeUnaPresentacion: [],
            estudiosDeUnaPresentacionApiLoading: false });

    return newState;
};

const eliminarEstudioDeUnaPresentacionReducer = (state, action) => {
    const estudiosDeUnaPresentacion = state.estudiosDeUnaPresentacion.slice();
    estudiosDeUnaPresentacion.splice(action.payload.index, 1);
    const newState = {
        ...state,
        estudiosDeUnaPresentacion,
    };

    return sumarImportesEstudios(newState);
};

const actualizarInputEstudioDeUnaPresentacionReducer = (state, action) => {
    const estudiosDeUnaPresentacion = state.estudiosDeUnaPresentacion.slice();
    const newEstudio = { ...estudiosDeUnaPresentacion[action.payload.index] };
    switch (action.payload.idInput) {
        case 1:
            newEstudio.nro_de_orden = action.payload.value;
            estudiosDeUnaPresentacion.splice(action.payload.index, 1, newEstudio);
            break;
        case 2:
            newEstudio.importe_estudio = action.payload.value;
            estudiosDeUnaPresentacion.splice(action.payload.index, 1, newEstudio);
            break;
        case 3:
            newEstudio.pension = action.payload.value;
            estudiosDeUnaPresentacion.splice(action.payload.index, 1, newEstudio);
            break;
        case 4:
            newEstudio.diferencia_paciente = action.payload.value;
            estudiosDeUnaPresentacion.splice(action.payload.index, 1, newEstudio);
            break;
        case 5:
            newEstudio.arancel_anestesia = action.payload.value;
            estudiosDeUnaPresentacion.splice(action.payload.index, 1, newEstudio);
            break;
        default:
            break;
    }
    const newState = {
        ...state,
        estudiosDeUnaPresentacion,
    };

    return sumarImportesEstudios(newState);
};

const loadGravadoValueModificarReducer = (state, action) => {
    const gravado = action.payload.value;

    return {
        ...state,
        gravado,
    };
};

const loadDateValueModificarReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { fecha: action.value });

    return newState;
};

export function presentacionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRESENTACIONES_OBRA_SOCIAL:
            return actionsHandledByEpicReducer(state);
        case FETCH_ESTUDIOS_DE_UNA_PRESENTACION:
            return fetchEstudiosDeUnaPresentacionReducer(state);
        case LOAD_PRESENTACIONES_OBRA_SOCIAL:
            return loadPresentacionesReducer(state, action);
        case UPDATE_PRESENTACION:
            return updatePresentacionReducer(state, action);
        case LOAD_ESTUDIOS_DE_UNA_PRESENTACION:
            return loadEstudiosDeUnaPresentacionReducer(state, action);
        case LOAD_PRESENTACIONES_OBRA_SOCIAL_ERROR:
            return loadPresentacionesErrorReducer(state);
        case LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR:
            return loadEstudiosDeUnaPresentacionErrorReducer(state, action);
        case ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION:
            return eliminarEstudioDeUnaPresentacionReducer(state, action);
        case ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION:
            return actualizarInputEstudioDeUnaPresentacionReducer(state, action);
        case LOAD_GRAVADO_VALUE_MODIFICAR:
            return loadGravadoValueModificarReducer(state, action);
        case LOAD_DATE_VALUE_MODIFICAR:
            return loadDateValueModificarReducer(state, action);
        default:
            return state;
    }
}
