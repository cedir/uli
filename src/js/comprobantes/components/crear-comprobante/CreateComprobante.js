import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, FieldArray } from 'redux-form';
import { Button } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import CabeceraForm from './CabeceraForm';
import ClienteForm from './cliente-form/ClienteForm';
import LineasForm from './LineasForm';
import { CREATE_COMPROBANTE } from '../../actionTypes';
import { nonEmpty } from '../../../utilities/reduxFormValidators';

function CreateComprobante({ crearComprobante, valid, handleSubmit }) {
    const opcionesIva = [
        { text: 'Exento', porcentaje: 0, gravado: 1 },
        { text: 'Iva inscripto 10.5', porcentaje: 10.5, gravado: 2 },
        { text: 'Iva inscripto 21', porcentaje: 21, gravado: 3 },
    ];
    return (
        <Form
          onSubmit={ handleSubmit(comprobante => crearComprobante(comprobante)) }
        >
            <h1> Crear comprobante </h1>
            <Panel header='Cliente' collapsible defaultExpanded>
                <ClienteForm />
            </Panel>
            <Panel header='Cabecera' collapsible defaultExpanded>
                <CabeceraForm opcionesIva={ opcionesIva } />
            </Panel>
            <Panel header='Lineas' collapsible defaultExpanded>
                <FieldArray
                  name='lineas'
                  component={ LineasForm }
                  validate={ nonEmpty }
                  opcionesIva={ opcionesIva }
                />
            </Panel>
            <Button
              type='submit'
              bsStyle='primary'
              disabled={ !valid }
            >
                Crear comprobante
            </Button>
        </Form>
    );
}

const { func, bool } = PropTypes;

CreateComprobante.propTypes = {
    crearComprobante: func.isRequired,
    valid: bool,
    handleSubmit: func,
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
