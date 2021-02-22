import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap/dist/react-bootstrap';
import { formValueSelector, change } from 'redux-form';
import TipoClienteSelect from './TipoClienteSelect';
import CamposCliente from './CamposCliente';
import { FETCH_OBRAS_SOCIALES, DELETE_OBRAS_SOCIALES } from '../../../../obraSocial/actionTypes';
import { FETCH_PACIENTES, DELETE_PACIENTES } from '../../../../paciente/actionTypes';

function ClienteForm({
    opciones,
    apiLoading = false,
    selectedOption,
    fetchObrasSociales,
    fetchPacientes,
    updateForm,
    borrarOpciones,
    lockComprobante,
}) {
    const tiposCondicionFiscal = ['RESPONSABLE INSCRIPTO', 'EXENTO', 'CONSUMIDOR FINAL'];
    const [tipoCliente, setTipoCliente] = useState(0);
    const setTipoClienteHandler = value =>
        (tipoCliente === value ? setTipoCliente(0) : setTipoCliente(value));

    const [asyncProps, setAsyncProps] = useState({});

    const renderOptionSelector = option => (
        <div key={ option.id }>
            { option.apellido && `${option.apellido}, ` }
            { option.nombre }
            <div>DNI/CUIT: {option.nro_cuit || option.dni}</div>
        </div>
    );

    const renderOption = (option) => {
        if (option.apellido) {
            return `${option.nombre} ${option.apellido}`;
        }
        return `${option.nombre}`;
    };

    useEffect(() => {
        setAsyncProps(
            !tipoCliente ? {} : {
                options: opciones,
                labelKey: renderOption,
                onSearch: tipoCliente === 1 ? fetchPacientes : fetchObrasSociales,
                renderMenuItemChildren: renderOptionSelector,
                isLoading: apiLoading,
            },
        );
    }, [tipoCliente, opciones]);

    useEffect(() => {
        borrarOpciones();
        updateForm('nombreCliente', '');
    }, [tipoCliente]);

    return (
        <Row>
            <TipoClienteSelect
              tipoCliente={ tipoCliente }
              setTipoCliente={ setTipoClienteHandler }
            />
            <CamposCliente
              tiposCondicionFiscal={ tiposCondicionFiscal }
              optionalProps={ asyncProps }
              selectedOption={ selectedOption }
              updateForm={ updateForm }
              lockComprobante={ lockComprobante }
            />
        </Row>
    );
}

ClienteForm.fields = [
    'nombreCliente',
    'domicilioCliente',
    'dni',
    'tipoDocumento',
    'condicionFiscal',
];

const { array, func, bool, object } = PropTypes;

ClienteForm.propTypes = {
    opciones: array,
    apiLoading: bool,
    selectedOption: object.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchPacientes: func.isRequired,
    updateForm: func.isRequired,
    borrarOpciones: func.isRequired,
    lockComprobante: bool.isRequired,
};

const selector = formValueSelector('CreateComprobanteForm');

function mapStateToProps(state) {
    const cliente = selector(state, 'nombreCliente');
    const selectedOption =
        Array.isArray(cliente) && cliente.length !== 0
            ? cliente[0]
            : {};

    const opciones =
    state.obraSocialReducer.obrasSociales.length > 0
        ? state.obraSocialReducer.obrasSociales
        : state.pacienteReducer.pacientes;

    return {
        apiLoading: state.obraSocialReducer.apiLoading || state.pacienteReducer.pacienteApiLoading,
        opciones,
        selectedOption,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchPacientes: nombre => dispatch({ type: FETCH_PACIENTES, searchText: nombre }),
        updateForm: (name, value) => dispatch(change('CreateComprobanteForm', name, value)),
        borrarOpciones: () => {
            dispatch({ type: DELETE_PACIENTES });
            dispatch({ type: DELETE_OBRAS_SOCIALES });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
