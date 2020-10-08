import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import CabeceraForm from './CabeceraForm';
import ClienteForm from './ClienteForm';
import LineaForm from './LineaForm';
import CREATE_COMPROBANTE from '../../actionTypes';

function CreateComprobante({ crearComprobante }) {
    return (
        <Form onSubmit={ (e) => {
            e.preventDefault();
            crearComprobante();
        } }
        >
            <h1> Crear comprobante </h1>
            <Panel header='Cliente' collapsible defaultExpanded>
                <ClienteForm />
            </Panel>
            <Panel header='Cabecera' collapsible defaultExpanded>
                <CabeceraForm />
            </Panel>
            <Panel header='Lineas' collapsible defaultExpanded>
                <LineaForm />
            </Panel>
            <Button
              type='submit'
              bsStyle='primary'
            >
                Crear comprobante
            </Button>
        </Form>
    );
}

const { func } = PropTypes;

CreateComprobante.propTypes = {
    crearComprobante: func.isRequired,
};

const CreateComprobanteForm = reduxForm({
    form: 'CreateComprobanteForm',
})(CreateComprobante);

function mapDispatchToProps(dispatch) {
    return {
        crearComprobante: comprobante => dispatch({ type: CREATE_COMPROBANTE, comprobante }),
    };
}

export default connect(null, mapDispatchToProps)(CreateComprobanteForm);
