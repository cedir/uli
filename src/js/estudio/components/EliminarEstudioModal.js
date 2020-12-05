import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap/dist/react-bootstrap';

function EliminarEstudioModal({ modalOpened, setShowEliminarEstudioModal }) {
    return (
        <Modal
          show={ modalOpened }
          bsSize='large'
        >
            <Modal.Header>
                <Modal.Title>Eliminar estudio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Usted esta a punto de eliminar el estudio. Desea continuar?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ () => setShowEliminarEstudioModal() }>Cancelar</Button>
                <Button
                  bsStyle='danger'
                  onClick={ () => setShowEliminarEstudioModal() }
                >
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

EliminarEstudioModal.propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    setShowEliminarEstudioModal: PropTypes.func.isRequired,
};

export default EliminarEstudioModal;
