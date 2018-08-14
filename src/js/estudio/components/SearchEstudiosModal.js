import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap/dist/react-bootstrap';
import SearchEstudiosForm from './SearchEstudiosForm';

class SearchEstudiosModal extends React.Component {
    render() {
        return (
            <Modal
              show={ this.props.modalOpened }
              onHide={ this.props.closeModal }
              bsSize='large'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Buscar estudio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchEstudiosForm closeModal={ this.props.closeModal } />
                </Modal.Body>
            </Modal>
        );
    }
}

const { bool, func } = PropTypes;

SearchEstudiosModal.propTypes = {
    modalOpened: bool.isRequired,
    closeModal: func.isRequired,
};

export default SearchEstudiosModal;
