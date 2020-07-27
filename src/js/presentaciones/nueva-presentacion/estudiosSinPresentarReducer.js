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
    CLEAN_ESTUDIOS_FROM_STORE,
    UPDATE_MEDICACION_ESTUDIO_NUEVA,
} from './actionTypes';
import { calculateImporteTotal } from '../../medicacion/medicacionHelper';
import { sumarImportesEstudios } from '../presentacionHelper';

const sumarImportesEstudiosSinPresentar = (state) => {
    const estudios = [...state.estudios];
    const importesTotales = sumarImportesEstudios(estudios);

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
    return sumarImportesEstudiosSinPresentar({
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
    sumarImportesEstudiosSinPresentar({
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

    return sumarImportesEstudiosSinPresentar({
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

    return sumarImportesEstudiosSinPresentar({
        ...state,
        estudios,
    });
};

const agregarEstudiosATablaReducer = (state, action) => {
    const { estudios } = state;
    const estudiosAgregar = action.estudios;
    const newEstudios = estudios.concat(estudiosAgregar);
    return sumarImportesEstudiosSinPresentar({
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

    return sumarImportesEstudiosSinPresentar({
        ...state,
        estudios,
    });
};

const cleanEstudiosFromStore = state => ({
    ...state,
    estudios: [],
    estudiosAgregar: [],
    estudiosExistentes: [],
});

const updateMedicacionEstudioReducer = (state, action) => {
    const estudios = [...state.estudios];
    const medicaciones = estudios.length > 0 && action.data.response;
    const { estudioId } = action;
    const total = estudios.length > 0 && calculateImporteTotal(medicaciones);
    /* eslint-disable eqeqeq */
    const indexOfEstudio = estudios.length > 0 && estudios.findIndex(e => e.id == estudioId);
    const newEstudio = {
        ...estudios[indexOfEstudio],
        importe_medicacion: total && total.toString(),
    };
    if (estudios.length > 0) estudios.splice(indexOfEstudio, 1, newEstudio);
    return sumarImportesEstudiosSinPresentar({
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
        case CLEAN_ESTUDIOS_FROM_STORE:
            return cleanEstudiosFromStore(state);
        case UPDATE_MEDICACION_ESTUDIO_NUEVA:
            return updateMedicacionEstudioReducer(state, action);
        default:
            return state;
    }
}
