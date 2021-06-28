import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import { SEND_COMPROBANTE_ASOCIADO } from '../actionTypes';
import ComprobanteAsociadoFields from './comprobante-asociado/ComprobanteAsociadoFields';
import ComprobanteAsociadoFooter from './comprobante-asociado/ComprobanteAsociadoFooter';

function ImporteForm({
    idComprobante,
    crearComprobanteAsociado,
    setShowImporteModal,
    handleSubmit,
    apiLoading,
    valid,
}) {
    return (
        <Form onSubmit={
            handleSubmit((params) => {
                crearComprobanteAsociado(
                    idComprobante,
                    params,
                    setShowImporteModal,
                );
            })
        }
        >
            <ComprobanteAsociadoFields />
            <ComprobanteAsociadoFooter
              apiLoading={ apiLoading }
              valid={ valid }
            />
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
    valid: bool.isRequired,
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
        crearComprobanteAsociado: (idComp, data, mostrarModal) =>
            dispatch({
                type: SEND_COMPROBANTE_ASOCIADO,
                idComp,
                data,
                mostrarModal,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAsociadoForm);
