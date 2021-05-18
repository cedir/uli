import moment from 'moment';

const initialValues = {
    fechaDesde: moment().format('YYYY-MM-DD'),
    fechaHasta: moment().format('YYYY-MM-DD'),
};

export default initialValues;
