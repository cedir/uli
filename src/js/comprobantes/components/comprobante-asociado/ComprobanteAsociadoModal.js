import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap/dist/react-bootstrap';
import ComprobanteAsociadoForm from './ComprobanteAsociadoForm';

function ComprobanteAsociadoModal({ modalOpened, setShowImporteModal, comprobante }) {
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
                <ComprobanteAsociadoForm
                  comprobante={ comprobante }
                  setShowImporteModal={ setShowImporteModal }
                />
            </Modal.Body>
        </Modal>
    );
}

ComprobanteAsociadoModal.propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    setShowImporteModal: PropTypes.func.isRequired,
    comprobante: PropTypes.object.isRequired,
};

export default ComprobanteAsociadoModal;
