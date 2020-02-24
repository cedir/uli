/* eslint-disable no-unused-vars */
import initialState from './estudiosSinPresentarReducerInitialState';
import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL, LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR, ACTUALIZAR_INPUT_VALUE,
    ELIMINAR_FILA, LOAD_DATE_VALUE, AGREGAR_ESTUDIOS_A_TABLA } from './actionTypes';

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
    let suma = state.suma;
    suma = 0;
    estudiosSinPresentar.forEach((estudio) => {
        suma = suma +
            parseFloat(estudio.importe_estudio, 10) +
            parseFloat(estudio.pension, 10) +
            parseFloat(estudio.diferencia_paciente, 10) +
            parseFloat(estudio.importe_medicacion) +
            parseFloat(estudio.arancel_anestesia, 10) + 0.0001;
    });
    suma -= 0.0001;
    Object.assign(newState, state,
        { estudiosSinPresentar, estudiosSinPresentarApiLoading: false, suma });

    return newState;
};

const loadDateValueReducer = (state, action) => {
    const newState = {};
    Object.assign(newState, state, { fecha: action.value });

    return newState;
};

const actualizarInputValue = (state, action) => {
    /* eslint-disable no-param-reassign */
    const newState = {};
    const estudiosSinPresentar = state.estudiosSinPresentar;
    let actionValue = action.value;
    if (actionValue === '') {
        actionValue = '0.00';
    }
    estudiosSinPresentar.forEach((estudio) => {
        if (estudio.id === action.idEstudio) {
            switch (action.id) {
                case 0:
                    estudio.nro_de_orden = actionValue;
                    break;
                case 1:
                    estudio.importe_estudio = actionValue;
                    break;
                case 2:
                    estudio.pension = actionValue;
                    break;
                case 3:
                    estudio.diferencia_paciente = actionValue;
                    break;
                case 4:
                    estudio.arancel_anestesia = actionValue;
                    break;
                default:
                    break;
            }
        }
    });
    Object.assign(newState, state, { estudiosSinPresentar, estudiosSinPresentarApiLoading: false });

    return sumarImportesEstudios(newState);
};

const eliminarFilaReducer = (state, action) => {
    const newState = {};
    const estudiosSinPresentar = state.estudiosSinPresentar;
    estudiosSinPresentar.forEach((estudio) => {
        if (estudio.id === action.id) {
            const index = estudiosSinPresentar.indexOf(estudio);
            estudiosSinPresentar.splice(index, 1);
        }
    });
    Object.assign(newState, state, { estudiosSinPresentar, estudiosSinPresentarApiLoading: false });

    return sumarImportesEstudios(newState);
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

export function estudiosSinPresentarReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL:
        case FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR:
            return actionsHandledByEpicReducer(state);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL:
            return loadEstudiosSinPresentarReducer(state, action);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR:
            return loadEstudiosSinPresentarErrorReducer(state);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR:
            return loadEstudiosSinPresentarAgregarReducer(state, action);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR:
            return loadEstudiosSinPresentarAgregarErrorReducer(state);
        case LOAD_DATE_VALUE:
            return loadDateValueReducer(state, action);
        case ACTUALIZAR_INPUT_VALUE:
            return actualizarInputValue(state, action);
        case ELIMINAR_FILA:
            return eliminarFilaReducer(state, action);
        case AGREGAR_ESTUDIOS_A_TABLA:
            return agregarEstudiosATablaReducer(state, action);
        default:
            return state;
    }
}
