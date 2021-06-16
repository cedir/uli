import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Proptypes from 'prop-types';

function ConfirmationModal({ formName, modalOpened, closeModal, apiLoading, lockComprobante }) {
    useState(() => {
        if (lockComprobante) {
            closeModal();
        }
    }, [lockComprobante]);

    return (
        <Modal
          show={ modalOpened }
          onHide={ closeModal }
        >
            <Modal.Header><Modal.Title>Confirmacion</Modal.Title></Modal.Header>
            <Modal.Body>Esta seguro que quiere crear un comprobante?</Modal.Body>
            <Modal.Footer>
                <Button bsStyle='danger' onClick={ closeModal }>
                    Cancelar
                </Button>
                <Button
                  bsStyle='primary'
                  type='submit'
                  form={ formName }
                  disabled={ apiLoading || lockComprobante }
                >
                    Crear comprobante
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const { bool, func, string } = Proptypes;

ConfirmationModal.propTypes = {
    modalOpened: bool.isRequired,
    closeModal: func.isRequired,
    apiLoading: bool.isRequired,
    lockComprobante: bool.isRequired,
    formName: string.isRequired,
};

export default ConfirmationModal;
