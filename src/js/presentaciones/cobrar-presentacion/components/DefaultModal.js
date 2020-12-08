import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

function DefaultModal({
    modalOpened,
    titulo,
    modalBody,
    handleClose,
    modalSize,
    modalFooter,
    childProps = {},
}) {
    const modalFooterExp = modalFooter();
    return (
        <Modal
          show={ modalOpened }
          onHide={ () => handleClose() }
          bsSize={ modalSize }
        >
            <Modal.Header closeButton>
                <Modal.Title>{ titulo }</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ modalBody(childProps) }</Modal.Body>
            { modalFooterExp && <Modal.Footer> { modalFooterExp } </Modal.Footer> }
        </Modal>
    );
}

const { bool, string, func, object } = PropTypes;

DefaultModal.propTypes = {
    modalOpened: bool.isRequired,
    titulo: string.isRequired,
    modalBody: func.isRequired,
    handleClose: func.isRequired,
    modalSize: string.isRequired,
    modalFooter: func,
    childProps: object,
};

export default DefaultModal;
