import initialState from './estudiosSinPresentarReducerInitialState';
import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL, LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR, ACTUALIZAR_NRO_DE_ORDEN,
    ACTUALIZAR_IMPORTE, ACTUALIZAR_ANESTESISTA,
    ACTUALIZAR_DIF_PACIENTE, ACTUALIZAR_PENSION,
    ELIMINAR_FILA, LOAD_DATE_VALUE } from './actionTypes';

const sumarImportesEstudios = (state) => {
    const newState = {};
    const length = state.estudiosSinPresentar.length;
    const estudios = state.estudiosSinPresentar;
    let suma = state.suma;
    suma = 0;
    for (let i = 0; i < length; i += 1) {
        suma = suma +
            parseFloat(estudios[i].importe_estudio, 10) +
            parseFloat(estudios[i].pension, 10) +
            parseFloat(estudios[i].diferencia_paciente, 10) +
            parseFloat(estudios[i].importe_medicacion) +
            parseFloat(estudios[i].arancel_anestesia, 10);
    }
    Object.assign(newState, state, { estudios, estudiosSinPresentarApiLoading: false, suma });

    return newState;
};

const actionsHandledByEpicReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { estudiosSinPresentarApiLoading: true });

    return newState;
};

const loadEstudiosSinPresentarReducer = (state, action) => {
    const newState = {};
    const estudiosSinPresentar = action.data.response;
    Object.assign(newState, state, { estudiosSinPresentar, estudiosSinPresentarApiLoading: false });

    return sumarImportesEstudios(newState);
};

const loadEstudiosSinPresentarErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state,
        { estudiosSinPresentar: [], estudiosSinPresentarApiLoading: false });

    return newState;
};

const loadDateValueReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { fecha: action.value });
    console.log(newState);

    return newState;
};

const actualizarNroDeOrden = (state, action) => {
    const newState = {};
    const length = state.estudiosSinPresentar.length;
    const estudios = state.estudiosSinPresentar;
    for (let i = 0; i < length; i += 1) {
        if (estudios[i].id === action.idValue.idEstudio) {
            estudios[i].nro_de_orden = action.idValue.value;
        }
    }
    Object.assign(newState, state, { estudios, estudiosSinPresentarApiLoading: false });

    return newState;
};

const actualizarImporte = (state, action) => {
    const newState = {};
    const length = state.estudiosSinPresentar.length;
    const estudios = state.estudiosSinPresentar;
    for (let i = 0; i < length; i += 1) {
        if (estudios[i].id === action.idValue.idEstudio) {
            estudios[i].importe_estudio = action.idValue.value;
        }
    }
    Object.assign(newState, state, { estudios, estudiosSinPresentarApiLoading: false });

    return sumarImportesEstudios(newState);
};

const actualizarPension = (state, action) => {
    const newState = {};
    const length = state.estudiosSinPresentar.length;
    const estudios = state.estudiosSinPresentar;
    for (let i = 0; i < length; i += 1) {
        if (estudios[i].id === action.idValue.idEstudio) {
            estudios[i].pension = action.idValue.value;
        }
    }
    Object.assign(newState, state, { estudios, estudiosSinPresentarApiLoading: false });

    return sumarImportesEstudios(newState);
};

const actualizarDifPaciente = (state, action) => {
    const newState = {};
    const length = state.estudiosSinPresentar.length;
    const estudios = state.estudiosSinPresentar;
    for (let i = 0; i < length; i += 1) {
        if (estudios[i].id === action.idValue.idEstudio) {
            estudios[i].diferencia_paciente = action.idValue.value;
        }
    }
    Object.assign(newState, state, { estudios, estudiosSinPresentarApiLoading: false });

    return sumarImportesEstudios(newState);
};

const actualizarAnestesista = (state, action) => {
    const newState = {};
    const length = state.estudiosSinPresentar.length;
    const estudios = state.estudiosSinPresentar;
    for (let i = 0; i < length; i += 1) {
        if (estudios[i].id === action.idValue.idEstudio) {
            estudios[i].arancel_anestesia = action.idValue.value;
        }
    }
    Object.assign(newState, state, { estudios, estudiosSinPresentarApiLoading: false });

    return sumarImportesEstudios(newState);
};

const eliminarFilaReducer = (state, action) => {
    const newState = {};
    const length = state.estudiosSinPresentar.length;
    const estudios = state.estudiosSinPresentar;
    let index;
    for (let i = 0; i < length; i += 1) {
        if (estudios[i].id === action.id) {
            index = estudios.indexOf(estudios[i]);
        }
    }
    state.estudiosSinPresentar.splice(index, 1);
    Object.assign(newState, state);

    return sumarImportesEstudios(newState);
};

export function estudiosSinPresentarReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL:
            return actionsHandledByEpicReducer(state);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL:
            return loadEstudiosSinPresentarReducer(state, action);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR:
            return loadEstudiosSinPresentarErrorReducer(state);
        case LOAD_DATE_VALUE:
            return loadDateValueReducer(state, action);
        case ACTUALIZAR_NRO_DE_ORDEN:
            return actualizarNroDeOrden(state, action);
        case ACTUALIZAR_IMPORTE:
            return actualizarImporte(state, action);
        case ACTUALIZAR_ANESTESISTA:
            return actualizarAnestesista(state, action);
        case ACTUALIZAR_DIF_PACIENTE:
            return actualizarDifPaciente(state, action);
        case ACTUALIZAR_PENSION:
            return actualizarPension(state, action);
        case ELIMINAR_FILA:
            return eliminarFilaReducer(state, action);
        default:
            return state;
    }
}
