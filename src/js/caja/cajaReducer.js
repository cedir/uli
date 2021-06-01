import initialState from './cajaReducerInitialState';
import { FETCH_MOVIMIENTOS_CAJA, LOAD_MOVIMIENTOS_CAJA_SUCCESS,
    LOAD_MOVIMIENTOS_CAJA_ERROR, CREATE_MOVIMIENTOS_CAJA,
    CREATE_MOVIMIENTOS_CAJA_SUCCESS, CREATE_MOVIMIENTOS_CAJA_FAILED,
    ASOCIAR_ESTUDIO, FETCH_MONTOS_ACUMULADOS, FETCH_MONTOS_ACUMULADOS_FAILED,
    FETCH_MONTOS_ACUMULADOS_SUCCESS, UPDATE_MOVIMIENTO_CAJA, UPDATE_MOVIMIENTO_CAJA_FAILED,
    UPDATE_MOVIMIENTO_CAJA_SUCCESS } from './actionTypes';
import { tiposMovimiento } from '../utilities/generalUtilities';
import { round } from '../utilities/utilFunctions';

const PAGE_SIZE = 100;

const loadMovimientosCajaSuccess = (state, action) => ({
    ...state,
    movimientos: action.data.response.results,
    apiLoading: false,
    cantPages: Math.ceil(action.data.response.count / PAGE_SIZE),
    pageNumber: action.pageNumber,
});

const loadMovimientosCajaError = state => ({
    ...state,
    movimientos: [],
    apiLoading: false,
});

const actionsHandledByEpicReducer = state => ({
    ...state,
    apiLoading: true,
});

const actionsHandledByEpicReducerFinish = state => ({
    ...state,
    apiLoading: false,
});

const asociarEstudio = (state, action) => ({
    ...state,
    estudioAsociado: action.estudio,
});

const fetchMovimientosCaja = (state, action) => ({
    ...state,
    apiLoading: false,
    ordering: action.ordering,
});

const updateMovimientoCajaSuccess = (state, action) => {
    const tipo = tiposMovimiento.find(tipoMov =>
        tipoMov.value === Number(action.datos.tipo));

    const newMovimiento = {
        medico: action.datos.medico.length > 0 ? action.datos.medico[0] : {},
        tipo: { id: tipo.value, descripcion: tipo.text },
        concepto: action.datos.concepto,
    };

    return {
        ...state,
        apiLoading: false,
        movimientos: state.movimientos.map(movimiento => (movimiento.id !== action.datos.id
            ? movimiento
            : { ...movimiento, ...newMovimiento }),
        ),
    };
};

const fetchMontosAcumuladosSuccess = (state, action) => ({
    ...state,
    montoConsultorio1: action.montos.consultorio_1,
    montoConsultorio2: action.montos.consultorio_2,
    montoGeneral: action.montos.general,
    montoTotal: (
                round(
                Number(action.montos.consultorio_1) +
                Number(action.montos.consultorio_2) +
                Number(action.montos.general))
                ).toString(),
    apiLoading: false,
});

const fetchMontosAcumuladosFailed = state => ({
    ...state,
    montoConsultorio1: '0',
    montoConsultorio2: '0',
    montoGeneral: '0',
    montoTotal: '0',
    apiLoading: false,
});

const createMovimientosCajaSuccess = state => ({
    ...state,
    apiLoading: false,
    estudioAsociado: {},
});

export function cajaReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_MOVIMIENTOS_CAJA_SUCCESS:
            return loadMovimientosCajaSuccess(state, action);
        case LOAD_MOVIMIENTOS_CAJA_ERROR:
            return loadMovimientosCajaError(state, action);
        case CREATE_MOVIMIENTOS_CAJA:
        case UPDATE_MOVIMIENTO_CAJA:
        case FETCH_MONTOS_ACUMULADOS:
            return actionsHandledByEpicReducer(state);
        case FETCH_MOVIMIENTOS_CAJA:
            return fetchMovimientosCaja(state, action);
        case ASOCIAR_ESTUDIO:
            return asociarEstudio(state, action);
        case UPDATE_MOVIMIENTO_CAJA_FAILED:
        case CREATE_MOVIMIENTOS_CAJA_FAILED:
            return actionsHandledByEpicReducerFinish(state, action);
        case CREATE_MOVIMIENTOS_CAJA_SUCCESS:
            return createMovimientosCajaSuccess(state);
        case UPDATE_MOVIMIENTO_CAJA_SUCCESS:
            return updateMovimientoCajaSuccess(state, action);
        case FETCH_MONTOS_ACUMULADOS_SUCCESS:
            return fetchMontosAcumuladosSuccess(state, action);
        case FETCH_MONTOS_ACUMULADOS_FAILED:
            return fetchMontosAcumuladosFailed(state);
        default:
            return state;
    }
}
