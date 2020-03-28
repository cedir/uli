/* eslint-disable no-unused-vars */
import initialState from './estudiosSinPresentarReducerInitialState';
import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR,
    ELIMINAR_ESTUDIO_SIN_PRESENTAR, LOAD_DATE_VALUE_NUEVA, AGREGAR_ESTUDIOS_A_TABLA,
    ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR, LOAD_GRAVADO_VALUE_NUEVA,
    FINALIZAR_PRESENTACION_OBRA_SOCIAL, LOAD_PRESENTACION_DETAIL_ID,
    SET_IMPORTE_MEDICACION_ESTUDIO } from './actionTypes';

const actionsHandledByEpicReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { estudiosSinPresentarApiLoading: true });

    return newState;
};

const loadEstudiosSinPresentarReducer = (state, action) => {
    const newState = {};
    const estudiosSinPresentar = action.data.response;
    Object.assign(
        newState, state, {
            estudiosSinPresentar,
            estudiosSinPresentarApiLoading: false,
            idObraSocial: action.idObraSocial,
        });

    return sumarImportesEstudios(newState);
};

const loadEstudiosSinPresentarErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state,
        { estudiosSinPresentar: [], estudiosSinPresentarApiLoading: false });

    return newState;
};

const loadEstudiosSinPresentarAgregarReducer = (state, action) => {
    const newState = {};
    const estudiosSinPresentarAgregar = action.data.response;
    Object.assign(newState, state,
        { estudiosSinPresentarAgregar, estudiosSinPresentarAgregarApiLoading: false });

    return newState;
};

const loadEstudiosSinPresentarAgregarErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state,
        { estudiosSinPresentarAgregar: [], estudiosSinPresentarAgregarApiLoading: false });

    return newState;
};

const sumarImportesEstudios = (state) => {
    const newState = {};
    const estudiosSinPresentar = state.estudiosSinPresentar;
    let suma = 0;
    estudiosSinPresentar.forEach((estudio) => {
        /* eslint-disable no-mixed-operators */
        // desactive esta regla porque me parecio que queda
        // mas legible la operacion de esta forma (mezclando operadores)
        suma = suma +
            parseFloat(estudio.importe_estudio, 10) +
            parseFloat(estudio.pension, 10) -
            parseFloat(estudio.diferencia_paciente, 10) +
            parseFloat(estudio.importe_medicacion) +
            parseFloat(estudio.arancel_anestesia, 10) + 0.0001;
    });
    suma -= 0.0001;
    Object.assign(newState, state,
        { estudiosSinPresentar, estudiosSinPresentarApiLoading: false, suma });

    return newState;
};

const loadDateValueNuevaReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { fecha: action.value });

    return newState;
};

const eliminarEstudioSinPresentarReducer = (state, action) => {
    const estudiosSinPresentar = state.estudiosSinPresentar.slice();
    estudiosSinPresentar.splice(action.index, 1);
    const newState = {
        ...state,
        estudiosSinPresentar,
    };

    return sumarImportesEstudios(newState);
};

const actualizarInputEstudioSinPresentarReducer = (state, action) => {
    const estudiosSinPresentar = state.estudiosSinPresentar.slice();
    const newEstudio = { ...estudiosSinPresentar[action.index] };
    switch (action.idInput) {
        case 1:
            newEstudio.nro_de_orden = action.value;
            estudiosSinPresentar.splice(action.index, 1, newEstudio);
            break;
        case 2:
            newEstudio.importe_estudio = action.value;
            estudiosSinPresentar.splice(action.index, 1, newEstudio);
            break;
        case 3:
            newEstudio.pension = action.value;
            estudiosSinPresentar.splice(action.index, 1, newEstudio);
            break;
        case 4:
            newEstudio.diferencia_paciente = action.value;
            estudiosSinPresentar.splice(action.index, 1, newEstudio);
            break;
        case 5:
            newEstudio.arancel_anestesia = action.value;
            estudiosSinPresentar.splice(action.index, 1, newEstudio);
            break;
        default:
            break;
    }
    const newState = {
        ...state,
        estudiosSinPresentar,
    };

    return sumarImportesEstudios(newState);
};

const loadPresentacionDetailId = (state, action) => {
    const newState = {};

    const presentacionDetail = {
        id: action.data.response.id,
    };

    Object.assign(newState, state, { presentacionDetail });

    return newState;
};

const agregarEstudiosATablaReducer = (state, action) => {
    const estudiosSinPresentar = state.estudiosSinPresentar;
    const estudiosSinPresentarAgregar = state.estudiosSinPresentarAgregar;
    const newState = {};
    const newEstudios = [];
    estudiosSinPresentarAgregar.forEach((estudio) => {
        action.ids.forEach((id) => {
            if (estudio.id === id) {
                newEstudios.push(estudio);
            }
        });
    });

    estudiosSinPresentar.forEach((estudio) => {
        newEstudios.forEach((newEstudio) => {
            if (newEstudio.id === estudio.id) {
                const index = newEstudios.indexOf(newEstudio);
                newEstudios.splice(index, 1);
            }
        });
    });
    newEstudios.forEach((newEstudio) => {
        estudiosSinPresentar.push(newEstudio);
    });
    Object.assign(newState, state, { estudiosSinPresentar, estudiosSinPresentarApiLoading: false });

    return sumarImportesEstudios(newState);
};

const loadGravadoValueNuevaReducer = (state, action) => {
    const gravado = action.payload.value;

    return {
        ...state,
        gravado,
    };
};

const setImporteMedicacionEstudioReducer = (state, action) => {
    const estudiosSinPresentar = state.estudiosSinPresentar;
    const newEstudio = {
        ...estudiosSinPresentar[action.index],
        importe_medicacion: action.total.toString(),
    };
    estudiosSinPresentar.splice(action.index, 1, newEstudio);

    const newState = {
        ...state,
        estudiosSinPresentar,
    };

    return sumarImportesEstudios(newState);
};

export function estudiosSinPresentarReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL:
        case FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR:
        case FINALIZAR_PRESENTACION_OBRA_SOCIAL:
            return actionsHandledByEpicReducer(state);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL:
            return loadEstudiosSinPresentarReducer(state, action);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR:
            return loadEstudiosSinPresentarErrorReducer(state);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR:
            return loadEstudiosSinPresentarAgregarReducer(state, action);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR:
            return loadEstudiosSinPresentarAgregarErrorReducer(state);
        case LOAD_DATE_VALUE_NUEVA:
            return loadDateValueNuevaReducer(state, action);
        case ELIMINAR_ESTUDIO_SIN_PRESENTAR:
            return eliminarEstudioSinPresentarReducer(state, action);
        case ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR:
            return actualizarInputEstudioSinPresentarReducer(state, action);
        case AGREGAR_ESTUDIOS_A_TABLA:
            return agregarEstudiosATablaReducer(state, action);
        case LOAD_GRAVADO_VALUE_NUEVA:
            return loadGravadoValueNuevaReducer(state, action);
        case LOAD_PRESENTACION_DETAIL_ID:
            return loadPresentacionDetailId(state, action);
        case SET_IMPORTE_MEDICACION_ESTUDIO:
            return setImporteMedicacionEstudioReducer(state, action);
        default:
            return state;
    }
}
