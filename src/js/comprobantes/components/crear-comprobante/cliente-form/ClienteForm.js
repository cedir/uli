import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap/dist/react-bootstrap';
import TipoClienteSelect from './TipoClienteSelect';
import CamposCliente from './CamposCliente';
import { FETCH_OBRAS_SOCIALES } from '../../../../obraSocial/actionTypes';

function ClienteForm({ opciones, fetchObrasSociales, apiLoading }) {
    const tiposCondicionFiscal = ['RESPONSABLE INSCRIPTO', 'EXENTO', 'CONSUMIDOR FINAL'];
    const [tipoCliente, setTipoCliente] = useState(0);
    const setTipoClienteHandler = value =>
        (tipoCliente === value ? setTipoCliente(0) : setTipoCliente(value));

    const [asyncProps, setAsyncProps] = useState({});

    useEffect(() => {
        const renderOption = option => <div key={ option.id }>{ option.nombre }</div>;
        setAsyncProps(
            !tipoCliente ? {} : {
                options: opciones,
                labelKey: 'nombre',
                onSearch: fetchObrasSociales,
                renderMenuItemChildren: renderOption,
                isLoading: apiLoading,
            },
        );
    }, [tipoCliente, opciones]);

    return (
        <Row>
            <TipoClienteSelect
              tipoCliente={ tipoCliente }
              setTipoCliente={ setTipoClienteHandler }
            />
            <CamposCliente
              tiposCondicionFiscal={ tiposCondicionFiscal }
              optionalProps={ asyncProps }
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

const { array, func, bool } = PropTypes;

ClienteForm.propTypes = {
    opciones: array,
    fetchObrasSociales: func,
    apiLoading: bool,
};

function mapStateToProps(state) {
    return {
        opciones: state.obraSocialReducer.obrasSociales,
        obrasSocialesApiLoading: state.obraSocialReducer.apiLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
