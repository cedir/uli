import searchEstudiosParamsInitialState from './searchEstudiosFormInitialState';

const initialState = {
    searchEstudiosParams: searchEstudiosParamsInitialState,
    estudios: [],
    estudioDetail: {},
    actualPage: 1,
    resultPages: 0,
    selectedObraSocial: [],
    selectedMedicoActuante: {
        nombre: '',
        apellido: '',
    },
    selectedMedicoSolicitante: {
        nombre: '',
        apellido: '',
    },
};

export default initialState;
