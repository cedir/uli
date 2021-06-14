import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Col } from 'react-bootstrap';
import { Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { UPDATE_MOVIMIENTO_CAJA } from '../../actionTypes';

import BotonesUpdate from './BotonesUpdate';
import CajaTableView from '../CajaTableView';
import FormUpdate from './FormUpdate';

function ModalUpdate({
    modalOpened,
    setModal,
    movimiento,
    handleSubmit,
    updateMovimiento,
}) {
    return (
        <Modal show={ modalOpened }>
            <Modal.Header>
                <Modal.Title>Modificar Movimiento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <CajaTableView movimientos={ [movimiento] } fromUpdate />
                    <Form
                      onSubmit={ handleSubmit(data =>
                        updateMovimiento({ ...data, id: movimiento.id }, setModal)) }
                    >
                        <FormUpdate movimiento={ movimiento } />
                        <BotonesUpdate setModal={ setModal } />
                    </Form>
                </Col>
            </Modal.Body>
        </Modal>
    );
}

const { bool, object, func } = PropTypes;

ModalUpdate.propTypes = {
    modalOpened: bool.isRequired,
    setModal: func.isRequired,
    movimiento: object.isRequired,
    handleSubmit: func.isRequired,
    updateMovimiento: func.isRequired,
};

const UpdateCajaFormRedux = reduxForm({
    form: 'UpdateCajaFormRedux',
    destroyOnUnmount: false,
    enableReinitialize: true,
})(ModalUpdate);

function mapDispatchToProps(dispatch) {
    return {
        updateMovimiento: (datos, setModal) =>
            dispatch({ type: UPDATE_MOVIMIENTO_CAJA, datos, setModal }),
    };
}

export default connect(null, mapDispatchToProps)(UpdateCajaFormRedux);
