import React from 'react';
import { Form, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import CabeceraForm from './CabeceraForm';
import ClienteForm from './ClienteForm';
import LineaForm from './LineaForm';

function CreateComprobante() {
    return (
        <Form onSubmit={ props => console.log(props) }>
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

export default CreateComprobanteForm;
