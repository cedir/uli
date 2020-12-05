import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

function DefaultModal({ modalOpened, titulo, modalBody, handleClose, modalSize }) {
    return (
        <Modal
          show={ modalOpened }
          onHide={ () => handleClose() }
          bsSize={ modalSize }
        >
            <Modal.Header closeButton>
                <Modal.Title>{ titulo }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { modalBody() }
            </Modal.Body>
        </Modal>
    );
}

const { bool, string, func } = PropTypes;

DefaultModal.propTypes = {
    modalOpened: bool.isRequired,
    titulo: string.isRequired,
    modalBody: func.isRequired,
    handleClose: func.isRequired,
    modalSize: string.isRequired,
};

export default DefaultModal;
