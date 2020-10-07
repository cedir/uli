import React from 'react';
import { connect } from 'react-redux';
import { Form, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import CabeceraForm from './CabeceraForm';
import ClienteForm from './ClienteForm';
import LineaForm from './LineaForm';
import CREATE_COMPROBANTE from '../../actionTypes';

function CreateComprobante(props) {
    return (
        <Form onSubmit={ (e) => {
            console.log(props);
            e.preventDefault();
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

const CreateComprobanteForm = reduxForm({
    form: 'CreateComprobanteForm',
})(CreateComprobante);

function mapDispatchToProps(dispatch) {
    return {
        crearComprobante: comprobante => dispatch({ type: CREATE_COMPROBANTE, comprobante }),
    };
}

export default connect(null, mapDispatchToProps)(CreateComprobanteForm);
