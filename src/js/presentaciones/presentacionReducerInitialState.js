const initialState = {
    presentaciones: [],
    presentacionesApiLoading: false,
    presentacion: {
        id: null,
        estudios: [],
        estudiosAgregar: [],
        obraSocial: {},
        importesTotales: 0,
        fecha: '',
        estudiosApiLoading: false,
        estudiosAgregarApiLoading: false,
    },
};

export default initialState;
