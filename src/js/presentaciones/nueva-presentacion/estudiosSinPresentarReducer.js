/* eslint-disable no-unused-vars */
import initialState from './estudiosSinPresentarReducerInitialState';
import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR,
    // VACIAR_ESTUDIOS_SIN_PRESENTAR_AGREGAR,
    VACIAR_ESTUDIOS_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR,
    ELIMINAR_ESTUDIO_SIN_PRESENTAR,
    AGREGAR_ESTUDIOS_SIN_PRESENTAR_A_TABLA,
    ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR,
    SET_IMPORTE_MEDICACION_ESTUDIO_NUEVA,
} from './actionTypes';

const sumarImportesEstudios = (state) => {
    const estudios = state.estudios;
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
        estudios,
        importesTotales,
    };
};

const fetchEstudiosSinPresentarReducer = state => ({
    ...state,
    estudiosApiLoading: true,
});

const loadEstudiosSinPresentarReducer = (state, action) => {
    const estudios = action.data.response;
    const obraSocial = action.obraSocial;
    return sumarImportesEstudios({
        ...state,
        estudios,
        estudiosApiLoading: false,
        obraSocial,
    });
};

const loadEstudiosSinPresentarErrorReducer = state => ({
    ...state,
    estudios: [],
    estudiosApiLoading: false,
});

const fetchEstudiosSinPresentarAgregarReducer = state => ({
    ...state,
    estudiosAgregarApiLoading: true,
});

const loadEstudiosSinPresentarAgregarReducer = (state, action) =>
    sumarImportesEstudios({
        ...state,
        estudiosAgregar: action.data.response,
        estudiosAgregarApiLoading: false,
    });

const loadEstudiosSinPresentarAgregarErrorReducer = state => ({
    ...state,
    estudiosAgregar: [],
    estudiosAgregarApiLoading: false,
});

const vaciarEstudiosAgregarReducer = state => ({
    ...state,
    estudiosAgregar: [],
});

const eliminarEstudioSinPresentarReducer = (state, action) => {
    const { estudios } = state;
    estudios.splice(action.index, 1);

    return sumarImportesEstudios({
        ...state,
        estudios,
    });
};

const actualizarInputEstudioSinPresentarReducer = (state, action) => {
    const { estudios } = state;
    // newEstudio is a copy of an estudios[action.index]
    // console.log(newEstudio === estudios[action.index]) -> false
    // we aren't mutating state.
    const newEstudio = { ...estudios[action.index] };
    switch (action.input) {
        case 'nro_de_orden':
            newEstudio.nro_de_orden = action.value;
            estudios.splice(action.index, 1, newEstudio);
            break;
        case 'importe_estudio':
            newEstudio.importe_estudio = action.value;
            estudios.splice(action.index, 1, newEstudio);
            break;
        case 'pension':
            newEstudio.pension = action.value;
            estudios.splice(action.index, 1, newEstudio);
            break;
        case 'diferencia_paciente':
            newEstudio.diferencia_paciente = action.value;
            estudios.splice(action.index, 1, newEstudio);
            break;
        case 'arancel_anestesia':
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

const agregarEstudiosATablaReducer = (state, action) => {
    const { estudios } = state;
    const estudiosAgregar = action.estudios;
    const newEstudios = estudios.concat(estudiosAgregar);
    return sumarImportesEstudios({
        ...state,
        estudios: newEstudios,
    });
};

const setImporteMedicacionEstudioReducer = (state, action) => {
    const { estudios } = state;
    const newEstudio = {
        ...estudios[action.index],
        importe_medicacion: action.total.toString(),
    };
    estudios.splice(action.index, 1, newEstudio);

    return sumarImportesEstudios({
        ...state,
        estudios,
    });
};

export function estudiosSinPresentarReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL:
            return fetchEstudiosSinPresentarReducer(state);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL:
            return loadEstudiosSinPresentarReducer(state, action);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR:
            return loadEstudiosSinPresentarErrorReducer(state);
        case FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR:
            return fetchEstudiosSinPresentarAgregarReducer(state);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR:
            return loadEstudiosSinPresentarAgregarReducer(state, action);
        case LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR:
            return loadEstudiosSinPresentarAgregarErrorReducer(state);
        // case VACIAR_ESTUDIOS_SIN_PRESENTAR_AGREGAR:
        case VACIAR_ESTUDIOS_AGREGAR:
            return vaciarEstudiosAgregarReducer(state);
        case ELIMINAR_ESTUDIO_SIN_PRESENTAR:
            return eliminarEstudioSinPresentarReducer(state, action);
        case ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR:
            return actualizarInputEstudioSinPresentarReducer(state, action);
        case AGREGAR_ESTUDIOS_SIN_PRESENTAR_A_TABLA:
            return agregarEstudiosATablaReducer(state, action);
        case SET_IMPORTE_MEDICACION_ESTUDIO_NUEVA:
            return setImporteMedicacionEstudioReducer(state, action);
        default:
            return state;
    }
}
