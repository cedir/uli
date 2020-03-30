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
} from './actionTypes';

const sumarImportesEstudios = (state) => {
    const estudios = state.presentacion.estudios;
    let importesTotales = 0;
    estudios.forEach((estudio) => {
        /* eslint-disable no-mixed-operators */
        // desactive esta regla porque me parecio que queda
        // mas legible la operacion de esta forma (mezclando operadores)
        importesTotales = importesTotales +
            parseFloat(estudio.importe_estudio, 10) +
            parseFloat(estudio.pension, 10) -
            parseFloat(estudio.diferencia_paciente, 10) +
            parseFloat(estudio.importe_medicacion) +
            parseFloat(estudio.arancel_anestesia, 10) + 0.0001;
    });
    importesTotales -= 0.0001;

    return {
        ...state,
        presentacion: {
            estudios,
            importesTotales,
        },
    };
};

const actionsHandledByEpicReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { presentacionesApiLoading: true });

    return newState;
};

const fetchEstudiosDeUnaPresentacionReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { estudiosApiLoading: true });

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
    const estudios = action.data.response;
    const obraSocial = action.obraSocial;
    const fecha = action.fecha;

    return sumarImportesEstudios({
        ...state,
        presentacion: {
            estudios,
            estudiosApiLoading: false,
            obraSocial,
            fecha,
        },
    });
};

const loadPresentacionesErrorReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { presentaciones: [], presentacionesApiLoading: false });

    return newState;
};

const loadEstudiosDeUnaPresentacionErrorReducer = (state) => {
    const { presentacion } = state;
    return {
        ...state,
        ...presentacion,
        estudios: [],
        estudiosApiLoading: false,
    };
};

const eliminarEstudioDeUnaPresentacionReducer = (state, action) => {
    const { estudios } = state.presentacion;
    estudios.splice(action.index, 1);

    return sumarImportesEstudios({
        ...state,
        estudios,
    });
};

const actualizarInputEstudioDeUnaPresentacionReducer = (state, action) => {
    const { estudios } = state.presentacion;
    // newEstudio is a copy of an estudios[action.index]
    // console.log(newEstudio === estudios[action.index]) -> false
    // we aren't mutating state.
    const newEstudio = { ...estudios[action.index] };
    switch (action.idInput) {
        case 1:
            newEstudio.nro_de_orden = action.value;
            estudios.splice(action.payload.index, 1, newEstudio);
            break;
        case 2:
            newEstudio.importe_estudio = action.value;
            estudios.splice(action.index, 1, newEstudio);
            break;
        case 3:
            newEstudio.pension = action.value;
            estudios.splice(action.index, 1, newEstudio);
            break;
        case 4:
            newEstudio.diferencia_paciente = action.value;
            estudios.splice(action.index, 1, newEstudio);
            break;
        case 5:
            newEstudio.arancel_anestesia = action.value;
            estudios.splice(action.index, 1, newEstudio);
            break;
        default:
            break;
    }

    return sumarImportesEstudios({
        ...state,
        estudios,
    });
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
        default:
            return state;
    }
}
