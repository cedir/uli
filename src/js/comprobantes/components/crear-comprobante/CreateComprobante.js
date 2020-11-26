import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, FieldArray } from 'redux-form';
import Panel from 'react-bootstrap/lib/Panel';
import CabeceraForm from './CabeceraForm';
import ClienteForm from './cliente-form/ClienteForm';
import LineasForm from './LineasForm';
import { CREATE_COMPROBANTE, DELETE_CAE } from '../../actionTypes';
import { nonEmpty } from '../../../utilities/reduxFormValidators';
import BotonesForm from './BotonesForm';

function CreateComprobante({ crearComprobante, valid, handleSubmit, borrarCae, cae }) {
    const opcionesIva = [
        { text: 'Exento', porcentaje: 0, gravado: 1 },
        { text: 'Iva inscripto 10.5', porcentaje: 10.5, gravado: 2 },
        { text: 'Iva inscripto 21', porcentaje: 21, gravado: 3 },
    ];

    const getNombreCliente = (nombreCliente) => {
        if (Array.isArray(nombreCliente)) {
            const { apellido, nombre } = nombreCliente[0];
            return apellido ? `${nombre} ${apellido}` : `${nombre}`;
        }
        return nombreCliente;
    };

    useEffect(() => {
        borrarCae();
    }, []);

    return (
        <Form
          onSubmit={ handleSubmit(comprobante =>
              crearComprobante({
                  ...comprobante,
                  nombreCliente: getNombreCliente(comprobante.nombreCliente),
              }),
          ) }
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
            <BotonesForm valid={ valid } cae={ cae } />
        </Form>
    );
}

const { func, bool, string } = PropTypes;

CreateComprobante.propTypes = {
    crearComprobante: func.isRequired,
    valid: bool.isRequired,
    handleSubmit: func.isRequired,
    borrarCae: func.isRequired,
    cae: string.isRequired,
};

const CreateComprobanteForm = reduxForm({
    form: 'CreateComprobanteForm',
})(CreateComprobante);

function mapStateToProps(state) {
    return {
        cae: state.comprobantesReducer.cae || '',
    };
}

function mapDispatchToProps(dispatch) {
    return {
        crearComprobante: comprobante => dispatch({ type: CREATE_COMPROBANTE, comprobante }),
        borrarCae: () => dispatch({ type: DELETE_CAE }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComprobanteForm);
