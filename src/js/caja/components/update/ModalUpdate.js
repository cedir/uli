import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Col } from 'react-bootstrap';
import { Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { UPDATE_MOVIMIENTO_CAJA } from '../../actionTypes';

import ViewMovimiento from './ViewMovimiento';
import FormUpdate from './FormUpdate';
import Botones from './Botones';

function ModalUpdate({
    modalOpened,
    setModal,
    movimiento,
    handleSubmit,
    updateMovimiento,
    // handleClose,
}) {
    const enviarDatos = (data) => {
        const datos = { ...data, id: movimiento.id };
        updateMovimiento(datos, setModal);
    };

    return (
        <Modal
          show={ modalOpened }
        //   onHide={ () => handleClose() }style="border-top: 1px solid #e5e5e5; padding-top: 2rem"
        >
            <Modal.Header >
                <Modal.Title>{ 'Modificar Movimiento' }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <ViewMovimiento movimiento={ movimiento } />
                    <Form
                      onSubmit={ handleSubmit((data) => {
                          enviarDatos(data);
                      }) }
                    >
                        <FormUpdate movimiento={ movimiento } />
                        <Botones setModal={ setModal } />
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

const UpdateCajaFormRedux = reduxForm({ // ver
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
