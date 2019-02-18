import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap/dist/react-bootstrap';
import SearchCajaForm from './SearchCajaForm';

export default class SearchCajaModal extends Component {
    render() {
        return (
            <Modal
              show={ this.props.modalOpened }
              onHide={ this.props.closeModal }
              bsSize='large'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Buscar Movimientos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchCajaForm closeModal={ this.props.closeModal } />
                </Modal.Body>
            </Modal>
        );
    }
}

const { bool, func } = PropTypes;

SearchCajaModal.propTypes = {
    modalOpened: bool.isRequired,
    closeModal: func.isRequired,
};
