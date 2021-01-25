import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap/dist/react-bootstrap';
import SearchEstudiosForm from './SearchEstudiosForm';

function SearchEstudiosModal({ modalOpened, setModalOpened }) {
    return (
        <Modal
          show={ modalOpened }
          onHide={ () => setModalOpened(false) }
          bsSize='large'
        >
            <Modal.Header closeButton>
                <Modal.Title>Buscar estudio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SearchEstudiosForm setModalOpened={ setModalOpened } />
            </Modal.Body>
        </Modal>
    );
}

const { bool, func } = PropTypes;

SearchEstudiosModal.propTypes = {
    modalOpened: bool.isRequired,
    setModalOpened: func.isRequired,
};

export default SearchEstudiosModal;
