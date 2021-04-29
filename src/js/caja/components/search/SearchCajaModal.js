import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap/dist/react-bootstrap';
import SearchCajaForm from './SearchCajaForm';

function SearchCajaModal({ modalOpened, closeModal, fetchMovimientosCaja, resetPageNumber }) {
    return (
        <Modal
          show={ modalOpened }
          onHide={ closeModal }
          bsSize='large'
        >
            <Modal.Header closeButton>
                <Modal.Title>Buscar Movimientos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SearchCajaForm
                  closeModal={ closeModal }
                  fetchMovimientosCaja={ fetchMovimientosCaja }
                  resetPageNumber={ resetPageNumber }
                />
            </Modal.Body>
        </Modal>
    );
}

const { bool, func } = PropTypes;

SearchCajaModal.propTypes = {
    modalOpened: bool.isRequired,
    closeModal: func.isRequired,
    fetchMovimientosCaja: func.isRequired,
    resetPageNumber: func.isRequired,
};

export default SearchCajaModal;
