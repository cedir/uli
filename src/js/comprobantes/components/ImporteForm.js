import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import { SEND_COMPROBANTE_ASOCIADO } from '../actionTypes';
import InputRF from '../../utilities/InputRF';

function ImporteForm({
    idComprobante,
    crearComprobanteAsociado,
    setShowImporteModal,
    handleSubmit,
    apiLoading,
}) {
    return (
        <Form onSubmit={
            handleSubmit((params) => {
                crearComprobanteAsociado(
                    idComprobante,
                    params.importe,
                    params.concepto,
                    setShowImporteModal,
                );
            })
        }
        >
            <Field
              name='importe'
              label='Importe'
              component={ InputRF }
            />
            <Field
              name='concepto'
              label='Concepto'
              component={ InputRF }
            />
            <Button type='submit' disabled={ apiLoading }>
                Crear comprobante asociado
            </Button>
        </Form>
    );
}

const { number, func, bool } = PropTypes;

ImporteForm.propTypes = {
    idComprobante: number.isRequired,
    crearComprobanteAsociado: func.isRequired,
    setShowImporteModal: func.isRequired,
    apiLoading: bool.isRequired,
    handleSubmit: func.isRequired,
};

const CreateAsociadoForm = reduxForm({
    form: 'CreateAsociadoForm',
    destroyOnUnmount: true,
    enableReinitialize: true,
})(ImporteForm);

function mapStateToProps(state) {
    return {
        apiLoading: state.comprobantesReducer.comprobantesApiLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        crearComprobanteAsociado: (idComp, importe, concepto, mostrarModal) =>
            dispatch({
                type: SEND_COMPROBANTE_ASOCIADO,
                idComp,
                importe,
                concepto,
                mostrarModal,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAsociadoForm);
