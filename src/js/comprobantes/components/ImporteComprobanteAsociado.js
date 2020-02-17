import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap/dist/react-bootstrap';
import ImporteForm from './ImporteForm';

function ImporteModal({ modalOpened, setShowImporteModal, idComprobante }) {
    return (
        <Modal
          show={ modalOpened }
          onHide={ () => setShowImporteModal(false) }
          bsSize='large'
        >
            <Modal.Header closeButton>
                <Modal.Title>Crear Comprobante Asociado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ImporteForm
                  idComprobante={ idComprobante }
                  setShowImporteModal={ setShowImporteModal }
                />
            </Modal.Body>
        </Modal>
    );
}

ImporteModal.propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    setShowImporteModal: PropTypes.func.isRequired,
    idComprobante: PropTypes.number.isRequired,
};

export default ImporteModal;