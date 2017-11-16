import moment from 'moment';

const initialState = {
    fechaDesde: moment().format('YYYY-MM-DD'),
    fechaHasta: moment().format('YYYY-MM-DD'),
    obraSocial: '',
    dniPaciente: '',
    nombrePaciente: '',
    apellidoPaciente: '',
    medicoActuante: '',
    medicoSolicitante: '',
};

export default initialState;
