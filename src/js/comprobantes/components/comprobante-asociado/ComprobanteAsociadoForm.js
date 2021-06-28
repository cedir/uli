import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, change } from 'redux-form';
import { Form } from 'react-bootstrap';
import { SEND_COMPROBANTE_ASOCIADO } from '../../actionTypes';
import ComprobanteAsociadoFields from './ComprobanteAsociadoFields';
import ComprobanteAsociadoFooter from './ComprobanteAsociadoFooter';
import { tiposAsociadoDefault } from '../../../utilities/generalUtilities';

function ComprobanteAsociadoForm({
    comprobante,
    crearComprobanteAsociado,
    setShowImporteModal,
    handleSubmit,
    updateForm,
    apiLoading,
    valid,
}) {
    useEffect(() => {
        updateForm('iva', comprobante.gravado.id);
        updateForm('tipo', tiposAsociadoDefault[comprobante.tipo_comprobante.id - 1]);
    }, []);

    return (
        <Form onSubmit={
            handleSubmit((params) => {
                crearComprobanteAsociado(
                    comprobante.id,
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

const { object, func, bool } = PropTypes;

ComprobanteAsociadoForm.propTypes = {
    comprobante: object.isRequired,
    crearComprobanteAsociado: func.isRequired,
    setShowImporteModal: func.isRequired,
    apiLoading: bool.isRequired,
    handleSubmit: func.isRequired,
    valid: bool.isRequired,
    updateForm: func.isRequired,
};

const CreateAsociadoForm = reduxForm({
    form: 'CreateAsociadoForm',
    destroyOnUnmount: true,
    enableReinitialize: true,
})(ComprobanteAsociadoForm);

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
        updateForm: (name, value) => dispatch(change('CreateAsociadoForm', name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAsociadoForm);
