import React, { useState } from 'react';
import { Modal, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ModalFecha({ modalOpened, setModalOpened, date, setDate }) {
    const [temporal, setTemporal] = useState(date);

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
                  value={ temporal }
                  type='date'
                  onChange={ e => setTemporal(e.target.value) }
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ () => { setDate(temporal); setModalOpened(false); } }>
                    Actualizar
                </Button>
            </Modal.Footer>
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
