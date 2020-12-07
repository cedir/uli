import searchEstudiosParamsInitialState from './searchEstudiosFormInitialState';

const initialState = {
    searchEstudiosParams: searchEstudiosParamsInitialState,
    estudios: [],
    estudiosImpagos: [],
    estudioDetail: {},
    actualPage: 1,
    resultPages: 0,
    estudioApiLoading: false,
};

export default initialState;
