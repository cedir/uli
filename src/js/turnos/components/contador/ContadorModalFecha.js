import React from 'react';
import { Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ModalFecha({ modalOpened, setModalOpened, date, setDate }) {
    return (
        <Modal
          show={ modalOpened }
          onHide={ () => setModalOpened(false) }
          bsSize='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Actualizar fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                  value={ date }
                  type='date'
                  onChange={ e => setDate(e.target.value) }
                />
            </Modal.Body>
        </Modal>
    );
}

const { bool, func, string } = PropTypes;

ModalFecha.propTypes = {
    modalOpened: bool.isRequired,
    setModalOpened: func.isRequired,
    date: string.isRequired,
    setDate: func.isRequired,
};

export default ModalFecha;
