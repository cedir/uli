import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap/dist/react-bootstrap';
import ImporteForm from './ImporteForm';

function ImporteModal({ modalOpened, setShowImporteModal, idComprobante, importeDefault = 0 }) {
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
                  importeDefault={ importeDefault }
                />
            </Modal.Body>
        </Modal>
    );
}

ImporteModal.propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    setShowImporteModal: PropTypes.func.isRequired,
    idComprobante: PropTypes.number.isRequired,
    importeDefault: PropTypes.number,
};

export default ImporteModal;
