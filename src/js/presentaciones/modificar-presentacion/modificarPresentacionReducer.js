import initialState from './modificarPresentacionReducerInitialState';
import {
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR,
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR,
    LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR_ERROR,
    // VACIAR_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR,
    VACIAR_ESTUDIOS_AGREGAR,
    ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION,
    ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION,
    AGREGAR_ESTUDIOS_DE_UNA_PRESENTACION_A_TABLA,
    SET_IMPORTE_MEDICACION_ESTUDIO_MODIFICAR,
    UPDATE_MEDICACION_ESTUDIO_MODIFICAR,
} from './actionTypes';
import { calculateImporteTotal } from '../../medicacion/medicacionHelper';

const sumarImportesEstudios = (state) => {
    const { estudios } = state;
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

const fetchEstudiosDeUnaPresentacionReducer = state => ({
    ...state,
    estudiosApiLoading: true,
});


const loadEstudiosDeUnaPresentacionReducer = (state, action) => {
    const estudios = [...action.data.response];
    const estudiosExistentes = [...action.data.response];
    const fecha = action.fecha;
    const obraSocial = action.obraSocial;
    const id = action.id;

    return sumarImportesEstudios({
        ...state,
        id,
        obraSocial,
        estudios,
        estudiosExistentes,
        estudiosApiLoading: false,
        fecha,
    });
};

const loadEstudiosDeUnaPresentacionErrorReducer = state => ({
    ...state,
    estudios: [],
    estudiosAgregar: [],
    estudiosApiLoading: false,
});

const fetchEstudiosDeUnaPresentacionAgregarReducer = state => ({
    ...state,
    estudiosAgregarApiLoading: true,
});

const loadEstudiosDeUnaPresentacionAgregarReducer = (state, action) => {
    const { estudiosExistentes } = state;
    const estudiosSinPresentar = action.data.response;
    const estudiosAgregar = estudiosSinPresentar.concat(estudiosExistentes);

    return sumarImportesEstudios({
        ...state,
        estudiosAgregar,
        estudiosAgregarApiLoading: false,
    });
};

const loadEstudiosDeUnaPresentacionAgregarErrorReducer = state => ({
    ...state,
    estudiosAgregar: [],
    estudiosAgregarApiLoading: false,
});

const vaciarEstudiosAgregarReducer = state => ({
    ...state,
    estudiosAgregar: [],
});

const eliminarEstudioDeUnaPresentacionReducer = (state, action) => {
    const { estudios } = state;
    estudios.splice(action.index, 1);

    return sumarImportesEstudios({
        ...state,
        estudios,
    });
};

const actualizarInputEstudioDeUnaPresentacionReducer = (state, action) => {
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

const agregarEstudiosDeUnaPresentacionATablaReducer = (state, action) => {
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

const updateMedicacionEstudioReducer = (state, action) => {
    const medicaciones = action.data.response;
    const estudios = [...state.estudios];
    const { estudioId } = action;
    const total = estudios.length > 0 && calculateImporteTotal(medicaciones);
    /* eslint-disable eqeqeq */
    const indexOfEstudio = estudios.findIndex(e => e.id == estudioId);
    const newEstudio = {
        ...estudios[indexOfEstudio],
        importe_medicacion: total.toString(),
    };
    estudios.splice(indexOfEstudio, 1, newEstudio);
    return sumarImportesEstudios({
        ...state,
        estudios,
    });
};

export function modificarPresentacionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ESTUDIOS_DE_UNA_PRESENTACION:
            return fetchEstudiosDeUnaPresentacionReducer(state);
        case LOAD_ESTUDIOS_DE_UNA_PRESENTACION:
            return loadEstudiosDeUnaPresentacionReducer(state, action);
        case LOAD_ESTUDIOS_DE_UNA_PRESENTACION_ERROR:
            return loadEstudiosDeUnaPresentacionErrorReducer(state, action);
        case FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR:
            return fetchEstudiosDeUnaPresentacionAgregarReducer(state);
        case LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR:
            return loadEstudiosDeUnaPresentacionAgregarReducer(state, action);
        case LOAD_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR_ERROR:
            return loadEstudiosDeUnaPresentacionAgregarErrorReducer(state, action);
        // case VACIAR_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR:
        case VACIAR_ESTUDIOS_AGREGAR:
            return vaciarEstudiosAgregarReducer(state);
        case ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION:
            return eliminarEstudioDeUnaPresentacionReducer(state, action);
        case ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION:
            return actualizarInputEstudioDeUnaPresentacionReducer(state, action);
        case AGREGAR_ESTUDIOS_DE_UNA_PRESENTACION_A_TABLA:
            return agregarEstudiosDeUnaPresentacionATablaReducer(state, action);
        case SET_IMPORTE_MEDICACION_ESTUDIO_MODIFICAR:
            return setImporteMedicacionEstudioReducer(state, action);
        case UPDATE_MEDICACION_ESTUDIO_MODIFICAR:
            return updateMedicacionEstudioReducer(state, action);
        default:
            return state;
    }
}
