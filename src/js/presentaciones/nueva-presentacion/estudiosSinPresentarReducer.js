/* eslint-disable no-unused-vars */
import initialState from './estudiosSinPresentarReducerInitialState';
import {
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR_ERROR,
    LOAD_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_ERROR,
    ELIMINAR_ESTUDIO_SIN_PRESENTAR, AGREGAR_ESTUDIOS_A_TABLA,
    ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR,
    FINALIZAR_PRESENTACION_OBRA_SOCIAL, LOAD_PRESENTACION_DETAIL_ID,
    SET_IMPORTE_MEDICACION_ESTUDIO,
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

const actionsHandledByEpicReducer = (state) => {
    const newState = {};
    Object.assign(newState, state, { estudiosApiLoading: true });

    return newState;
};

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
    switch (action.idInput) {
        case 1:
            newEstudio.nro_de_orden = action.value;
            estudios.splice(action.index, 1, newEstudio);
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

const loadPresentacionDetailId = (state, action) => {
    const newState = {};

    const presentacionDetail = {
        id: action.data.response.id,
    };

    Object.assign(newState, state, { presentacionDetail });

    return newState;
};

const agregarEstudiosATablaReducer = (state, action) => {
    const { estudios } = state;
    const { estudiosAgregar } = state;
    const newEstudios = [];
    estudiosAgregar.forEach((estudio) => {
        action.ids.forEach((id) => {
            if (estudio.id === id) {
                newEstudios.push(estudio);
            }
        });
    });


    estudios.forEach((estudio) => {
        newEstudios.forEach((newEstudio) => {
            if (newEstudio.id === estudio.id) {
                const index = newEstudios.indexOf(newEstudio);
                newEstudios.splice(index, 1);
            }
        });
    });
    newEstudios.forEach((newEstudio) => {
        estudios.push(newEstudio);
    });

    return sumarImportesEstudios({
        ...state,
        estudios,
        estudiosAgregar,
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
        case ELIMINAR_ESTUDIO_SIN_PRESENTAR:
            return eliminarEstudioSinPresentarReducer(state, action);
        case ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR:
            return actualizarInputEstudioSinPresentarReducer(state, action);
        case AGREGAR_ESTUDIOS_A_TABLA:
            return agregarEstudiosATablaReducer(state, action);
        case LOAD_PRESENTACION_DETAIL_ID:
            return loadPresentacionDetailId(state, action);
        case SET_IMPORTE_MEDICACION_ESTUDIO:
            return setImporteMedicacionEstudioReducer(state, action);
        default:
            return state;
    }
}
