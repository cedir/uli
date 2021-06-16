import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap/dist/react-bootstrap';
import { formValueSelector } from 'redux-form';
import TipoClienteSelect from './TipoClienteSelect';
import CamposCliente from './CamposCliente';
import { FETCH_OBRAS_SOCIALES, DELETE_OBRAS_SOCIALES } from '../../../../obraSocial/actionTypes';
import { FETCH_PACIENTES, DELETE_PACIENTES } from '../../../../paciente/actionTypes';

function ClienteForm({
    selectedOption,
    updateForm,
    borrarOpciones,
    lockComprobante,
}) {
    const tiposCondicionFiscal = ['RESPONSABLE INSCRIPTO', 'EXENTO', 'CONSUMIDOR FINAL'];
    const [tipoCliente, setTipoCliente] = useState(0);
    const setTipoClienteHandler = value =>
        (tipoCliente === value ? setTipoCliente(0) : setTipoCliente(value));

    useEffect(() => {
        borrarOpciones();
        updateForm('nombreCliente', '');
    }, [tipoCliente]);

    return (
        <Row>
            <TipoClienteSelect
              tipoCliente={ tipoCliente }
              setTipoCliente={ setTipoClienteHandler }
              lockComprobante={ lockComprobante }
            />
            <CamposCliente
              tipoCliente={ tipoCliente }
              tiposCondicionFiscal={ tiposCondicionFiscal }
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

const { func, bool, array } = PropTypes;

ClienteForm.propTypes = {
    selectedOption: array,
    updateForm: func.isRequired,
    borrarOpciones: func.isRequired,
    lockComprobante: bool.isRequired,
};

const selector = formValueSelector('CreateComprobanteForm');

function mapStateToProps(state) {
    const selectedOption = selector(state, 'nombreCliente');

    const opciones =
    state.obraSocialReducer.obrasSociales.length > 0
        ? state.obraSocialReducer.obrasSociales
        : state.pacienteReducer.pacientes;

    return {
        apiLoading: state.obraSocialReducer.apiLoading || state.pacienteReducer.pacienteApiLoading,
        opciones,
        selectedOption: Array.isArray(selectedOption) ? selectedOption : [],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchPacientes: nombre => dispatch({ type: FETCH_PACIENTES, searchText: nombre }),
        borrarOpciones: () => {
            dispatch({ type: DELETE_PACIENTES });
            dispatch({ type: DELETE_OBRAS_SOCIALES });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
